import config from "@env.config";
import { test } from "@fixtures/fixture";

test.describe("Authentication and login flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(config.baseUrl);
  });

  test("Verify user can login successfully", async ({ loginPage }) => {
    await loginPage.login(config.standardUser.username, config.standardUser.password);
    await loginPage.assertLogin();
  });

  test("Verify user can logout successfully", async ({ loginPage, burgerNavPage }) => {
    await loginPage.login(config.standardUser.username, config.standardUser.password);
    await loginPage.assertLogin();
    await burgerNavPage.logout();
    await loginPage.assertLogout();
  });

  test("Verify locked_user cannot login", async ({ loginPage }) => {
    await loginPage.login(config.lockedUser.username, config.lockedUser.password);
    await loginPage.assertLoginNotPossible();
  });
});
