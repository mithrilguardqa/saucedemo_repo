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

  test("Verify sorting options are present and displayed correctly", async ({ inventoryPage }) => {
    
  });
});
