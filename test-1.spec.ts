import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://admin-demo.nopcommerce.com/login?returnUrl=%2Fadmin%2F');
  await page.getByRole('textbox', { name: 'Email:' }).fill('admin@yourstore.com');
  await page.getByRole('textbox', { name: 'Email:' }).press('Tab');
  await page.getByRole('textbox', { name: 'Password:' }).press('Enter');
  await page.locator('iframe[src="https://challenges.cloudflare.com/cdn-cgi/challenge-platform/h/g/turnstile/f/av0/rch/qvbo0/0x4AAAAAAADnPIDROrmt1Wwj/light/fbE/new/normal?lang=auto"]').contentFrame().locator('body').click();
});