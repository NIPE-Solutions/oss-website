import type { CSSProperties } from 'react'
import Link from 'next/link'
import { ExternalLink } from './external-link'
import { ProjectMotif } from './project-motif'
import { projectNumber } from '@/content/projects'
import { projectStatusLabels } from '@/content/project-status'
import type { OpenSourceProject } from '@/content/project-types'

export function ProjectRow({
  project,
}: {
  readonly project: OpenSourceProject
}) {
  return (
    <article
      className="project-row"
      style={{ '--project-accent': project.accent } as CSSProperties}
      aria-labelledby={`${project.slug}-title`}
    >
      <span className="project-number">{projectNumber(project.slug)}</span>
      <div className="project-row__content">
        <h4 id={`${project.slug}-title`}>
          <Link href={`/projects/${project.slug}`}>{project.name}</Link>
        </h4>
        <p>{project.description}</p>
        <div className="project-row__meta">
          <span className="project-status">
            {projectStatusLabels[project.status]}
          </span>
          <nav aria-label={`${project.name} links`}>
            {project.documentation && (
              <ExternalLink href={project.documentation}>Docs</ExternalLink>
            )}
            <ExternalLink href={project.repository}>GitHub</ExternalLink>
            {project.npm?.published && (
              <ExternalLink
                href={`https://www.npmjs.com/package/${project.npm.package}`}
              >
                npm
              </ExternalLink>
            )}
          </nav>
        </div>
      </div>
      <div className="project-row__motif">
        <ProjectMotif visual={project.visual} decorative />
      </div>
    </article>
  )
}
