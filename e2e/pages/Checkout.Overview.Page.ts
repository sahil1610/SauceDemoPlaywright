import { Page } from "playwright";

//Checkout OverView Page
export default class CheckoutOverview {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get finishButton() {
    return this.page.locator("#finish");
  }

  /**
   * Finish the checkout Process
   *
   * @memberof CheckoutOverview
   */
  finishCheckout = async (): Promise<void> => {
    await this.finishButton.click();
    await this.page.waitForURL(/checkout-complete.html/);
  };
}
