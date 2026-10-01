# Sauce Demo UI automation

Playwright + TypeScript tests for [Sauce Demo](https://www.saucedemo.com/), using page objects and custom fixtures. Browser: Chromium.

## Installation and environment

Requires Node.js 22+ and npm. From the project root:

```sh
npm ci
npx playwright install chromium
cp .env.example .env
```

Set `PASSWORD` in `.env` to the public demo password shown on the Sauce Demo login page. `TEST_ENV` is optional and defaults to `dev` (Sauce Demo). `.env` is excluded from Git.

## Run commands

| Command | Purpose |
| --- | --- |
| `npm test` | Run all tests headlessly |
| `npm run test/headed` | Run with a visible browser |
| `npm run test/ui` | Open Playwright UI mode |
| `npm run test/debug` | Run with the Playwright Inspector |
| `npm run typecheck` | Check TypeScript types |

Run one suite:

```sh
npm test -- tests/e2e/inventory.spec.ts
```

## Report

After the tests finish, generate and open the latest Allure report. Stop the server with `Ctrl+C`.

```sh
npm run report:open
```

## Project structure

```text
pages/                Page objects and shared navigation
fixtures/             Page object fixtures
tests/e2e/            Test suites
helpers/              Test data generation, sorting and pricing
test_data/            Expected product data
reporters/            Cleanup of previous Allure results
global-setup.ts       Login and saved authentication state
env.config.ts         Environment and test accounts
playwright.config.ts  Browser, execution and reporting settings
```

## Test cases

15 tests across four suites:

| Suite | Tests | Coverage |
| --- | --- | --- |
| Authentication | 3 | Successful login, logout, locked account rejection |
| Inventory | 6 | Product catalog, product details, four parametrized name/price sorting options |
| Cart | 3 | Add one product, add multiple products, remove a product and verify cart badge |
| Checkout | 3 | Required customer fields, subtotal/tax/total, order confirmation and return to inventory |
