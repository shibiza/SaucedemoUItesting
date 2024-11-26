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
//export const swagLabLoginPageLogo = page.getByText('Swag Labs');

//locators inventory page:
export const burgerMenue = '[id="react-burger-menu-btn"]'; 
export const logoutButton = '#logout_sidebar_link';

export const productSearchContainer = '[data-test="product-sort-container"]';
export const itemName = "[class='inventory_item_name']"; // <div class="inventory_item_name " data-test="inventory-item-name">Test.allTheThings() T-Shirt (Red)</div>
export const itemPrice = "[class='inventory_item_price']";

export const cartIcon = '[data-test="shopping-cart-link"]';

//locators all pages:
export const swagLabsLogo = "[class= 'login_logo']"; //logo on all pages exept login page
 
//texts:
export const titleSwagLabs = 'Swag Labs';
export const errorLoginMessage = "Epic sadface: You can only access '/inventory.html' when you are logged in.";
export const errorLockedOutUserMessage = "Epic sadface: Sorry, this user has been locked out.";