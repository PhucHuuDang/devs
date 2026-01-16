import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  type NormalizedCacheObject,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { RemoveTypenameFromVariablesLink } from "@apollo/client/link/remove-typename";
import { visit } from "graphql";

import type { DocumentNode, GraphQLError } from "graphql";

/**
 * GraphQL endpoint from environment variables
 * Falls back to localhost for development
 */
const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:3001/graphql";

/**
 * Creates the HTTP link for Apollo Client
 * Handles authentication via cookies and CORS
 */
function createHttpLink() {
  return new HttpLink({
    uri: GRAPHQL_ENDPOINT,
    credentials: "include", // Include cookies for authentication
    fetchOptions: {
      cache: "no-store", // Disable fetch cache for real-time data
    },
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
 * Creates the InMemoryCache configuration
 * Customizable for pagination and type policies
 */
function createCache(): InMemoryCache {
  return new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Add pagination or merge strategies here if needed
          // Example:
          // posts: {
          //   keyArgs: ["filters"],
          //   merge(existing, incoming, { args }) {
          //     return incoming;
          //   },
          // },
        },
      },
    },
  });
}

/**
 * Apollo Client instance
 * Configured with:
 * - Error handling and logging
 * - __typename completely disabled (removed from queries and variables)
 * - Proper caching with customizable type policies
 */
export const client = new ApolloClient({
  link: ApolloLink.from([
    createErrorLink(),
    createRemoveTypenameLink(), // Remove __typename from query documents
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
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
      // Note: __typename is automatically removed from variables via RemoveTypenameFromVariablesLink
    },
  },
  devtools: {
    enabled: process.env.NODE_ENV === "development",
  },
});
