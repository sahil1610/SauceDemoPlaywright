import { Page } from "playwright";

//Checkout Complete Page
export default class CheckoutComplete {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  get checkoutCompleteHeader() {
    return this.page.locator(".checkout_complete_container h2");
  }
}
