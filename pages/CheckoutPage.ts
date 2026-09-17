import{Page,Locator}from'@playwright/test';
export class CheckoutPage{
    readonly page:Page;
    readonly firstNameInput:Locator;
    readonly lastNameInput:Locator;
    readonly postalCodeInput:Locator;
    readonly continueButton:Locator;
    readonly finishButton:Locator;
    readonly summaryTotalLabel:Locator;
    readonly completeHeader:Locator;

    constructor(page:Page)
    {
        this.page = page;
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.summaryTotalLabel = page.locator('.summary_total_label');
        this.completeHeader = page.locator('.complete-header');
    }

    async fillCustomerInformation(first:string,last:string,zip:string)
    {
        await this.firstNameInput.fill(first);
        await this.lastNameInput.fill(last);
        await this.postalCodeInput.fill(zip);
        await this.continueButton.click();
    }

    async clickFinish()
    {
        await this.finishButton.click();
    }
}