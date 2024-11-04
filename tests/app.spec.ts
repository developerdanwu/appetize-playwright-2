import { test, expect } from '@playwright/test';

test('homepage has correct title and counter functionality', async ({ page }) => {
  await page.goto('/');

  // Check title
  await expect(page).toHaveTitle('Vite + React + TS');

  // Check logos are visible
  await expect(page.getByAltText('Vite logo')).toBeVisible();
  await expect(page.getByAltText('React logo')).toBeVisible();

  // Test counter functionality
  const counterButton = page.getByRole('button', { name: /count is/i });
  await expect(counterButton).toHaveText('count is 0');
  
  await counterButton.click();
  await expect(counterButton).toHaveText('count is 1');
});

test('logos have correct links', async ({ page }) => {
  await page.goto('/');

  const viteLink = page.getByRole('link', { name: /vite/i });
  const reactLink = page.getByRole('link', { name: /react/i });

  await expect(viteLink).toHaveAttribute('href', 'https://vite.dev');
  await expect(reactLink).toHaveAttribute('href', 'https://react.dev');
});