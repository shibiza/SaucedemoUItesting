class InventoryPage {
   
    constructor(page) {
        this.page = page;

        // Selectors
       
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    }

    // Actions

    // Navigate to the page
    async openInventoryPage() {
        await this.page.goto('https://www.saucedemo.com/inventory.html');
    }

}

module.exports = InventoryPage;