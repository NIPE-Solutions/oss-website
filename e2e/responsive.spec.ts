import { expect, test } from '@playwright/test'

const viewports = [375, 430, 768, 1024, 1366, 1440, 1920] as const
const projectPaths = [
  '/projects/react-spring-bottom-sheet',
  '/projects/readonly-view',
  '/projects/flex-layout-codemod',
  '/projects/react-swipe-actions',
  '/projects/react-anchored-layer',
  '/projects/react-pull-to-refresh',
  '/projects/react-viewport',
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
      '.site-identity, .primary-navigation > a:visible, .primary-navigation > .project-menu-fallback:visible, .project-menu > summary:visible',
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
      projectNodes: Array.from(
        document.querySelectorAll('.project-node'),
        (node) => {
          const box = node.getBoundingClientRect()
          return {
            left: box.left,
            right: box.right,
            top: box.top,
            bottom: box.bottom,
            width: box.width,
            height: box.height,
          }
        },
      ),
    }))

    expect(geometry.pageHeight).toBeLessThan(9_500)
    expect(geometry.heroHeight).toBeLessThanOrEqual(900)
    expect(geometry.projectHeights).toHaveLength(7)
    for (const projectHeight of geometry.projectHeights) {
      expect(projectHeight).toBeLessThanOrEqual(900)
    }
    expect(geometry.projectNodes).toHaveLength(7)
    for (const node of geometry.projectNodes) {
      expect(node.left).toBeGreaterThanOrEqual(0)
      expect(node.right).toBeLessThanOrEqual(width)
      expect(node.width).toBeGreaterThanOrEqual(44)
      expect(node.height).toBeGreaterThanOrEqual(44)
    }
    for (let first = 0; first < geometry.projectNodes.length; first += 1) {
      for (
        let second = first + 1;
        second < geometry.projectNodes.length;
        second += 1
      ) {
        const a = geometry.projectNodes[first]
        const b = geometry.projectNodes[second]
        const overlapWidth =
          Math.min(a.right, b.right) - Math.max(a.left, b.left)
        const overlapHeight =
          Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)
        expect(overlapWidth > 0 && overlapHeight > 0).toBe(false)
      }
    }

    const projectNames = page.locator('.project-node__name')
    await expect(projectNames).toHaveCount(7)
    for (let index = 0; index < 7; index += 1) {
      await expect(projectNames.nth(index)).toBeVisible()
    }

    if (width <= 430) {
      await expect(page.locator('.project-menu')).toBeHidden()
      const columns = await page
        .locator('.project-constellation')
        .evaluate(
          (element) =>
            getComputedStyle(element).gridTemplateColumns.split(' ').length,
        )
      expect(columns).toBe(2)
    }

    await expectConciseFooter(page)
  })
}

test('reduced motion keeps focused project discovery visible without motif transitions', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 375, height: 900 })
  await page.goto('/')

  const link = page
    .getByRole('navigation', { name: 'NIPE Open Source projects' })
    .getByRole('link', { name: 'React Pull to Refresh Alpha' })
  await link.focus()
  await expect(link).toBeFocused()
  await expect(link).toBeInViewport()
  await expect
    .poll(() =>
      link.locator('.project-motif__indicator').evaluate((element) => ({
        duration: getComputedStyle(element).transitionDuration,
        transform: getComputedStyle(element).transform,
      })),
    )
    .toEqual({ duration: '0s', transform: 'none' })
})

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
      const actionLinks = actions.getByRole('link')
      for (let index = 0; index < (await actionLinks.count()); index += 1) {
        const action = actionLinks.nth(index)
        await expect(action).toBeVisible()
        const actionBox = await action.boundingBox()
        expect(actionBox?.height).toBeGreaterThanOrEqual(44)
        expect(
          (actionBox?.x ?? 0) + (actionBox?.width ?? 0),
        ).toBeLessThanOrEqual(width)
      }

      const geometry = await page.evaluate(() => ({
        pageHeight: document.documentElement.scrollHeight,
        sectionHeights: Array.from(
          document.querySelectorAll('.project-detail__content > section'),
          (section) => section.getBoundingClientRect().height,
        ),
      }))

      expect(geometry.pageHeight).toBeLessThan(4_800)
      for (const sectionHeight of geometry.sectionHeights) {
        expect(sectionHeight).toBeLessThanOrEqual(900)
      }

      await expectConciseFooter(page)
    })
  }
}
