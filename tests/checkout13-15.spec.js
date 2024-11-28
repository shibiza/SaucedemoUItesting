const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');
const InventoryPage = require('../pages/inventoryPage');
const CartPage = require('../pages/cartPage');
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
    firstNameBuyer,
    lastNameBuyer,
    zipCodeBuyer,
    cartPageUrl,
    backpackInfo,
    paymentInformation,
    errorFirstNameRequired,
    errorLastNameRequired,
    errorPostalCodeRequired,
    completeOrderHeaderText,
    completeOrderWholeText,
    } from '../config';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

    // await page.goto('https://www.saucedemo.com/'); //delete this and uncomment next:
    await loginPage.openLoginPage();

    await expect(page).toHaveURL(loginPageUrl);      
    await expect (page.locator(usernameInput)).toBeEnabled();
    await loginPage.login(standardUser, password);
    await expect(page).toHaveURL(inventoryPageUrl);
 });

test('SCENARIO: 13. User should see the checkout overview with details such as payment, shipping info, price total', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await test.step('GIVEN: user added to cart backpack and on the cart page clicks chekout button', async () => {
    await inventoryPage.filteringDropdownCklick();        // we need to filter products so the backpack will be the first item
    await inventoryPage.productSearchContainer.selectOption('az'); 
    await inventoryPage.addToCartBackpackCklick();   
    await inventoryPage.cartIconClick();
    await expect(page).toHaveURL(cartPageUrl);
    await cartPage.checkoutClick();
    await expect(page).toHaveURL(checkoutPageStepOneUrl);
    });

    await test.step('WHEN: user enters their credentials on "checkout: your information" page and press continue button', async () => {
    checkoutPage.checkoutInputCredentials(firstNameBuyer, lastNameBuyer, zipCodeBuyer);
    });

    await test.step('THEN: user see checkout details such as payment, shipping info, price total "checkout overview" page ', async () => {
    await expect(page).toHaveURL(checkoutPageStepTwoUrl);

    const actualProductInfo = await checkoutPage.getProductInfo();
    console.log('💢 Product Information: quantity is ', await (actualProductInfo.quantity).innerText());
    console.log('💢 name of product: ', await (actualProductInfo.name).innerText());
    console.log('💢 description of product: ', await (actualProductInfo.description).innerText());
    console.log('💢 price of product: ', await (actualProductInfo.price).innerText());
    await expect(actualProductInfo.quantity).toBeVisible();
    await expect(actualProductInfo.quantity).toHaveText("1");
    await expect(actualProductInfo.name).toBeVisible();
    await expect(actualProductInfo.name).toHaveText(backpackInfo.nameOfBackpack);
    await expect(actualProductInfo.description).toBeVisible();
    await expect(actualProductInfo.description).toHaveText(backpackInfo.descriptionOfProductBackpack);
    await expect(actualProductInfo.price).toBeVisible();
    await expect(actualProductInfo.price).toHaveText(backpackInfo.priceOfProductBackpack);

    const actualPaymentInfo = await checkoutPage.getPaymentInfo();
    console.log('✅ Payment Information: ',  await (actualPaymentInfo.paymentInfo).innerText());
    console.log('✅ Shipping Information: ', await (actualPaymentInfo.shippingInfo).innerText());
    await expect(actualPaymentInfo.paymentInfo).toBeVisible();
    await expect(actualPaymentInfo.paymentInfo).toHaveText(paymentInformation.card);
    await expect(actualPaymentInfo.shippingInfo).toBeVisible();
    await expect(actualPaymentInfo.shippingInfo).toHaveText(paymentInformation.shipping);
    });
});

test('SCENARIO: 14A. User should get notified when they fail to enter any of the checkout information', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await test.step('GIVEN: user added to cart backpack and on the cart page clicks chekout button', async () => {
    await inventoryPage.filteringDropdownCklick();        // we need to filter products so the backpack will be the first item
    await inventoryPage.productSearchContainer.selectOption('az'); 
    await inventoryPage.addToCartBackpackCklick();   
    await inventoryPage.cartIconClick();
    await expect(page).toHaveURL(cartPageUrl);
    await cartPage.checkoutClick();
    await expect(page).toHaveURL(checkoutPageStepOneUrl);
    });

    await test.step('WHEN: user enters only lastName and zipCode and dont enter firstName on "checkout: your information" page and press Continue button', async () => {
    checkoutPage.checkoutInputCredentials("", lastNameBuyer, zipCodeBuyer);
    });

    await test.step('THEN: user sees an error message occurs ', async () => {
    await expect(page).toHaveURL(checkoutPageStepOneUrl);
    await checkoutPage.isErrorMessageVisible();

    const actualErrorMessage = await checkoutPage.getErrorMessageInfo();
    console.log('⚡ actual error message is ', actualErrorMessage);
    await expect(actualErrorMessage).toBe(errorFirstNameRequired);
    });
});

test('SCENARIO: 14B. User should get notified when they fail to enter any of the checkout information', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);
    
    await test.step('GIVEN: user added to cart backpack and on the cart page clicks chekout button', async () => {
    await inventoryPage.filteringDropdownCklick();        // we need to filter products so the backpack will be the first item
    await inventoryPage.productSearchContainer.selectOption('az'); 
    await inventoryPage.addToCartBackpackCklick();   
    await inventoryPage.cartIconClick();
    await expect(page).toHaveURL(cartPageUrl);
    await cartPage.checkoutClick();
    await expect(page).toHaveURL(checkoutPageStepOneUrl);
    });
    
    await test.step('WHEN: user enters only firstName and zipCode and dont enter lastName on "checkout: your information" page press Continue button', async () => {
    checkoutPage.checkoutInputCredentials(firstNameBuyer, "", zipCodeBuyer);
    });
    
    await test.step('THEN: user sees an error message occurs ', async () => {
    await expect(page).toHaveURL(checkoutPageStepOneUrl);
    await checkoutPage.isErrorMessageVisible();
    
    const actualErrorMessage = await checkoutPage.getErrorMessageInfo();
    console.log('⚡ actual error message is ', actualErrorMessage);
    await expect(actualErrorMessage).toBe(errorLastNameRequired);
    });
});

test('SCENARIO: 14C. User should get notified when they fail to enter any of the checkout information', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await test.step('GIVEN: user added to cart backpack and on the cart page clicks chekout button', async () => {
        await inventoryPage.filteringDropdownCklick();        // we need to filter products so the backpack will be the first item
        await inventoryPage.productSearchContainer.selectOption('az'); 
        await inventoryPage.addToCartBackpackCklick();   
        await inventoryPage.cartIconClick();
        await expect(page).toHaveURL(cartPageUrl);
        await cartPage.checkoutClick();
        await expect(page).toHaveURL(checkoutPageStepOneUrl);
    });
    
    await test.step('WHEN: user enters only firstName and lastName and dont enter zipCode on "checkout: your information" page and tries to press continue button', async () => {
        checkoutPage.checkoutInputCredentials(firstNameBuyer, lastNameBuyer, "");
    });

    await test.step('THEN: user sees an error message occurs ', async () => {
        await expect(page).toHaveURL(checkoutPageStepOneUrl);
        await checkoutPage.isErrorMessageVisible();

        const actualErrorMessage = await checkoutPage.getErrorMessageInfo();
        console.log('⚡ actual error message is ', actualErrorMessage);
        await expect(actualErrorMessage).toBe(errorPostalCodeRequired);
    });
});

test('SCENARIO: 15. User should get notified after placing a successful order', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);
    const cartPage = new CartPage(page);

    await test.step('GIVEN: user is on Checkout: Overview page and want to finish checkout', async () => {
        await inventoryPage.filteringDropdownCklick();        // we need to filter products so the backpack will be the first item
        await inventoryPage.productSearchContainer.selectOption('az'); 
        await inventoryPage.addToCartBackpackCklick();   
        await inventoryPage.cartIconClick();
        await expect(page).toHaveURL(cartPageUrl);
        await cartPage.checkoutClick();
        await expect(page).toHaveURL(checkoutPageStepOneUrl);
        checkoutPage.checkoutInputCredentials(firstNameBuyer, lastNameBuyer, zipCodeBuyer);
        await expect(page).toHaveURL(checkoutPageStepTwoUrl);   
    });

    await test.step('WHEN: user clicks on "Finish" button', async () => {
        checkoutPage.finishButtonCklick();
    });

    await test.step('THEN: user is redirected to "checkout: complete!" page and sees a thank you message is displayed ', async () => {
        await expect(page).toHaveURL(checkoutPageCompleteUrl);

        const actualHeaderMessageText = await checkoutPage.getThankYouMessage();
        console.log('❤️ actual thank you message is ', actualHeaderMessageText);
        await expect(actualHeaderMessageText).toBe(completeOrderHeaderText);

        const actualWholeText = await checkoutPage.getOrderDispatchedMessage();
        console.log('❤️ actual thank you message is ', actualWholeText);
        await expect(actualWholeText).toBe(completeOrderWholeText);
        });
});