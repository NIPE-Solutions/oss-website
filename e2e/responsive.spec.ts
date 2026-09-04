import { expect, test } from '@playwright/test'

const viewports = [375, 430, 768, 1366, 1440, 1920] as const

for (const width of viewports) {
  test(`remains usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(
      page.getByRole('navigation', { name: 'Primary' }),
    ).toBeVisible()
    await expect
      .poll(() =>
        page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      )
      .toBe(true)

    const primaryControls = page.locator(
      '.site-identity, .primary-navigation a',
    )
    const controlCount = await primaryControls.count()

    for (let index = 0; index < controlCount; index += 1) {
      const control = primaryControls.nth(index)
      await expect(control).toBeVisible()
      const box = await control.boundingBox()

      expect(box?.height).toBeGreaterThanOrEqual(44)
      expect(box?.width).toBeGreaterThanOrEqual(44)
    }
  })
}
