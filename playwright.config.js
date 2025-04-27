import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e', // Directory for Playwright tests
  timeout: 30000, // 30 seconds timeout
  retries: 2, // Retry failed tests twice
  use: {
    baseURL: 'http://localhost:5173', // Update with your local dev server URL
    headless: true,
  },
  webServer: {
    command: 'npm run dev',
    port: 5173,
    timeout: 120000, // Wait up to 2 minutes for the server to start
    reuseExistingServer: !process.env.CI, // Reuse server in local dev
  },
});