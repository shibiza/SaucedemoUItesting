const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');
const CartPage = require('../pages/cartPage');

import exp from 'constants';
import {
    loginPageUrl,
    inventoryPageUrl,
    cartPageUrl,
    usernameInput,
    standardUser,
    password,
           
} from '../config';

// Variables for the backpack
const nameOfBackpack = 'Sauce Labs Backpack';
const descriptionOfProductBackpack = 'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.';
const priceOfProductBackpack = '$29.99';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

  await page.goto('https://www.saucedemo.com/'); //delete this and uncomment next:
 // await loginPage.openLoginPage();

    await expect(page).toHaveURL(loginPageUrl);      
    await expect (page.locator(usernameInput)).toBeEnabled();
    await loginPage.login(standardUser, password);
 });


test('SCENARIO: 7.  User should see the added product in their cart.', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await test.step('GIVEN: user is on the inventory page', async () => {
        await expect(page).toHaveURL(inventoryPageUrl);
    });
    
    await test.step('WHEN: when user cklicks on "add to cart" button for a backpack', async () => {
      await inventoryPage.addToCartBackpackCklick();   
    });
    
    await test.step('AND: user goes to cart page', async () => {
       await inventoryPage.cartIconClick();
       await expect(page).toHaveURL(cartPageUrl);
    });

    await test.step('THEN: user sees that the added backpack (name, description, price) is displayed', async () => {
        const actualName = await cartPage.getAddedProductName();
        const actualDescription = await cartPage.getAddedProductDescription();
        const actualPrice = await cartPage.getAddedProductPrice();
    
         console.log({
            name: actualName,
            description: actualDescription,
            price: actualPrice,
        });

        expect(actualName).toBe(nameOfBackpack);
        expect(actualDescription).toBe(descriptionOfProductBackpack);
        expect(actualPrice).toBe(priceOfProductBackpack);
    });
});

test('SCENARIO: 8. User should see the cart icon update accordingly when adding a product to the cart.', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
 
    await test.step('GIVEN: user is on the inventory page', async () => {
        await expect(page).toHaveURL(inventoryPageUrl);
    });
    
    await test.step('WHEN: when user cklicks on "add to cart" button for a backpack', async () => {
      await inventoryPage.addToCartBackpackCklick();   
    });
    
    await test.step('THEN: user sees that there is "1" product near the car item is displayed', async () => {
       const actualQuantityOfProducts = await inventoryPage.getCartIconQuantityProducts();
       console.log('quantity of actual added products is: ', actualQuantityOfProducts);
       expect(actualQuantityOfProducts).toBe("1");
    });
});

test('SCENARIO: 9. User should be able to remove the added product on the cart page.', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await test.step('GIVEN: user is on the inventory page', async () => {
        await expect(page).toHaveURL(inventoryPageUrl);
    });
    
    await test.step('WHEN: when user cklicks on "add to cart" button for a backpack', async () => {
      await inventoryPage.addToCartBackpackCklick();   
    });
    
    await test.step('AND: user goes to the cart page', async () => {
       await inventoryPage.cartIconClick();
       await expect(page).toHaveURL(cartPageUrl);
    });

    await test.step('AND: User clicks "Remove" button on the cart page', async () => {
        await cartPage.removeButtonCklick();
     });

    await test.step('THEN: user sees that previously added backpack is removed', async () => {
        await expect(cartPage.addedProductName).toBeHidden();
        await expect(cartPage.addedProductDescription).toBeHidden();
        await expect(cartPage.addedProductPrice).toBeHidden();
    });
});