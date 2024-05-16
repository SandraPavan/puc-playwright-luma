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
    test("Deve acessar o site e verificar o título da página", async () => {
        await page.goto("https://magento.softwaretestingboard.com/");
        await expect(await page.title()).toBe('Home Page');
    });
    test('Deve preencher o login incorretamente', async () => {
        await page.goto('https://magento.softwaretestingboard.com/');
        await page.getByRole('link', { name: 'Sign In' }).click();
        await page.getByLabel('Email', { exact: true }).click();
        await page.getByLabel('Email', { exact: true }).fill('teste@teste.com.br');
        await page.getByLabel('Email', { exact: true }).press('Tab');
        await page.getByLabel('Password').fill('123');
        await page.getByRole('button', { name: 'Sign In' }).click();      
        const result = await page.getByText ('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.').textContent();      
    });

    test('Deve adicionar um produto aos favoritos', async () => {
        await page.goto('https://magento.softwaretestingboard.com/');
        await page.getByRole('link', { name: 'Sign In' }).click();
        await page.getByLabel('Email', { exact: true }).click();
        await page.getByLabel('Email', { exact: true }).fill('teste@teste.com.br');
        await page.getByLabel('Email', { exact: true }).press('Tab');
        await page.getByLabel('Password').fill('Teste123');
        await page.getByRole('button', { name: 'Sign In' }).click();  
        await page.goto('https://magento.softwaretestingboard.com/');
        await page.goto('https://magento.softwaretestingboard.com/radiant-tee.html');
        await page.getByRole('link', { name: ' Add to Wish List' }).click(); 
    });

    test('Deve adicionar produtos para comparar', async () => {
        await page.goto('https://magento.softwaretestingboard.com/');
        await page.getByRole('link', { name: 'Breathe-Easy Tank' }).first().click();
        await page.getByRole('link', { name: ' Add to Compare' }).click();
        await page.getByRole('link', { name: 'Gabrielle Micro Sleeve Top' }).first().click();
        await page.getByRole('link', { name: ' Add to Compare' }).click();
    });

    test('Deve acessar o departamento dos banners', async () => {
        await page.goto('https://magento.softwaretestingboard.com/');
        await page.getByRole('link', { name: 'New Luma Yoga Collection Get' }).click();
        await expect(page.title()).resolves.toMatch("New Luma Yoga Collection");
    });

    test('Não deve permitir o cadastro de uma order aleatória', async () => {
        await page.goto('https://magento.softwaretestingboard.com/');
        await page.getByRole('link', { name: 'Orders and Returns' }).click();
        await page.getByLabel('Order ID', { exact: true }).fill('Teste123');
        await page.getByLabel('Billing Last Name', { exact: true }).fill('teste1234');
        await page.getByLabel('Email', { exact: true }).fill('teste@teste.com.br');
        await page.getByRole('button', { name: 'Continue' }).click();
        const result = await page.getByText ('You entered incorrect data. Please try again.').textContent();      
    });
})