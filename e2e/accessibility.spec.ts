import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'
import { publicProjects } from '../src/content/projects'
for (const colorScheme of ['light', 'dark'] as const) {
  for (const path of [
    '/',
    ...publicProjects.map((p) => `/projects/${p.slug}`),
    '/impressum',
    '/privacy',
    '/contributing',
    '/security',
    '/missing',
  ])
    test(`axe ${colorScheme}: ${path}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme })
      await page.goto(path)
      const results = await new AxeBuilder({ page }).analyze()
      expect(results.violations).toEqual([])
    })
}
test('install regions can receive keyboard focus on mobile', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/projects/react-spring-bottom-sheet')
  const code = page.locator('.install-command pre')
  await code.focus()
  await expect(code).toBeFocused()
})
