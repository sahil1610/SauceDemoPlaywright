import { Page } from "playwright";

interface LoginInterface {
  username: string;
  password: string;
}

export default class LoginPage {
  username: string;
  password: string;
  readonly page: Page;

  constructor(page: Page, obj: LoginInterface) {
    this.username = obj.username;
    this.password = obj.password;
    this.page = page;
  }

  //Inputs
  get usernameInput() {
    return this.page.locator("#user-name");
  }
  get passwordInput() {
    return this.page.locator("#password");
  }
  get loginButton() {
    return this.page.locator("#login-button");
  }

  visit = async (): Promise<void> => {
    await this.page.goto("/");
  };

  /**
   * Fill and Submit the login form
   *
   * @memberof LoginPage
   */
  fillAndSubmitLoginForm = async (): Promise<void> => {
    await this.usernameInput.fill(this.username);
    await this.passwordInput.fill(this.password);
    await this.loginButton.click();
    await this.page.waitForURL(/inventory/);
  };
}
