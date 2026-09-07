import { expect, test } from '@playwright/test'
import { publicProjects } from '../src/content/projects'

test('directory navigation and project links work without nested anchors', async ({
  page,
}) => {
  await page.goto('/')
  await expect(page.locator('.project-category article')).toHaveCount(
    publicProjects.length,
  )
  await expect(page.locator('a a')).toHaveCount(0)
  for (const p of publicProjects) {
    const row = page.getByRole('article', { name: p.name })
    await expect(
      row.getByRole('link', { name: 'Docs', exact: true }),
    ).toHaveAttribute('href', p.documentation!)
    await expect(
      row.getByRole('link', { name: p.name, exact: true }),
    ).toHaveAttribute('href', `/projects/${p.slug}`)
  }
})
test('primary navigation works with keyboard and visible focus', async ({
  page,
}) => {
  await page.goto('/')
  for (const name of [
    'Skip to content',
    'NIPE Open Source home',
    'Projects',
    'React Data Inspector',
    'Principles',
    'GitHub',
  ]) {
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toHaveAccessibleName(name)
    expect(
      await page
        .locator(':focus')
        .evaluate((e) => getComputedStyle(e).outlineStyle),
    ).not.toBe('none')
  }
})
test('skip link moves focus into content', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()
})
for (const path of ['/unknown-route', '/projects/unknown-project'])
  test(`returns a real 404: ${path}`, async ({ page }) => {
    const response = await page.goto(path)
    expect(response?.status()).toBe(404)
    await expect(
      page.getByRole('heading', { name: 'Page not found' }),
    ).toBeVisible()
    await expect(
      page.getByRole('link', { name: 'Back to project index' }),
    ).toHaveAttribute('href', '/')
  })
for (const p of publicProjects)
  test(`renders project detail: ${p.slug}`, async ({ page }) => {
    expect((await page.goto(`/projects/${p.slug}`))?.status()).toBe(200)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(p.name)
    const links = page.getByRole('navigation', { name: `${p.name} actions` })
    await expect(
      links.getByRole('link', { name: 'Documentation' }),
    ).toHaveAttribute('href', p.documentation!)
    await expect(
      links.getByRole('link', { name: 'Issues', exact: true }),
    ).toHaveAttribute('href', p.support!.issues!)
    await expect(page.locator('.install-command')).toContainText(
      `${p.npm!.package}@${p.npm!.version}`,
    )
  })
test('touch navigation and reduced motion remain usable', async ({
  browser,
}) => {
  const context = await browser.newContext({
    hasTouch: true,
    viewport: { width: 375, height: 812 },
    reducedMotion: 'reduce',
  })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:4387/')
  await page
    .getByRole('navigation', { name: 'Primary' })
    .getByRole('link', { name: 'Projects' })
    .tap()
  await expect(page).toHaveURL(/#projects$/)
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe('auto')
  await context.close()
})
