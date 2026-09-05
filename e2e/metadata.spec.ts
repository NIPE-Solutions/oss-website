import { expect, test } from '@playwright/test'

const origin = 'https://opensource.nipesolutions.com'
const projects = [
  'react-spring-bottom-sheet',
  'readonly-view',
  'flex-layout-codemod',
  'react-swipe-actions',
  'react-anchored-layer',
  'react-pull-to-refresh',
  'react-viewport',
] as const

for (const slug of projects) {
  test(`publishes canonical metadata for ${slug}`, async ({ page }) => {
    const path = `/projects/${slug}`
    await page.goto(path)

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${origin}${path}`,
    )
    await expect(page.locator('meta[property="og:title"]')).toHaveCount(1)
    await expect(page.locator('meta[property="og:description"]')).toHaveCount(1)
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      `${origin}${path}`,
    )
  })
}

test('publishes unique OpenGraph titles and descriptions for every project', async ({
  page,
}) => {
  const titles: string[] = []
  const descriptions: string[] = []
  const images: string[] = []

  for (const slug of projects) {
    await page.goto(`/projects/${slug}`)
    titles.push(
      (await page
        .locator('meta[property="og:title"]')
        .getAttribute('content'))!,
    )
    descriptions.push(
      (await page
        .locator('meta[property="og:description"]')
        .getAttribute('content'))!,
    )
    images.push(
      (await page
        .locator('meta[property="og:image"]')
        .getAttribute('content'))!,
    )
  }

  expect(new Set(titles).size).toBe(projects.length)
  expect(new Set(descriptions).size).toBe(projects.length)
  expect(new Set(images).size).toBe(projects.length)
})

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
  expect(sitemap.match(/<loc>[^<]*\/projects\//g)).toHaveLength(projects.length)
})

test('publishes Swipe Actions with canonical metadata and package links', async ({
  page,
}) => {
  const response = await page.goto('/projects/react-swipe-actions')

  expect(response?.status()).toBe(200)
  await expect(
    page.getByRole('heading', { name: 'React Swipe Actions' }),
  ).toBeVisible()
  await expect(
    page.getByRole('link', { name: 'Documentation' }),
  ).toHaveAttribute('href', 'https://react-swipe-actions.nipesolutions.com')
  await expect(page.getByRole('link', { name: 'npm package' })).toHaveAttribute(
    'href',
    'https://www.npmjs.com/package/@nipe-solutions/react-swipe-actions',
  )
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    `${origin}/projects/react-swipe-actions`,
  )
})
