// @ts-check
const { test, expect } = require('@playwright/test');
const { BookPage } = require('./BookPage.js');

test('Search', async ({ page }) => {
    const booksPage = new BookPage(page);

    await booksPage.goto();

    const searchResults = await booksPage.searchBook('Âm');

    const bookCount = await booksPage.getBookCount();
    expect(bookCount).toBeGreaterThan(0);

    const firstBookTitle = await searchResults.nth(0).textContent();
    expect(firstBookTitle).toContain('Âm');
});

test('Pagination', async ({ page }) => {
    const booksPage = new BookPage(page);

    await booksPage.goto();
  
    const pageCount = await booksPage.getPageCount();
  
    const pagination = await booksPage.getPagination();
    if (pageCount <= 1) {
        expect(await pagination.isVisible()).toBeFalsy();
    }
    else {
        expect(await pagination.isVisible()).toBeTruthy();
    }
});

test('Dropdown', async ({ page }) => {
    const booksPage = new BookPage(page);

    await booksPage.goto();
  
    const searchResults = await booksPage.searchByGenreId("1");

    expect(await searchResults.count()).toBeGreaterThan(0);
});

test('Go to Book detail', async ({ page }) => {
    const booksPage = new BookPage(page);

    await booksPage.goto();
  
    await booksPage.clickFirstBook();
  
    // Kiểm tra điều hướng đến trang chi tiết
    await expect(page).toHaveURL(/.*\/Books\/Details\/.*/);
});