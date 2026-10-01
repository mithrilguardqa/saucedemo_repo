import { Browser, chromium, Page } from "@playwright/test";
import config from "./env.config";

export default async function globalSetup() {
  const browser: Browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page: Page = await context.newPage();

  await page.goto(config.baseUrl);
  await page.locator("[data-test='username']").fill(config.standardUser.username);
  await page.locator("[data-test='password']").fill(config.standardUser.password);
  await page.locator("[data-test='login-button']").click();
  await page.waitForURL("**/inventory.html");

  await page.context().storageState({ path: ".auth/login.json" });
  await browser.close();
}
