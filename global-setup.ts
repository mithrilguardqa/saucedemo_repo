import { Browser, chromium, Page } from "@playwright/test";
import { LoginPage } from "@pages/index";
import config from "./env.config";

export default async function globalSetup() {
  const browser: Browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page: Page = await context.newPage();

  await page.goto(config.baseUrl + "login");
  const loginPage = new LoginPage(page);
  await loginPage.login(config.standardUser.username, config.standardUser.password);

  await page.context().storageState({ path: ".auth/login.json" });

  await browser.close();
}
