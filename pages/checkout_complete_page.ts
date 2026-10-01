import config from "@env.config";
import { expect, Locator, Page } from "@playwright/test";

export class CheckoutCompletePage {
  private page: Page;
  private completeHeader: Locator;
  private completeText: Locator;
  private backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.getByTestId("complete-header");
    this.completeText = page.getByTestId("complete-text");
    this.backHomeButton = page.getByTestId("back-to-products");
  }

  async assertCheckoutCompletePageIsLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(`${config.baseUrl}checkout-complete.html`);
    await expect(this.completeHeader).toBeVisible();
    await expect(this.completeHeader).toHaveText("Thank you for your order!");
    await expect(this.completeText).toBeVisible();
    await expect(this.completeText).toHaveText(
      "Your order has been dispatched, and will arrive just as fast as the pony can get there!",
    );
  }

  async clickBackHomeButton(): Promise<void> {
    await this.backHomeButton.click();
  }
}
