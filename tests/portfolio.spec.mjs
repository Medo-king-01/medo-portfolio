import { test, expect } from '@playwright/test';

async function visit(page, language = 'en') {
  // The test environment may not have access to Google Fonts; the site has local font fallbacks.
  await page.route('https://fonts.googleapis.com/**', (route) => route.abort());
  await page.addInitScript((value) => {
    if (!localStorage.getItem('portfolio-language')) localStorage.setItem('portfolio-language', value);
  }, language);
  await page.goto('/');
  const preloader = page.locator('div[class*="z-[100000]"]');
  await preloader.waitFor({ state: 'detached' });
}

async function scrollToCard(page, selector, index, count) {
  await page.locator(selector).first().evaluate((element, { index, count }) => {
    const stage = element.closest('.sticky').parentElement;
    const start = window.scrollY + stage.getBoundingClientRect().top;
    window.scrollTo({ top: start + (stage.offsetHeight - window.innerHeight) * index / (count - 1), behavior: 'instant' });
  }, { index, count });
  await page.waitForTimeout(400);
  await expect(page.locator(selector).nth(index)).toHaveAttribute('aria-pressed', 'true');
}

async function activateAtVisualCenter(page, locator, useTouch) {
  const box = await locator.boundingBox();
  if (!box) throw new Error('Cannot interact with a card outside the viewport.');
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  if (useTouch) await page.touchscreen.tap(x, y);
  else await page.mouse.click(x, y);
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
  const switcher = page.locator('nav button[aria-label]:visible').filter({ hasText: testInfo.project.name === 'desktop' ? 'العربية' : 'AR' });
  await switcher.click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('portfolio-language'))).toBe('ar');
  // Reload without a script that overwrites the saved preference.
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  await page.locator('div[class*="z-[100000]"]').waitFor({ state: 'detached' });
  if (testInfo.project.name !== 'desktop') {
    const menu = page.locator('nav button[aria-expanded]');
    await expect(page.locator('#mobile-menu')).toHaveAttribute('inert', '');
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await expect(page.locator('#mobile-menu')).not.toHaveAttribute('inert');
    await page.keyboard.press('Escape');
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('#mobile-menu')).toHaveAttribute('inert', '');
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
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

test('section order, active navigation, themes, scroll progress and back-to-top', async ({ page }) => {
  await visit(page);
  const sectionOrder = await page.locator('[data-experience-section]').evaluateAll((sections) => sections.map((section) => section.id));
  expect(sectionOrder).toEqual(['home', 'about', 'story', 'skills', 'projects', 'certifications', 'beyond-tech', 'ai-toolkit', 'leadership', 'perspective', 'contact', 'footer']);
  const desktopNavOrder = await page.locator('nav > div:first-child > div:nth-child(2) a').evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  expect(desktopNavOrder).toEqual(['#home', '#about', '#story', '#skills', '#projects', '#certifications', '#beyond-tech', '#ai-toolkit', '#leadership', '#perspective', '#contact']);
  for (const removedId of ['process', 'how-i-work', 'softskills']) {
    await expect(page.locator(`#${removedId}`)).toHaveCount(0);
    await expect(page.locator(`nav a[href="#${removedId}"]`)).toHaveCount(0);
  }
  await expect(page.locator('nav a[href="#home"][aria-current="location"]').first()).toBeAttached();
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await expect(page.locator('nav a[href="#projects"][aria-current="location"]').first()).toBeAttached();

  const themeButton = page.getByRole('button', { name: 'Switch to Dark Mode' }).first();
  await themeButton.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect.poll(() => page.evaluate(() => localStorage.getItem('portfolio-theme'))).toBe('dark');
  await page.getByRole('button', { name: 'Switch to Light Mode' }).first().click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  const progress = page.locator('#root > div[aria-hidden="true"] > div');
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect.poll(() => progress.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).a)).toBeLessThan(0.01);
  const backToTop = page.locator('#footer button');
  await backToTop.scrollIntoViewIfNeeded();
  await expect.poll(() => progress.evaluate((element) => new DOMMatrixReadOnly(getComputedStyle(element).transform).a)).toBeGreaterThan(0.1);
  await backToTop.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(2);
});

test('desktop projects pin and scrub horizontally without widening the page', async ({ page }, testInfo) => {
  if (testInfo.project.name !== 'desktop') test.skip();
  await page.setViewportSize({ width: 1366, height: 768 });
  await visit(page);

  const section = page.locator('#projects');
  const stage = section.locator('.projects-stage');
  const track = section.locator('.projects-track');
  const jumps = section.locator('.project-index-button');
  await expect(section).toHaveClass(/is-horizontal/);
  await expect(track).toHaveAttribute('role', 'group');
  await expect(track).toHaveAttribute('tabindex', '0');
  await expect(jumps).toHaveCount(6);

  const initial = await page.evaluate(() => {
    const stageElement = document.querySelector('#projects .projects-stage');
    const trackElement = document.querySelector('#projects .projects-track');
    const firstCard = trackElement.children[0];
    const distance = Math.max(
      Math.max(trackElement.scrollWidth, trackElement.offsetWidth) - (trackElement.parentElement?.clientWidth || 0),
      0,
    );
    const scrollLength = distance + window.innerHeight * 0.65;
    return {
      stageStart: stageElement.getBoundingClientRect().top + window.scrollY,
      cardWidth: firstCard.getBoundingClientRect().width,
      distance,
      scrollLength,
      pageOverflow: Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) - window.innerWidth,
    };
  });
  expect(initial.pageOverflow).toBeLessThanOrEqual(1);

  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), initial.stageStart + initial.scrollLength / 2);
  await expect.poll(async () => Math.abs(await stage.evaluate((element) => element.getBoundingClientRect().top))).toBeLessThan(2);
  await expect.poll(async () => page.locator('.projects-track').evaluate((element, distance) => {
    const matrix = new DOMMatrixReadOnly(getComputedStyle(element).transform);
    return Math.abs(matrix.m41 + distance / 2);
  }, initial.distance)).toBeLessThan(35);
  const desktopCardWidth = await track.locator('.project-track-card').first().evaluate((element) => element.getBoundingClientRect().width);
  expect(Math.abs(desktopCardWidth - 832)).toBeLessThan(2);

  const finalPageOverflow = await page.evaluate(() => Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
  ) - window.innerWidth);
  expect(finalPageOverflow).toBeLessThanOrEqual(1);
});

test('tablet and mobile projects use native horizontal snap while vertical scrolling stays free', async ({ page }, testInfo) => {
  if (!['tablet', 'mobile', 'short-mobile'].includes(testInfo.project.name)) test.skip();
  await visit(page);

  const section = page.locator('#projects');
  const track = section.locator('.projects-track');
  const jumps = section.locator('.project-index-button');
  await expect(section).not.toHaveClass(/is-horizontal/);
  await expect(track).toHaveCSS('overflow-x', 'auto');
  await expect(track).toHaveCSS('scroll-snap-type', 'x mandatory');
  await expect(track.locator('.project-gallery-card')).toHaveCount(6);

  await section.scrollIntoViewIfNeeded();
  for (const index of [1, 5]) {
    const jump = jumps.nth(index);
    await jump.click();
    await expect(jump).toHaveAttribute('aria-current', 'step');
    await expect.poll(() => track.evaluate((element) => Math.abs(element.scrollLeft))).toBeGreaterThan(0);
  }

  const header = section.locator('header');
  await header.scrollIntoViewIfNeeded();
  const box = await header.boundingBox();
  if (!box) throw new Error('Projects heading is not visible.');
  const beforeWheel = await page.evaluate(() => window.scrollY);
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.wheel(0, 240);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(beforeWheel);

  expect(await page.evaluate(() => Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
  ) <= window.innerWidth + 1)).toBe(true);
});
test('OS reduced-motion preference does not disable the animated desktop gallery', async ({ page }, testInfo) => {
  if (testInfo.project.name !== 'desktop') test.skip();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await visit(page);
  await expect(page.locator('#projects')).toHaveClass(/is-horizontal/);
  await expect(page.locator('.hero-grid-plane')).toHaveCSS('animation-name', 'hero-grid-drift');
});

test('all projects and certificates open, close, and load their previews', async ({ page, request }, testInfo) => {
  await visit(page, testInfo.project.name === 'mobile' ? 'ar' : 'en');
  const projects = page.locator('#projects .project-gallery-card');
  const projectJumps = page.locator('#projects .project-index-button');
  await expect(projects).toHaveCount(6);
  await expect(projectJumps).toHaveCount(6);
  // Use the numbered controls so both the pinned and native-scroll modes are covered.
  for (const index of [0, 1, 2, 3, 4, 5, 3]) {
    const jump = projectJumps.nth(index);
    await jump.click();
    await expect(jump).toHaveAttribute('aria-current', 'step');
    await expect.poll(async () => {
      const box = await page.locator('.projects-stage').boundingBox();
      return Math.abs(box?.y ?? Number.POSITIVE_INFINITY);
    }, { timeout: 10000 }).toBeLessThan(3);
    const card = projects.nth(index);
    await expect.poll(async () => {
      const box = await card.boundingBox();
      const centerX = box && box.x + box.width / 2;
      return box && centerX >= -2 && centerX <= testInfo.project.use.viewport.width + 2;
    }, { timeout: 10000 }).toBe(true);
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
    if (!testInfo.project.use.hasTouch) await expect(card).toBeFocused();
  }
  const certificates = page.locator('.certificate-wheel-card');
  const nativeCertificates = testInfo.project.name !== 'desktop';
  await expect(certificates).toHaveCount(11);
  const selectCertificate = async (index) => {
    if (nativeCertificates) {
      await page.locator('.certificate-native-dot').nth(index).click();
      await expect(certificates.nth(index)).toHaveAttribute('aria-pressed', 'true');
    } else {
      await scrollToCard(page, '.certificate-wheel-card', index, 11);
    }
  };
  const certificateControls = testInfo.project.name === 'mobile'
    ? { next: 'التالي', previous: 'السابق' }
    : { next: 'Next', previous: 'Previous' };

  await selectCertificate(0);
  await page.getByRole('button', { name: certificateControls.next }).click();
  await expect(certificates.nth(1)).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: certificateControls.previous }).click();
  await expect(certificates.nth(0)).toHaveAttribute('aria-pressed', 'true');
  await page.locator('button[aria-label^="Go to certificate 11:"]').click();
  await expect(certificates.nth(10)).toHaveAttribute('aria-pressed', 'true');

  for (let index = 0; index < 11; index++) {
    await selectCertificate(index);
    const card = certificates.nth(index);
    await expect.poll(() => card.locator('img').evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);
    await activateAtVisualCenter(page, card, testInfo.project.use.hasTouch);
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
    if (!testInfo.project.use.hasTouch) await expect(card).toBeFocused();
  }
});

test('About portrait drags with a fine pointer and allows touch scrolling', async ({ page, context }, testInfo) => {
  await visit(page);
  const portrait = page.locator('#about .about-card-physics');
  await portrait.scrollIntoViewIfNeeded();
  const box = await portrait.boundingBox();
  if (!box) throw new Error('About portrait is not visible.');
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;

  if (testInfo.project.use.hasTouch) {
    const before = await page.evaluate(() => window.scrollY);
    const session = await context.newCDPSession(page);
    await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y, id: 1 }] });
    await session.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y - 140, id: 1 }] });
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(before + 10);
    await expect(portrait).not.toHaveClass(/about-card-grabbing/);
    await session.detach();
  } else {
    const initialTransform = await portrait.evaluate((element) => element.style.transform);
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x + 120, y - 45, { steps: 6 });
    await expect(portrait).toHaveClass(/about-card-grabbing/);
    await expect.poll(() => portrait.evaluate((element) => element.style.transform)).not.toBe(initialTransform);
    await page.mouse.up();
    await expect(portrait).not.toHaveClass(/about-card-grabbing/);
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

test('journey remains scroll-driven when the OS requests reduced motion', async ({ page }) => {
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

test('OS reduced-motion preference does not disable desktop certificate motion', async ({ page }, testInfo) => {
  if (testInfo.project.name !== 'desktop') test.skip();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await visit(page);
  await expect(page.locator('.certificate-wheel-scene')).toHaveCount(1);
  await expect(page.locator('.certificate-native-track')).toHaveCount(0);
});

test('resizing and orientation changes switch between pinned and native scenes safely', async ({ page }, testInfo) => {
  if (testInfo.project.name !== 'desktop') test.skip();
  await visit(page);
  const projects = page.locator('#projects');
  await expect(projects).toHaveClass(/is-horizontal/);
  await expect(page.locator('.certificate-wheel-scene')).toHaveCount(1);

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(projects).not.toHaveClass(/is-horizontal/);
  await expect(page.locator('.certificate-native-track')).toBeVisible();

  await page.setViewportSize({ width: 844, height: 390 });
  await expect(projects).not.toHaveClass(/is-horizontal/);
  await expect(page.locator('.certificate-native-track')).toBeVisible();
  expect(await page.evaluate(() => Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) <= innerWidth + 1)).toBe(true);

  await page.setViewportSize({ width: 1366, height: 768 });
  await expect(projects).toHaveClass(/is-horizontal/);
  await expect(page.locator('.certificate-wheel-scene')).toHaveCount(1);
  expect(await page.evaluate(() => Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) <= innerWidth + 1)).toBe(true);
});
test('aria-hidden regions contain no keyboard-focusable controls', async ({ page }) => {
  await visit(page);
  const focusableInHiddenRegions = await page.evaluate(() => {
    const selector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]';
    return [...document.querySelectorAll('[aria-hidden="true"]')].flatMap((region) => {
      if (region.inert || region.closest('[inert]')) return [];
      const candidates = [
        ...(region.matches(selector) ? [region] : []),
        ...region.querySelectorAll(selector),
      ];
      return candidates
        .filter((element) => element.tabIndex >= 0)
        .map((element) => `${region.tagName.toLowerCase()} ${element.tagName.toLowerCase()}.${element.className}`);
    });
  });
  expect(focusableInHiddenRegions).toEqual([]);
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
