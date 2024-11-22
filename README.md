Test Report available at [GitHub Pages](https://shibiza.github.io/SaucedemoUItesting/)

🛠 Automated UI Test Suite for Saucedemo
This repository contains an automated UI test suite for regression testing of the Saucedemo website using Playwright.

The tests are structured in the Given, When, Then format, following the Behavior-Driven Development (BDD) approach. The suite tests various functionalities of the website to ensure everything works correctly for end-users.

🌐 Website Under Test:
Saucedemo

📝 Test Scenarios
The test scenarios cover the following areas:

🔑 Authentication Tests
User should be able to log in with a standard user given the correct credentials.
User should not be able to access the e-shop inventory without logging in.
User whose access is denied (locked_out_user) should not be able to log in.
User should be logged out once the Logout button is pressed.
🏷 Inventory Management Tests
User should be able to filter the inventory according to the option chosen.
User should see the correct product details such as image, product name, description, and price.
🛒 Cart Management Tests
User should see the added product in their cart.
User should see the cart icon update accordingly when adding a product to the cart.
User should be able to remove the added product on the cart page.
User should be able to remove the added product from the cart on the inventory page.
User should be able to remove the added product from the cart on the specific product page.
User should be able to continue shopping from the cart page.
💳 Checkout Tests
User should see the checkout overview with details such as payment, shipping info, and price total.
User should get notified when they fail to enter any of the checkout information.
User should get notified after placing a successful order.
🔄 Additional Scenarios
EXTRA SCENARIO FROM YOU.
EXTRA SCENARIO FROM YOU.
🏃‍♂️ Running the Tests
To run the test suite locally, follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/shibiza/SaucedemoUItesting.git
cd SaucedemoUItesting
Install dependencies: Make sure you have Node.js installed. Then, run:

bash
Copy code
npm install
Run the tests: To run all tests:

bash
Copy code
npx playwright test
You can also run specific test suites by using the --project option:

bash
Copy code
npx playwright test tests/auth --project=chromium
Viewing the Test Report: The test results will be available on GitHub Pages.

🔧 CI/CD Pipeline
The tests are set up to run in a CI/CD pipeline, and they can be triggered manually or on a scheduled basis:

Manual Trigger: You can trigger the test run from the GitHub Actions UI.
Scheduled Run: The tests are scheduled to run automatically at 11:00 PM UTC every Monday to Friday.
