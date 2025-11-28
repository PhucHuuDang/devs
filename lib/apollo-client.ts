import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    uri:
      process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT ||
      "http://localhost:3001/graphql",

    credentials: "include",
    // headers: Object.fromEntries((await headers()).entries()),
  }),
  cache: new InMemoryCache(),

  devtools: {
    enabled: process.env.NODE_ENV === "development",
  },
  // ssrMode: true,
});
