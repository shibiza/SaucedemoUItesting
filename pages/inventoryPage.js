import BasePage from './basePage';

import {
    inventoryPageUrl,
    burgerMenue,
    logoutButton,
    cartIcon,
    productSearchContainer,
    itemName,
    itemPrice,

    swagLabsLogo,
    } from '../config';

class InventoryPage extends BasePage {
   
    constructor(page) {
        super(page);
        this.inventoryPageUrl = inventoryPageUrl;
        this.burgerMenue = page.locator(burgerMenue); //Error while parsing selector `button:has-text("Open Menu")` - unexpected symbol ":" at position 6
        this.logoutButton = page.locator(logoutButton);
        this.cartIcon = page.locator(cartIcon);
        this.productSearchContainer = page.locator(productSearchContainer);
        this.itemNames = page.locator(itemName);
        this.itemPrices = page.locator(itemPrice);
    }

    async openInventoryPage() {
        await this.openUrl(inventoryPageUrl);
    }

    // polymorthism:  ❤️
    async openBurgerMenue() {
        //await this.burgerMenue.click(); -instead of usung this I override parents method:
        await this.clickElement(this.burgerMenue);
    }

     async logoutClick() {
        await this.clickElement(this.logoutButton);
    }

    async filteringDropdownCklick(){
        await this.clickElement(this.productSearchContainer);
    }

}

module.exports = InventoryPage;