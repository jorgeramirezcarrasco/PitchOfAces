// eslint.config.js
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginVitest from 'eslint-plugin-vitest';

export default [
  {
    files: ["**/*.js"],
    ignores: ["dist/**", "node_modules/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    settings: {
      'import/resolver': {
        node: {
          exportConditions: ['import', 'node'],
        },
      },
    },
    plugins: {
      import: eslintPluginImport,
      vitest: eslintPluginVitest, 
    },
    rules: {
      "no-unused-vars":       ["warn"],
      "import/order":         ["warn"],
      "import/no-unresolved": ["error"],
    },
  },
];
