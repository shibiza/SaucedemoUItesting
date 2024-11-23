const { test, expect } = require('@playwright/test');
const LoginPage = require('../../pages/loginPage');

import {
    loginPageUrl,
    lockedOutUser,
    password,
    errorMessageLocator,
    errorLockedOutUserMessage,
} from '../../config'

test('SCENARIO: 3. User whose access is denied (locked_out_user) should not be able to log in', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('GIVEN: user is on the login page', async () => {
        await loginPage.openLoginPage();
    });

    await test.step('WHEN: user fill login form and press enter', async () => {
        await loginPage.login(lockedOutUser, password);
    });

    await test.step('THEN: user is still on login page', async () => {
        await expect(page).toHaveURL(loginPageUrl);
        await expect(page.locator(errorMessageLocator)).toHaveText(errorLockedOutUserMessage);
    });
});