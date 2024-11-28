import BasePage from './basePage';

import {
    loginPageUrl,
    usernameInput,
    passwordInput,
    loginButton,
    errorMessageLocator,
    } from '../config';

class LoginPage extends BasePage {
  #page;
  #usernameInput;
  #passwordInput;
  #loginButton;
  #errorMessage;
  
  constructor(page) {
    super(page);
    this.#page = page;
    this.loginPageUrl = loginPageUrl;
    this.#usernameInput = page.locator(usernameInput);
    this.#passwordInput = page.locator(passwordInput);
    this.#loginButton = page.locator(loginButton);
    this.#errorMessage = page.locator(errorMessageLocator);
  }

  async openLoginPage() {
    await this.openUrl(loginPageUrl);
}

  async login(username, password) {
    await this.#usernameInput.fill(username);
    await this.#passwordInput.fill(password);
    await this.clickElement(this.#loginButton);
  }

  async isErrorMessageVisible() {
    return await this.#errorMessage.isVisible();
  }
}

module.exports = LoginPage;