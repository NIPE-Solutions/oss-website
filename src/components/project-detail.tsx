import type { CSSProperties } from 'react'

import { CodeExample } from '@/components/code-example'
import { ExternalLink } from '@/components/external-link'
import { InstallCommand } from '@/components/install-command'
import type { OpenSourceProject, ProjectStatus } from '@/content/project-types'

interface ProjectDetailProps {
  readonly project: OpenSourceProject
}

const statusLabels: Record<ProjectStatus, string> = {
  stable: 'Stable',
  beta: 'Beta',
  alpha: 'Alpha',
  preview: 'Preview',
  development: 'Development',
  maintenance: 'Maintenance',
  archived: 'Archived',
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const capabilityClaims = project.claims.filter(
    ({ kind }) => kind === 'capability',
  )
  const limitationClaims = project.claims.filter(
    ({ kind }) => kind === 'limitation',
  )
  const style = { '--project-accent': project.accent } as CSSProperties

  return (
    <article className="project-detail" style={style}>
      <header className="project-detail__header">
        <div className="site-frame reading-width">
          <p className="project-detail__eyebrow">Project detail</p>
          <div className="project-detail__title-row">
            <h1>{project.name}</h1>
            <span className="project-status">
              {statusLabels[project.status]}
            </span>
          </div>
          <p className="project-detail__summary">{project.description}</p>
        </div>
      </header>

      <div className="site-frame reading-width project-detail__content">
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading">Overview</h2>
          <p>{project.description}</p>
        </section>

        <section aria-labelledby="purpose-heading">
          <h2 id="purpose-heading">Why it exists</h2>
          <p>{project.purpose.description}</p>
          <ExternalLink
            href={project.purpose.source.href}
            aria-label="Source for purpose"
          >
            Source
          </ExternalLink>
        </section>

        <section aria-labelledby="capabilities-heading">
          <h2 id="capabilities-heading">Capabilities</h2>
          <ul className="project-detail__claims">
            {capabilityClaims.map((claim) => (
              <li key={claim.title}>
                <h3>{claim.title}</h3>
                {claim.description ? <p>{claim.description}</p> : null}
                <ExternalLink
                  href={claim.source.href}
                  aria-label={`Source for ${claim.title}`}
                >
                  Source
                </ExternalLink>
              </li>
            ))}
          </ul>
        </section>

        {limitationClaims.length > 0 ? (
          <section aria-labelledby="limitations-heading">
            <h2 id="limitations-heading">Limitations</h2>
            {limitationClaims.map((limitation) => (
              <div
                className="project-detail__limitation"
                key={limitation.title}
              >
                <h3>{limitation.title}</h3>
                {limitation.description ? (
                  <p>{limitation.description}</p>
                ) : null}
                <ExternalLink
                  href={limitation.source.href}
                  aria-label={`Source for ${limitation.title}`}
                >
                  Source
                </ExternalLink>
              </div>
            ))}
          </section>
        ) : null}

        {project.example ? (
          <CodeExample
            language={project.example.language}
            code={project.example.code}
            source={project.example.source.href}
          />
        ) : null}

        {project.npm?.published ? (
          <InstallCommand packageName={project.npm.package} />
        ) : null}

        <nav
          className="project-detail__actions"
          aria-label={`${project.name} actions`}
        >
          {project.documentation ? (
            <ExternalLink href={project.documentation}>
              Documentation
            </ExternalLink>
          ) : null}
          <ExternalLink href={project.repository}>Source</ExternalLink>
          {project.npm?.published ? (
            <ExternalLink
              href={`https://www.npmjs.com/package/${project.npm.package}`}
            >
              npm package
            </ExternalLink>
          ) : null}
        </nav>
      </div>
    </article>
  )
}
