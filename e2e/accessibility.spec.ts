import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const routes = [
  '/',
  '/projects/react-spring-bottom-sheet',
  '/projects/readonly-view',
  '/projects/flex-layout-codemod',
  '/impressum',
  '/privacy',
  '/contributing',
  '/security',
] as const

for (const route of routes) {
  test(`has no serious or critical accessibility violations: ${route}`, async ({
    page,
  }) => {
    await page.goto(route)

    const results = await new AxeBuilder({ page }).analyze()
    const seriousViolations = results.violations.filter(({ impact }) =>
      ['serious', 'critical'].includes(impact ?? ''),
    )

    expect(seriousViolations).toEqual([])
  })
}
