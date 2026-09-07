import { expect, test } from '@playwright/test'

for (const width of [320, 375, 768, 1024, 1440, 1920]) {
  test(`featured project navigation and preview fit at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await page
      .getByRole('navigation', { name: 'Primary', exact: true })
      .getByRole('link', { name: 'React Data Inspector', exact: true })
      .click()
    await expect(page).toHaveURL(/#react-data-inspector$/)
    const card = page.getByRole('article', {
      name: 'React Data Inspector',
      exact: true,
    })
    await expect(card).toHaveCount(1)
    const preview = card.getByRole('img')
    await expect(preview).toHaveAccessibleName(
      /Date, Set, Map, BigInt.*shared.*circular/,
    )
    expect(await preview.evaluate((e) => e.scrollWidth <= e.clientWidth)).toBe(
      true,
    )
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true)
    const layout = await card.evaluate((e) => {
      const content = e
        .querySelector('.featured-project__content')!
        .getBoundingClientRect()
      const preview = e
        .querySelector('.inspector-preview')!
        .getBoundingClientRect()
      return {
        contentBottom: content.bottom,
        previewTop: preview.top,
        contentRight: content.right,
        previewLeft: preview.left,
      }
    })
    if (width <= 768)
      expect(layout.previewTop).toBeGreaterThan(layout.contentBottom)
    else expect(layout.previewLeft).toBeGreaterThan(layout.contentRight)
    for (const link of await card.getByRole('link').all()) {
      expect((await link.boundingBox())!.height).toBeGreaterThanOrEqual(44)
    }
    if ([375, 768, 1440].includes(width))
      await card.screenshot({ path: `test-results/featured-${width}.png` })
  })
}

test('feature has visible keyboard focus, no console errors, and no layout shifts', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (['error', 'warning'].includes(message.type()))
      errors.push(message.text())
  })
  await page.addInitScript(() => {
    const shifts: number[] = []
    Object.assign(window, { featureLayoutShifts: shifts })
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & {
          hadRecentInput: boolean
          value: number
        }
        if (!shift.hadRecentInput) shifts.push(shift.value)
      }
    }).observe({ type: 'layout-shift', buffered: true })
  })
  await page.goto('/')
  const card = page.getByRole('article', {
    name: 'React Data Inspector',
    exact: true,
  })
  await card
    .getByRole('link', { name: 'React Data Inspector', exact: true })
    .focus()
  for (const name of [
    'Explore React Data Inspector',
    'Open playground',
    'GitHub',
    'Docs',
  ]) {
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toHaveAccessibleName(name)
    expect(
      await page
        .locator(':focus')
        .evaluate((e) => getComputedStyle(e).outlineStyle),
    ).toBe('solid')
  }
  await page.keyboard.press('Tab')
  await expect(page.locator(':focus')).toHaveAccessibleName(
    'React Spring Bottom Sheet',
  )
  expect(errors).toEqual([])
  expect(
    await page.evaluate(() =>
      (
        window as unknown as { featureLayoutShifts: number[] }
      ).featureLayoutShifts.reduce((a, b) => a + b, 0),
    ),
  ).toBe(0)
})
