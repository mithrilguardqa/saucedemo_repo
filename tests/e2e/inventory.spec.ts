import config from "@env.config";
import { expect, test } from "@fixtures/fixture";

test.describe("Inventory tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(config.baseUrl + "inventory.html");
  });

  test("Verify all inventory items are present and displayed correctly", async ({ page }) => {
    await expect(page.getByText("Products")).toBeVisible();
    await expect(page.getByTestId("product-sort-container")).toBeVisible();
  });
});
