import BasePage from './basePage';

import {
    cartPageUrl,
    checkoutButton,
    addedProductName,
    addedProductDescription,
    addedProductPrice,
    removeButton,
    continueShopping,
    } from '../config';

class CartPage extends BasePage {
    #page;
    #checkoutButton;
    #removeButton;

    constructor(page) {
        super(page);
        this.#page = page;
        this.cartPageUrl = cartPageUrl;
        this.#checkoutButton = page.locator(checkoutButton);
        this.addedProductName = page.locator(addedProductName);
        this.addedProductDescription = page.locator(addedProductDescription);
        this.addedProductPrice = page.locator(addedProductPrice);
        this.#removeButton = page.locator(removeButton);
        this.continueShopping = page.locator(continueShopping);     
    }

    async openCartPage() {
        await this.openUrl(cartPageUrl);
    }

    // polymorthism:  ❤️
    async checkoutClick() {
        await this.clickElement(this.#checkoutButton);
    }
    async continueShoppingClick() {
        await this.clickElement(this.continueShopping);
    }
     //scenario #7:
     async getAddedProductName(){
        return await this.addedProductName.innerText();
    }
    async getAddedProductDescription(){
        return await this.addedProductDescription.innerText();
    }
    async getAddedProductPrice(){
        return await this.addedProductPrice.innerText();
    }

    //scenario #9:
    async removeButtonCklick(){
        await this.clickElement(this.#removeButton);
    }
}

module.exports = CartPage;