//links:
export const loginPageUrl = 'https://www.saucedemo.com/';
export const inventoryPageUrl = 'https://www.saucedemo.com/inventory.html';
export const cartPageUrl = 'https://www.saucedemo.com/cart.html';

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
export const cartIcon = '[data-test="shopping-cart-link"]';

export const productSearchContainer = '[data-test="product-sort-container"]';
export const itemName = "[class='inventory_item_name']"; // <div class="inventory_item_name " data-test="inventory-item-name">Test.allTheThings() T-Shirt (Red)</div>
export const itemPrice = "[class='inventory_item_price']";
export const addToCartBackpackButton = '[data-test="add-to-cart-sauce-labs-backpack"]'; //<button class="btn btn_primary btn_small btn_inventory " data-test="add-to-cart-sauce-labs-backpack" id="add-to-cart-sauce-labs-backpack" name="add-to-cart-sauce-labs-backpack">Add to cart</button>

// scenario #6: attention!!! some of them are harcoded variables!!!
export const productName = '[data-test="inventory-item-name"]'; //<div class="inventory_item_name " data-test="inventory-item-name">Sauce Labs Backpack</div>
export const productDescription = '[class="inventory_item_desc"]'; //<div class="inventory_item_desc" data-test="inventory-item-desc">carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.</div>
export const productPrice = '[data-test="inventory-item-price"]'; //<div class="inventory_item_price" data-test="inventory-item-price">$29.99</div>
export const productImage = '[data-test="inventory-item-sauce-labs-backpack-img"]';    //<img alt="Sauce Labs Backpack" class="inventory_item_img" src="/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg" data-test="inventory-item-sauce-labs-backpack-img">

// cart page:
export const checkoutButton = '[data-test="checkout"]';
export const removeButton = '[data-test="remove-sauce-labs-backpack"]';
// scenario #7: 
export const addedProductName = '[data-test="item-4-title-link"]'; 
export const addedProductDescription = '[data-test="inventory-item-desc"]'; 
export const addedProductPrice = '[data-test="inventory-item-price"]'; 

//texts:
export const errorLoginMessage = "Epic sadface: You can only access '/inventory.html' when you are logged in.";
export const errorLockedOutUserMessage = "Epic sadface: Sorry, this user has been locked out.";