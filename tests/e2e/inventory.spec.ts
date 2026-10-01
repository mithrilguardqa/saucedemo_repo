import config from "@env.config";
import { test } from "@fixtures/fixture";

test.describe("Inventory tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(config.baseUrl + "inventory.html");
  });

  test("Verify all inventory items are present and displayed correctly", async ({
    inventoryPage,
  }) => {
    await test.step("Verify inventory page is loaded", async () => {
      await inventoryPage.assertInventoryPage();
    });

    await test.step("Verify inventory items are present and displayed correctly", async () => {
      await inventoryPage.assertInventoryItems();
    });
  });

  test("Verify products can be sorted by name and price", async ({ inventoryPage }) => {
    await test.step("Sort by name from A to Z", async () => {
      await inventoryPage.sortBy("Name (A to Z)");
      await inventoryPage.assertSortedBy("Name (A to Z)");
    });

    await test.step("Sort by name from Z to A", async () => {
      await inventoryPage.sortBy("Name (Z to A)");
      await inventoryPage.assertSortedBy("Name (Z to A)");
    });

    await test.step("Sort by price from low to high", async () => {
      await inventoryPage.sortBy("Price (low to high)");
      await inventoryPage.assertSortedBy("Price (low to high)");
    });

    await test.step("Sort by price from high to low", async () => {
      await inventoryPage.sortBy("Price (high to low)");
      await inventoryPage.assertSortedBy("Price (high to low)");
    });
  });
});
