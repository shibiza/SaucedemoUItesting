const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');
const CheckoutPage = require('../pages/checkoutPage');

import {
    loginPageUrl,
    inventoryPageUrl,
    checkoutPageStepOneUrl,
    checkoutPageStepTwoUrl,
    checkoutPageCompleteUrl,
    usernameInput,
    standardUser,
    password,
       
} from '../config';

// Variables for checkout overview
const namepaymentInfo = '';
const shippingInfo = '';
const priceTotal = '$29.99';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

  //  await page.goto('https://www.saucedemo.com/'); //delete this and uncomment next:
    await loginPage.openLoginPage();

    await expect(page).toHaveURL(loginPageUrl);      
    await expect (page.locator(usernameInput)).toBeEnabled();
    await loginPage.login(standardUser, password);
    await expect(page).toHaveURL(inventoryPageUrl);
    // await inventoryPage.filteringDropdownCklick();        // we need to filter products so the backpack will be the first item
    // await inventoryPage.productSearchContainer.selectOption('az'); 
    await inventoryPage.addToCartBackpackCklick();   
 });

test('SCENARIO: 13. User should see the checkout overview with details such as payment, shipping info, price total', async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    let productsNames;
    let filteredProductsNamesAZ;

    await test.step('GIVEN: user added to cart backpack and on the cart page clicks chekout', async () => {
        await checkoutPage.openCheckoutPageStepOneUrl();
        await expect(page).toHaveURL(checkoutPageStepOneUrl);

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
});

test('SCENARIO: 14. User should get notified when they fail to enter any of the checkout information', async ({ page }) => {
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

        expect(actualName).toBe(nameOfBackpack);
        expect(actualDescription).toBe(descriptionOfProductBackpack);
        expect(actualPrice).toBe(priceOfProductBackpack);
        expect(actualImageSrc).toBe(imgOfProductBackpack);

    });
});

test('SCENARIO: 15. User should get notified after placing a successful order', async ({ page }) => {
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

        expect(actualName).toBe(nameOfBackpack);
        expect(actualDescription).toBe(descriptionOfProductBackpack);
        expect(actualPrice).toBe(priceOfProductBackpack);
        expect(actualImageSrc).toBe(imgOfProductBackpack);

    });
});