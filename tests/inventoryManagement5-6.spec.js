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
    productSearchContainer,
    itemNames,
    itemPrices,
} from '../config';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await expect (page.locator(usernameInput)).toBeEnabled();
    await loginPage.login(standardUser, password);
 });

test('SCENARIO: 5.User should be able to filter the inventory according to the option chosen', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    let productsNames;
    let filteredProductsNamesAZ;
    let filteredProductsNamesZA;
    let productsPrices;
    let filteredProductPricesLoHi;
    let filteredProductPricesHiLo;
    let productsPricesWithoutDollar;
    let filteredProductPricesLoHiWithoutDollar;
    let filteredProductPricesHiLoWithoutDollar;

    await test.step('GIVEN: Registered user is on the inventory page', async () => {
       productsNames = await inventoryPage.itemNames.allInnerTexts(); //Promise<Array<string>>
    });

    await test.step('WHEN: user selects a filter option from the dropdown menu and filter them by their names from A to Z', async () => {
        await inventoryPage.filteringDropdownCklick();        // now filtering them by theis names:
        await inventoryPage.productSearchContainer.selectOption('az'); //<option value="az">Name (A to Z)</option>
        // extracting product names after sorting:
        filteredProductsNamesAZ = await inventoryPage.itemNames.allInnerTexts(); //Promise<Array<string>>
    });

    await test.step('THEN: The inventory is filtered according to the chosen option = A to Z', async () => {
        productsNames.sort();
        expect(filteredProductsNamesAZ).toEqual(productsNames);
        console.log(' products were filtered in alphabetic order')
    });

    await test.step('WHEN: user selects a filter option from the dropdown menu and filter them by their names from Z to A', async () => {
        // now filtering them by theis names in descending alphabetical order:
        await inventoryPage.filteringDropdownCklick();
        await inventoryPage.productSearchContainer.selectOption('za'); //<option value="za">Name (Z to A)</option>
        // extracting product names after sorting:
        filteredProductsNamesZA = await inventoryPage.itemNames.allInnerTexts(); 
    });

    await test.step('THEN: The inventory is filtered according to the chosen option = A to Z', async () => {
        productsNames.reverse();
        expect(filteredProductsNamesZA).toEqual(productsNames);
        console.log(' products were filtered in descending alphabetical order')
    });


    await test.step('WHEN: user selects a filter option from the dropdown menu and filter them by their prices from low to high', async () => {
        productsPrices = await inventoryPage.itemPrices.allInnerTexts(); 
        productsPricesWithoutDollar = productsPrices.map(price => parseFloat(price.replace(/\$/, '')));

        await inventoryPage.filteringDropdownCklick();
        await inventoryPage.productSearchContainer.selectOption('lohi'); 
        filteredProductPricesLoHi = await inventoryPage.itemPrices.allInnerTexts(); 
        filteredProductPricesLoHiWithoutDollar = filteredProductPricesLoHi.map(price => parseFloat(price.replace(/\$/, '')));  
    });

    await test.step('THEN: The inventory is filtered according to the chosen option = prices from low to high', async () => {
        productsPricesWithoutDollar.sort((a, b) => a - b); // sorting by prices grows

        console.log('productsPricesWithoutDollar:', productsPricesWithoutDollar);
        console.log('filteredProductPricesLoHiWithoutDollar:', filteredProductPricesLoHiWithoutDollar);

        expect(filteredProductPricesLoHiWithoutDollar).toEqual(productsPricesWithoutDollar);
        console.log(' products were filtered with their prices from low to high');
    });

    await test.step('WHEN: user selects a filter option from the dropdown menu and filter them by their prices from high to low', async () => {
        await inventoryPage.filteringDropdownCklick();
        await inventoryPage.productSearchContainer.selectOption('hilo'); 
        filteredProductPricesHiLo = await inventoryPage.itemPrices.allInnerTexts(); 
        filteredProductPricesHiLoWithoutDollar = filteredProductPricesHiLo.map(price => parseFloat(price.replace(/\$/, '')));  

        await test.step('THEN: The inventory is filtered according to the chosen option = prices from high to low', async () => {
            productsPricesWithoutDollar.reverse(); // sorting by prices got down
            expect(filteredProductPricesHiLoWithoutDollar).toEqual(productsPricesWithoutDollar);
            console.log(' products were filtered with their prices from high to low');
        });
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

