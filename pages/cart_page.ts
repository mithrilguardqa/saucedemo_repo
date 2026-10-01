import config from "@env.config";
import { expect, Locator, Page } from "@playwright/test";
import { toProductSlug } from "../helpers/utils";

export class CartPage {
  private page: Page;
  private cartItemName: Locator;
  private cartPageTitle: Locator;
  private checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItemName = page.getByTestId("inventory-item-name");
    this.cartPageTitle = page.getByTestId("title");
    this.checkoutButton = page.getByTestId("checkout");
  }

  async assertCartPageIsLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(`${config.baseUrl}cart.html`);
    await expect(this.cartPageTitle).toBeVisible();
  }

  async assertProductInCart(productName: string): Promise<void> {
    const cartItemName = this.cartItemName.getByText(productName, { exact: true });

    await expect(cartItemName).toBeVisible();
    await expect(cartItemName).toHaveText(productName);
  }

  async assertProductNotInCart(productName: string): Promise<void> {
    await expect(this.cartItemName.getByText(productName, { exact: true })).toHaveCount(0);
  }

  async assertCartQuantity(quantity: number): Promise<void> {
    await expect(this.cartItemName).toHaveCount(quantity);
  }

  async removeProductFromCart(productName: string): Promise<void> {
    const slug = toProductSlug(productName);
    await this.page.getByTestId(`remove-${slug}`).click();
  }

  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
