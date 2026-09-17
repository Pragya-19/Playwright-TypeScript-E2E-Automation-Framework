import{Page,Locator} from '@playwright/test';

export class CartPage{
    readonly page:Page;
    readonly removeButton:Locator;
    readonly continueshoppingButton:Locator;
    readonly checkoutButton:Locator;
    readonly cartItems:Locator;


    constructor(page:Page)
    {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.removeButton = page.locator('.btn_small cart_button');
        this.continueshoppingButton = page.locator('[data-test="continue-shopping"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');

    }

    async clickCheckout()
    {
        await this.checkoutButton.click();
    }
 
async clickContinueShopping()
{
    await this.continueshoppingButton.click();
}

}