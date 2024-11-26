import BasePage from './basePage';

import {
    cartPageUrl,
    checkoutButton,
    addedProductName,
    addedProductDescription,
    addedProductPrice,
    removeButton,
    
    } from '../config';

class CartPage extends BasePage {
   
    constructor(page) {
        super(page);
        this.cartPageUrl = cartPageUrl;
        this.checkoutButton = page.locator(checkoutButton);
        this.addedProductName = page.locator(addedProductName);
        this.addedProductDescription = page.locator(addedProductDescription);
        this.addedProductPrice = page.locator(addedProductPrice);
        this.removeButton = page.locator(removeButton);
           
    }

    async openCartPage() {
        await this.openUrl(cartPageUrl);
    }

    // polymorthism:  ❤️
    async checkoutClick() {
        await this.clickElement(this.checkoutButton);
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
        await this.clickElement(this.removeButton);
    }
}

module.exports = CartPage;