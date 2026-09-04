import { describe, expect, it } from 'vitest'

import {
  getProject,
  projectCategories,
  projects,
  publishedProjects,
} from './projects'

describe('project registry', () => {
  it('lists each evidence-backed public project once in editorial order', () => {
    expect(projects.map(({ slug }) => slug)).toEqual([
      'react-spring-bottom-sheet',
      'readonly-view',
      'flex-layout-codemod',
    ])
    expect(projects.map(({ order }) => order)).toEqual([1, 2, 3])
    expect(new Set(projects.map(({ slug }) => slug)).size).toBe(projects.length)
    expect(
      projects.find(({ slug }) => slug === 'flex-layout-codemod')?.category,
    ).toBe('tooling')
  })

  it('only exposes known categories and evidence-backed project statuses', () => {
    const categoryIds = projectCategories.map(({ id }) => id)

    expect(
      projects.every(({ category }) => categoryIds.includes(category)),
    ).toBe(true)
    expect(projects.map(({ status }) => status)).toEqual([
      'stable',
      'stable',
      'prerelease',
    ])
    expect(
      projects
        .flatMap(({ claims }) => claims)
        .every(({ verifiedFrom }) => Boolean(verifiedFrom)),
    ).toBe(true)
  })

  it('links public projects to HTTPS repositories and only uses NIPE scoped npm packages', () => {
    expect(
      projects.every(
        ({ repository }) => new URL(repository).protocol === 'https:',
      ),
    ).toBe(true)
    expect(publishedProjects.map(({ npmPackage }) => npmPackage)).toEqual([
      '@nipe-solutions/react-spring-bottom-sheet',
      '@nipe-solutions/readonly-view',
      '@nipe-solutions/flex-layout-codemod',
    ])
    expect(
      publishedProjects.every(({ npmPackage }) =>
        /^@nipe-solutions\/[a-z0-9][a-z0-9-]*$/.test(npmPackage ?? ''),
      ),
    ).toBe(true)
  })

  it('omits Swipe Actions until there is a meaningfully usable public implementation', () => {
    expect(getProject('react-swipe-actions')).toBeUndefined()
    expect(projects.some(({ slug }) => slug === 'react-swipe-actions')).toBe(
      false,
    )
  })

  it('retrieves projects by slug without duplicating their public data', () => {
    expect(getProject('readonly-view')).toMatchObject({
      name: 'Readonly View',
      repository: 'https://github.com/NIPE-Solutions/readonly-view',
    })
  })
})
