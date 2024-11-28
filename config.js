//urls:
export const loginPageUrl = 'https://www.saucedemo.com/';
export const inventoryPageUrl = 'https://www.saucedemo.com/inventory.html';
export const cartPageUrl = 'https://www.saucedemo.com/cart.html';
export const productPageUrl = 'https://www.saucedemo.com/inventory-item.html?id=4';
export const checkoutPageStepOneUrl = 'https://www.saucedemo.com/checkout-step-one.html';
export const checkoutPageStepTwoUrl = 'https://www.saucedemo.com/checkout-step-two.html';
export const checkoutPageCompleteUrl = 'https://www.saucedemo.com/checkout-complete.html';

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
export const productNameBackpack = '[data-test="item-4-title-link"]';

// scenario #6: attention!!! some of them are harcoded variables!!!
export const productName = '[data-test="inventory-item-name"]'; //<div class="inventory_item_name " data-test="inventory-item-name">Sauce Labs Backpack</div>
export const productDescription = '[class="inventory_item_desc"]'; //<div class="inventory_item_desc" data-test="inventory-item-desc">carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.</div>
export const productPrice = '[data-test="inventory-item-price"]'; //<div class="inventory_item_price" data-test="inventory-item-price">$29.99</div>
export const productImage = '[data-test="inventory-item-sauce-labs-backpack-img"]';    //<img alt="Sauce Labs Backpack" class="inventory_item_img" src="/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg" data-test="inventory-item-sauce-labs-backpack-img">

// cart page:
export const checkoutButton = '[data-test="checkout"]';
export const removeButton = '[data-test="remove-sauce-labs-backpack"]';
export const continueShopping = '[data-test="continue-shopping"]';
// scenario #7: 
export const addedProductName = '[data-test="item-4-title-link"]'; 
export const addedProductDescription = '[data-test="inventory-item-desc"]'; 
export const addedProductPrice = '[data-test="inventory-item-price"]'; 

// product page (backpack):
export const removeButtonOnProductPage = '[data-test="remove"]';
export const backpackInfo = {
    nameOfBackpack : "Sauce Labs Backpack",
    descriptionOfProductBackpack : "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.",
    priceOfProductBackpack : "$29.99",
    }

// checkout page:
export const firstNameInput = '[data-test="firstName"]';
export const lastNameInput = '[data-test="lastName"]';
export const zipCodeInput = '[data-test="postalCode"]';
export const continueCheckoutButton = '[data-test="continue"]';
export const firstNameBuyer = 'Nat';
export const lastNameBuyer = 'Sam';
export const zipCodeBuyer = '90210';

export const paymentInfoLocator = '[data-test="payment-info-value"]';
export const shippingInfoLocator = '[data-test="shipping-info-value"]';

export const paymentInformation = {
    card : "SauceCard #31337",
    shipping : "Free Pony Express Delivery!",
    }
export const quantityOfProducts = '[data-test="item-quantity"]';
export const nameOfProduct = '[data-test="item-4-title-link"]';
export const descriptionOfProduct ='[data-test="inventory-item-desc"]';
export const priceOfProduct = '[data-test="inventory-item-price"]';

export const errorMessageCheckoutLocator = '[data-test="error"]';
export const finishButton = '[data-test="finish"]';
export const completeOrderHeaderLocator = '[data-test="complete-header"]';
export const completeOrderWholeLocator = '[data-test="complete-text"]';


// error messages texts:
export const errorLoginMessage = "Epic sadface: You can only access '/inventory.html' when you are logged in.";
export const errorLockedOutUserMessage = "Epic sadface: Sorry, this user has been locked out.";
export const errorFirstNameRequired = 'Error: First Name is required';
export const errorLastNameRequired = 'Error: Last Name is required';
export const errorPostalCodeRequired = 'Error: Postal Code is required';
export const completeOrderHeaderText = 'Thank you for your order!';
export const completeOrderWholeText= 'Your order has been dispatched, and will arrive just as fast as the pony can get there!';