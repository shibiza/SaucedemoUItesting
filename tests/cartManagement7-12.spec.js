const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');
const CartPage = require('../pages/cartPage');
const ProductPage = require('../pages/productPage');

import {
    loginPageUrl,
    inventoryPageUrl,
    cartPageUrl,
    usernameInput,
    standardUser,
    password,
    productPageUrl,
    removeButtonOnProductPage,
    backpackInfo,
    } from '../config';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    // await page.goto('https://www.saucedemo.com/'); //delete this and uncomment next:
    await loginPage.openLoginPage();

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

        expect(actualName).toBe(backpackInfo.nameOfBackpack);
        expect(actualDescription).toBe(backpackInfo.descriptionOfProductBackpack);
        expect(actualPrice).toBe(backpackInfo.priceOfProductBackpack);
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

test('SCENARIO: 10. User should be able to remove the added product from cart on the inventory page.', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    
    await test.step('GIVEN: user is on the inventory page', async () => {
        await expect(page).toHaveURL(inventoryPageUrl);
    });
    
    await test.step('WHEN: when user cklicks on "add to cart" button for a backpack', async () => {
       await inventoryPage.addToCartBackpackCklick();   
       const actualQuantityOfProducts = await inventoryPage.getCartIconQuantityProducts();
       console.log('✅ quantity of actual added products is: ', actualQuantityOfProducts);
       expect(actualQuantityOfProducts).toBe("1");
    });
       
    await test.step('AND: User clicks "Remove" button on the inventory page', async () => {
        await inventoryPage.removeButtonCklick();
     });

    await test.step('THEN: user sees that previously added backpack is removed from cart', async () => {
        const actualQuantityOfProducts = await inventoryPage.getCartIconQuantityProducts();
        console.log('✅ quantity of actual added products is: ', actualQuantityOfProducts);
    });
});

test('SCENARIO: 11. User should be able to remove the added product from cart on the specific product page.', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productPage = new ProductPage(page);
    
    await test.step('GIVEN: user is on the inventory page', async () => {
        await expect(page).toHaveURL(inventoryPageUrl);
    });
    
    await test.step('WHEN: when user cklicks on "add to cart" button for a backpack', async () => {
      await inventoryPage.addToCartBackpackCklick();   
      const actualQuantityOfProducts1 = await inventoryPage.getCartIconQuantityProducts();
      console.log('✅ quantity of actual added products is: ', actualQuantityOfProducts1);
      expect(actualQuantityOfProducts1).toBe("1");
    });
       
    await test.step('AND: User navigates to the backpack page', async () => {
        await inventoryPage.navigateToProductPage();
        await expect(page).toHaveURL(productPageUrl);
     });

     await test.step('AND: User press "Remove" button to remove the backpack from their cart', async () => {
        await expect (page.locator(removeButtonOnProductPage)).toBeEnabled();
        await productPage.removeButtonClick();
     });

    await test.step('THEN: user sees that the backpack is removed from cart', async () => {
        const actualQuantityOfProducts0 = await productPage.getCartIconQuantityProducts();
        console.log('✅ quantity of actual added products is: ', actualQuantityOfProducts0);
        expect(actualQuantityOfProducts0).toBe("");
    });
});

test('SCENARIO: 12. User should be able to continue shopping from the cart page.', async ({ page }) => {
    const cartPage = new CartPage(page);

    await test.step('GIVEN: user is on the cart page', async () => {
        await cartPage.openCartPage();
        await expect(page).toHaveURL(cartPageUrl);
    });
    
    await test.step('WHEN: when user cklicks on "Continue shopping" button', async () => {
        await cartPage.continueShoppingClick();   
    });
    
    await test.step('THEN: user is redirected to inventory page', async () => {
        await expect(page).toHaveURL(inventoryPageUrl);
    });
});