import config from "@env.config";
import { test } from "@fixtures/fixture";

test.describe("Cart", () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto(`${config.baseUrl}inventory.html`);
  });

  test("Verify products can be added to cart", async ({ inventoryPage, cartPage, headerPage }) => {
    await test.step("Add products to cart", async () => {
      await inventoryPage.addProductToCart("Sauce Labs Backpack");
    });

    await test.step("Verify product is added to cart and cart badge is updated", async () => {
      await inventoryPage.assertProductAddedToCart("Sauce Labs Backpack");
      await headerPage.assertShoppingCartBadge(1);
    });

    await test.step("Navigate to cart page", async () => {
      await headerPage.clickOnShoppingCart();
    });

    await test.step("Verify cart page is loaded", async () => {
      await cartPage.assertCartPageIsLoaded();
    });

    await test.step("Verify correct product is displayed in cart", async () => {
      await cartPage.assertProductInCart("Sauce Labs Backpack");
    });
  });
});
