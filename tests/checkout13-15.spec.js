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
    quantityOfProducts,
    nameOfProduct,
    descriptionOfProduct,
    priceOfProduct,
       
} from '../config';

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);

  //  await page.goto('https://www.saucedemo.com/'); //delete this and uncomment next:
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
        console.log('💢 Product Information: quantity is ' , actualProductInfo.quantity);
        console.log('💢 name of product: ', actualProductInfo.name);
        console.log('💢 description of product: ', actualProductInfo.description);
        console.log('💢 price of product: ', actualProductInfo.price);
        await expect(actualProductInfo.quantity).toBeVisible();
        await expect(actualProductInfo.quantity).toHaveText("1");
        await expect(actualProductInfo.name).toBeVisible();
        await expect(actualProductInfo.name).toHaveText(backpackInfo.nameOfBackpack);
        await expect(actualProductInfo.description).toBeVisible();
        await expect(actualProductInfo.description).toHaveText(backpackInfo.descriptionOfProductBackpack);
        await expect(actualProductInfo.price).toBeVisible();
        await expect(actualProductInfo.price).toHaveText(backpackInfo.priceOfProductBackpack);

        const actualPaymentInfo = await checkoutPage.getPaymentInfo();
        console.log('✅ Payment Information: ' , actualPaymentInfo.paymentInfo);
        console.log('✅ Shipping Information: ', actualPaymentInfo.shippingInfo);
        await expect(actualPaymentInfo.paymentInfo).toBeVisible();
        await expect(actualPaymentInfo.paymentInfo).toHaveText(paymentInformation.card);
        await expect(actualPaymentInfo.shippingInfo).toBeVisible();
        await expect(actualPaymentInfo.shippingInfo).toHaveText(paymentInformation.shipping);
    });
});

test('SCENARIO: 14. User should get notified when they fail to enter any of the checkout information', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);
    const cartPage = new CartPage(page);

    await test.step('GIVEN: user added to cart backpack and on the cart page clicks chekout button', async () => {
        await inventoryPage.addToCartBackpackCklick();   
        await inventoryPage.cartIconClick();
        await expect(page).toHaveURL(cartPageUrl);
        await cartPage.checkoutClick();
        await expect(page).toHaveURL(checkoutPageStepOneUrl);
    });

    await test.step('WHEN: user enters not every of their credentials on "checkout: your information" page and tries to press continue button', async () => {
      
    });

    await test.step('THEN: user sees an error message occurs', async () => {


    });
});

  

test('SCENARIO: 15. User should get notified after placing a successful order', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);
    const cartPage = new CartPage(page);

    await test.step('GIVEN: user added to cart backpack and on the cart page clicks chekout button', async () => {
        await inventoryPage.addToCartBackpackCklick();   
        await inventoryPage.cartIconClick();
        await expect(page).toHaveURL(cartPageUrl);
        await cartPage.checkoutClick();
        await expect(page).toHaveURL(checkoutPageStepOneUrl);
    });

    await test.step('WHEN: user clicks on "Finish" button', async () => {
      
    });

    await test.step('THEN: user is redirected to "checkout: complete!" page and sees a thank you message is displayed ', async () => {
     });
    });