import config from "@env.config";
import { expect, Locator, Page } from "@playwright/test";
import { priceParsing, calculateTax, roundMoney } from "../helpers/pricing";

export class SecondCheckoutPage {
  private page: Page;
  private checkoutPageTwoTitle: Locator;
  private inventoryItemName: Locator;
  private subTotal: Locator;
  private tax: Locator;
  private total: Locator;
  private finishButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutPageTwoTitle = page.getByTestId("title");
    this.inventoryItemName = page.getByTestId("inventory-item-name");
    this.subTotal = page.getByTestId("subtotal-label");
    this.tax = page.getByTestId("tax-label");
    this.total = page.getByTestId("total-label");
    this.finishButton = page.getByTestId("finish");
  }

  async assertCheckoutPageTwoIsLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(`${config.baseUrl}checkout-step-two.html`);
    await expect(this.checkoutPageTwoTitle).toBeVisible();
    await expect(this.checkoutPageTwoTitle).toHaveText("Checkout: Overview");
  }

  async assertProductInCheckoutPageTwo(productName: string): Promise<void> {
    await expect(this.inventoryItemName).toHaveText(productName);
  }

  async assertPricing(itemPrice: string): Promise<void> {
    // Get expected subtotal from the product price string and parse with priceParsing function
    const expectedSubtotal = priceParsing(itemPrice);

    // Get actual subtotal from the page locators and parse with priceParsing function
    const subtotal = priceParsing(await this.subTotal.innerText());
    const tax = priceParsing(await this.tax.innerText());
    const total = priceParsing(await this.total.innerText());

    // Calculate expected tax and total
    const expectedTax = calculateTax(expectedSubtotal);
    const expectedTotal = roundMoney(expectedSubtotal + expectedTax);

    // Assert expected and actual values
    expect(subtotal).toBe(expectedSubtotal);
    expect(tax).toBe(expectedTax);
    expect(total).toBe(expectedTotal);
  }

  async clickFinishButton(): Promise<void> {
    await this.finishButton.click();
  }
}
