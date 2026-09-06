import type { CSSProperties } from 'react'
import Link from 'next/link'

import { projectCategories, projectNumber } from '@/content/projects'
import { CodeExample } from '@/components/code-example'
import { ExternalLink } from '@/components/external-link'
import { InstallCommand } from '@/components/install-command'
import { ProjectVisual } from '@/components/project-visual'
import { projectStatusLabels } from '@/content/project-status'
import type { OpenSourceProject } from '@/content/project-types'

interface ProjectDetailProps {
  readonly project: OpenSourceProject
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
        <div className="site-frame project-detail__header-layout">
          <div className="project-detail__intro">
            <p className="project-detail__eyebrow">
              Project / {projectNumber(project.slug)} ·{' '}
              {projectCategories.find((c) => c.id === project.category)?.label}
            </p>
            <div className="project-detail__title-row">
              <h1>{project.name}</h1>
              <span className="project-status">
                {projectStatusLabels[project.status]}
              </span>
            </div>
            <p className="project-detail__summary">{project.description}</p>
          </div>
          <ProjectVisual project={project} />
        </div>
      </header>

      <div className="site-frame reading-width project-detail__content">
        <section aria-labelledby="purpose-heading">
          <h2 id="purpose-heading">Purpose</h2>
          <p>{project.purpose.description}</p>
          <ExternalLink
            href={project.purpose.source.href}
            aria-label="Source for purpose"
          >
            Source
          </ExternalLink>
        </section>

        <section aria-labelledby="capabilities-heading">
          <h2 id="capabilities-heading">Scope & ownership</h2>
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
            <h2 id="limitations-heading">Boundaries & limitations</h2>
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
          <InstallCommand
            packageName={`${project.npm.package}@${project.npm.version}`}
          />
        ) : null}

        <p className="package-meta">
          {project.license} license
          {project.npm?.published
            ? ` · ${project.npm.package} · ${project.npm.version}`
            : ' · Not published to npm yet.'}
        </p>
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
          {project.support?.issues && (
            <ExternalLink href={project.support.issues}>Issues</ExternalLink>
          )}
          {project.support?.security && (
            <ExternalLink href={project.support.security}>
              Security
            </ExternalLink>
          )}
          {project.changelog && (
            <ExternalLink href={project.changelog}>Changelog</ExternalLink>
          )}
          {project.resources?.map((link) => (
            <ExternalLink key={link.href} href={link.href}>
              {link.label}
            </ExternalLink>
          ))}
          {Object.values(project.funding ?? {}).map((url) => (
            <ExternalLink key={url} href={url}>
              Support maintenance
            </ExternalLink>
          ))}
          {project.npm?.published ? (
            <ExternalLink
              href={`https://www.npmjs.com/package/${project.npm.package}`}
            >
              npm package
            </ExternalLink>
          ) : null}
        </nav>

        <nav
          className="project-detail__ecosystem"
          aria-label="Ecosystem discovery"
        >
          <Link href="/#projects">Explore other projects</Link>
        </nav>
      </div>
    </article>
  )
}
