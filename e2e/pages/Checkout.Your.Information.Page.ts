import { Page } from "playwright";

interface CheckoutYourInfoInterface {
  firstName: string;
  lastName: string;
  zipCode: string;
}

//Checkout Your Information Page
export default class CheckoutYourInformation {
  readonly page: Page;
  firstName: string;
  lastName: string;
  zipCode: string;

  constructor(page: Page, obj: CheckoutYourInfoInterface) {
    this.page = page;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.zipCode = obj.zipCode;
  }

  get firstNameInput() {
    return this.page.locator("#first-name");
  }
  get lastNameInput() {
    return this.page.locator("#last-name");
  }
  get zipCodeInput() {
    return this.page.locator("#postal-code");
  }
  get continueButton() {
    return this.page.locator("#continue");
  }

  /**
   * Fill and Submit the Checkout Your Information form
   *
   * @param {string} firstName
   * @param {string} lastName
   * @param {string} zipCode
   * @memberof CheckoutYourInformation
   */
  fillAndSubmitCheckoutForm = async (
    firstName: string,
    lastName: string,
    zipCode: string
  ): Promise<void> => {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.zipCodeInput.fill(zipCode);
    await this.continueButton.click();
    await this.page.waitForURL(/checkout-step-two.html/);
  };
}
