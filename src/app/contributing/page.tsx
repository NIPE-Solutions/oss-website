import type { Metadata } from 'next'

import { ExternalLink } from '@/components/external-link'
import { LegalPage } from '@/components/legal-page'
import { projectSupportRoutes } from '@/content/legal'
import { createPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = createPageMetadata({
  title: 'Contributing',
  description:
    'Contribution guides and issue routes for NIPE open-source projects.',
  path: '/contributing',
})

export default function ContributingPage() {
  return (
    <LegalPage
      eyebrow="Project support"
      title="Contributing"
      introduction="Changes and bug reports belong with the repository that owns the code."
    >
      <section aria-labelledby="contribution-guides-heading">
        <h2 id="contribution-guides-heading">Choose a project</h2>
        <p>
          Use the destinations configured by each project for documentation,
          non-sensitive bug reports, and feature proposals.
        </p>
        <ul
          className="support-directory"
          aria-label="Project contribution routes"
        >
          {projectSupportRoutes.map(({ project, support }) =>
            support.documentation || support.issues || support.discussions ? (
              <li key={project.slug}>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <span className="support-directory__links">
                  {support.documentation ? (
                    <ExternalLink
                      href={support.documentation}
                      aria-label={`${project.name} documentation`}
                    >
                      Documentation
                    </ExternalLink>
                  ) : null}
                  {support.issues ? (
                    <ExternalLink
                      href={support.issues}
                      aria-label={`${project.name} issues`}
                    >
                      Issues
                    </ExternalLink>
                  ) : null}
                  {support.discussions ? (
                    <ExternalLink
                      href={support.discussions}
                      aria-label={`${project.name} discussions`}
                    >
                      Discussions
                    </ExternalLink>
                  ) : null}
                </span>
              </li>
            ) : null,
          )}
        </ul>
      </section>
    </LegalPage>
  )
}
