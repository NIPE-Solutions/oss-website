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
    ])
    expect(
      publicProjects.every(({ visibility }) => visibility === 'public'),
    ).toBe(true)
    expect(
      projects.filter(({ visibility }) => visibility === 'hidden'),
    ).toEqual([expect.objectContaining({ slug: 'react-swipe-actions' })])
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
      ['hidden', 'development'],
    ])
  })

  it('keeps unpublished Swipe Actions metadata out of public selection', () => {
    expect(getProject('react-swipe-actions')).toMatchObject({
      visibility: 'hidden',
      status: 'development',
      repository: 'https://github.com/NIPE-Solutions/react-swipe-actions',
      visual: 'swipe-actions',
    })
    expect(getProject('react-swipe-actions')).not.toHaveProperty('npm')
    expect(getProject('react-swipe-actions')).not.toHaveProperty('support')
    expect(
      publicProjects.some(({ slug }) => slug === 'react-swipe-actions'),
    ).toBe(false)
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
