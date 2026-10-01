import envConfig from "@env.config";
import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  private page: Page;
  private usernameField: Locator;
  private passwordField: Locator;
  private loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.getByTestId("username");
    this.passwordField = page.getByTestId("password");
    this.loginButton = page.getByTestId("login-button");
  }

  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async assertLogin() {
    await expect(this.page).toHaveURL(envConfig.baseUrl + "inventory.html");
    await expect(this.page.getByText("Products")).toBeVisible();
    await expect(this.page.getByTestId("product-sort-container")).toBeVisible();
  }

  async assertLogout() {
    await expect(this.page).toHaveURL(envConfig.baseUrl);
    await expect(this.loginButton).toBeVisible();
  }

  async assertLoginNotPossible() {
    await expect(
      this.page.getByText("Epic sadface: Sorry, this user has been locked out."),
    ).toBeVisible();
  }
}
