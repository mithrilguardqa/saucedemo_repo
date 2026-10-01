import config from "@env.config";
import { test } from "@fixtures/fixture";
import { getRandomProduct } from "../../helpers/utils";
import { inventoryList } from "../../test_data/inventory_list";

test.describe("Inventory tests", () => {
  const randomProduct = getRandomProduct(inventoryList);
  const sortOptions = [
    "Name (A to Z)",
    "Name (Z to A)",
    "Price (low to high)",
    "Price (high to low)",
  ] as const;

  test.beforeEach(async ({ page }) => {
    await page.goto(`${config.baseUrl}inventory.html`);
  });

  test(
    "Verify all inventory items are present and displayed correctly",
    {
      annotation: [
        { type: "allure.label.story", description: "Browse the inventory" },
        { type: "allure.label.severity", description: "normal" },
        {
          type: "description",
          description:
            "The inventory page displays all expected products with their correct details.",
        },
      ],
    },
    async ({ inventoryPage }) => {
      await test.step("Verify inventory page is loaded", async () => {
        await inventoryPage.assertInventoryPage();
      });

      await test.step("Verify inventory items are present and displayed correctly", async () => {
        await inventoryPage.assertInventoryItems();
      });
    },
  );

  // Loop through sort options and run tests for each
  for (const sortOption of sortOptions) {
    test(
      `Verify products can be sorted by ${sortOption}`,
      {
        annotation: [
          { type: "allure.label.story", description: "Sort products" },
          { type: "allure.label.severity", description: "normal" },
          {
            type: "description",
            description: `Selecting "${sortOption}" displays all products in the expected order.`,
          },
        ],
      },
      async ({ inventoryPage }) => {
        await test.step(`Sort products by ${sortOption} and verify their order`, async () => {
          await inventoryPage.sortBy(sortOption);
          await inventoryPage.assertSortedBy(sortOption);
        });
      },
    );
  }

  test(
    "Verify product details page displays correct product information",
    {
      annotation: [
        { type: "allure.label.story", description: "View product details" },
        { type: "allure.label.severity", description: "normal" },
        {
          type: "description",
          description:
            "A selected product shows the expected name, description and price on its details page.",
        },
      ],
    },
    async ({ inventoryPage, productDetailsPage }) => {
      await test.step("Click on a product", async () => {
        await inventoryPage.clickProduct(randomProduct.name);
      });

      await test.step("Verify product details page is loaded", async () => {
        await productDetailsPage.assertProductDetailsPage(
          randomProduct.name,
          randomProduct.description,
          randomProduct.price,
        );
      });

      await test.step("Click back to products button", async () => {
        await productDetailsPage.clickBackToProductsButton();
      });
    },
  );
});
