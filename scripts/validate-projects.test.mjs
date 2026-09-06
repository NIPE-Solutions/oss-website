import { describe, expect, it } from 'vitest'
import { spawnSync } from 'node:child_process'
import { validateProjects } from './validate-projects.mjs'
const project = {
  slug: 'example',
  name: 'Example',
  category: 'tooling',
  visibility: 'public',
  status: 'alpha',
  repository: 'https://github.com/NIPE-Solutions/example',
  documentation: 'https://example.nipesolutions.com/',
  npm: {
    package: '@nipe-solutions/example',
    published: true,
    version: '0.1.0-alpha.0',
  },
  support: { issues: 'https://github.com/NIPE-Solutions/example/issues' },
  purpose: {
    description: 'Example purpose',
    source: { label: 'Source', href: 'https://example.nipesolutions.com/' },
  },
  license: 'MIT',
  claims: [
    {
      kind: 'capability',
      title: 'Capability',
      source: { label: 'Source', href: 'https://example.nipesolutions.com/' },
    },
  ],
  visual: 'codemod',
  order: 1,
}
describe('registry validation', () => {
  it('accepts published and explicitly unpublished projects', () => {
    expect(validateProjects([project])).toEqual([])
    expect(
      validateProjects([
        { ...project, npm: { package: project.npm.package, published: false } },
      ]),
    ).toEqual([])
    expect(
      validateProjects([
        {
          ...project,
          visibility: 'hidden',
          documentation: undefined,
          support: undefined,
          npm: undefined,
          status: 'experimental',
        },
      ]),
    ).toEqual([])
  })
  it.each(['alpha', 'beta', 'stable', 'experimental'])('accepts %s', (status) =>
    expect(validateProjects([{ ...project, status }])).toEqual([]),
  )
  it.each([
    [{ status: 'development' }, 'status'],
    [{ category: 'framework' }, 'category'],
    [{ visibility: 'listed' }, 'visibility'],
    [{ repository: 'http://github.com/example' }, 'HTTPS'],
    [{ documentation: undefined }, 'documentation'],
    [
      {
        documentation:
          'https://github.com/NIPE-Solutions/example/blob/main/README.md',
      },
      'canonical',
    ],
    [{ support: {} }, 'issues'],
    [{ npm: undefined }, 'publication'],
    [{ npm: { package: 'wrong', published: true } }, 'package'],
    [
      { npm: { package: '@nipe-solutions/example', published: 'yes' } },
      'boolean',
    ],
    [
      { npm: { package: '@nipe-solutions/example', published: true } },
      'version',
    ],
    [
      {
        npm: {
          package: '@nipe-solutions/example',
          published: false,
          version: '1.0.0',
        },
      },
      'unpublished',
    ],
    [
      { purpose: { description: 'x', source: { href: 'http://example.com' } } },
      'source',
    ],
    [{ claims: [{ kind: 'marketing', source: {} }] }, 'kind'],
    [{ visual: 'unknown' }, 'visual'],
    [{ order: 0 }, 'order'],
  ])('rejects invalid fields %j', (change, message) =>
    expect(validateProjects([{ ...project, ...change }]).join(' ')).toContain(
      message,
    ),
  )
  it('rejects duplicate slugs, packages and order', () => {
    const errors = validateProjects([project, project]).join(' ')
    for (const message of [
      'Duplicate slug',
      'Duplicate package',
      'Duplicate editorial order',
    ])
      expect(errors).toContain(message)
  })
  it('validates the real registry from the CLI', () => {
    const result = spawnSync(
      process.execPath,
      ['scripts/validate-projects.mjs'],
      { encoding: 'utf8' },
    )
    expect(result.status, result.stderr).toBe(0)
    expect(result.stdout).toContain('Validated 9 projects')
  })
})
