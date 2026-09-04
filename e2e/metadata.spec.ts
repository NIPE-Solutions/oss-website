import { expect, test } from '@playwright/test'

const origin = 'https://opensource.nipesolutions.com'
const projects = [
  'react-spring-bottom-sheet',
  'readonly-view',
  'flex-layout-codemod',
] as const

for (const slug of projects) {
  test(`publishes canonical metadata for ${slug}`, async ({ page }) => {
    const path = `/projects/${slug}`
    await page.goto(path)

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${origin}${path}`,
    )
  })
}

test('missing routes are noindex and do not inherit the homepage canonical', async ({
  page,
}) => {
  const response = await page.goto('/missing-metadata-audit-route')

  expect(response?.status()).toBe(404)
  const robots = page.locator('meta[name="robots"]')
  await expect(robots).toHaveCount(1)
  await expect(robots).toHaveAttribute('content', /noindex/)
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0)
})

test('publishes a local favicon without a failed browser request', async ({
  page,
  request,
}) => {
  await page.goto('/')

  const icons = page.locator('link[rel="icon"]')
  await expect(icons).toHaveCount(1)
  const href = await icons.getAttribute('href')
  expect(href).toBeTruthy()

  const response = await request.get(href!)
  expect(response.status()).toBe(200)
})

test('publishes only explicit public project routes in the sitemap', async ({
  request,
}) => {
  const response = await request.get('/sitemap.xml')
  expect(response.status()).toBe(200)
  const sitemap = await response.text()

  for (const slug of projects) {
    expect(sitemap).toContain(`${origin}/projects/${slug}`)
  }
  expect(sitemap).not.toContain('react-swipe-actions')
})

test('keeps the hidden unpublished project out of public routes and package links', async ({
  page,
}) => {
  const response = await page.goto('/projects/react-swipe-actions')

  expect(response?.status()).toBe(404)
  await expect(page.getByText('React Swipe Actions')).toHaveCount(0)
  await expect(page.locator('a[href*="react-swipe-actions"]')).toHaveCount(0)
  await expect(page.locator('a[href*="npmjs.com/package"]')).toHaveCount(0)
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0)
})
