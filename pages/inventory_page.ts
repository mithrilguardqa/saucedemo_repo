import { Locator, Page } from "@playwright/test";

export class InventoryPage {
  private page: Page;
  private inventoryList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryList = page.getByTestId("inventory-list");
  }
}
