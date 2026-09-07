import Link from 'next/link'
import { ExternalLink } from './external-link'
import { InspectorPreview } from './inspector-preview'
import { ProjectVisual } from './project-visual'
import { projectStatusLabels } from '@/content/project-status'
import type { OpenSourceProject } from '@/content/project-types'

export function FeaturedProject({
  project,
}: {
  readonly project: OpenSourceProject
}) {
  return (
    <article
      className="featured-project"
      id={project.slug}
      aria-labelledby={`${project.slug}-title`}
    >
      <div className="featured-project__content">
        <div className="featured-project__eyebrow">
          <span>Featured project</span>
          <span className="project-status">
            {projectStatusLabels[project.status]}
          </span>
        </div>
        <h4 id={`${project.slug}-title`}>
          <Link href={`/projects/${project.slug}`}>{project.name}</Link>
        </h4>
        <p className="featured-project__headline">
          {project.feature?.headline}
        </p>
        <p className="featured-project__description">{project.description}</p>
        <ul className="featured-project__signals" aria-label="Capabilities">
          {project.feature?.signals.map((signal) => (
            <li key={signal}>{signal}</li>
          ))}
        </ul>
        <nav
          className="featured-project__actions"
          aria-label={`${project.name} links`}
        >
          {project.website && (
            <ExternalLink
              className="featured-project__primary"
              href={project.website}
            >
              Explore {project.name}
            </ExternalLink>
          )}
          {project.playground && (
            <ExternalLink
              className="featured-project__secondary"
              href={project.playground}
            >
              Open playground
            </ExternalLink>
          )}
          <div className="featured-project__references">
            <ExternalLink href={project.repository}>GitHub</ExternalLink>
            {project.documentation && (
              <ExternalLink href={project.documentation}>Docs</ExternalLink>
            )}
          </div>
        </nav>
      </div>
      {project.visual === 'data-inspector' ? (
        <InspectorPreview />
      ) : (
        <ProjectVisual project={project} />
      )}
    </article>
  )
}
