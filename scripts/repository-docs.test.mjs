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
      'npm ci',
      'npm install',
      'npm run dev',
      'npm run check',
      'npm run build',
      'npm run preview',
      'npm run test:e2e',
      'npx vercel@latest link',
      'npx vercel@latest deploy',
      'npx vercel@latest inspect',
      'npx vercel@latest promote',
      'npx vercel@latest domains add',
      'npx vercel@latest domains verify',
      'curl -fsSI',
    ]) {
      expect(readme).toContain(command)
    }

    expect(readme).toContain('Vercel')
  })

  it('ignores Vercel linkage and local environment files', () => {
    const gitignore = readRepositoryFile('.gitignore')

    expect(gitignore).toContain('.vercel/')
    expect(gitignore).toContain('.env.local')
    expect(gitignore).toContain('.env.*.local')
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

  it('documents the current project registry contract and lifecycle examples', () => {
    const guide = readRepositoryFile('docs/ADDING_A_PROJECT.md')

    for (const field of [
      '`slug`',
      '`name`',
      '`category`',
      '`visibility`',
      '`status`',
      '`repository`',
      '`documentation`',
      '`npm.published`',
      'support URLs',
      '`accent`',
      '`claims`',
      'purpose source',
      'claim source',
    ]) {
      expect(guide).toContain(field)
    }

    for (const lifecycleExample of [
      '### Stable npm package',
      '### Public beta',
      '### GitHub-only tool',
      '### Hidden development project',
      '### Public archived project',
    ]) {
      expect(guide).toContain(lifecycleExample)
    }
  })

  it('provides automated, manual, and owner/legal launch gates', () => {
    const checklist = readRepositoryFile('docs/LAUNCH_CHECKLIST.md')

    for (const section of [
      '## Automated gates',
      '## Manual gates',
      '## Owner and legal gates',
    ]) {
      expect(checklist).toContain(section)
    }

    for (const automatedCheck of [
      'npm run check',
      'npm run test:e2e',
      'npm run check:links',
      'sitemap',
      'robots',
      'canonical',
    ]) {
      expect(checklist).toContain(automatedCheck)
    }

    for (const manualCheck of [
      'Repair and independently verify `nipesolutions.com` before restoring',
      'npm browser verification',
      'visual social preview',
      'private vulnerability reporting',
      'Discussions',
    ]) {
      expect(checklist).toContain(manualCheck)
    }
  })

  it('describes the approved ecosystem identity with the current exact tagline', () => {
    const audit = readRepositoryFile('docs/audits/final-audit.md')

    expect(audit).toContain(
      'The umbrella “Focused primitives and tools for the web.” positioning is',
    )
    expect(audit).not.toContain(
      'The umbrella “Production-grade primitives and tools for the web” positioning is',
    )
  })

  it('records exact recommended GitHub repository metadata', () => {
    const checklist = readRepositoryFile('docs/LAUNCH_CHECKLIST.md')

    expect(checklist).toContain(
      'The website for NIPE Open Source — focused primitives and developer tools for the web.',
    )
    expect(checklist).toContain('https://opensource.nipesolutions.com')
    expect(checklist).toContain(
      '`open-source`, `developer-tools`, `typescript`, `react`, `nipe-solutions`',
    )
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
