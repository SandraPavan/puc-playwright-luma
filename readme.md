## Projeto - Testes automatizados com PlayWright


O trabalho foi realizado através de cenários de teste  utilizando o framework de automação Playwright
Linguagem utilizada: Typescript

Para instalar as dependência utilize o seguinte comando:

```npm install```

Para rodar sem uso do navegador

```npx playwright test```

Para rodar observando os testes no navegador

```npx playwright --ui```

No arquivo ```playwright.config.ts```descontamentar as linhas 31 a 34 que vai ativar o uso do navegador com time de 400ms para rodar os testes

Para realizar o debug dos testes utilize

```npx playwright test --debug```