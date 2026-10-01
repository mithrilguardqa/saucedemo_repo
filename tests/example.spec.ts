import { LoginPage } from "@pages/login_page";
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  const loginPage = new LoginPage(page);
  
  await loginPage.login("standard_user", "secret_sauce");

  await page
    .getByTestId("inventory-item-name")
    .filter({ hasText: "Sauce Labs Bike Light" })
    .click();
});
