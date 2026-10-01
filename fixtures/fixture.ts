import { test as base } from "@playwright/test";
import {
  CartPage,
  CheckoutCompletePage,
  FirstCheckoutPage,
  SecondCheckoutPage,
  HeaderPage,
  LoginPage,
  InventoryPage,
  ProductDetailsPage,
  BurgerNavPage,
} from "@pages/index";

export const test = base.extend<{
  loginPage: LoginPage;
  burgerNavPage: BurgerNavPage;
  inventoryPage: InventoryPage;
  productDetailsPage: ProductDetailsPage;
  checkoutCompletePage: CheckoutCompletePage;
  firstCheckoutPage: FirstCheckoutPage;
  secondCheckoutPage: SecondCheckoutPage;
  headerPage: HeaderPage;
  cartPage: CartPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  burgerNavPage: async ({ page }, use) => {
    await use(new BurgerNavPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  productDetailsPage: async ({ page }, use) => {
    await use(new ProductDetailsPage(page));
  },

  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },

  firstCheckoutPage: async ({ page }, use) => {
    await use(new FirstCheckoutPage(page));
  },

  secondCheckoutPage: async ({ page }, use) => {
    await use(new SecondCheckoutPage(page));
  },

  headerPage: async ({ page }, use) => {
    await use(new HeaderPage(page));
  },
});

export { expect } from "@playwright/test";
