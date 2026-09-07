import { describe, expect, it } from 'vitest'
import { projects, publicProjects, projectCategories } from './projects'
// @ts-expect-error JavaScript validator is exercised directly.
import { validateProjects } from '../../scripts/validate-projects.mjs'
import sitemap from '../app/sitemap'

describe('ecosystem directory contract', () => {
  it('publishes ten audited projects in four areas', () => {
    expect(publicProjects).toHaveLength(10)
    expect(projectCategories.map((c) => c.id)).toEqual([
      'ui-interaction',
      'browser-primitives',
      'runtime',
      'tooling',
    ])
    expect(
      publicProjects
        .filter((p) => p.category === 'browser-primitives')
        .map((p) => p.slug),
    ).toEqual(['caret-geometry', 'react-viewport'])
    expect(validateProjects(projects)).toEqual([])
  })
  it('rejects duplicate package identities and noncanonical docs', () => {
    expect(
      validateProjects([
        projects[0],
        { ...projects[1], npm: projects[0].npm },
      ]).join(' '),
    ).toMatch(/package/i)
    expect(
      validateProjects([
        {
          ...projects[0],
          documentation: projects[0].repository + '/blob/main/README.md',
        },
      ]).join(' '),
    ).toMatch(/canonical/i)
  })
  it('requires public issues and explicit publication state', () => {
    expect(
      validateProjects([{ ...projects[0], support: {} }]).join(' '),
    ).toMatch(/issues/i)
    expect(
      validateProjects([{ ...projects[0], npm: undefined }]).join(' '),
    ).toMatch(/publication/i)
  })
  it('derives sitemap project routes only from public entries', () => {
    expect(
      sitemap()
        .filter((p) => p.url.includes('/projects/'))
        .map((p) => new URL(p.url).pathname),
    ).toEqual(publicProjects.map((p) => `/projects/${p.slug}`))
  })
})
