import config from "@env.config";
import { expect, Locator, Page } from "@playwright/test";

export class CartPage {
  private page: Page;
  private cartItemName: Locator;
  private cartPageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItemName = page.getByTestId("inventory-item-name");
    this.cartPageTitle = page.getByTestId("title");
  }

  async assertCartPageIsLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(`${config.baseUrl}cart.html`);
    await expect(this.cartPageTitle).toBeVisible();
  }

  async assertProductInCart(productName: string): Promise<void> {
    await expect(this.cartItemName).toBeVisible();
    await expect(this.cartItemName).toHaveText(productName);
    
  }
}
