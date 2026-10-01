import { defineConfig, devices } from "@playwright/test";
import config from "./env.config";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

const allureResultsDir = path.resolve(__dirname, "allure-results");

export default defineConfig({
  testDir: "./tests",
  globalSetup: require.resolve("./global-setup"),

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["list"],
    ["html", { open: "never" }],
    ["./reporters/clean_allure_results.ts", { resultsDir: allureResultsDir }],
    ["allure-playwright", { resultsDir: allureResultsDir, detail: false }],
  ],
  use: {
    baseURL: config.baseUrl,
    storageState: ".auth/login.json",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    testIdAttribute: "data-test",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
