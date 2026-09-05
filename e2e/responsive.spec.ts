import { expect, test } from '@playwright/test'

const viewports = [375, 430, 768, 1024, 1366, 1440, 1920] as const
const projectPaths = [
  '/projects/react-spring-bottom-sheet',
  '/projects/readonly-view',
  '/projects/flex-layout-codemod',
  '/projects/react-swipe-actions',
] as const

async function expectNoPageOverflow(page: import('@playwright/test').Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    )
    .toBe(true)
}

async function expectConciseFooter(page: import('@playwright/test').Page) {
  const footer = page.locator('.site-footer')
  await expect(footer).toBeVisible()
  const box = await footer.boundingBox()

  expect(box?.height).toBeLessThan(900)
}

for (const width of viewports) {
  test(`remains usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    await expect(
      page.getByRole('navigation', { name: 'Primary' }),
    ).toBeVisible()
    await expectNoPageOverflow(page)

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

    const geometry = await page.evaluate(() => ({
      pageHeight: document.documentElement.scrollHeight,
      heroHeight: document.querySelector('.hero')?.getBoundingClientRect()
        .height,
      projectHeights: Array.from(
        document.querySelectorAll('.project-entry'),
        (entry) => entry.getBoundingClientRect().height,
      ),
    }))

    expect(geometry.pageHeight).toBeLessThan(7_500)
    expect(geometry.heroHeight).toBeLessThanOrEqual(900)
    expect(geometry.projectHeights).toHaveLength(4)
    for (const projectHeight of geometry.projectHeights) {
      expect(projectHeight).toBeLessThanOrEqual(900)
    }

    await expectConciseFooter(page)
  })
}

test('keeps the footer inside a small-tablet landscape viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 812, height: 375 })
  await page.goto('/')

  await expectNoPageOverflow(page)
  await expectConciseFooter(page)
})

for (const projectPath of projectPaths) {
  for (const width of viewports) {
    test(`${projectPath} remains operable at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto(projectPath)

      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await expectNoPageOverflow(page)

      const codeBlocks = page.locator('.code-example pre, .install-command pre')
      const codeBlockCount = await codeBlocks.count()

      expect(codeBlockCount).toBeGreaterThan(0)

      for (let index = 0; index < codeBlockCount; index += 1) {
        const box = await codeBlocks.nth(index).boundingBox()

        expect(box?.x).toBeGreaterThanOrEqual(0)
        expect((box?.x ?? 0) + (box?.width ?? 0)).toBeLessThanOrEqual(width)
        await expect(codeBlocks.nth(index)).toHaveAttribute('tabindex', '0')
      }

      const actions = page.getByRole('navigation', { name: / actions$/ })
      const source = actions.getByRole('link', { name: 'Source' })
      await expect(source).toBeVisible()
      const sourceBox = await source.boundingBox()
      expect(sourceBox?.height).toBeGreaterThanOrEqual(44)
      expect((sourceBox?.x ?? 0) + (sourceBox?.width ?? 0)).toBeLessThanOrEqual(
        width,
      )

      const geometry = await page.evaluate(() => ({
        pageHeight: document.documentElement.scrollHeight,
        sectionHeights: Array.from(
          document.querySelectorAll('.project-detail__content > section'),
          (section) => section.getBoundingClientRect().height,
        ),
      }))

      expect(geometry.pageHeight).toBeLessThan(4_000)
      for (const sectionHeight of geometry.sectionHeights) {
        expect(sectionHeight).toBeLessThanOrEqual(900)
      }

      await expectConciseFooter(page)
    })
  }
}
