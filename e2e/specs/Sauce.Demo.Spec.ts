import { expect, test } from "@playwright/test";

import LoginPage from "../pages/Login.Page";

import loginData from "../data/Login.Data";
import HeaderComponent from "../pages/components/Header.Component";
import InventoryPage from "../pages/Inventory.Page";
import CartPage from "../pages/Cart.Page";
import CheckoutYourInformation from "../pages/Checkout.Your.Information.Page";
import checkoutData from "../data/Checkout.Data";
import CheckoutOverviewPage from "../pages/Checkout.Overview.Page";
import CheckoutCompletePage from "../pages/Checkout.Complete.Page";
import { setLocalStorage } from "../utils/utils";

test.describe.parallel("Sauce Demo Tests", () => {
  let login: LoginPage;
  let checkoutYourInformation: CheckoutYourInformation;
  let headerComponent: HeaderComponent;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutOverviewPage: CheckoutOverviewPage;
  let checkoutCompletePage: CheckoutCompletePage;

  test.beforeEach(async ({ page }) => {
    login = new LoginPage(page, loginData);
    checkoutYourInformation = new CheckoutYourInformation(page, checkoutData);
    headerComponent = new HeaderComponent(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    checkoutCompletePage = new CheckoutCompletePage(page);
    await login.visit();
    await login.fillAndSubmitLoginForm();
  });

  test("to verify that the cart is empty to start off with", async () => {
    expect(await headerComponent.isCartEmpty()).toBeTruthy();
  });

  test("to verify that sorting works by name on the inventory page", async () => {
    await inventoryPage.sortProductsZtoA();
    expect(await inventoryPage.isProductsSorted(true)).toBeTruthy();
  });

  test("to test that a user is able to add a product to cart and the same is present in cart", async () => {
    // storing the product details before adding them to cart, this will be used in verification
    const productIndex = 1;
    const productData = await inventoryPage.getProductInfoByIndex(productIndex);
    await inventoryPage.addRemoveProductToCartBasedOnIndex(productIndex);
    expect(await headerComponent.getCartProductCount()).toEqual(1);
    const cartItemIndex = 0;
    await headerComponent.openCartPage();
    expect(await cartPage.getProductTitleByIndex(cartItemIndex)).toEqual(
      productData["title"]
    );
    expect(await cartPage.getProductDescByIndex(cartItemIndex)).toEqual(
      productData["desc"]
    );
    expect(await cartPage.getProductPriceByIndex(cartItemIndex)).toEqual(
      productData["price"]
    );
  });

  test("to verify user is able to remove product from cart", async () => {
    const productIndex = 4;
    await inventoryPage.addRemoveProductToCartBasedOnIndex(productIndex);
    expect(await headerComponent.isCartEmpty()).toBeFalsy();
    await inventoryPage.addRemoveProductToCartBasedOnIndex(productIndex);
    expect(await headerComponent.isCartEmpty()).toBeTruthy();
  });

  test("to verify with a item present in cart, user is able to complete the checkout", async ({
    page,
  }) => {
    await setLocalStorage(page, "cart-contents", "[5]");
    await cartPage.visit();
    await cartPage.goToCheckoutPage();
    await checkoutYourInformation.fillAndSubmitCheckoutForm(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.zipCode
    );
    await checkoutOverviewPage.finishCheckout();
    expect(await checkoutCompletePage.checkoutCompleteHeader).toBeVisible();
    expect(
      await checkoutCompletePage.checkoutCompleteHeader.textContent()
    ).toEqual("THANK YOU FOR YOUR ORDER");
  });
});
