import BasePage from './basePage';

import {
    checkoutPageStepOneUrl,
    checkoutPageStepTwoUrl,
    checkoutPageCompleteUrl,
    firstNameInput,
    lastNameInput,
    zipCodeInput,
    continueCheckoutButton,
    quantityOfProducts,
    nameOfProduct,
    descriptionOfProduct,
    priceOfProduct,
    paymentInfoLocator,
    shippingInfoLocator,
    errorMessageCheckoutLocator,
    finishButton,
    completeOrderHeaderLocator,
    completeOrderWholeLocator,
    } from '../config';

class CheckoutPage extends BasePage {
   
    constructor(page) {
        super(page);
        this.checkoutPageStepOneUrl = checkoutPageStepOneUrl;
        this.checkoutPageStepTwoUrl = checkoutPageStepTwoUrl;
        this.checkoutPageCompleteUrl = checkoutPageCompleteUrl;
        this.firstNameInput = page.locator(firstNameInput);
        this.lastNameInput = page.locator(lastNameInput);
        this.zipCodeInput = page.locator(zipCodeInput);
        this.continueCheckoutButton = page.locator(continueCheckoutButton);
        this.quantityOfProducts = page.locator(quantityOfProducts);
        this.nameOfProduct = page.locator(nameOfProduct);
        this.descriptionOfProduct = page.locator(descriptionOfProduct);
        this.priceOfProduct = page.locator(priceOfProduct);
        this.paymentInfoLocator = page.locator(paymentInfoLocator);
        this.shippingInfoLocator = page.locator(shippingInfoLocator);
        this.errorMessageCheckoutLocator = page.locator(errorMessageCheckoutLocator);
        this.finishButton = page.locator(finishButton);
        this.completeOrderHeaderLocator = page.locator(completeOrderHeaderLocator);
        this.completeOrderWholeLocator = page.locator(completeOrderWholeLocator);
    }

    async checkoutInputCredentials(firstName,lastName, zipCode) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.zipCodeInput.fill(zipCode);
        await this.clickElement(this.continueCheckoutButton);
    }
    async finishButtonCklick() {
        await this.clickElement(this.finishButton);
    }
   
    // async getProductInfo() {
    //     // Wait for all elements to load and retrieve their inner text
    //     const quantity = await this.quantityOfProducts.innerText();
    //     const name = await this.nameOfProduct.innerText();
    //     const description = await this.descriptionOfProduct.innerText();
    //     const price = await this.priceOfProduct.innerText();

    //     return {       // Return all the data as an object
    //         quantity,
    //         name,
    //         description,
    //         price
    //     };
    // }
    async getProductInfo() {
        // Return locators instead of inner text, so I can use them in assertions toBeVisible() and toHaveText()
        return {
            quantity: this.quantityOfProducts,
            name: this.nameOfProduct,
            description: this.descriptionOfProduct,
            price: this.priceOfProduct
        };
    }

    async getPaymentInfo() {
        return {
            paymentInfo: this.paymentInfoLocator,
            shippingInfo: this.shippingInfoLocator,
        };
    }

    async isErrorMessageVisible() {
        return await this.errorMessageCheckoutLocator.isVisible();
    }
    async getErrorMessageInfo() {
        const errorMessageText = await this.errorMessageCheckoutLocator.innerText();
        return errorMessageText;
    }
    async getThankYouMessage() {
        const headerText = await this.completeOrderHeaderLocator.innerText();
         return headerText;
    }
    async getOrderDispatchedMessage(){
        const wholeText = await this.completeOrderWholeLocator.innerText();
        return wholeText;
    }
}

module.exports = CheckoutPage;