Test Report available at [GitHub Pages](https://shibiza.github.io/SaucedemoUItesting/)

🛠 Automated UI Test Suite for Saucedemo

This repository contains an automated UI test suite for regression testing of the Saucedemo website using Playwright.

The tests are structured in the Given, When, Then format, following the Behavior-Driven Development (BDD) approach. The suite tests various functionalities of the website to ensure everything works correctly for end-users.

My project is developed using the Page Object Model (POM) framework, which helps in creating an abstraction layer for web elements to enhance maintainability and reusability. Additionally, the project is structured according to the four core principles of Object-Oriented Programming (OOP): Encapsulation, Abstraction, Inheritance, and Polymorphism, ensuring better code organization, flexibility, and scalability.

🌐 Website Under Test:

Saucedemo (https://www.saucedemo.com/)

📝 Test Scenarios

The test scenarios cover the following areas:

🔑 Authentication Tests

1. User should be able to log in with a standard user given the correct credentials.

2. User should not be able to access the e-shop inventory without logging in.

3. User whose access is denied (locked_out_user) should not be able to log in.

4. User should be logged out once the Logout button is pressed.

🏷 Inventory Management Tests

5. User should be able to filter the inventory according to the option chosen.

6. User should see the correct product details such as image, product name, description, and price.

🛒 Cart Management Tests

7. User should see the added product in their cart.

8. User should see the cart icon update accordingly when adding a product to the cart.

9. User should be able to remove the added product on the cart page.

10. User should be able to remove the added product from the cart on the inventory page.

11. User should be able to remove the added product from the cart on the specific product page.

12. User should be able to continue shopping from the cart page.

💳 Checkout Tests

13. User should see the checkout overview with details such as payment, shipping info, and price total.

14. (14A, 14B, 14C) User should get notified when they fail to enter any of the checkout information.

15. User should get notified after placing a successful order.

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
