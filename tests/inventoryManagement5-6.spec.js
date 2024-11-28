const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');

import {
    loginPageUrl,
    inventoryPageUrl,
    usernameInput,
    standardUser,
    password,
    backpackInfo,
    imgOfProductBackpack,
    } from '../config';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    //  await page.goto('https://www.saucedemo.com/'); //delete this and uncomment next:
    await loginPage.openLoginPage();

    await expect(page).toHaveURL(loginPageUrl);      
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
        await expect(page).toHaveURL(inventoryPageUrl);      
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

    await test.step('THEN: The inventory is filtered according to the chosen option = Z to A', async () => {
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
    });``

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
        await expect(page).toHaveURL(inventoryPageUrl);
    });

    await test.step('WHEN: user views all the products listed in the inventory', async () => {
        await inventoryPage.filteringDropdownCklick();        // we need to filter products so the backpack will be the first item
        await inventoryPage.productSearchContainer.selectOption('az'); 
    });

    await test.step('THEN: user sees that the product details (backpack) should be correct and fully displayed', async () => {
       
        const actualName = await inventoryPage.getFirstProductName();
        const actualDescription = await inventoryPage.getFirstProductDescription();
        const actualPrice = await inventoryPage.getFirstProductPrice();
        const actualImageSrc = await inventoryPage.getFirstProductImage();
    
         console.log({
            name: actualName,
            description: actualDescription,
            price: actualPrice,
            image: actualImageSrc,
        });

        expect(actualName).toBe(backpackInfo.nameOfBackpack);
        expect(actualDescription).toBe(backpackInfo.descriptionOfProductBackpack);
        expect(actualPrice).toBe(backpackInfo.priceOfProductBackpack);
        expect(actualImageSrc).toBe(imgOfProductBackpack);

    });
});