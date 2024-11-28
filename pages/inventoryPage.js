import BasePage from './basePage';

import {
    inventoryPageUrl,
    burgerMenue,
    logoutButton,
    cartIcon,
    productSearchContainer,
    itemName,
    itemPrice,
    addToCartBackpackButton,
    removeButton,
    productNameBackpack,
    productName,
    productDescription,
    productPrice,
    productImage,
    } from '../config';

class InventoryPage extends BasePage {
    #page;
    #burgerMenue;
    #logoutButton;
    #cartIcon;
    #removeButton;

    constructor(page) {
        super(page);
        this.#page = page;
        this.inventoryPageUrl = inventoryPageUrl;
        this.#burgerMenue = page.locator(burgerMenue); 
        this.#logoutButton = page.locator(logoutButton);
        this.#cartIcon = page.locator(cartIcon);
        this.productSearchContainer = page.locator(productSearchContainer);
        this.itemNames = page.locator(itemName);
        this.itemPrices = page.locator(itemPrice);
        this.addToCartBackpackButton = page.locator(addToCartBackpackButton);
        this.#removeButton = page.locator(removeButton);
        this.productNameBackpack = page.locator(productNameBackpack);
            //scenario #6:
        this.productName = page.locator(productName);
        this.productDescription = page.locator(productDescription);
        this.productPrice = page.locator(productPrice);
        this.productImage = page.locator(productImage);
    }

    async openInventoryPage() {
        await this.openUrl(inventoryPageUrl);
    }

    // polymorthism:  ❤️
    async openBurgerMenue() {
        //await this.burgerMenue.click(); -instead of usung this I override parents method:
        await this.clickElement(this.#burgerMenue);
    }

     async logoutClick() {
        await this.clickElement(this.#logoutButton);
    }

    async filteringDropdownCklick(){
        await this.clickElement(this.productSearchContainer);
    }

    async cartIconClick(){
        await this.clickElement(this.#cartIcon);
    }

    async removeButtonCklick(){
        await this.clickElement(this.#removeButton);
    }

    async navigateToProductPage(){
        await this.clickElement(this.productNameBackpack);
    }

    //scenario #6:
    async getFirstProductName(){
        return await this.productName.nth(0).innerText();
    }
    async getFirstProductDescription(){
        return await this.productDescription.nth(0).innerText();
    }
    async getFirstProductPrice(){
        return await this.productPrice.nth(0).innerText();
    }
    async getFirstProductImage(){
        return await this.productImage.getAttribute('src');
    }

    //scenario #7:
    async addToCartBackpackCklick() {
        await this.clickElement(this.addToCartBackpackButton);
    } 
    async getCartIconQuantityProducts(){
        return this.#cartIcon.innerText();
    }
}

module.exports = InventoryPage;