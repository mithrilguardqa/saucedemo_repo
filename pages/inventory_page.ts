import { expect, Locator, Page } from "@playwright/test";
import { inventoryList } from "../test_data/inventory_list";

export class InventoryPage {
  private page: Page;
  private inventoryList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.getByTestId("inventory-list");
  }

  async assertInventoryPage(): Promise<void> {
    await expect(this.page.getByText("Products")).toBeVisible();
    await expect(this.page.getByTestId("product-sort-container")).toBeVisible();
  }

  async assertInventoryItems(): Promise<void> {
    const products = this.inventoryList.getByTestId("inventory-item");

    for (const item of inventoryList) {
      // Find each inventory item by name - strictly matching the name
      const product: Locator = products.filter({
        has: this.page.getByTestId("inventory-item-name").getByText(item.name, { exact: true }),
      });

      // Verify the inventory item name, description and price are displayed correctly
      await expect(product.getByTestId("inventory-item-name")).toHaveText(item.name);
      await expect(product.getByTestId("inventory-item-desc")).toHaveText(item.description);
      await expect(product.getByTestId("inventory-item-price")).toHaveText(item.price);
    }
  }
}
