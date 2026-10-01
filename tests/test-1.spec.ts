import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  
  // Login page
  await expect(page.locator('[data-test="username"]')).toBeVisible();
  await expect(page.locator('[data-test="password"]')).toBeVisible();
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.locator('[data-test="login-credentials"]')).toBeVisible();
  await expect(page.locator('[data-test="login-password"]')).toBeVisible();


  await expect(page.locator('[data-test="title"]')).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
 
});