import type { Metadata } from 'next'

import { ExternalLink } from '@/components/external-link'
import { LegalPage } from '@/components/legal-page'
import { operator, projectSupportRoutes } from '@/content/legal'
import { createPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = createPageMetadata({
  title: 'Security',
  description:
    'Website and verified project vulnerability-reporting routes for NIPE Open Source.',
  path: '/security',
})

export default function SecurityPage() {
  return (
    <LegalPage
      eyebrow="Project support"
      title="Security"
      introduction="Report website vulnerabilities by email or use the verified repository-specific destination for an affected project."
    >
      <section aria-labelledby="website-security-heading">
        <h2 id="website-security-heading">NIPE Open Source website</h2>
        <p>
          For a vulnerability in this website, email a description, affected
          URL, reproduction steps, and impact to the site maintainer. Do not
          disclose sensitive details in a public issue.
        </p>
        <a
          href={`mailto:${operator.email}`}
          aria-label="Email a website vulnerability report"
        >
          Email website security
        </a>
      </section>

      <section aria-labelledby="security-routes-heading">
        <h2 id="security-routes-heading">Project reporting routes</h2>
        <p>
          Do not disclose sensitive vulnerability details in a public issue.
          Reporting availability differs by repository, so use the destination
          listed for the affected project.
        </p>
        <ul className="support-directory" aria-label="Project security routes">
          {projectSupportRoutes.map(({ project, support }) =>
            support.security ? (
              <li key={project.slug}>
                <h3>{project.name}</h3>
                <p>
                  Review the project’s security instructions before sharing
                  sensitive details.
                </p>
                <ExternalLink
                  href={support.security}
                  aria-label={`${project.name} security`}
                >
                  Security
                </ExternalLink>
              </li>
            ) : (
              <li key={project.slug}>
                <h3>{project.name}</h3>
                <p>
                  No project-specific security policy is currently listed. Check
                  the repository for current reporting guidance before sharing
                  sensitive details.
                </p>
                <ExternalLink
                  href={project.repository}
                  aria-label={`${project.name} repository`}
                >
                  Repository
                </ExternalLink>
              </li>
            ),
          )}
        </ul>
      </section>
    </LegalPage>
  )
}
