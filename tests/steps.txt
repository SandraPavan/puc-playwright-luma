import { chromium, expect, test } from '@playwright/test';


let browser;
let page

test.beforeAll( async () => {
    browser = await chromium.launch();
});

test.beforeEach( async () => {
    page = await browser.newPage();
});

test.afterEach( async () => {
    await page.close();
})

test.afterAll( async () => {
    await browser.close();
})

test.describe("Acessando magento", () => {
    test("Deve acessar a home realizar a busca por look", async () => {
        await page.goto("https://magento.softwaretestingboard.com/");
        await page.locator('#search').fill('look');
        await page.getByRole('button', { name: 'Search' }).click();
        await expect(page.title()).resolves.toMatch("Search results for: 'look'");
    });

    test('Deve acessar os itens do Sale, adicionando um item no carrinho', async () => {
        await page.goto("https://magento.softwaretestingboard.com/");
        await page.getByRole('menuitem', { name: 'Sale' }).click();
        await page.getByRole('link', { name: 'Bras & Tanks' }).click();
        await expect(page.title()).resolves.toMatch("Bras & Tanks");
        await page.getByRole('link', { name: 'Antonia Racer Tank' }).first().click()
        await expect(page.title()).resolves.toMatch("Antonia Racer Tank");
        await page.getByLabel('XS').click();
        await page.getByLabel('Black').click();
        await page.getByRole('button', { name: 'Add to Cart' }).click();
    });
    test('Deve acessar as politicas de privacidade', async () => {
        await page.goto("https://magento.softwaretestingboard.com/");
        await page.getByRole('link', { name: 'Privacy and Cookie Policy' }).click();
        await expect(page.title()).resolves.toMatch("Privacy Policy");
    });

    test('Deve acessar um item de compra na home', async () => {
        await page.goto("https://magento.softwaretestingboard.com/");
        await page.getByRole('link', { name: 'Argus All-Weather Tank' }).first().click();
        await expect(page.title()).resolves.toMatch("Argus All-Weather Tank");
        await page.getByLabel('XS').click();
        await page.getByLabel('Gray').click();
        await page.getByRole('button', { name: 'Add to Cart' }).click();
    });
})