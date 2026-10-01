import { Page } from "@playwright/test";

export class InventoryPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
