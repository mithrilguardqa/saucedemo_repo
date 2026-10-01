import config from "@env.config";
import { test } from "@fixtures/fixture";

test.describe("Authentication and login flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(config.baseUrl);
  });

  test(
    "Verify user can login successfully",
    {
      annotation: [
        { type: "allure.label.story", description: "Successful login" },
        { type: "allure.label.severity", description: "critical" },
        {
          type: "description",
          description: "A standard user can sign in and reach the inventory page.",
        },
      ],
    },
    async ({ loginPage }) => {
      await loginPage.login(config.standardUser.username, config.standardUser.password);
      await loginPage.assertLogin();
    },
  );

  test(
    "Verify user can logout successfully",
    {
      annotation: [
        { type: "allure.label.story", description: "Logout" },
        { type: "allure.label.severity", description: "normal" },
        {
          type: "description",
          description:
            "A signed-in user can log out through the menu and return to the login page.",
        },
      ],
    },
    async ({ loginPage, burgerNavPage }) => {
      await test.step("Login and assert user is logged in", async () => {
        await loginPage.login(config.standardUser.username, config.standardUser.password);
        await loginPage.assertLogin();
      });

      await test.step("Logout and assert user is logged out", async () => {
        await burgerNavPage.logout();
        await loginPage.assertLogout();
      });
    },
  );

  test(
    "Verify locked_user cannot login",
    {
      annotation: [
        { type: "allure.label.story", description: "Locked account" },
        { type: "allure.label.severity", description: "normal" },
        {
          type: "description",
          description: "A locked account is denied access and sees the expected login error.",
        },
      ],
    },
    async ({ loginPage }) => {
      await loginPage.login(config.lockedUser.username, config.lockedUser.password);
      await loginPage.assertLoginNotPossible();
    },
  );
});
