import { test } from "@fixtures/fixture";
import { getRandomProduct } from "../../helpers/utils";
import { inventoryList } from "../../test_data/inventory_list";
import config from "@env.config";
import { generateRandomString } from "../../helpers/utils";

test.describe("Checkout", () => {
  const randomProduct = getRandomProduct(inventoryList);
  const errorMessages = [
    "Error: First Name is required",
    "Error: Last Name is required",
    "Error: Postal Code is required",
  ];

  test.beforeEach(async ({ page }) => {
    await page.goto(`${config.baseUrl}inventory.html`);
  });

  test(
    "Verify checkout prevents continuation when required customer information is missing ",
    {
      annotation: [
        { type: "allure.label.story", description: "Required customer information" },
        { type: "allure.label.severity", description: "normal" },
        {
          type: "description",
          description:
            "Checkout requires a first name, last name and postal code before the customer can continue.",
        },
      ],
    },
    async ({
      inventoryPage,
      cartPage,
      headerPage,
      firstCheckoutPage,
    }) => {
      await test.step("Add products to cart", async () => {
        await inventoryPage.addProductToCart(randomProduct.name);
      });

      await test.step("Navigate to cart page", async () => {
        await headerPage.clickOnShoppingCart();
      });

      await test.step("Verify cart page is loaded", async () => {
        await cartPage.assertCartPageIsLoaded();
      });

      await test.step("Verify correct product is displayed in cart", async () => {
        await cartPage.assertProductInCart(randomProduct.name);
      });

      await test.step("Click checkout button", async () => {
        await cartPage.clickCheckout();
      });

      await test.step("Verify checkout page one is loaded", async () => {
        await firstCheckoutPage.assertCheckoutPageOneIsLoaded();
      });

      await test.step("Click continue button", async () => {
        await firstCheckoutPage.clickContinue();
      });

      await test.step("Verify error messages are displayed", async () => {
        await firstCheckoutPage.assertErrorMessageIsDisplayed(errorMessages[0]);

        await firstCheckoutPage.fillFirstName(`John${generateRandomString(4)}`);
        await firstCheckoutPage.clickContinue();
        await firstCheckoutPage.assertErrorMessageIsDisplayed(errorMessages[1]);

        await firstCheckoutPage.fillLastName(`Doe${generateRandomString(4)}`);
        await firstCheckoutPage.clickContinue();
        await firstCheckoutPage.assertErrorMessageIsDisplayed(errorMessages[2]);
      });
    },
  );

  test(
    "Checkout overview displays the correct items and calculates item total, tax and final total correctly",
    {
      annotation: [
        { type: "allure.label.story", description: "Review order totals" },
        { type: "allure.label.severity", description: "critical" },
        {
          type: "description",
          description:
            "The checkout overview shows the selected product and correct item subtotal, tax and final total.",
        },
      ],
    },
    async ({
      page,
      inventoryPage,
      cartPage,
      headerPage,
      firstCheckoutPage,
      secondCheckoutPage,
    }) => {
      await test.step("Add products to cart", async () => {
        await inventoryPage.addProductToCart(randomProduct.name);
      });

      await test.step("Navigate to cart page", async () => {
        await headerPage.clickOnShoppingCart();
      });

      await test.step("Verify cart page is loaded", async () => {
        await cartPage.assertCartPageIsLoaded();
      });

      await test.step("Verify correct product is displayed in cart", async () => {
        await cartPage.assertProductInCart(randomProduct.name);
      });

      await test.step("Click checkout button", async () => {
        await cartPage.clickCheckout();
      });

      await test.step("Verify checkout page one is loaded", async () => {
        await firstCheckoutPage.assertCheckoutPageOneIsLoaded();
      });

      await test.step("Fill form", async () => {
        await firstCheckoutPage.fillFirstName(`John${generateRandomString(4)}`);
        await firstCheckoutPage.fillLastName(`Doe${generateRandomString(4)}`);
        await firstCheckoutPage.fillPostalCode(`${generateRandomString(4)}`);
      });

      await test.step("Click continue button", async () => {
        await firstCheckoutPage.clickContinue();
      });

      await test.step("Verify checkout page two is loaded", async () => {
        await secondCheckoutPage.assertCheckoutPageTwoIsLoaded();
      });

      await test.step("Verify correct product is displayed in checkout page two", async () => {
        await secondCheckoutPage.assertProductInCheckoutPageTwo(randomProduct.name);
      });

      await test.step("Verify pricing is correct", async () => {
        await secondCheckoutPage.assertPricing(randomProduct.price);
      });

      await test.step("Attach the checkout overview", async () => {
        await test.info().attach("Checkout overview", {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png",
        });
      });
    },
  );

  test(
    "Verify checkout complete page display order confirmation and back home button works",
    {
      annotation: [
        { type: "allure.label.story", description: "Complete an order" },
        { type: "allure.label.severity", description: "critical" },
        {
          type: "description",
          description:
            "A customer can complete checkout, see the order confirmation and return to the inventory page.",
        },
      ],
    },
    async ({
      page,
      inventoryPage,
      cartPage,
      headerPage,
      firstCheckoutPage,
      secondCheckoutPage,
      checkoutCompletePage,
    }) => {
      await test.step("Add products to cart", async () => {
        await inventoryPage.addProductToCart(randomProduct.name);
      });

      await test.step("Navigate to cart page", async () => {
        await headerPage.clickOnShoppingCart();
      });

      await test.step("Verify cart page is loaded", async () => {
        await cartPage.assertCartPageIsLoaded();
      });

      await test.step("Verify correct product is displayed in cart", async () => {
        await cartPage.assertProductInCart(randomProduct.name);
      });

      await test.step("Click checkout button", async () => {
        await cartPage.clickCheckout();
      });

      await test.step("Verify checkout page one is loaded", async () => {
        await firstCheckoutPage.assertCheckoutPageOneIsLoaded();
      });

      await test.step("Fill form", async () => {
        await firstCheckoutPage.fillFirstName(`John${generateRandomString(4)}`);
        await firstCheckoutPage.fillLastName(`Doe${generateRandomString(4)}`);
        await firstCheckoutPage.fillPostalCode(`${generateRandomString(4)}`);
      });

      await test.step("Click continue button", async () => {
        await firstCheckoutPage.clickContinue();
      });

      await test.step("Verify checkout page two is loaded", async () => {
        await secondCheckoutPage.assertCheckoutPageTwoIsLoaded();
      });

      await test.step("Verify correct product is displayed in checkout page two", async () => {
        await secondCheckoutPage.assertProductInCheckoutPageTwo(randomProduct.name);
      });

      await test.step("Verify pricing is correct", async () => {
        await secondCheckoutPage.assertPricing(randomProduct.price);
      });

      await test.step("Click finish button", async () => {
        await secondCheckoutPage.clickFinishButton();
      });

      await test.step("Verify checkout complete page is loaded", async () => {
        await checkoutCompletePage.assertCheckoutCompletePageIsLoaded();
      });

      await test.step("Attach the order confirmation", async () => {
        await test.info().attach("Order confirmation", {
          body: await page.screenshot({ fullPage: true }),
          contentType: "image/png",
        });
      });

      await test.step("Click back home button", async () => {
        await checkoutCompletePage.clickBackHomeButton();
      });

      await test.step("Verify inventory page is loaded", async () => {
        await inventoryPage.assertInventoryPage();
      });
    },
  );
});
