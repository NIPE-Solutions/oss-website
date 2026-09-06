import { expect, test } from '@playwright/test'
import { publicProjects } from '../src/content/projects'
const origin = 'https://opensource.nipesolutions.com'
for (const path of [
  '/',
  ...publicProjects.map((p) => `/projects/${p.slug}`),
  '/impressum',
  '/privacy',
  '/security',
  '/contributing',
])
  test(`canonical and social metadata: ${path}`, async ({ page, request }) => {
    await page.goto(path)
    expect(
      new URL(
        (await page.locator('link[rel="canonical"]').getAttribute('href'))!,
      ).href,
    ).toBe(new URL(`${origin}${path}`).href)
    if (path !== '/' && !path.startsWith('/projects/')) return
    const og = page.locator('meta[property="og:image"]')
    const url = await og.getAttribute('content')
    expect(url).toBeTruthy()
    const local = new URL(url!)
    const response = await request.get(local.pathname + local.search)
    expect(response.status()).toBe(200)
    expect(response.headers()['content-type']).toContain('image/png')
  })
test('sitemap contains all and only public projects', async ({ request }) => {
  const xml = await (await request.get('/sitemap.xml')).text()
  expect(xml.match(/\/projects\//g) || []).toHaveLength(publicProjects.length)
  for (const p of publicProjects)
    expect(xml).toContain(`${origin}/projects/${p.slug}`)
})
test('HTML contains the build commit marker', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute(
    'data-build-commit',
    /^[a-f0-9]{40}$/,
  )
})
