import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:3001/graphql",
  documents: ["app/**/*.ts", "app/**/*.tsx"],
  ignoreNoDocuments: true, //for better experience with the watcher
  generates: {
    "./app/graphql/__generated__/": {
      preset: "client",
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-resolvers",
        "typescript-react-apollo",
      ],
    },
  },
  allowPartialOutputs: true,
  watch: true,
};

export default config;
