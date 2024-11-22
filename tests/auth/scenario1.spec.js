const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/loginPage');

import {
    inventoryPageUrl,
    standardUser,
    password,
} from '../../config'

test('SCENARIO: 1. User should be able to log in with standard user given the correct credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('GIVEN: user is on the base page', async () => {
        await loginPage.openLoginPage();
    });

    await test.step('WHEN: user fill login form and press enter', async () => {
        await loginPage.login(standardUser, password);
    });

    await test.step('THEN: user is redirected to the inventory page', async () => {
        await expect(page).toHaveURL(inventoryPageUrl);
    });
});