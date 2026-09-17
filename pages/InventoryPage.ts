import{Page,Locator}from'@playwright/test';
export class InventoryPage{
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly productSortDropdown: Locator;
    readonly cartIcon:Locator;
    readonly logoutLink:Locator;
    readonly cartBadge:Locator;
    readonly burgerMenuButton: Locator;

    constructor(page:Page){
    this.page = page;
    this.pageTitle = page.locator('.title');
    this.productSortDropdown = page.locator('.product_sort_container');
    this.cartIcon = page.locator('.shopping_cart_link');
    this.logoutLink = page.locator('#logout_sidebar_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.burgerMenuButton = page.locator('#react-burger-menu-btn');
    }

    async addProductToCart(productDataTestName:string)
    {
       await this.page.locator(`[data-test="add-to-cart-${productDataTestName}"]`).click();
     }
    
      async removeProductToCart(productDataTestName:string)
    {
       await this.page.locator(`[data-test="remove-${productDataTestName}"]`).click();
     }

     async openCart()
     {
        await this.cartIcon.click();
     }

     async logout()
     {
        await this.burgerMenuButton.click();
        await this.logoutLink.click();
     }
    }