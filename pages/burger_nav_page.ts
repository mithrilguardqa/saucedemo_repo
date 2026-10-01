import { Locator, Page } from "@playwright/test";

export class BurgerNavPage {
  private page: Page;
  private burgerMenuButton: Locator;
  private logoutSidebarLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.burgerMenuButton = page.locator(`#react-burger-menu-btn`);
    this.logoutSidebarLink = page.getByTestId("logout-sidebar-link");
  }

  async logout() {
    await this.burgerMenuButton.click();
    await this.logoutSidebarLink.click();
  }
}
