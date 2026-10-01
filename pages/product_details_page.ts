import { Page } from "@playwright/test";

export class ProductDetailsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
