import config from "@env.config";
import { test } from "@fixtures/fixture";
import { getRandomProduct } from "../../helpers/utils";
import { inventoryList } from "../../test_data/inventory_list";

test.describe("Cart", () => {
  const randomProduct = getRandomProduct(inventoryList);

  test.beforeEach(async ({ page }) => {
    await page.goto(`${config.baseUrl}inventory.html`);
  });

  test("Verify products can be added to cart", async ({ inventoryPage, cartPage, headerPage }) => {
    await test.step("Add products to cart", async () => {
      await inventoryPage.addProductToCart(randomProduct.name);
    });

    await test.step("Verify product is added to cart and cart badge is updated", async () => {
      await inventoryPage.assertProductAddedToCart(randomProduct.name);
      await headerPage.assertShoppingCartBadge(1);
    });

    await test.step("Navigate to cart page", async () => {
      await headerPage.clickOnShoppingCart();
    });

    await test.step("Verify cart page is loaded", async () => {
      await cartPage.assertCartPageIsLoaded();
    });

    await test.step("Verify correct product is displayed in cart", async () => {
      await cartPage.assertProductInCart(randomProduct.name);
    });
  });

  
});
