import { expect, Locator, Page } from "@playwright/test";
import { inventoryList } from "../test_data/inventory_list";
import { isSorted, type SortBy, toProductSlug } from "../helpers/utils";
import { HeaderPage } from "./header_page";
import config from "@env.config";

export class InventoryPage extends HeaderPage {
  private inventoryList: Locator;
  private inventoryItem: Locator;

  constructor(page: Page) {
    super(page);
    this.inventoryList = page.getByTestId("inventory-list");
    this.inventoryItem = page.getByTestId("inventory-item-name");
  }

  async assertInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(`${config.baseUrl}inventory.html`);
    await expect(this.page.getByText("Products")).toBeVisible();
    await expect(this.page.getByTestId("product-sort-container")).toBeVisible();
  }

  async assertInventoryItems(): Promise<void> {
    //Chaining locators
    const products = this.inventoryList.getByTestId("inventory-item");

    for (const item of inventoryList) {
      // Find each inventory item by name - strictly matching the name
      const product: Locator = products.filter({
        has: this.page.getByTestId("inventory-item-name").getByText(item.name, { exact: true }),
      });

      // Verify the inventory item name, description and price are displayed correctly
      await expect(product.getByTestId("inventory-item-name")).toHaveText(item.name);
      await expect(product.getByTestId("inventory-item-desc")).toHaveText(item.description);
      await expect(product.getByTestId("inventory-item-price")).toHaveText(item.price);
    }
  }

  async clickProduct(productName: string): Promise<void> {
    await this.inventoryItem
      .filter({ has: this.page.getByText(productName, { exact: true }) })
      .click();
  }

  async sortBy(order: SortBy): Promise<void> {
    await this.page.getByTestId("product-sort-container").click();
    await this.page.getByTestId("product-sort-container").selectOption(order);
  }

  async assertSortedBy(order: SortBy): Promise<void> {
    // If order is "Name A-Z" or "Name Z-A", get the list of names in array
    const namesList = await this.inventoryList.getByTestId("inventory-item-name").allTextContents();

    // If order is "Price Low to High" or "Price High to Low", get the list of prices in array
    const pricesList = await this.inventoryList
      .getByTestId("inventory-item-price")
      .allTextContents();

    // Convert the list of prices to numbers
    const pricesNumbers = pricesList.map((price) => Number(price.replace("$", "")));

    const values = order.startsWith("Name") ? namesList : pricesNumbers;

    isSorted(values, order);
  }

  async addProductToCart(productName: string): Promise<void> {
    // Add cart button locators are in the format - data-test="add-to-cart-sauce-labs-backpack"
    const slug = toProductSlug(productName);

    // Click the add to cart button on the desired product
    await this.inventoryList.getByTestId(`add-to-cart-${slug}`).click();
  }

  async assertProductAddedToCart(productName: string): Promise<void> {
    // Assert the remove button is visible
    const slug = toProductSlug(productName);
    await expect(this.inventoryList.getByTestId(`remove-${slug}`)).toBeVisible();
  }
}
