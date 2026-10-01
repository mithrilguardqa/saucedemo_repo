import { Page } from "@playwright/test";

export class CheckoutCompletePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
