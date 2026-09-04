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
