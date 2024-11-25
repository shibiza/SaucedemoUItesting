const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');

import {
    loginPageUrl,
    inventoryPageUrl,
    lockedOutUser,
    usernameInput,
    standardUser,
    password,
    errorMessageLocator,
    errorLoginMessage,
    errorLockedOutUserMessage,
} from '../config';

test('SCENARIO: 1. User should be able to log in with standard user given the correct credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
  
    await test.step('GIVEN: user is on the login page', async () => {
        await loginPage.openLoginPage();
        await expect (page.locator(usernameInput)).toBeEnabled();
    });

    await test.step('WHEN: user fill login form and press enter', async () => {
        //polymorphism: 
     //   await expect loginPage.elementToHasText(loginButton);
     //   await expect(page.loginButton).elementToBeClickable(loginPage.loginButton);
        await loginPage.login(standardUser, password);
    });

    await test.step('THEN: user is redirected to the inventory page', async () => {
        await expect(page).toHaveURL(inventoryPageUrl);
        await expect(page).not.toHaveURL(loginPageUrl);
    });
});

test('SCENARIO: 2. User should not be able to access the e-shop inventory without logging in', async ({page}) =>{
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await test.step('GIVEN: unlogged user tries to open inventory page directly - without loggin in on a login page', async () => {
        await inventoryPage.openInventoryPage();
       
    });

    await test.step('WHEN: user is redirected to login page', async () => {
        await loginPage.isErrorMessageVisible();

    });

    await test.step('THEN: user is on login page and sees Error message', async () => {
        await expect(page).toHaveURL(loginPageUrl);
        await expect(page).not.toHaveURL(inventoryPageUrl);
        await expect(page.locator(errorMessageLocator)).toHaveText(errorLoginMessage);
    });
});

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

test('SCENARIO: 4. User should be logged out once Logout button is pressed', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await test.step('GIVEN: registered user is on the inventory page', async () => {
        await loginPage.openLoginPage();
        await expect (page.locator(usernameInput)).toBeEnabled();
        await loginPage.login(standardUser, password);
    });

    await test.step('WHEN: in burger menue user presses logout button', async () => {
       //polymorphism
    //    await inventoryPage.assertBurgerMenuHasThreeLines();
        await inventoryPage.openBurgerMenue();
        await inventoryPage.logoutClick();
    });

    await test.step('THEN: user is redirected to the login page', async () => {
      await expect(page).toHaveURL(loginPageUrl);
      await expect(page).not.toHaveURL(inventoryPageUrl);
    });
});

