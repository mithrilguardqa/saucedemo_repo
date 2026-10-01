import { Browser, chromium, Page } from "@playwright/test";
import envConfig from "./env.config";
import { LoginPage } from "@pages/index";

export default async function globalSetup() {
  const browser: Browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page: Page = await context.newPage();

  await page.goto(envConfig.baseUrl + "login");
  const loginPage = new LoginPage(page);
  await loginPage.login(envConfig.standardUser.username, envConfig.standardUser.password);

  await page.context().storageState({ path: ".auth/login.json" });

  await browser.close();
}
