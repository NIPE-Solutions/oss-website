import { describe, expect, it } from 'vitest'
import { projects, publicProjects, getProject, projectNumber } from './projects'
import { projectContent } from './project-content'
describe('audited project content', () => {
  it('keeps every public project uniquely addressable with evidence and version', () => {
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length)
    expect(new Set(projects.map((p) => p.npm?.package)).size).toBe(
      projects.length,
    )
    for (const p of publicProjects) {
      expect(getProject(p.slug)).toBe(p)
      expect(p.npm?.published).toBe(true)
      expect(p.npm?.version).toBeTruthy()
      expect(p.license).toBe('MIT')
      const content = projectContent[p.slug]
      expect(content.purpose.source.href).toMatch(
        /github.com\/NIPE-Solutions\/[^/]+\/blob\/[a-f0-9]{40}\/README.md/,
      )
      expect(content.claims.some((c) => c.kind === 'limitation')).toBe(true)
      for (const c of content.claims) expect(c.source.href).toMatch(/^https:/)
    }
  })
  it('keeps exact audited release channels and editorial numbering', () => {
    expect(publicProjects.map((p) => p.status)).toEqual([
      'stable',
      'alpha',
      'alpha',
      'alpha',
      'alpha',
      'alpha',
      'alpha',
      'stable',
      'beta',
    ])
    expect(publicProjects.map((p) => projectNumber(p.slug))).toEqual([
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
    ])
    expect(getProject('unknown')).toBeUndefined()
  })
  it('positions browser primitives with explicit ownership boundaries', () => {
    expect(getProject('react-viewport')?.description).toContain(
      'geometry for React logic',
    )
    expect(projectContent['react-viewport'].purpose.description).toContain(
      'CSS owns layout',
    )
    expect(
      projectContent['react-anchored-layer'].claims[1].description,
    ).toContain('Virtual anchors are not currently supported')
  })
})
