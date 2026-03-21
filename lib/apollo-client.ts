import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  type NormalizedCacheObject,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RemoveTypenameFromVariablesLink } from "@apollo/client/link/remove-typename";
import { RetryLink } from "@apollo/client/link/retry";
import { visit } from "graphql";

import type { DocumentNode, GraphQLError } from "graphql";

/**
 * GraphQL endpoint from environment variables
 * Falls back to localhost for development
 */
const GRAPHQL_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT_PRODUCTION ||
      process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
      "http://localhost:3001/graphql"
    : process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
      "http://localhost:3001/graphql";

/**
 * Creates the HTTP link for Apollo Client
 * Handles authentication via cookies and CORS
 */
function createHttpLink() {
  return new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    credentials: "include", // Include cookies for authentication
  });
}

/**
 * Removes __typename fields from a GraphQL document
 */
function removeTypenameFromDocument(doc: DocumentNode): DocumentNode {
  return visit(doc, {
    Field(node) {
      if (node.name.value === "__typename") {
        return null;
      }
      return undefined;
    },
  });
}

/**
 * Custom link to remove __typename from query documents
 * Prevents __typename from being added to GraphQL queries
 */
function createRemoveTypenameLink() {
  return new ApolloLink((operation, forward) => {
    if (operation.query) {
      operation.query = removeTypenameFromDocument(operation.query);
    }
    return forward(operation);
  });
}

/**
 * Error handling link
 * Logs GraphQL and network errors for debugging
 */
function createErrorLink() {
  return onError((errorHandler) => {
    const { graphQLErrors, networkError, operation } = errorHandler as any;

    if (graphQLErrors) {
      graphQLErrors.forEach((error: GraphQLError) => {
        console.error(
          `[GraphQL Error]: Message: ${error.message}, Location: ${JSON.stringify(error.locations)}, Path: ${error.path}`,
          error.extensions,
        );
      });
    }

    if (networkError) {
      console.error(
        `[Network Error]: ${networkError.message}`,
        `Operation: ${operation.operationName}`,
      );
    }
  });
}

/**
 * Retry link for network resilience
 * Retries failed requests with exponential backoff
 */
function createRetryLink() {
  return new RetryLink({
    delay: {
      initial: 300,
      max: 5000,
      jitter: true,
    },
    attempts: {
      max: 3,
      retryIf: (error) => !!error, // Retry on any network error
    },
  });
}

/**
 * Creates the InMemoryCache configuration
 * Includes pagination merge strategies for list queries
 */
function createCache(): InMemoryCache {
  return new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          publishedPosts: {
            keyArgs: [
              "filters",
              ["categoryId", "search", "sortBy", "sortOrder", "tags"],
            ],
            merge(existing, incoming, { args }) {
              // If requesting page 1, replace entirely
              if (!existing || args?.filters?.page === 1) {
                return incoming;
              }
              // Otherwise append data for infinite scroll
              return {
                ...incoming,
                data: [...(existing.data || []), ...(incoming.data || [])],
              };
            },
          },
          myPosts: {
            keyArgs: ["filters", ["status", "sortBy", "sortOrder"]],
            merge(existing, incoming, { args }) {
              if (!existing || args?.filters?.page === 1) {
                return incoming;
              }
              return {
                ...incoming,
                data: [...(existing.data || []), ...(incoming.data || [])],
              };
            },
          },
        },
      },
    },
  });
}

/**
 * Apollo Client instance
 * Configured with:
 * - Retry link for network resilience (3 attempts, exponential backoff)
 * - Error handling and logging
 * - __typename completely disabled (removed from queries and variables)
 * - Pagination-aware caching for publishedPosts and myPosts
 */
export const client = new ApolloClient({
  link: ApolloLink.from([
    createErrorLink(),
    createRetryLink(),
    new RemoveTypenameFromVariablesLink(), // Remove __typename from mutation variables
    createHttpLink(),
  ]),
  cache: createCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "cache-first",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
  devtools: {
    enabled: process.env.NODE_ENV === "development",
  },
});
