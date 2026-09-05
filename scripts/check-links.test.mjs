import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { describe, expect, it, vi } from 'vitest'

import {
  checkLiveLinks,
  collectProjectLinks,
  extractConfiguredUrlLiterals,
  extractLiteralLinks,
  validateStaticLinks,
} from './check-links.mjs'

import { projects } from '../src/content/projects.ts'

describe('link audit', () => {
  it('extracts URL-valued configuration that is passed to link components', () => {
    const source = `
      export const siteConfig = {
        title: 'NIPE Open Source',
        githubOrganization: 'https://github.com/NIPE-Solutions',
        nipeUrl: 'https://nipesolutions.com',
      }
    `

    expect(extractConfiguredUrlLiterals(source, 'site.ts')).toEqual([
      { source: 'site.ts', href: 'https://github.com/NIPE-Solutions' },
      { source: 'site.ts', href: 'https://nipesolutions.com' },
    ])
  })

  it('extracts literal internal and configured external destinations from source', () => {
    const source = `
      <Link href="/privacy">Privacy</Link>
      <Link href="/#projects">Projects</Link>
      <ExternalLink href="https://example.com/docs">Docs</ExternalLink>
      <a href={'mailto:office@example.com'}>Email</a>
      <ExternalLink href={configuredUrl}>Configured elsewhere</ExternalLink>
    `

    expect(extractLiteralLinks(source, 'fixture.tsx')).toEqual([
      { source: 'fixture.tsx', href: '/privacy' },
      { source: 'fixture.tsx', href: '/#projects' },
      { source: 'fixture.tsx', href: 'https://example.com/docs' },
      { source: 'fixture.tsx', href: 'mailto:office@example.com' },
    ])
  })

  it('collects links only for public projects and gates npm on publication', () => {
    const project = {
      slug: 'published',
      visibility: 'public',
      repository: 'https://example.com/published/source',
      documentation: 'https://example.com/published/docs',
      npm: { package: '@nipe-solutions/published', published: true },
      support: {
        issues: 'https://example.com/published/issues',
        documentation: 'https://example.com/published/support',
      },
      purpose: {
        source: { href: 'https://example.com/published/purpose' },
      },
      claims: [
        { source: { href: 'https://example.com/published/capability' } },
      ],
      example: {
        source: { href: 'https://example.com/published/example' },
      },
    }
    const unpublished = {
      ...project,
      slug: 'unpublished',
      repository: 'https://example.com/unpublished/source',
      documentation: undefined,
      npm: { package: '@nipe-solutions/unpublished', published: false },
      support: undefined,
      purpose: {
        source: { href: 'https://example.com/unpublished/purpose' },
      },
      claims: [],
      example: undefined,
    }
    const hidden = {
      ...project,
      slug: 'hidden',
      visibility: 'hidden',
      repository: 'https://example.com/hidden/source',
    }

    expect(
      collectProjectLinks([project, unpublished, hidden]).map(
        ({ href }) => href,
      ),
    ).toEqual([
      '/projects/published',
      'https://example.com/published/source',
      'https://example.com/published/docs',
      'https://www.npmjs.com/package/@nipe-solutions/published',
      'https://example.com/published/issues',
      'https://example.com/published/support',
      'https://example.com/published/purpose',
      'https://example.com/published/capability',
      'https://example.com/published/example',
      '/projects/unpublished',
      'https://example.com/unpublished/source',
      'https://example.com/unpublished/purpose',
    ])
  })

  it('collects all public project routes and omits unpublished npm destinations', () => {
    const links = collectProjectLinks(projects).map(({ href }) => href)
    const publicProjects = projects.filter(
      ({ visibility }) => visibility === 'public',
    )

    expect(links.filter((href) => href.startsWith('/projects/'))).toEqual(
      publicProjects.map(({ slug }) => `/projects/${slug}`),
    )

    for (const project of publicProjects) {
      const npmUrl = project.npm
        ? `https://www.npmjs.com/package/${project.npm.package}`
        : undefined

      if (npmUrl) {
        expect(links.includes(npmUrl)).toBe(project.npm?.published === true)
      }
    }
  })

  it('validates internal routes and URL schemes without contacting the network', () => {
    const links = [
      { source: 'footer.tsx', href: '/privacy' },
      { source: 'header.tsx', href: '/#projects' },
      { source: 'project.ts', href: 'https://example.com/docs' },
      { source: 'project.ts', href: 'http://example.com/insecure' },
      { source: 'footer.tsx', href: '/missing' },
      { source: 'page.tsx', href: 'javascript:alert(1)' },
    ]

    expect(validateStaticLinks(links, new Set(['/', '/privacy']))).toEqual([
      'project.ts: external URL must use HTTPS: http://example.com/insecure',
      'footer.tsx: internal route does not exist: /missing',
      'page.tsx: unsupported link protocol: javascript:alert(1)',
    ])
  })

  it('checks external links only when live checking is called explicitly', async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 204 }))
      .mockResolvedValueOnce(new Response(null, { status: 404 }))

    await expect(
      checkLiveLinks(
        [
          { source: 'page.tsx', href: '/privacy' },
          { source: 'one.ts', href: 'https://example.com/ok' },
          { source: 'two.ts', href: 'https://example.com/missing' },
        ],
        { fetchImpl },
      ),
    ).resolves.toEqual([
      'two.ts: live URL returned HTTP 404: https://example.com/missing',
    ])
    expect(fetchImpl).toHaveBeenCalledTimes(2)
    expect(fetchImpl).toHaveBeenNthCalledWith(
      1,
      'https://example.com/ok',
      expect.objectContaining({ method: 'HEAD' }),
    )
  })

  it.each([403, 405])(
    'falls back to a minimal GET when HEAD returns HTTP %s',
    async (status) => {
      const fetchImpl = vi
        .fn()
        .mockResolvedValueOnce(new Response(null, { status }))
        .mockResolvedValueOnce(new Response(null, { status: 200 }))

      await expect(
        checkLiveLinks(
          [{ source: 'docs.ts', href: 'https://example.com/head-disabled' }],
          { fetchImpl },
        ),
      ).resolves.toEqual([])
      expect(fetchImpl).toHaveBeenNthCalledWith(
        2,
        'https://example.com/head-disabled',
        expect.objectContaining({
          method: 'GET',
          headers: { Range: 'bytes=0-0' },
        }),
      )
    },
  )

  it('reports the underlying network cause for actionable live failures', async () => {
    const networkError = Object.assign(new TypeError('fetch failed'), {
      cause: new Error('certificate hostname mismatch'),
    })

    await expect(
      checkLiveLinks([{ source: 'site.ts', href: 'https://example.com' }], {
        fetchImpl: vi.fn().mockRejectedValue(networkError),
      }),
    ).resolves.toEqual([
      'site.ts: live URL request failed (fetch failed: certificate hostname mismatch): https://example.com',
    ])
  })

  it('runs the checked-in deterministic audit without live requests', () => {
    const result = spawnSync(process.execPath, ['scripts/check-links.mjs'], {
      encoding: 'utf8',
    })

    expect(result.status).toBe(0)
    expect(result.stderr).toBe('')
    expect(result.stdout).toMatch(
      /^Checked \d+ deterministic link destinations\.\n$/,
    )
  })

  it('keeps deterministic and opt-in live link commands separate', () => {
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'))

    expect(packageJson.scripts['check:links']).toBe(
      'node scripts/check-links.mjs',
    )
    expect(packageJson.scripts['check:links:live']).toBe(
      'node scripts/check-links.mjs --live',
    )
    expect(packageJson.scripts.check).toContain('npm run check:links')
    expect(packageJson.scripts.check).not.toContain('check:links:live')
  })
})
