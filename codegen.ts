import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema:
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:3001/graphql",
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
// console.log(
//   "NEXT_PUBLIC_GRAPHQL_ENDPOINT",
//   process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT
// );
export default config;
