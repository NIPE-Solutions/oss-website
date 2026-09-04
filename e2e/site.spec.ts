import { expect, test } from '@playwright/test'

const projects = [
  {
    name: 'React Spring Bottom Sheet',
    path: '/projects/react-spring-bottom-sheet',
    documentation: 'https://react-spring-bottom-sheet.nipesolutions.com',
    repository: 'https://github.com/NIPE-Solutions/react-spring-bottom-sheet',
    npm: 'https://www.npmjs.com/package/@nipe-solutions/react-spring-bottom-sheet',
  },
  {
    name: 'Readonly View',
    path: '/projects/readonly-view',
    documentation: 'https://readonly-view.nipesolutions.com',
    repository: 'https://github.com/NIPE-Solutions/readonly-view',
    npm: 'https://www.npmjs.com/package/@nipe-solutions/readonly-view',
  },
  {
    name: 'Angular Flex-Layout Codemod',
    path: '/projects/flex-layout-codemod',
    documentation:
      'https://github.com/NIPE-Solutions/flex-layout-migrator#readme',
    repository: 'https://github.com/NIPE-Solutions/flex-layout-migrator',
    npm: 'https://www.npmjs.com/package/@nipe-solutions/flex-layout-codemod',
  },
] as const

test('loads the project directory with every project linked to its page', async ({
  page,
}) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Production-grade primitives and tools for the web.',
    }),
  ).toBeVisible()

  for (const project of projects) {
    const projectHeading = page.getByRole('heading', {
      level: 4,
      name: project.name,
    })

    await expect(projectHeading).toBeVisible()
    await expect(projectHeading.getByRole('link')).toHaveAttribute(
      'href',
      project.path,
    )
  }
})

test('primary navigation works with keyboard only', async ({ page }) => {
  await page.goto('/')

  const expectedLinks = [
    ['Skip to content', '#main-content'],
    ['NIPE Open Source home', '/'],
    ['Projects', '/#projects'],
    ['Principles', '/#principles'],
    ['GitHub', 'https://github.com/NIPE-Solutions'],
    ['NIPE Solutions', 'https://nipesolutions.com'],
  ] as const

  for (const [name, href] of expectedLinks) {
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toHaveAccessibleName(name)
    await expect(page.locator(':focus')).toHaveAttribute('href', href)
  }
})

test.describe('mobile primary navigation', () => {
  test.use({ hasTouch: true, viewport: { width: 375, height: 900 } })

  test('supports touch and Enter activation at a narrow width', async ({
    page,
  }) => {
    await page.goto('/')

    const navigation = page.getByRole('navigation', { name: 'Primary' })
    const projects = navigation.getByRole('link', { name: 'Projects' })
    const principles = navigation.getByRole('link', { name: 'Principles' })

    await expect(navigation).toBeVisible()
    await projects.tap()
    await expect(page).toHaveURL('/#projects')

    await principles.focus()
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL('/#principles')
  })
})

test('skip link moves keyboard focus to the main content', async ({ page }) => {
  await page.goto('/')

  await page.keyboard.press('Tab')
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused()
  await page.keyboard.press('Enter')

  await expect(page.locator('main')).toBeFocused()
})

test('legal navigation reaches the publication information pages', async ({
  page,
}) => {
  await page.goto('/')

  const legalNavigation = page.getByRole('navigation', { name: 'Legal' })
  await expect(
    legalNavigation.getByRole('link', { name: 'Impressum' }),
  ).toHaveAttribute('href', '/impressum')
  await expect(
    legalNavigation.getByRole('link', { name: 'Privacy' }),
  ).toHaveAttribute('href', '/privacy')

  await legalNavigation.getByRole('link', { name: 'Impressum' }).click()
  await expect(page).toHaveURL('/impressum')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Impressum' }),
  ).toBeVisible()

  await page.getByRole('link', { name: 'Privacy' }).click()
  await expect(page).toHaveURL('/privacy')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Privacy' }),
  ).toBeVisible()
})

test('unknown routes show a page-not-found recovery page', async ({ page }) => {
  const response = await page.goto('/this-route-does-not-exist')

  expect(response?.status()).toBe(404)
  await expect(
    page.getByRole('heading', { level: 1, name: 'Page not found' }),
  ).toBeVisible()
  await expect(
    page.getByRole('navigation', { name: 'Page recovery' }),
  ).toBeVisible()
})

test('reduced motion disables smooth scrolling and transition duration', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  await expect
    .poll(() =>
      page.evaluate(() => ({
        scrollBehavior: getComputedStyle(document.documentElement)
          .scrollBehavior,
        transitionDuration: getComputedStyle(
          document.querySelector('.skip-link')!,
        ).transitionDuration,
      })),
    )
    .toEqual({ scrollBehavior: 'auto', transitionDuration: '1e-05s' })
})

test('external links retain their verified destinations', async ({ page }) => {
  await page.goto('/')

  const expectedHomepageLinks = [
    ['GitHub', 'https://github.com/NIPE-Solutions'],
    ['NIPE Solutions', 'https://nipesolutions.com'],
  ] as const

  for (const [name, href] of expectedHomepageLinks) {
    await expect(
      page.getByRole('link', { name, exact: true }).first(),
    ).toHaveAttribute('href', href)
  }

  for (const project of projects) {
    await page.goto(project.path)
    const actions = page.getByRole('navigation', {
      name: `${project.name} actions`,
    })

    await expect(
      actions.getByRole('link', { name: 'Documentation' }),
    ).toHaveAttribute('href', project.documentation)
    await expect(actions.getByRole('link', { name: 'Source' })).toHaveAttribute(
      'href',
      project.repository,
    )
    await expect(
      actions.getByRole('link', { name: 'npm package' }),
    ).toHaveAttribute('href', project.npm)
  }
})
