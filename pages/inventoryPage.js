class InventoryPage {
   
    constructor(page) {
        this.page = page;
        this.burgerMenue = page.getByRole('button', { name: 'Open Menu' });
        this.logout = page.locator('[data-test="logout-sidebar-link"]');

        // Selectors
       
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    }

    // Actions

    // Navigate to the inventory page
    async openInventoryPage() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

    // open burger menue
    async openBurgerMenue() {
        await this.burgerMenue.click();
    }

     // click logout from burger menue
     async logoutClick() {
        await this.logout.click();
    }
}

module.exports = InventoryPage;