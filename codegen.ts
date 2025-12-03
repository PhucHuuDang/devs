import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  documents: ["app/**/*.ts", "app/**/*.tsx"],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    "./app/graphql/__generated__/": {
      preset: "client",
      config: {
        documentMode: "string",
        useTypeImports: true,
      },
    },
  },
  allowPartialOutputs: true,
  watch: true,
};

export default config;
