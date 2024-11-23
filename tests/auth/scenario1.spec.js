const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/loginPage');

import {
    loginPageUrl,
    inventoryPageUrl,
    usernameInput,
    standardUser,
    password,
    burgerMenue,
} from '../../config';

test('SCENARIO: 1. User should be able to log in with standard user given the correct credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('GIVEN: user is on the login page', async () => {
        await loginPage.openLoginPage();
        await expect (page.locator(usernameInput)).toBeEnabled();
    });

    await test.step('WHEN: user fill login form and press enter', async () => {
        await loginPage.login(standardUser, password);
    });

    await test.step('THEN: user is redirected to the inventory page', async () => {
        await expect(page).toHaveURL(inventoryPageUrl);
        await expect(page).not.toHaveURL(loginPageUrl);
    });
});
