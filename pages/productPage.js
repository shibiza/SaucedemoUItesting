import BasePage from './basePage';

import {
    productPageUrl,
    cartIcon,
    removeButtonOnProductPage,
    } from '../config';

class ProductPage extends BasePage {
   
    constructor(page) {
        super(page);
        this.productPageUrl = productPageUrl;
        this.cartIcon = page.locator(cartIcon);
        this.removeButtonOnProductPage = page.locator(removeButtonOnProductPage);
    }

    async openProductPage() {
        await this.openUrl(productPageUrl);
    }

    async removeButtonClick(){
        await this.clickElement(this.removeButtonOnProductPage);
    }

    async getCartIconQuantityProducts(){
        return this.cartIcon.innerText();
    }
}

module.exports = ProductPage;