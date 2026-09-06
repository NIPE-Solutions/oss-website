import { expect, test } from '@playwright/test'
import { publicProjects } from '../src/content/projects'
for (const width of [320, 375, 768, 1024, 1440, 1920])
  test(`directory and details reflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    for (const path of [
      '/',
      ...publicProjects.map((p) => `/projects/${p.slug}`),
      '/missing',
    ]) {
      await page.goto(path)
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    }
    await page.goto('/')
    expect(
      await page
        .locator('.hero')
        .evaluate((e) => e.getBoundingClientRect().height),
    ).toBeLessThan(650)
    expect(
      await page.evaluate(() => document.documentElement.scrollHeight),
    ).toBeLessThan(6500)
    if ([375, 768, 1440].includes(width))
      await page.screenshot({
        path: `test-results/home-${width}.png`,
        fullPage: true,
      })
  })
test('200% text zoom preserves links and page width', async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 })
  await page.goto('/')
  await page.addStyleTag({ content: 'html {font-size:200%} ' })
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true)
  await expect(
    page.getByRole('link', { name: 'React Drag Dismiss', exact: true }),
  ).toBeVisible()
})
test('capture detail and 404 layouts', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/projects/react-viewport')
  await page.screenshot({ path: 'test-results/detail.png', fullPage: true })
  await page.goto('/missing')
  await page.screenshot({ path: 'test-results/404.png', fullPage: true })
})
