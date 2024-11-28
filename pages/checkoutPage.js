import BasePage from './basePage';

import {
    checkoutPageStepOneUrl,
    checkoutPageStepTwoUrl,
    checkoutPageCompleteUrl,
    
    } from '../config';

class CheckoutPage extends BasePage {
   
    constructor(page) {
        super(page);
        this.checkoutPageStepOneUrl = checkoutPageStepOneUrl;
        this.checkoutPageStepTwoUrl = checkoutPageStepTwoUrl;
        this.checkoutPageCompleteUrl = checkoutPageCompleteUrl;
      //  this. = page.locator();
    }

    async openCheckoutPageStepOneUrl() {
        await this.openUrl(checkoutPageStepOneUrl);
    }

    // async removeButtonClick(){
    //     await this.clickElement(this.removeButtonOnProductPage);
    // }

    // async getCartIconQuantityProducts(){
    //     return this.cartIcon.innerText();
    // }

}

module.exports = CheckoutPage;