import { expect, Locator, Page } from "@playwright/test";

export class ProductDetailsPage {
  private page: Page;
  private backToProductsButton: Locator;
  private inventoryItemName: Locator;
  private inventoryItemDescription: Locator;
  private inventoryItemPrice: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backToProductsButton = page.getByTestId("back-to-products");
    this.inventoryItemName = page.getByTestId("inventory-item-name");
    this.inventoryItemDescription = page.getByTestId("inventory-item-desc");
    this.inventoryItemPrice = page.getByTestId("inventory-item-price");
  }

  async clickBackToProductsButton(): Promise<void> {
    await this.backToProductsButton.click();
  }

  async assertProductDetailsPage(
    productName: string,
    productDescription: string,
    productPrice: string,
  ): Promise<void> {
    await expect(this.backToProductsButton).toBeVisible();
    await expect(this.inventoryItemName).toHaveText(productName);
    await expect(this.inventoryItemDescription).toHaveText(productDescription);
    await expect(this.inventoryItemPrice).toHaveText(productPrice);
  }
}
