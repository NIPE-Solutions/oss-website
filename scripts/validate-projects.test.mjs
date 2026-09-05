import { spawnSync } from 'node:child_process'
import { describe, expect, it } from 'vitest'

import { validateProjects } from './validate-projects.mjs'

const validProject = {
  slug: 'valid-project',
  name: 'Valid Project',
  category: 'tooling',
  description: 'A verified project fixture.',
  visibility: 'public',
  status: 'stable',
  repository: 'https://github.com/NIPE-Solutions/valid-project',
  documentation: 'https://example.com/docs',
  npm: {
    package: '@nipe-solutions/valid-project',
    published: true,
  },
  support: {
    documentation: 'https://example.com/support',
    issues: 'https://github.com/NIPE-Solutions/valid-project/issues',
    security: 'https://github.com/NIPE-Solutions/valid-project/security/policy',
  },
  license: 'MIT',
  purpose: {
    description: 'This fixture exists to prove registry validation behavior.',
    source: {
      label: 'Purpose source',
      href: 'https://example.com/purpose-evidence',
    },
  },
  claims: [
    {
      kind: 'capability',
      title: 'Verified capability',
      description: 'This fixture has a source reference.',
      source: {
        label: 'Capability source',
        href: 'https://example.com/evidence',
      },
    },
  ],
  example: {
    language: 'text',
    code: 'valid-project --help',
    source: {
      label: 'Example source',
      href: 'https://example.com/example-evidence',
    },
  },
  accent: 'var(--project-fixture)',
  visual: 'codemod',
  featured: false,
  order: 1,
}

describe('validateProjects', () => {
  it('accepts complete public and hidden registry entries', () => {
    const hiddenProject = {
      ...validProject,
      slug: 'hidden-project',
      visibility: 'hidden',
      status: 'development',
      documentation: undefined,
      npm: { package: '@nipe-solutions/hidden-project', published: false },
      support: undefined,
      order: 2,
    }

    expect(validateProjects([validProject, hiddenProject])).toEqual([])
  })

  it.each([
    'stable',
    'beta',
    'alpha',
    'preview',
    'development',
    'maintenance',
    'archived',
  ])('accepts the complete lifecycle status vocabulary: %s', (status) => {
    expect(validateProjects([{ ...validProject, status }])).toEqual([])
  })

  it('reports duplicate slugs precisely', () => {
    expect(
      validateProjects([validProject, { ...validProject, order: 2 }]),
    ).toEqual(['Duplicate slug "valid-project".'])
  })

  it('rejects unknown categories, visibility, and lifecycle statuses', () => {
    expect(
      validateProjects([
        {
          ...validProject,
          category: 'framework',
          visibility: 'listed',
          status: 'prerelease',
        },
      ]),
    ).toEqual([
      'Project "valid-project" has an unknown category "framework".',
      'Project "valid-project" has an unknown visibility "listed".',
      'Project "valid-project" has an unknown status "prerelease".',
    ])
  })

  it('rejects non-HTTPS repository and documentation links', () => {
    expect(
      validateProjects([
        {
          ...validProject,
          slug: 'unsafe-links',
          repository: 'http://example.com/repository',
          documentation: 'http://example.com/docs',
        },
      ]),
    ).toEqual([
      'Project "unsafe-links" has a repository URL that must use HTTPS.',
      'Project "unsafe-links" has a documentation URL that must use HTTPS.',
    ])
  })

  it('requires documentation for public projects but not hidden projects', () => {
    expect(
      validateProjects([{ ...validProject, documentation: undefined }]),
    ).toEqual(['Public project "valid-project" is missing documentation.'])
    expect(
      validateProjects([
        {
          ...validProject,
          visibility: 'hidden',
          documentation: undefined,
        },
      ]),
    ).toEqual([])
  })

  it('validates npm syntax and explicit boolean publication independently', () => {
    expect(
      validateProjects([
        {
          ...validProject,
          npm: { package: '@other/package', published: 'yes' },
        },
      ]),
    ).toEqual([
      'Project "valid-project" has an invalid npm package "@other/package"; expected a scoped @nipe-solutions package name.',
      'Project "valid-project" npm publication state must be boolean.',
    ])
    expect(
      validateProjects([
        {
          ...validProject,
          npm: {
            package: '@nipe-solutions/known-package',
            published: false,
          },
        },
      ]),
    ).toEqual([])
  })

  it('requires labeled HTTPS source metadata for purpose, claims, and examples', () => {
    expect(
      validateProjects([
        {
          ...validProject,
          purpose: {
            ...validProject.purpose,
            source: { label: '', href: 'http://example.com/purpose' },
          },
          claims: [
            {
              ...validProject.claims[0],
              source: { label: '', href: 'not-a-url' },
            },
          ],
          example: {
            ...validProject.example,
            source: { label: '', href: '' },
          },
        },
      ]),
    ).toEqual([
      'Project "valid-project" purpose source is missing a label.',
      'Project "valid-project" purpose source URL must use HTTPS.',
      'Project "valid-project" claim 1 source is missing a label.',
      'Project "valid-project" claim 1 source URL must use HTTPS.',
      'Project "valid-project" example source is missing a label.',
      'Project "valid-project" example source URL must use HTTPS.',
    ])
  })

  it('requires purpose copy and validates claim kinds', () => {
    expect(
      validateProjects([
        {
          ...validProject,
          purpose: { ...validProject.purpose, description: '' },
          claims: [{ ...validProject.claims[0], kind: 'note' }],
        },
      ]),
    ).toEqual([
      'Project "valid-project" purpose is missing description.',
      'Project "valid-project" claim 1 has an unknown kind "note".',
    ])
  })

  it('requires a license, claims, visual, and unique editorial order', () => {
    const invalid = [
      { ...validProject, slug: 'missing-license', license: '' },
      { ...validProject, slug: 'missing-claims', order: 2, claims: [] },
      { ...validProject, slug: 'unknown-visual', order: 3, visual: 'orb' },
    ]

    expect(validateProjects(invalid)).toEqual(
      expect.arrayContaining([
        'Project "missing-license" is missing a license.',
        'Project "missing-claims" must define at least one claim.',
        'Project "unknown-visual" has an unknown visual "orb".',
      ]),
    )
  })

  it.each(['issues', 'discussions', 'security', 'documentation'])(
    'requires configured %s support destinations to use HTTPS',
    (destination) => {
      expect(
        validateProjects([
          {
            ...validProject,
            support: { [destination]: `http://example.com/${destination}` },
          },
        ]),
      ).toEqual([
        `Project "valid-project" support ${destination} URL must use HTTPS.`,
      ])
    },
  )

  it('rejects an explicitly configured empty support destination', () => {
    expect(
      validateProjects([
        { ...validProject, support: { ...validProject.support, issues: '' } },
      ]),
    ).toEqual(['Project "valid-project" support issues URL must use HTTPS.'])
  })

  it('retains editorial order validation', () => {
    expect(
      validateProjects([
        validProject,
        { ...validProject, slug: 'duplicate-order' },
        { ...validProject, slug: 'invalid-order', order: 0 },
      ]),
    ).toEqual([
      'Duplicate editorial order "1".',
      'Project "invalid-order" has an order that must be a positive integer.',
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
    expect(result.stdout).toContain('Validated 7 projects.')
  })
})
