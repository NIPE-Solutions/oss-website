import { expect, test } from '@playwright/test'

const projects = [
  {
    name: 'React Spring Bottom Sheet',
    path: '/projects/react-spring-bottom-sheet',
    category: 'UI & Interaction',
    status: 'Stable',
    documentation: 'https://react-spring-bottom-sheet.nipesolutions.com',
    repository: 'https://github.com/NIPE-Solutions/react-spring-bottom-sheet',
    purposeSource:
      'https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/README.md#why-version-5',
    npm: 'https://www.npmjs.com/package/@nipe-solutions/react-spring-bottom-sheet',
  },
  {
    name: 'Readonly View',
    path: '/projects/readonly-view',
    category: 'Runtime',
    status: 'Stable',
    documentation: 'https://readonly-view.nipesolutions.com',
    repository: 'https://github.com/NIPE-Solutions/readonly-view',
    purposeSource:
      'https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/README.md#ownership-mental-model',
    npm: 'https://www.npmjs.com/package/@nipe-solutions/readonly-view',
  },
  {
    name: 'Angular Flex-Layout Codemod',
    path: '/projects/flex-layout-codemod',
    category: 'Tooling',
    status: 'Beta',
    documentation:
      'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md',
    repository: 'https://github.com/NIPE-Solutions/flex-layout-migrator',
    purposeSource:
      'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md#current-scope',
    npm: 'https://www.npmjs.com/package/@nipe-solutions/flex-layout-codemod',
  },
] as const

const configuredSupportLinks = [
  [
    'React Spring Bottom Sheet documentation',
    'https://react-spring-bottom-sheet.nipesolutions.com',
  ],
  ['Readonly View documentation', 'https://readonly-view.nipesolutions.com'],
  [
    'Readonly View issues',
    'https://github.com/NIPE-Solutions/readonly-view/issues',
  ],
  [
    'Readonly View security',
    'https://github.com/NIPE-Solutions/readonly-view/security/policy',
  ],
  [
    'Angular Flex-Layout Codemod documentation',
    'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/docs/SUPPORT.md',
  ],
  [
    'Angular Flex-Layout Codemod issues',
    'https://github.com/NIPE-Solutions/flex-layout-migrator/issues',
  ],
  [
    'Angular Flex-Layout Codemod security',
    'https://github.com/NIPE-Solutions/flex-layout-migrator/security/advisories/new',
  ],
] as const

test('loads the project directory with every project linked to its page', async ({
  page,
}) => {
  await page.goto('/')

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Focused primitives and tools for the web.',
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

test('renders only canonical category and lifecycle labels for public projects', async ({
  page,
}) => {
  await page.goto('/')

  for (const project of projects) {
    await expect(
      page.getByRole('heading', { name: project.category }),
    ).toBeVisible()
    const entry = page.getByRole('article', { name: project.name })
    await expect(entry.getByText(project.status, { exact: true })).toBeVisible()
  }

  await expect(page.getByText('React Swipe Actions')).toHaveCount(0)
  await expect(page.locator('a[href*="react-swipe-actions"]')).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Interface' })).toHaveCount(0)
  await expect(page.getByRole('heading', { name: 'Migration' })).toHaveCount(0)
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

test('source and support links are keyboard operable with visible focus', async ({
  page,
}) => {
  const sourceTarget = projects[0].purposeSource
  await page.route(sourceTarget, (route) =>
    route.fulfill({ contentType: 'text/html', body: '<h1>Source target</h1>' }),
  )
  await page.goto(projects[0].path)

  const source = page.getByRole('link', { name: 'Source for purpose' })
  await source.scrollIntoViewIfNeeded()
  await source.focus()
  await expect(source).toBeFocused()
  const focus = await source.evaluate((element) => {
    const style = getComputedStyle(element)
    const box = element.getBoundingClientRect()
    return {
      outlineStyle: style.outlineStyle,
      outlineWidth: Number.parseFloat(style.outlineWidth),
      visible:
        box.top >= 0 &&
        box.left >= 0 &&
        box.bottom <= window.innerHeight &&
        box.right <= window.innerWidth,
    }
  })
  expect(focus.outlineStyle).not.toBe('none')
  expect(focus.outlineWidth).toBeGreaterThanOrEqual(2)
  expect(focus.visible).toBe(true)

  await Promise.all([
    page.waitForURL(sourceTarget),
    page.keyboard.press('Enter'),
  ])

  const supportTarget = configuredSupportLinks[0][1]
  await page.route(supportTarget, (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: '<h1>Support target</h1>',
    }),
  )
  await page.goto('/')
  const support = page.getByRole('link', {
    name: configuredSupportLinks[0][0],
  })
  await support.focus()
  await expect(support).toBeFocused()
  await Promise.all([
    page.waitForURL(supportTarget),
    page.keyboard.press('Enter'),
  ])
})

test('legal navigation reaches the publication information pages', async ({
  page,
}) => {
  await page.goto('/')

  const legalNavigation = page.getByRole('navigation', { name: 'Footer' })
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
      page.getByRole('link', { name: 'Source for purpose' }),
    ).toHaveAttribute('href', project.purposeSource)
    await expect(
      actions.getByRole('link', { name: 'npm package' }),
    ).toHaveAttribute('href', project.npm)
  }
})

test('publishes configured support destinations without inferred fallbacks', async ({
  page,
}) => {
  await page.goto('/')
  const support = page.getByRole('region', {
    name: 'Contributing and security',
  })

  for (const [name, href] of configuredSupportLinks) {
    await expect(support.getByRole('link', { name })).toHaveAttribute(
      'href',
      href,
    )
  }

  await expect(support.getByRole('link', { name: /discussions/i })).toHaveCount(
    0,
  )
  await expect(
    support.getByRole('link', { name: 'React Spring Bottom Sheet issues' }),
  ).toHaveCount(0)
  await expect(support.getByText('React Swipe Actions')).toHaveCount(0)
})
