//links:
export const loginPageUrl = 'https://www.saucedemo.com/';
export const inventoryPageUrl = 'https://www.saucedemo.com/inventory.html';

//users and password:
export const standardUser = "standard_user";
export const lockedOutUser = "locked_out_user";
export const password = "secret_sauce";

//locators login page:
export const usernameInput = '[data-test="username"]';
export const passwordInput = '[data-test="password"]';
export const loginButton = '[data-test="login-button"]';
export const errorMessageLocator = "[class= 'error-message-container error']";

//locators inventory page:
export const burgerMenue = '[id="react-burger-menu-btn"]'; 
export const logoutButton = '#logout_sidebar_link';

export const productSearchContainer = '[data-test="product-sort-container"]';
export const itemName = "[class='inventory_item_name']"; // <div class="inventory_item_name " data-test="inventory-item-name">Test.allTheThings() T-Shirt (Red)</div>
export const itemPrice = "[class='inventory_item_price']";

// scenario #6:
export const productName = '[data-test="inventory-item-name"]'; //<div class="inventory_item_name " data-test="inventory-item-name">Sauce Labs Backpack</div>
export const productDescription = '[data-test="inventory-item-desc"]'; //<div class="inventory_item_desc" data-test="inventory-item-desc">carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.</div>
export const productPrice = '[data-test="inventory-item-price"]'; //<div class="inventory_item_price" data-test="inventory-item-price">$29.99</div>
export const productImage = '[data-test="inventory-item-sauce-labs-backpack-img"]';    //<img alt="Sauce Labs Backpack" class="inventory_item_img" src="/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg" data-test="inventory-item-sauce-labs-backpack-img">

//texts:
export const errorLoginMessage = "Epic sadface: You can only access '/inventory.html' when you are logged in.";
export const errorLockedOutUserMessage = "Epic sadface: Sorry, this user has been locked out.";