import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import * as testData from '../data/testData.json';

test.describe('SauceDemo Master E-Commerce Framework Testing Suite', () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        await loginPage.navigate();
    });
    // PAGE 1: LOGIN LANDING PAGE TESTS (5 Test Cases)
    test.describe('Module 1 - Login Page Validations', () => {
        test('TC01: Successful Login with Valid Credentials', async ({ page }) => {
            await loginPage.login(testData.validUser,testData.validPassword);
            await expect(page).toHaveURL(/.*inventory.html/);
        });
    test('TC02: Login Failure with Invalid Credentials', async () => {
        await loginPage.login(testData.invalidUser,'wrong_pass');
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText(/Username and password do not match/);
    });
    test('TC03: Login Failure with Locked Out User Profile', async () => {
        await loginPage.login(testData.locked_out_user,testData.validPassword);
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText(/ Sorry, this user has been locked out/);
    });
    test('TC04: Login Validation Error when Password field is empty', async () => {
        await loginPage.usernameInput.fill(testData.validUser);
        await loginPage.loginButton.click();
        await expect(loginPage.errorMessage).toHaveText(/Password is required/);

    });
    test('TC05: Verification of visual placeholders fields availability', async () => {
        await expect(loginPage.usernameInput).toHaveAttribute('placeholder','Username');
        await expect(loginPage.passwordInput).toHaveAttribute('placeholder','Password');
    });
                

    });

    // PAGE 2: INVENTORY CATALOG PAGE TESTS (5 Test Cases)
    test.describe('Module 2 - Inventory Catalog Validations', () => {
        test.beforeEach(async()=>{
            await loginPage.login(testData.validUser,testData.validPassword);
        });
    test('TC06: Verify Title Header exists on Landing page', async () => {
        await expect(inventoryPage.pageTitle).toBeVisible();
        await expect(inventoryPage.pageTitle).toHaveText('Products');
    });
    test('TC07: Adding Single item increments Cart Badge', async () => {
        await inventoryPage.addProductToCart(testData.products.backpack);
        await expect(inventoryPage.cartBadge).toHaveText('1');
    });

    test('TC08: Removing item updates Cart Badge accurately', async () => {
        await inventoryPage.addProductToCart(testData.products.backpack);
        await inventoryPage.removeProductToCart(testData.products.backpack);
        await expect(inventoryPage.cartBadge).not.toBeVisible();
    });
    test('TC09: Multiple product selection stacks cart metrics count', async () => {
        await inventoryPage.addProductToCart(testData.products.backpack);
        await inventoryPage.addProductToCart(testData.products.backlight);
        await expect(inventoryPage.cartBadge).toHaveText('2');
    });
    test('TC10: Successful Session Logout from Burger Drawer Link navigation', async ({ page }) => {
        await inventoryPage.logout();
        await expect(page).toHaveURL('https://www.saucedemo.com/');
    });

    });
    // PAGE 3: SHOPPING CART PREVIEW PAGE TESTS (5 Test Cases)
    test.describe('Module 3 - Inventory Catalog Validations', () => {
        test.beforeEach(async()=>{
            await loginPage.login(testData.validUser,testData.validPassword);
    });
    test('TC11: Navigation to Cart via Cart Icon Click', async ({ page }) => {
        await inventoryPage.openCart();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    });
    test('TC12: Assert product information transfers cleanly to the cart inventory items array list', async () => {
        await inventoryPage.addProductToCart(testData.products.backpack);
        await inventoryPage.openCart();
        await expect(cartPage.cartItems).toHaveCount(1);
    });
    test('TC13: Ability to drop items directly from inside the cart component review section', async () => {
        await inventoryPage.addProductToCart(testData.products.backpack);
        await inventoryPage.openCart();
        await cartPage.removeButton.click();
    });
    test('TC14: Continue Shopping action returns execution focus safely back to Product list catalog', async ({ page }) => {
        await inventoryPage.openCart();
        await cartPage.clickContinueShopping();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
     test('TC15: Checkout button redirection links directly onto client forms mapping wizard steps', async ({ page }) => {
        await inventoryPage.addProductToCart(testData.products.backpack);
        await inventoryPage.openCart();
        await cartPage.clickCheckOut();
        await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
     });
});
     // PAGE 4: CHECKOUT PROCESSOR PAGE TESTS (5 Test Cases)
     test.describe('Module 4 - CHECKOUT PROCESSOR PAGE TESTS', () => {
        test.beforeEach(async()=>{
            await loginPage.login(testData.validUser,testData.validPassword);
            await inventoryPage.addProductToCart(testData.products.backpack);
            await inventoryPage.openCart();
            await cartPage.clickCheckOut();
    });
    test('TC16: Form Validation Requirement triggers missing input error if First Name field is absent', async () => {
            await checkoutPage.lastNameInput.fill(testData.customerDetails.lastname);
            await checkoutPage.postalCodeInput.fill(testData.customerDetails.postalcode);
            await checkoutPage.continueButton.click();
            await expect(checkoutPage.page.locator('[data-test="error"]')).toHaveText(/Error: First Name is required/);
    });
    test('TC17: Complete Delivery Validation maps to Review Step Two', async ({ page }) => {
            await checkoutPage.fillCustomerInformation(testData.customerDetails.firstname,testData.customerDetails.lastname,testData.customerDetails.postalcode);
            await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');

    });
    test('TC18: Financial Total Price Calculation summary details presence verification', async () => {
            await checkoutPage.fillCustomerInformation(testData.customerDetails.firstname,testData.customerDetails.lastname,testData.customerDetails.postalcode);
            await expect(checkoutPage.summaryTotalLabel).toBeVisible();
            await expect(checkoutPage.summaryTotalLabel).toContainText('Total: $');
    });
        test('TC19: Successful final confirmation order submission', async () => {
            await checkoutPage.fillCustomerInformation(testData.customerDetails.firstname,testData.customerDetails.lastname,testData.customerDetails.postalcode);
            await checkoutPage.clickFinish();
            await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
        });
    
            test('TC20: System tracking coordinates revert back directly into clean catalog layout state after final reset confirmation', async ({ page }) => {
         await checkoutPage.fillCustomerInformation(testData.customerDetails.firstname,testData.customerDetails.lastname,testData.customerDetails.postalcode);
            await checkoutPage.clickFinish();
            await page.locator('#back-to-products').click();
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');


            });

    });

 });
 