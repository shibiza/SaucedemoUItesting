class LoginPage {
  
  constructor(page) {
      this.page = page;
      this.usernameInput = page.locator('[data-test="username"]');
      this.passwordInput = page.locator('[data-test="password"]');
      this.loginButton = page.locator('[data-test="login-button"]');
      this.errorMessage = page.locator('[data-test="error"]');
      this.loginPageUrl = 'https://www.saucedemo.com/';
  }

  async openLoginPage() {
      await this.page.goto(this.loginPageUrl);
  }

  async login(username, password) {
      await this.usernameInput.fill(username);
      await this.passwordInput.fill(password);
      await this.loginButton.click();
  }

  async isErrorMessageVisible() {
      return await this.errorMessage.isVisible();
  }
}

module.exports = LoginPage;