import config from "@env.config";
import { test } from "@fixtures/fixture";
import { getRandomProduct } from "../../helpers/utils";
import { inventoryList } from "../../test_data/inventory_list";

test.describe("Cart", () => {
  const randomProduct = getRandomProduct(inventoryList);
  const firstProduct = inventoryList[0];
  const secondProduct = inventoryList[1];

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

  test("Verify product can be removed from cart", async ({
    inventoryPage,
    cartPage,
    headerPage,
  }) => {
    await test.step("Add products to cart", async () => {
      await inventoryPage.addProductToCart(firstProduct.name);
      await inventoryPage.addProductToCart(secondProduct.name);
    });

    await test.step("Verify products are added to cart and cart badge is updated", async () => {
      await inventoryPage.assertProductAddedToCart(firstProduct.name);
      await inventoryPage.assertProductAddedToCart(secondProduct.name);
      await headerPage.assertShoppingCartBadge(2);
    });

    await test.step("Navigate to cart page", async () => {
      await headerPage.clickOnShoppingCart();
    });

    await test.step("Verify cart page is loaded", async () => {
      await cartPage.assertCartPageIsLoaded();
    });

    await test.step("Verify correct products are displayed in cart", async () => {
      await cartPage.assertProductInCart(firstProduct.name);
      await cartPage.assertProductInCart(secondProduct.name);
      await cartPage.assertCartQuantity(2);
    });

    await test.step("Remove product from cart", async () => {
      await cartPage.removeProductFromCart(secondProduct.name);
    });

    await test.step("Verify correct product is removed and cart badge is updated", async () => {
      await cartPage.assertProductNotInCart(secondProduct.name);
      await cartPage.assertProductInCart(firstProduct.name);
      await cartPage.assertCartQuantity(1);
      await headerPage.assertShoppingCartBadge(1);
    });
  });

  test("Verify multiple products can be added to cart", async ({
    inventoryPage,
    cartPage,
    headerPage,
  }) => {
    await test.step("Add products to cart", async () => {
      await inventoryPage.addProductToCart(firstProduct.name);
      await inventoryPage.addProductToCart(secondProduct.name);
    });

    await test.step("Verify products are added to cart and cart badge is updated", async () => {
      await inventoryPage.assertProductAddedToCart(firstProduct.name);
      await inventoryPage.assertProductAddedToCart(secondProduct.name);
      await headerPage.assertShoppingCartBadge(2);
    });

    await test.step("Navigate to cart page", async () => {
      await headerPage.clickOnShoppingCart();
    });

    await test.step("Verify cart page is loaded", async () => {
      await cartPage.assertCartPageIsLoaded();
    });

    await test.step("Verify correct products are displayed in cart", async () => {
      await cartPage.assertProductInCart(firstProduct.name);
      await cartPage.assertProductInCart(secondProduct.name);
      await cartPage.assertCartQuantity(2);
    });
  });
});
