import { describe, expect, it } from 'vitest'

import {
  getProject,
  projectCategories,
  projects,
  publicProjects,
} from './projects'

describe('project registry', () => {
  it('keeps every candidate project in evidence-backed editorial order', () => {
    expect(
      projects.map(({ slug, category, status, visibility, order }) => ({
        slug,
        category,
        status,
        visibility,
        order,
      })),
    ).toEqual([
      {
        slug: 'react-spring-bottom-sheet',
        category: 'ui-interaction',
        status: 'stable',
        visibility: 'public',
        order: 1,
      },
      {
        slug: 'react-swipe-actions',
        category: 'ui-interaction',
        status: 'alpha',
        visibility: 'public',
        order: 2,
      },
      {
        slug: 'react-anchored-layer',
        category: 'ui-interaction',
        status: 'alpha',
        visibility: 'public',
        order: 3,
      },
      {
        slug: 'react-pull-to-refresh',
        category: 'ui-interaction',
        status: 'alpha',
        visibility: 'public',
        order: 4,
      },
      {
        slug: 'react-viewport',
        category: 'ui-interaction',
        status: 'alpha',
        visibility: 'public',
        order: 5,
      },
      {
        slug: 'readonly-view',
        category: 'runtime',
        status: 'stable',
        visibility: 'public',
        order: 6,
      },
      {
        slug: 'flex-layout-codemod',
        category: 'tooling',
        status: 'beta',
        visibility: 'public',
        order: 7,
      },
    ])
    expect(new Set(projects.map(({ slug }) => slug)).size).toBe(projects.length)
    expect(getProject('flex-layout-codemod')?.category).toBe('tooling')
  })

  it('selects public projects from explicit visibility rather than npm state', () => {
    expect(publicProjects.map(({ slug }) => slug)).toEqual([
      'react-spring-bottom-sheet',
      'react-swipe-actions',
      'react-anchored-layer',
      'react-pull-to-refresh',
      'react-viewport',
      'readonly-view',
      'flex-layout-codemod',
    ])
    expect(
      publicProjects.every(({ visibility }) => visibility === 'public'),
    ).toBe(true)
    expect(
      projects.filter(({ visibility }) => visibility === 'hidden'),
    ).toEqual([])
  })

  it('uses explicit category, visibility, and lifecycle values for every entry', () => {
    const categoryIds = projectCategories.map(({ id }) => id)

    expect(
      projects.every(({ category }) => categoryIds.includes(category)),
    ).toBe(true)
    expect(
      projects.map(({ visibility, status }) => [visibility, status]),
    ).toEqual([
      ['public', 'stable'],
      ['public', 'alpha'],
      ['public', 'alpha'],
      ['public', 'alpha'],
      ['public', 'alpha'],
      ['public', 'stable'],
      ['public', 'beta'],
    ])
  })

  it('publishes Swipe Actions with explicit alpha package and support metadata', () => {
    expect(getProject('react-swipe-actions')).toMatchObject({
      visibility: 'public',
      status: 'alpha',
      repository: 'https://github.com/NIPE-Solutions/react-swipe-actions',
      documentation: 'https://react-swipe-actions.nipesolutions.com',
      npm: {
        package: '@nipe-solutions/react-swipe-actions',
        published: true,
      },
      support: {
        documentation: 'https://react-swipe-actions.nipesolutions.com',
        issues: 'https://github.com/NIPE-Solutions/react-swipe-actions/issues',
        discussions:
          'https://github.com/NIPE-Solutions/react-swipe-actions/discussions',
        security:
          'https://github.com/NIPE-Solutions/react-swipe-actions/security/advisories/new',
      },
      visual: 'swipe-actions',
    })
    expect(
      publicProjects.some(({ slug }) => slug === 'react-swipe-actions'),
    ).toBe(true)
  })

  it('preserves established accents and project visuals', () => {
    expect(
      publicProjects.map(({ accent, visual }) => ({ accent, visual })),
    ).toEqual([
      {
        accent: 'var(--project-bottom-sheet)',
        visual: 'bottom-sheet',
      },
      { accent: 'var(--project-swipe-actions)', visual: 'swipe-actions' },
      { accent: 'var(--project-anchored-layer)', visual: 'anchored-layer' },
      {
        accent: 'var(--project-pull-to-refresh)',
        visual: 'pull-to-refresh',
      },
      { accent: 'var(--project-viewport)', visual: 'viewport' },
      {
        accent: 'var(--project-readonly-view)',
        visual: 'readonly-view',
      },
      { accent: 'var(--project-codemod)', visual: 'codemod' },
    ])
  })

  it('records package publication independently from package identity', () => {
    expect(publicProjects.map(({ npm }) => npm)).toEqual([
      {
        package: '@nipe-solutions/react-spring-bottom-sheet',
        published: true,
      },
      {
        package: '@nipe-solutions/react-swipe-actions',
        published: true,
      },
      {
        package: '@nipe-solutions/react-anchored-layer',
        published: false,
      },
      {
        package: '@nipe-solutions/react-pull-to-refresh',
        published: false,
      },
      {
        package: '@nipe-solutions/react-viewport',
        published: false,
      },
      { package: '@nipe-solutions/readonly-view', published: true },
      {
        package: '@nipe-solutions/flex-layout-codemod',
        published: true,
      },
    ])
    for (const slug of [
      'react-anchored-layer',
      'react-pull-to-refresh',
      'react-viewport',
    ]) {
      expect(getProject(slug)?.npm).toMatchObject({ published: false })
    }
  })

  it('records complete evidence-backed content for the three new projects', () => {
    expect(getProject('react-anchored-layer')).toMatchObject({
      name: 'React Anchored Layer',
      description:
        'Anchored floating layers for React that keep arbitrary portal content aligned through scroll, resize, and layout changes.',
      repository: 'https://github.com/NIPE-Solutions/react-anchored-layer',
      documentation: 'https://react-anchored-layer.nipesolutions.com',
      support: {
        documentation: 'https://react-anchored-layer.nipesolutions.com',
        issues: 'https://github.com/NIPE-Solutions/react-anchored-layer/issues',
        security:
          'https://github.com/NIPE-Solutions/react-anchored-layer/security/policy',
      },
      license: 'MIT',
      accent: 'var(--project-anchored-layer)',
      visual: 'anchored-layer',
      purpose: {
        source: {
          href: 'https://github.com/NIPE-Solutions/react-anchored-layer/blob/93c83bd2cd569bfdc2c5bd128f1f3add39ae7696/README.md#responsibility',
        },
      },
    })
    expect(
      getProject('react-anchored-layer')?.claims.map(
        ({ kind, title, source }) => ({ kind, title, href: source.href }),
      ),
    ).toEqual([
      {
        kind: 'capability',
        title: 'Portal and anchor tracking',
        href: 'https://github.com/NIPE-Solutions/react-anchored-layer/blob/93c83bd2cd569bfdc2c5bd128f1f3add39ae7696/README.md#quick-start',
      },
      {
        kind: 'capability',
        title: 'Collision and measurement ownership',
        href: 'https://github.com/NIPE-Solutions/react-anchored-layer/blob/93c83bd2cd569bfdc2c5bd128f1f3add39ae7696/README.md#responsibility',
      },
      {
        kind: 'capability',
        title: 'SSR-safe import',
        href: 'https://github.com/NIPE-Solutions/react-anchored-layer/blob/93c83bd2cd569bfdc2c5bd128f1f3add39ae7696/README.md#responsibility',
      },
      {
        kind: 'limitation',
        title: 'Application-owned interaction semantics',
        href: 'https://github.com/NIPE-Solutions/react-anchored-layer/blob/93c83bd2cd569bfdc2c5bd128f1f3add39ae7696/README.md#responsibility',
      },
    ])
    expect(getProject('react-anchored-layer')?.example).toEqual({
      language: 'tsx',
      code: `import { AnchoredLayer } from '@nipe-solutions/react-anchored-layer'
import '@nipe-solutions/react-anchored-layer/core.css'

;<AnchoredLayer.Root open={open} onOpenChange={setOpen}>
  <AnchoredLayer.Anchor asChild>
    <input aria-controls="address-results" aria-expanded={open} />
  </AnchoredLayer.Anchor>
  <AnchoredLayer.Content
    id="address-results"
    placement="bottom-start"
    offset={6}
    matchAnchorWidth
  >
    {results}
  </AnchoredLayer.Content>
</AnchoredLayer.Root>`,
      source: {
        label: 'Audited quick start',
        href: 'https://github.com/NIPE-Solutions/react-anchored-layer/blob/93c83bd2cd569bfdc2c5bd128f1f3add39ae7696/README.md#quick-start',
      },
    })

    expect(getProject('react-pull-to-refresh')).toMatchObject({
      name: 'React Pull to Refresh',
      description:
        'Pull-to-refresh for React with scroll arbitration, resistance, threshold hysteresis, and an application-owned refresh lifecycle.',
      repository: 'https://github.com/NIPE-Solutions/react-pull-to-refresh',
      documentation: 'https://react-pull-to-refresh.nipesolutions.com',
      support: {
        documentation: 'https://react-pull-to-refresh.nipesolutions.com',
        issues:
          'https://github.com/NIPE-Solutions/react-pull-to-refresh/issues',
        security:
          'https://github.com/NIPE-Solutions/react-pull-to-refresh/security/policy',
      },
      license: 'MIT',
      accent: 'var(--project-pull-to-refresh)',
      visual: 'pull-to-refresh',
      purpose: {
        source: {
          href: 'https://github.com/NIPE-Solutions/react-pull-to-refresh/blob/3e7b232a23b59e7e44ca0a6b8a13d3d02f839b18/README.md#why-this-exists',
        },
      },
    })
    expect(
      getProject('react-pull-to-refresh')?.claims.map(
        ({ kind, title, source }) => ({ kind, title, href: source.href }),
      ),
    ).toEqual([
      {
        kind: 'capability',
        title: 'Scroll-boundary and direction arbitration',
        href: 'https://github.com/NIPE-Solutions/react-pull-to-refresh/blob/3e7b232a23b59e7e44ca0a6b8a13d3d02f839b18/README.md#scroll-ownership',
      },
      {
        kind: 'capability',
        title: 'Resistance and threshold hysteresis',
        href: 'https://github.com/NIPE-Solutions/react-pull-to-refresh/blob/3e7b232a23b59e7e44ca0a6b8a13d3d02f839b18/README.md#why-this-exists',
      },
      {
        kind: 'capability',
        title: 'Exactly-once async commitment',
        href: 'https://github.com/NIPE-Solutions/react-pull-to-refresh/blob/3e7b232a23b59e7e44ca0a6b8a13d3d02f839b18/README.md#why-this-exists',
      },
      {
        kind: 'limitation',
        title: 'Native refresh and device QA boundaries',
        href: 'https://github.com/NIPE-Solutions/react-pull-to-refresh/blob/3e7b232a23b59e7e44ca0a6b8a13d3d02f839b18/README.md#browser-notes',
      },
    ])
    expect(getProject('react-pull-to-refresh')?.example).toEqual({
      language: 'tsx',
      code: `import { PullToRefresh } from '@nipe-solutions/react-pull-to-refresh'
import '@nipe-solutions/react-pull-to-refresh/core.css'

export function Inbox() {
  async function refresh() {
    await refetch()
  }

  return (
    <>
      <button type="button" onClick={() => void refresh()}>
        Refresh inbox
      </button>
      <PullToRefresh.Root onRefresh={refresh}>
        <PullToRefresh.Indicator>
          <Spinner />
        </PullToRefresh.Indicator>
        <PullToRefresh.Content>
          <Messages />
        </PullToRefresh.Content>
      </PullToRefresh.Root>
    </>
  )
}`,
      source: {
        label: 'Audited quick start',
        href: 'https://github.com/NIPE-Solutions/react-pull-to-refresh/blob/3e7b232a23b59e7e44ca0a6b8a13d3d02f839b18/README.md#react-pull-to-refresh',
      },
    })

    expect(getProject('react-viewport')).toMatchObject({
      name: 'React Viewport',
      description:
        'Reactive React geometry for layout and visual viewports, keyboard occlusion, and safe areas.',
      repository: 'https://github.com/NIPE-Solutions/react-viewport',
      documentation:
        'https://github.com/NIPE-Solutions/react-viewport/blob/08a4b3a2353d934835eb1054dd6ddadef2370e65/README.md',
      support: {
        documentation:
          'https://github.com/NIPE-Solutions/react-viewport/blob/08a4b3a2353d934835eb1054dd6ddadef2370e65/README.md',
        issues: 'https://github.com/NIPE-Solutions/react-viewport/issues',
        security:
          'https://github.com/NIPE-Solutions/react-viewport/security/policy',
      },
      license: 'MIT',
      accent: 'var(--project-viewport)',
      visual: 'viewport',
      purpose: {
        source: {
          href: 'https://github.com/NIPE-Solutions/react-viewport/blob/08a4b3a2353d934835eb1054dd6ddadef2370e65/README.md#nipe-solutionsreact-viewport',
        },
      },
    })
    expect(
      getProject('react-viewport')?.claims.map(({ kind, title, source }) => ({
        kind,
        title,
        href: source.href,
      })),
    ).toEqual([
      {
        kind: 'capability',
        title: 'Separate layout and visual geometry',
        href: 'https://github.com/NIPE-Solutions/react-viewport/blob/08a4b3a2353d934835eb1054dd6ddadef2370e65/README.md#layout-viewport-versus-visual-viewport',
      },
      {
        kind: 'capability',
        title: 'Conservative keyboard and safe-area state',
        href: 'https://github.com/NIPE-Solutions/react-viewport/blob/08a4b3a2353d934835eb1054dd6ddadef2370e65/README.md#keyboard-state-is-conservative',
      },
      {
        kind: 'capability',
        title: 'SSR and CSS-variable support',
        href: 'https://github.com/NIPE-Solutions/react-viewport/blob/08a4b3a2353d934835eb1054dd6ddadef2370e65/README.md#ssr-and-hydration',
      },
      {
        kind: 'limitation',
        title: 'Heuristic and physical-device boundaries',
        href: 'https://github.com/NIPE-Solutions/react-viewport/blob/08a4b3a2353d934835eb1054dd6ddadef2370e65/README.md#browser-terminology-and-limitations',
      },
    ])
    expect(getProject('react-viewport')?.example).toEqual({
      language: 'tsx',
      code: `import { useViewport } from '@nipe-solutions/react-viewport'

export function ViewportReadout() {
  const viewport = useViewport()

  if (!viewport.ready || viewport.visual === null) {
    return <p>Measuring viewport…</p>
  }

  return (
    <p>
      Visible size: {viewport.visual.width} × {viewport.visual.height}; keyboard:{' '}
      {viewport.keyboard.open ? \`\${viewport.keyboard.height}px\` : 'closed'}
    </p>
  )
}`,
      source: {
        label: 'Audited quick start',
        href: 'https://github.com/NIPE-Solutions/react-viewport/blob/08a4b3a2353d934835eb1054dd6ddadef2370e65/README.md#quick-start',
      },
    })
  })

  it('exposes only support destinations confirmed by the source audit', () => {
    expect(getProject('react-spring-bottom-sheet')?.support).toEqual({
      documentation: 'https://react-spring-bottom-sheet.nipesolutions.com',
    })
    expect(getProject('readonly-view')?.support).toEqual({
      documentation: 'https://readonly-view.nipesolutions.com',
      issues: 'https://github.com/NIPE-Solutions/readonly-view/issues',
      security:
        'https://github.com/NIPE-Solutions/readonly-view/security/policy',
    })
    expect(getProject('flex-layout-codemod')?.support).toEqual({
      documentation:
        'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/docs/SUPPORT.md',
      issues: 'https://github.com/NIPE-Solutions/flex-layout-migrator/issues',
      security:
        'https://github.com/NIPE-Solutions/flex-layout-migrator/security/advisories/new',
    })
    expect(getProject('react-swipe-actions')?.support).toEqual({
      documentation: 'https://react-swipe-actions.nipesolutions.com',
      issues: 'https://github.com/NIPE-Solutions/react-swipe-actions/issues',
      discussions:
        'https://github.com/NIPE-Solutions/react-swipe-actions/discussions',
      security:
        'https://github.com/NIPE-Solutions/react-swipe-actions/security/advisories/new',
    })
    expect(getProject('react-anchored-layer')?.support).toEqual({
      documentation: 'https://react-anchored-layer.nipesolutions.com',
      issues: 'https://github.com/NIPE-Solutions/react-anchored-layer/issues',
      security:
        'https://github.com/NIPE-Solutions/react-anchored-layer/security/policy',
    })
    expect(getProject('react-pull-to-refresh')?.support).toEqual({
      documentation: 'https://react-pull-to-refresh.nipesolutions.com',
      issues: 'https://github.com/NIPE-Solutions/react-pull-to-refresh/issues',
      security:
        'https://github.com/NIPE-Solutions/react-pull-to-refresh/security/policy',
    })
    expect(getProject('react-viewport')?.support).toEqual({
      documentation:
        'https://github.com/NIPE-Solutions/react-viewport/blob/08a4b3a2353d934835eb1054dd6ddadef2370e65/README.md',
      issues: 'https://github.com/NIPE-Solutions/react-viewport/issues',
      security:
        'https://github.com/NIPE-Solutions/react-viewport/security/policy',
    })
  })

  it('normalizes claim and purpose evidence as labeled sources', () => {
    for (const project of publicProjects) {
      expect(project.purpose.description).toBeTruthy()
      expect(project.purpose.source).toMatchObject({
        label: expect.any(String),
        href: expect.stringMatching(/^https:\/\//),
      })

      for (const claim of project.claims) {
        expect(['capability', 'limitation']).toContain(claim.kind)
        expect(claim.title).toBeTruthy()
        expect(claim.source).toMatchObject({
          label: expect.any(String),
          href: expect.stringMatching(/^https:\/\//),
        })
        expect(claim).not.toHaveProperty('verifiedFrom')
      }
    }
  })

  it('retrieves projects by slug without duplicating their registry data', () => {
    expect(getProject('readonly-view')).toBe(
      projects.find(({ slug }) => slug === 'readonly-view'),
    )
    expect(getProject('unknown')).toBeUndefined()
  })
})
