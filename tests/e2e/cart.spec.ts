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
      await headerPage.assertShoppingCartBadge(2);
    });
  });
});
