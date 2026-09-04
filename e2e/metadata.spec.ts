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
