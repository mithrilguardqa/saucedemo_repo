import { Locator, Page } from "@playwright/test";

export class FirstCheckoutPage {
  private page: Page;
  private firstName: Locator;
  private lastName: Locator;
  private postalCode: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.getByTestId("first-name");
    this.lastName = page.getByTestId("last-name");
    this.postalCode = page.getByTestId("postal-code");
  }

  async fillForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }
}
