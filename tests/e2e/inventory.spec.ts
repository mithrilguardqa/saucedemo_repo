import config from "@env.config";
import { expect, test } from "@fixtures/fixture";
import { inventoryList } from "../../test_data/inventory_list";

test.describe("Inventory tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(config.baseUrl + "inventory.html");
  });

  

  
});
