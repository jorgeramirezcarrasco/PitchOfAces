/* eslint import/no-unresolved: "off" */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // any pattern here is **excluded**
    exclude: ['e2e/**', 'node_modules/**'],
  },
});
