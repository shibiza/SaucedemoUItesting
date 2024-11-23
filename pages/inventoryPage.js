import BasePage from './basePage';

import {
    inventoryPageUrl,
    burgerMenue,
    logoutButton,
    cartIcon,

    swagLabsLogo,
    } from '../config';

class InventoryPage extends BasePage {
   
    constructor(page) {
        super(page);
        this.inventoryPageUrl = inventoryPageUrl;
        this.burgerMenue = page.getByRole(burgerMenue);
        this.logoutButton = page.locator(logoutButton);
        this.cartIcon = page.locator(cartIcon);
    }

    async openInventoryPage() {
        await this.openUrl(inventoryPageUrl);
    }

    async openBurgerMenue() {
        await this.burgerMenue.click();
    }

     async logoutClick() {
        await this.logoutButton.click();
    }
}

module.exports = InventoryPage;