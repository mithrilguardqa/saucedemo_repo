import { Page } from "@playwright/test";

export class FirstCheckoutPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
}
