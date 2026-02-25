import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:3001/graphql",

  documents: ["app/graphql/**/*.graphql"],

  generates: {
    "app/graphql/__generated__/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        withHooks: true,
        withHOC: false,
        withComponent: false,
        reactApolloVersion: 3,

        apolloReactCommonImportFrom: "../../../lib/apollo-compat",
        apolloReactHooksImportFrom: "@apollo/client/react",

        skipTypename: true,
        useTypeImports: true,
      },
    },
  },

  // verbose: true,
  watch: true,
};

export default config;
