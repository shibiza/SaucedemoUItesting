const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/loginPage');
const InventoryPage = require('../../pages/inventoryPage');

import {
    loginPageUrl,
    errorMessageLocator,
    errorLoginMessage,
} from '../../config'

test('SCENARIO: 2. User should not be able to access the e-shop inventory without logging in', async ({page}) =>{
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await test.step('GIVEN: user tries to open inventory page directly - without loggin in on a login page', async () => {
        await inventoryPage.openInventoryPage();
    });

    await test.step('WHEN: user is redirected to login page', async () => {
        await loginPage.isErrorMessageVisible();

    });

    await test.step('THEN: user is on login page and sees Error message', async () => {
        await expect(page).toHaveURL(loginPageUrl);
        await expect(page.locator(errorMessageLocator)).toHaveText(errorLoginMessage);
    });
});