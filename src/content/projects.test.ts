import { describe, expect, it } from 'vitest'

import {
  getProject,
  projectCategories,
  projects,
  publicProjects,
} from './projects'

describe('project registry', () => {
  it('keeps every candidate project in evidence-backed editorial order', () => {
    expect(projects.map(({ slug }) => slug)).toEqual([
      'react-spring-bottom-sheet',
      'readonly-view',
      'flex-layout-codemod',
      'react-swipe-actions',
    ])
    expect(projects.map(({ order }) => order)).toEqual([1, 2, 3, 4])
    expect(new Set(projects.map(({ slug }) => slug)).size).toBe(projects.length)
    expect(getProject('flex-layout-codemod')?.category).toBe('tooling')
  })

  it('selects public projects from explicit visibility rather than npm state', () => {
    expect(publicProjects.map(({ slug }) => slug)).toEqual([
      'react-spring-bottom-sheet',
      'readonly-view',
      'flex-layout-codemod',
      'react-swipe-actions',
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
      ['public', 'stable'],
      ['public', 'beta'],
      ['public', 'alpha'],
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
      {
        accent: 'var(--project-readonly-view)',
        visual: 'readonly-view',
      },
      { accent: 'var(--project-codemod)', visual: 'codemod' },
      { accent: 'var(--project-swipe-actions)', visual: 'swipe-actions' },
    ])
  })

  it('records package publication independently from package identity', () => {
    expect(publicProjects.map(({ npm }) => npm)).toEqual([
      {
        package: '@nipe-solutions/react-spring-bottom-sheet',
        published: true,
      },
      { package: '@nipe-solutions/readonly-view', published: true },
      {
        package: '@nipe-solutions/flex-layout-codemod',
        published: true,
      },
      {
        package: '@nipe-solutions/react-swipe-actions',
        published: true,
      },
    ])
    expect(publicProjects.every(({ npm }) => npm?.published === true)).toBe(
      true,
    )
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
