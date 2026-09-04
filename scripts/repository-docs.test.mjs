import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { describe, expect, it } from 'vitest'

const repositoryRoot = process.cwd()

function readRepositoryFile(path) {
  return readFileSync(resolve(repositoryRoot, path), 'utf8')
}

describe('repository documentation', () => {
  it('documents local development, quality, and Vercel deployment commands', () => {
    const readme = readRepositoryFile('README.md')

    expect(readme).toMatch(/^# NIPE Open Source/m)
    expect(readme).toContain('## Development')
    expect(readme).toContain('## Quality checks')
    expect(readme).toContain('## Deployment')

    for (const command of [
      'npm install',
      'npm run dev',
      'npm run check',
      'npm run build',
      'npm run preview',
      'npm run test:e2e',
    ]) {
      expect(readme).toContain(command)
    }

    expect(readme).toContain('Vercel')
  })

  it('uses the MIT license for website source', () => {
    const license = readRepositoryFile('LICENSE')

    expect(license).toContain('MIT License')
    expect(license).toContain('Permission is hereby granted, free of charge')
  })

  it('keeps project additions registry-first and evidence-backed', () => {
    const guide = readRepositoryFile('docs/ADDING_A_PROJECT.md')

    expect(guide).toContain('src/content/projects.ts')
    expect(guide).toContain('one registry entry')
    expect(guide).toContain('docs/audits/project-sources.md')
    expect(guide).toContain('npm run validate:projects')
    expect(guide).toContain('npm run check')
  })

  it('keeps centralized documentation aggregation out of this release', () => {
    const futureDocs = readRepositoryFile('docs/FUTURE_CENTRAL_DOCS.md')

    expect(futureDocs).toContain('not implemented in this release')
    expect(futureDocs).toContain('build-time')
    expect(futureDocs).toContain(
      'Individual project documentation remains the source of truth',
    )
  })

  it('provides the recommended project-site backlink', () => {
    const backlinks = readRepositoryFile('docs/PROJECT_SITE_BACKLINKS.md')

    expect(backlinks).toContain('Part of NIPE Open Source')
    expect(backlinks).toContain('https://opensource.nipesolutions.com')
  })

  it('states legal-source maintenance, owner review, and security routing', () => {
    const contributing = readRepositoryFile('CONTRIBUTING.md')
    const security = readRepositoryFile('SECURITY.md')

    expect(contributing).toContain('legal-source')
    expect(contributing).toContain('owner review')
    expect(security).toContain('repository-specific')
    expect(security).toContain('/security')
  })

  it('configures weekly npm Dependabot updates only', () => {
    const dependabot = readRepositoryFile('.github/dependabot.yml')

    expect(dependabot).toContain('package-ecosystem: npm')
    expect(dependabot).toContain('interval: weekly')
    expect(dependabot).not.toContain('package-ecosystem: github-actions')
  })
})
