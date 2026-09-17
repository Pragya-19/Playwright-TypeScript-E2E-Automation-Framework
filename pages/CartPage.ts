import{Page,Locator}from'@playwright/test';
export class CartPage{
    readonly page: Page;
    readonly removeButton:Locator;
    readonly continueShoppingButton:Locator;
    readonly checkoutButton:Locator;
    readonly cartItems:Locator;

    constructor(page:Page)
    {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.removeButton = page.locator('.btn_small.cart_button');
        this.continueShoppingButton = page.locator('#continue-shopping');
        this.checkoutButton = page.locator('#checkout');
    }

    async clickCheckOut()
    {
        await this.checkoutButton.click();
    }

    async clickContinueShopping()
    {
        await this.continueShoppingButton.click();
    }
}