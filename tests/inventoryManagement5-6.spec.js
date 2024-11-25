const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');

import {
    loginPageUrl,
    inventoryPageUrl,
    usernameInput,
    standardUser,
    password,
    loginButton,
} from '../config';

test('SCENARIO: 5.User should be able to filter the inventory according to the option chosen', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await test.step('GIVEN: user is on the inventory page', async () => {
        await loginPage.openLoginPage();
        await expect (page.locator(usernameInput)).toBeEnabled();
        await loginPage.login(standardUser, password);
    });

    await test.step('WHEN: user fill login form and press enter', async () => {
   
    });

    await test.step('THEN: user is redirected to the inventory page', async () => {
        await expect(page).toHaveURL(inventoryPageUrl);
        await expect(page).not.toHaveURL(loginPageUrl);
    });
});
//GIVEN: The user is on the inventory page.

// User is successfully logged in and navigated to the inventory page.
// The filter dropdown menu is visible and enabled.
// WHEN: The user selects a filter option from the dropdown menu.

// User clicks on the filter dropdown.
// User selects one of the available filter options (e.g., "Price: Low to High", "Price: High to Low", "Name: A to Z").
// The application processes the filtering request.
// THEN: The inventory is filtered according to the chosen option.

// The displayed items in the inventory reflect the selected filter order.
// If sorted by price, items should be arranged from lowest to highest (or vice versa).
// If sorted alphabetically, items should appear in the correct name order.
// Assert that the items' order matches the filter criteria using automation checks.

test('SCENARIO: 6.User should see the correct product details such as image, product name, description and price', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

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
// GIVEN: The user is on the inventory page.

// User is successfully logged in and navigated to the inventory page.
// All product tiles/cards are visible.
// WHEN: The user views the details of the products listed in the inventory.

// The product tiles/cards display images, names, descriptions, and prices.
// THEN: The product details should be correct and fully displayed.

// Verify that each product has an image:
// Assert the <img> element for each product is visible.
// Validate that the src attribute is not empty.
// Verify that each product has a name:
// Assert the product name text is visible and not empty.
// Verify that each product has a description:
// Assert the product description text is visible and not empty.
// Verify that each product has a price:
// Assert the product price is visible.
// Assert the price format matches a valid currency format (e.g., "$XX.XX").

