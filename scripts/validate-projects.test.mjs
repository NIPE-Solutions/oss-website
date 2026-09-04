import { spawnSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

import { validateProjects } from './validate-projects.mjs'

const validProject = {
  slug: 'valid-project',
  name: 'Valid Project',
  category: 'tooling',
  description: 'A verified project fixture.',
  status: 'stable',
  repository: 'https://github.com/NIPE-Solutions/valid-project',
  documentation: 'https://example.com/docs',
  npmPackage: '@nipe-solutions/valid-project',
  license: 'MIT',
  purpose: {
    detail: 'This fixture exists to prove registry validation behavior.',
    verifiedFrom: 'https://example.com/purpose-evidence',
  },
  claims: [
    {
      kind: 'capability',
      label: 'Verified capability',
      detail: 'This fixture has a source reference.',
      verifiedFrom: 'https://example.com/evidence',
    },
  ],
  accent: 'var(--project-fixture)',
  visual: 'codemod',
  featured: false,
  order: 1,
}

describe('validateProjects', () => {
  it('accepts a complete evidence-backed project', () => {
    expect(validateProjects([validProject])).toEqual([])
  })

  it('reports duplicate slugs precisely', () => {
    expect(
      validateProjects([validProject, { ...validProject, order: 2 }]),
    ).toEqual(['Duplicate slug "valid-project".'])
  })

  it('rejects non-HTTPS repository links', () => {
    expect(
      validateProjects([
        {
          ...validProject,
          slug: 'unsafe-link',
          repository: 'http://example.com/repository',
        },
      ]),
    ).toEqual([
      'Project "unsafe-link" has a repository URL that must use HTTPS.',
    ])
  })

  it('requires source evidence for every claim', () => {
    expect(
      validateProjects([
        {
          ...validProject,
          slug: 'missing-evidence',
          claims: [{ ...validProject.claims[0], verifiedFrom: '' }],
        },
      ]),
    ).toEqual(['Project "missing-evidence" claim 1 is missing verifiedFrom.'])
  })

  it('requires evidence for the project purpose', () => {
    expect(
      validateProjects([
        {
          ...validProject,
          slug: 'missing-purpose-evidence',
          purpose: { ...validProject.purpose, verifiedFrom: '' },
        },
      ]),
    ).toEqual([
      'Project "missing-purpose-evidence" purpose is missing verifiedFrom.',
    ])
  })

  it('requires distinct project-purpose copy', () => {
    expect(
      validateProjects([
        {
          ...validProject,
          slug: 'missing-purpose-detail',
          purpose: { ...validProject.purpose, detail: '' },
        },
      ]),
    ).toEqual(['Project "missing-purpose-detail" purpose is missing detail.'])
  })

  it('rejects claims without an explicit capability or limitation kind', () => {
    expect(
      validateProjects([
        {
          ...validProject,
          slug: 'unknown-claim-kind',
          claims: [{ ...validProject.claims[0], kind: 'note' }],
        },
      ]),
    ).toEqual([
      'Project "unknown-claim-kind" claim 1 has an unknown kind "note".',
    ])
  })

  it('rejects npm package names outside the NIPE scope', () => {
    expect(
      validateProjects([
        {
          ...validProject,
          slug: 'invalid-package',
          npmPackage: '@other/package',
        },
      ]),
    ).toEqual([
      'Project "invalid-package" has an invalid npm package "@other/package"; expected a scoped @nipe-solutions package name.',
    ])
  })

  it('rejects unknown project statuses', () => {
    expect(
      validateProjects([
        { ...validProject, slug: 'unknown-status', status: 'experimental' },
      ]),
    ).toEqual([
      'Project "unknown-status" has an unknown status "experimental".',
    ])
  })

  it('runs the checked-in registry successfully from the command line', () => {
    const result = spawnSync(
      process.execPath,
      ['scripts/validate-projects.mjs'],
      {
        encoding: 'utf8',
      },
    )

    expect(result.status).toBe(0)
    expect(result.stderr).toBe('')
    expect(result.stdout).toContain('Validated 3 projects.')
  })
})
