import type { CSSProperties } from 'react'
import Link from 'next/link'

import { ExternalLink } from '@/components/external-link'
import { ProjectVisual } from '@/components/project-visual'
import type { OpenSourceProject } from '@/content/project-types'

interface ProjectEntryProps {
  readonly project: OpenSourceProject
}

const statusLabels = {
  stable: 'Stable',
  prerelease: 'Prerelease',
  maintenance: 'Maintenance',
  archived: 'Archived',
} as const

export function ProjectEntry({ project }: ProjectEntryProps) {
  const headingId = `${project.slug}-title`
  const style = { '--project-accent': project.accent } as CSSProperties
  return (
    <article
      className={`project-entry project-entry--${project.visual}`}
      style={style}
      aria-labelledby={headingId}
    >
      <div className="project-entry__content">
        <div className="project-entry__heading">
          <h4 id={headingId}>
            <Link href={`/projects/${project.slug}`}>{project.name}</Link>
          </h4>
          <span className="project-status">{statusLabels[project.status]}</span>
        </div>
        <p>{project.description}</p>
        <nav aria-label={`${project.name} links`}>
          {project.documentation ? (
            <ExternalLink href={project.documentation}>
              Documentation
            </ExternalLink>
          ) : null}
          <ExternalLink href={project.repository}>Source</ExternalLink>
          {project.npmPackage ? (
            <ExternalLink
              href={`https://www.npmjs.com/package/${project.npmPackage}`}
            >
              npm
            </ExternalLink>
          ) : null}
        </nav>
      </div>
      <div className="project-entry__visual">
        <ProjectVisual project={project} />
      </div>
    </article>
  )
}
