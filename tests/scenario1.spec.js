const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');

const standarduser = "standard_user";
const password = "secret_sauce";

test('SCENARIO: 1. User should be able to log in with standard user given the correct credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await test.step('GIVEN: user is on the base page', async () => {
        await loginPage.openLoginPage();
    });

    await test.step('WHEN: user fill login form and press enter', async () => {
        await loginPage.login(standarduser, password);
    });

    await test.step('THEN: user is on products page', async () => {
        await inventoryPage.openInventoryPage();
    });
});
