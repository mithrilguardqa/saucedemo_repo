import config from "@env.config";
import { test } from "@fixtures/fixture";
import { getRandomProduct } from "../../helpers/utils";
import { inventoryList } from "../../test_data/inventory_list";

test.describe("Cart behavior tests", () => {
  const randomProduct = getRandomProduct(inventoryList);
  const firstProduct = inventoryList[0];
  const secondProduct = inventoryList[1];

  test.beforeEach(async ({ page }) => {
    await page.goto(`${config.baseUrl}inventory.html`);
  });

  test(
    "Verify products can be added to cart",
    {
      annotation: [
        { type: "allure.label.story", description: "Add a product" },
        { type: "allure.label.severity", description: "critical" },
        {
          type: "description",
          description:
            "Adding a product updates the cart badge and displays the selected product in the cart.",
        },
      ],
    },
    async ({ inventoryPage, cartPage, headerPage }) => {
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
    },
  );

  test(
    "Verify product can be removed from cart",
    {
      annotation: [
        { type: "allure.label.story", description: "Remove a product" },
        { type: "allure.label.severity", description: "normal" },
        {
          type: "description",
          description:
            "Removing one of two products updates the cart and badge while preserving the remaining product.",
        },
      ],
    },
    async ({ inventoryPage, cartPage, headerPage }) => {
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
    },
  );

  test(
    "Verify multiple products can be added to cart",
    {
      annotation: [
        { type: "allure.label.story", description: "Add multiple products" },
        { type: "allure.label.severity", description: "critical" },
        {
          type: "description",
          description:
            "Two selected products appear in the cart and the cart badge reflects their quantity.",
        },
      ],
    },
    async ({ inventoryPage, cartPage, headerPage }) => {
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
    },
  );
});
