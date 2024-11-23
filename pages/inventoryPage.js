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
        this.burgerMenue = page.locator('button', { hasText: 'Open Menu' }); //Error while parsing selector `button:has-text("Open Menu")` - unexpected symbol ":" at position 6
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