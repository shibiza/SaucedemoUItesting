const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/loginPage');
const InventoryPage = require('../../pages/inventoryPage');

import {
    loginPageUrl,
    inventoryPageUrl,
    usernameInput,
    standardUser,
    password,
} from '../../config'

test('SCENARIO: 4. User should be logged out once Logout button is pressed', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await test.step('GIVEN: registered user is on the inventory page', async () => {
        await loginPage.openLoginPage();
        await expect (page.locator(usernameInput)).toBeEnabled();
        await loginPage.login(standardUser, password);
    });

    await test.step('WHEN: in burger menue user presses logout button', async () => {
       await inventoryPage.openBurgerMenue();
       await inventoryPage.logoutClick();
    });

    await test.step('THEN: user is redirected to the login page', async () => {
      await expect(page).toHaveURL(loginPageUrl);
      await expect(page).not.toHaveURL(inventoryPageUrl);
    });
});
