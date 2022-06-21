import { Page } from "playwright";
import constants from "../../constants/Common";

export default class HeaderComponent {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get shoppingCartContainer() {
    return this.page.locator("#shopping_cart_container");
  }
  get shoppingCartBadge() {
    return this.page.locator(".shopping_cart_badge");
  }

  /**
   * Open the cart page
   */
  openCartPage = async (): Promise<void> => {
    await this.shoppingCartContainer.click({ timeout: constants.SHORT_WAIT });
  };

  /**
   * Get the number of total products in cart
   *
   * @return {Promise<number>}
   */
  getCartProductCount = async (): Promise<number> => {
    const shoppingCartBadgeValue = await this.shoppingCartBadge.textContent() || "0";
    return parseInt(shoppingCartBadgeValue);
  };

  /**
   * Checks if cart is empty or not
   *
   * @return {Promise<boolean>}
   */
  isCartEmpty = async (): Promise<boolean> => {
    return !(await this.shoppingCartBadge.isVisible());
  };
}
