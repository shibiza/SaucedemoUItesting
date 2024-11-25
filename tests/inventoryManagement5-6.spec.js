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

test('SCENARIO: 6.User should see the correct product details such as image, product name, description and price', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);

    await test.step('GIVEN: user is on the inventory page', async () => {
     // User is successfully logged in and navigated to the inventory page.
// All product tiles/cards are visible.
    });

    await test.step('WHEN: user views the details of the products listed in the inventory', async () => {
  // The product tiles/cards display images, names, descriptions, and prices.

    });

    await test.step('THEN: user is redirected to the inventory page', async () => {
     // The product details should be correct and fully displayed


    });
});