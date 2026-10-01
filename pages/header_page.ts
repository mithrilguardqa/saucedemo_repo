import { expect, Locator, Page } from "@playwright/test";

export class HeaderPage {
  protected page: Page;
  private shoppingCartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartBadge = page.getByTestId("shopping-cart-badge");
  }

  async assertShoppingCartBadge(cartCount: number): Promise<void> {
    await expect(this.shoppingCartBadge).toBeVisible();
    await expect(this.shoppingCartBadge).toHaveText(String(cartCount));
  }
}
