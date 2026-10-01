import envConfig from "@env.config";
import { test } from "@fixtures/fixture";

test.describe("Authentication and login flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(envConfig.baseUrl);
  });

  test("Verify user can login successfully", async ({ loginPage }) => {
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.assertLogin();
  });

  test("Verify user can logout successfully", async ({ loginPage, burgerNavPage }) => {
    await loginPage.login("standard_user", "secret_sauce");
    await loginPage.assertLogin();
    await burgerNavPage.logout();
    await loginPage.assertLogout();
  });

  test("Verify locked_user cannot login", async ({ loginPage }) => {
    await loginPage.login("locked_out_user", "secret_sauce");
    await loginPage.assertLoginNotPossible();
  });
});
