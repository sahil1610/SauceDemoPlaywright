import { Page } from "playwright";

//Cart Page
export default class Cart {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  get checkoutButton() {
    return this.page.locator("#checkout");
  }

  get cartItems() {
    return this.page.locator(".cart_item");
  }

  visit = async (): Promise<void> => {
    this.page.goto("cart.html");
    this.page.waitForLoadState();
  };

  /**
   * Get Product title in cart for the given index
   *
   * @param {number} cartItemIndex
   * @memberof Cart
   */
  getProductTitleByIndex = async (
    cartItemIndex: number
  ): Promise<string | null> => {
    return await this.cartItems
      .nth(cartItemIndex)
      .locator(".inventory_item_name")
      .textContent();
  };

  /**
   * Get Product Desc in cart for the given index
   *
   * @param {number} cartItemIndex
   * @memberof Cart
   */
  getProductDescByIndex = async (
    cartItemIndex: number
  ): Promise<string | null> => {
    return await this.cartItems
      .nth(cartItemIndex)
      .locator(".inventory_item_desc")
      .textContent();
  };

  /**
   * Get Product Price in cart for the given index
   *
   * @param {number} cartItemIndex
   * @memberof Cart
   */
  getProductPriceByIndex = async (
    cartItemIndex: number
  ): Promise<string | null> => {
    return await this.cartItems
      .nth(cartItemIndex)
      .locator(".inventory_item_price")
      .textContent();
  };

  /**
   * Go to Checkout Page
   *
   * @memberof Cart
   */
  goToCheckoutPage = async (): Promise<void> => {
    this.checkoutButton.click();
    this.page.waitForNavigation();
  };
}
