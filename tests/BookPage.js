const { expect } = require('@playwright/test');
exports.BookPage = class BookPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.searchInput = 'input[name="searchString"]';
        this.searchButton = 'input[type="submit"]';
        this.bookItem = 'tr.item';
        this.pageItem = '.page-item'
        this.pagination = '.pagination'
        this.selectGenreId = 'select[name="GenreId"]';
        this.firstBook = '.detail >> nth=0'
    }

    async goto() {
        await this.page.goto('/Books');
    }

    async searchBook(keyword) {
        await this.page.fill(this.searchInput, keyword);
        await this.page.click(this.searchButton);
        return await this.page.locator(this.bookItem);
    }

    async searchByGenreId(genreId) {
        await this.page.selectOption(this.selectGenreId, genreId);
        await this.page.click(this.searchButton);
        return await this.page.locator(this.bookItem);
    }

    async getBookCount() {
        const books = await this.page.locator(this.bookItem);
        return await books.count();
    }

    async getPageCount() {
        const pages = await this.page.locator(this.pageItem);
        return await pages.count();
    }

    async getPagination() {
        return await this.page.locator(this.pagination);
    }

    async clickFirstBook() {
        await this.page.locator(this.firstBook).click();
    }
};