import { test, expect } from '@playwright/test';

test.describe('Mobile App Tests', () => {
  test('should display correctly on mobile', async ({ page }) => {
    await page.goto('/');
    
    // Check viewport size is mobile
    const viewport = page.viewportSize();
    expect(viewport?.width).toBeLessThan(768);
    
    // Check responsive layout
    await expect(page.locator('#root')).toBeVisible();
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should handle touch interactions', async ({ page }) => {
    await page.goto('/');
    
    // Test counter button with touch
    const button = page.locator('button');
    await expect(button).toContainText('count is 0');
    
    // Simulate touch tap
    await button.tap();
    await expect(button).toContainText('count is 1');
  });

  test('should have proper mobile meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Verify viewport meta tag
    const viewportMeta = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewportMeta).toContain('width=device-width');
    expect(viewportMeta).toContain('initial-scale=1.0');
  });
});