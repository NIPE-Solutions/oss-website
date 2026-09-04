import { expect, test } from '@playwright/test'

const viewports = [375, 430, 768, 1366, 1440, 1920] as const
const narrowViewports = [375, 430] as const
const projectPaths = [
  '/projects/react-spring-bottom-sheet',
  '/projects/readonly-view',
  '/projects/flex-layout-codemod',
] as const

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

for (const projectPath of projectPaths) {
  for (const width of narrowViewports) {
    test(`${projectPath} contains wide content at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(projectPath)

      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expect
        .poll(() =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
        )
        .toBe(true)

      const codeBlocks = page.locator('.code-example pre, .install-command pre')
      const codeBlockCount = await codeBlocks.count()

      expect(codeBlockCount).toBeGreaterThan(0)

      for (let index = 0; index < codeBlockCount; index += 1) {
        const box = await codeBlocks.nth(index).boundingBox()

        expect(box?.x).toBeGreaterThanOrEqual(0)
        expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(width)
      }
    })
  }
}
