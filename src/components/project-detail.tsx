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
  prerelease: 'Prerelease',
  maintenance: 'Maintenance',
  archived: 'Archived',
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const capabilityClaims = project.claims.slice(0, -1)
  const limitation = project.claims.at(-1)
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

        <section aria-labelledby="claims-heading">
          <h2 id="claims-heading">Verified claims</h2>
          <ul className="project-detail__claims">
            {capabilityClaims.map((claim) => (
              <li key={claim.label}>
                <h3>{claim.label}</h3>
                <p>{claim.detail}</p>
                <ExternalLink href={claim.verifiedFrom}>
                  Evidence for {claim.label}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </section>

        {limitation ? (
          <section aria-labelledby="limitations-heading">
            <h2 id="limitations-heading">Scope and limitations</h2>
            <div className="project-detail__limitation">
              <h3>{limitation.label}</h3>
              <p>{limitation.detail}</p>
              <ExternalLink href={limitation.verifiedFrom}>
                Evidence for {limitation.label}
              </ExternalLink>
            </div>
          </section>
        ) : null}

        {project.example ? (
          <CodeExample
            language={project.example.language}
            code={project.example.code}
            source={project.example.verifiedFrom}
          />
        ) : null}

        {project.npmPackage ? (
          <InstallCommand packageName={project.npmPackage} />
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
          {project.npmPackage ? (
            <ExternalLink
              href={`https://www.npmjs.com/package/${project.npmPackage}`}
            >
              npm package
            </ExternalLink>
          ) : null}
        </nav>
      </div>
    </article>
  )
}
