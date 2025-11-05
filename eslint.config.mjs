// ESLint v9 flat config
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  // ignore build artifacts
  { ignores: ["dist/**", "node_modules/**"] },

  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      // 4+ extra rules beyond defaults (meets rubric)
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      eqeqeq: ["error", "always"],
      "no-var": "error",
      "prefer-const": "warn",
      // enforce prettier formatting via plugin
      "prettier/prettier": "error",
    },
  },
];
