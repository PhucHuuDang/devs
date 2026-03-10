import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  {
    rules: {
      "react-hooks/incompatible-library": "off",

      "import/order": [
        "error",
        {
          groups: [
            "builtin", // fs, path
            "external", // react, next, lucide-react
            "internal", // @/...
            "parent",
            "sibling",
            "index",
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "next/**",
              group: "external",
              position: "before",
            },
            {
              pattern: "react-use/**",
              group: "external",
              position: "before",
            },

            {
              pattern: "@/lib/**",
              group: "internal",
              position: "before",
            },

            {
              pattern: "@/types/**",
              group: "type",
              position: "before",
            },
            {
              pattern: "@/mocks/**",
              group: "internal",
              position: "before",
            },

            // {
            //   pattern: "@/**",
            //   group: "internal",
            // },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-require-imports": "off",
      "react-hooks/purity": "off",
      "react-hooks/static-components": "off",
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
      "react/display-name": "off",
      "react-hooks/unsupported-syntax": "off",
    },
  },

  prettier,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "app/graphql/__generated__/**",
  ]),
]);

export default eslintConfig;
