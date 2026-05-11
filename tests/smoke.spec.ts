import { test, expect, type ConsoleMessage } from '@playwright/test';

const pages = ['/', '/about/', '/setting/', '/qualifications/', '/news/', '/contact/', '/privacy/', '/thanks/'];

for (const path of pages) {
  test(`${path} renders without console errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg: ConsoleMessage) => {
      if (msg.type() !== 'error') return;
      // Ignore noise from third-party iframes we don't control (e.g.
      // Facebook's embedded-posts plugin emits ErrorUtils warnings).
      const url = msg.location()?.url ?? '';
      if (url.includes('facebook.com') || url.includes('fbcdn.net')) return;
      errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(err.message));

    const response = await page.goto(path);
    expect(response?.status(), `HTTP status for ${path}`).toBe(200);

    // Scope to body > * to avoid Astro's injected dev toolbar headers/footers
    await expect(page.locator('body > header')).toBeVisible();
    await expect(page.locator('body > footer')).toBeVisible();
    await expect(page.locator('main h1')).toBeVisible();

    expect(errors, `console errors on ${path}`).toEqual([]);
  });
}

test('contact form has required fields', async ({ page }) => {
  await page.goto('/contact/');
  await expect(page.locator('input[name="name"]')).toBeVisible();
  await expect(page.locator('input[name="email"]')).toBeVisible();
  await expect(page.locator('input[name="phone"]')).toBeVisible();
  await expect(page.locator('textarea[name="message"]')).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toBeVisible();
});

test('primary nav links resolve', async ({ page }) => {
  await page.goto('/');
  for (const path of ['/about/', '/setting/', '/qualifications/', '/news/', '/contact/']) {
    const response = await page.request.get(path);
    expect(response.status(), `nav target ${path}`).toBe(200);
  }
});
