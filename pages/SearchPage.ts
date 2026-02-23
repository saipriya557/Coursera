import { Page } from '@playwright/test';

export class SearchPage {
    constructor(private page: Page) { }

    async openLanguageFilter() {

        const language = this.page.getByTestId('filter-dropdown-language');
        await language.click();
         
    }

    async openLevelFilter() {
        await this.page.locator("[data-testid='filter-dropdown-productDifficultyLevel']").click();
       // await this.page.getByRole('button', { name: "Level" }).click();
    }

    async getLanguageOptions() {
        return this.page.locator(".cds-checkboxAndRadio-labelContent.css-tvqrra");
    }

    async getLevelOptions() {
        return this.page.locator('//span[contains(@class,"cds-checkboxAndRadio-labelContent css-tvqrra")]');
    }

    async applyView() {
        await this.page.getByRole('button', { name: "View" }).click();
    }

    async clearFilters() {
        await this.page.getByRole('button', { name: "clear all" }).click();
    }

    async filterByLanguage(language: string) { 
        //await this.page.getByRole('button', { name: "Language" }).click(); 
        const lang = this.page.getByTestId('filter-dropdown-language');
        await lang.click();
        await this.page.getByRole('checkbox', { name: language }).click(); 
        await this.page.getByRole('button', { name: "View" }).click(); 
    } 
    
    async filterByLevel(level: string) { 
       // await this.page.getByRole('button', { name: "Level" }).click(); 
        await this.page.locator("[data-testid='filter-dropdown-productDifficultyLevel']").click();
        await this.page.getByRole('checkbox', { name: level }).click(); 
        await this.page.getByRole('button', { name: "View" }).click(); 
    }

}
