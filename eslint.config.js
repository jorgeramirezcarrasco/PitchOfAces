// eslint.config.js
import eslintPluginImport from "eslint-plugin-import";

export default [
  {
    files: ["**/*.js"],
    ignores: ["dist/**", "node_modules/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: { import: eslintPluginImport },
    rules: {
      "no-unused-vars":       ["warn"],
      "import/order":         ["warn"],
      "import/no-unresolved": ["error"],
    },
  },
];
