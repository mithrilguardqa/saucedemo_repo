import { expect, Locator, Page } from "@playwright/test";
import config from "@env.config";

export class FirstCheckoutPage {
  private page: Page;
  private checkoutPageOneTitle: Locator;
  private firstName: Locator;
  private lastName: Locator;
  private postalCode: Locator;
  private continueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutPageOneTitle = page.getByTestId("title");
    this.firstName = page.getByTestId("firstName");
    this.lastName = page.getByTestId("lastName");
    this.postalCode = page.getByTestId("postalCode");
    this.continueButton = page.getByTestId("continue");
  }

  async assertCheckoutPageOneIsLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(`${config.baseUrl}checkout-step-one.html`);
    await expect(this.checkoutPageOneTitle).toBeVisible();
    await expect(this.checkoutPageOneTitle).toHaveText("Checkout: Your Information");
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async fillFirstName(firstName: string): Promise<void> {
    await this.firstName.fill(firstName);
  }

  async fillLastName(lastName: string): Promise<void> {
    await this.lastName.fill(lastName);
  }

  async fillPostalCode(postalCode: string): Promise<void> {
    await this.postalCode.fill(postalCode);
  }

  async assertErrorMessageIsDisplayed(errorMessage: string): Promise<void> {
    const error = this.page.getByRole("alert").filter({ hasText: errorMessage });

    await expect(error).toBeVisible();
  }
}
