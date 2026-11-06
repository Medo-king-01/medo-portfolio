import { test, expect } from '@playwright/test';

async function visit(page, language = 'en') {
  // The test environment may not have access to Google Fonts; the site has local font fallbacks.
  await page.route('https://fonts.googleapis.com/**', (route) => route.abort());
  await page.addInitScript((value) => {
    if (!localStorage.getItem('portfolio-language')) localStorage.setItem('portfolio-language', value);
  }, language);
  await page.goto('/');
  await page.locator('div[class*="z-[100000]"]').waitFor({ state: 'detached' });
}

async function scrollToCard(page, selector, index, count) {
  await page.locator(selector).first().evaluate((element, { index, count }) => {
    const stage = element.closest('.sticky').parentElement;
    const start = window.scrollY + stage.getBoundingClientRect().top;
    window.scrollTo({ top: start + (stage.offsetHeight - window.innerHeight) * index / (count - 1), behavior: 'instant' });
  }, { index, count });
  await page.waitForTimeout(400);
}

test('language, navigation, layout, form validation and storage persistence', async ({ page }, testInfo) => {
  const pageErrors = [];
  const badLocalResponses = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('response', (response) => {
    if (response.url().startsWith('http://127.0.0.1:4174/') && response.status() >= 400) badLocalResponses.push(response.url());
  });
  await visit(page);
  await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
  const switcher = page.locator('nav button[aria-label]:visible').filter({ hasText: testInfo.project.name === 'mobile' ? 'AR' : 'العربية' });
  await switcher.click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('portfolio-language'))).toBe('ar');
  // Reload without a script that overwrites the saved preference.
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await page.locator('div[class*="z-[100000]"]').waitFor({ state: 'detached' });
  if (testInfo.project.name === 'mobile') {
    const menu = page.locator('nav button[aria-expanded]');
    await expect(page.locator('#mobile-menu')).toHaveAttribute('inert', '');
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#mobile-menu')).not.toHaveAttribute('inert');
    await page.locator('nav a[href="#contact"]:visible').first().click();
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#mobile-menu')).toHaveAttribute('inert', '');
  }
  await expect(page.locator('.beyond-card')).toHaveCount(6);
  expect(await page.evaluate(() => Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) <= innerWidth + 1)).toBe(true);
  const form = page.locator('#contact form');
  expect(await form.evaluate((element) => element.checkValidity())).toBe(false);
  await form.locator('#firstName').fill('Test');
  await form.locator('#lastName').fill('User');
  await form.locator('#email').fill('not-an-email');
  await form.locator('#message').fill('Hello');
  expect(await form.evaluate((element) => element.checkValidity())).toBe(false);
  await form.locator('#email').fill('test@example.com');
  expect(await form.evaluate((element) => element.checkValidity())).toBe(true);
  expect(pageErrors).toEqual([]);
  expect(badLocalResponses).toEqual([]);
});

test('all projects and certificates open, close, and load their previews', async ({ page, request }, testInfo) => {
  await visit(page, testInfo.project.name === 'mobile' ? 'ar' : 'en');
  const projects = page.locator('#projects .sticky button');
  await expect(projects).toHaveCount(6);
  // Check both directions, including middle cards whose 3D layers can overlap on mobile.
  for (const index of [0, 1, 2, 3, 4, 5, 3]) {
    await scrollToCard(page, '#projects .sticky button', index, 6);
    const card = projects.nth(index);
    const name = (await card.getAttribute('aria-label')).split(': ').slice(1).join(': ');
    await card.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toHaveAttribute('aria-label', name);
    await expect(dialog.locator('img').first()).toHaveJSProperty('complete', true);
    if (index === 0) {
      const closeButton = dialog.locator('button').first();
      await expect(closeButton).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
      await page.keyboard.press('Tab');
      await expect(closeButton).toBeFocused();
      await dialog.locator('button').nth(1).click();
      await expect(dialog.locator('img')).toHaveCount(1);
      await page.keyboard.press('Escape');
      await expect(dialog).toBeVisible();
    }
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(card).toBeFocused();
  }
  const certificates = page.locator('.certificate-wheel-card');
  await expect(certificates).toHaveCount(11);
  for (let index = 0; index < 11; index++) {
    await scrollToCard(page, '.certificate-wheel-card', index, 11);
    const card = certificates.nth(index);
    await expect.poll(() => card.locator('img').evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);
    await card.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect.poll(() => dialog.locator('img').evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);
    const pdf = await dialog.locator('a[href$=".pdf"]').getAttribute('href');
    expect((await request.get(pdf)).status()).toBe(200);
    if (index === 0) {
      const closeButton = dialog.locator('button').first();
      await expect(closeButton).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      expect(await dialog.evaluate((element) => element.contains(document.activeElement))).toBe(true);
      await page.keyboard.press('Tab');
      await expect(closeButton).toBeFocused();
    }
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(card).toBeFocused();
  }
});

test('contact creates a correctly encoded mailto without claiming delivery', async ({ page, context }) => {
  await visit(page);
  const session = await context.newCDPSession(page);
  await session.send('Page.enable');
  const navigation = new Promise((resolve) => {
    session.on('Page.frameRequestedNavigation', (event) => {
      if (event.url.startsWith('mailto:')) resolve(event.url);
    });
  });
  await page.locator('#firstName').fill('Jane');
  await page.locator('#lastName').fill('Doe');
  await page.locator('#email').fill('jane@example.com');
  await page.locator('#message').fill('Hello\nSecond line');
  await page.locator('#contact button[type="submit"]').click();
  const url = new URL(await navigation);
  expect(url.pathname).toBe('medokingpromax@gmail.com');
  expect(url.searchParams.get('subject')).toContain('Jane Doe');
  expect(url.searchParams.get('body')).toBe('Name: Jane Doe\nEmail: jane@example.com\n\nMessage:\nHello\nSecond line');
  await expect(page.locator('#contact button[type="submit"]')).toContainText('Continue in your email app.');
});

test('journey follows scrolling forward and backward with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await visit(page);
  const cards = page.locator('.beyond-card');
  for (const index of [0, 2, 5, 1]) {
    await page.locator('.beyond-stack-stage').evaluate((stage, index) => {
      const top = window.scrollY + stage.getBoundingClientRect().top;
      window.scrollTo({ top: top + (stage.offsetHeight - innerHeight) * index / 5, behavior: 'instant' });
    }, index);
    await expect(cards.nth(index)).toHaveClass(/beyond-card-active/);
  }
});

test('site remains usable when browser storage is blocked', async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error('Storage blocked'); };
    Storage.prototype.setItem = () => { throw new Error('Storage blocked'); };
  });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.locator('#home')).toBeAttached();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  expect(errors).toEqual([]);
});
