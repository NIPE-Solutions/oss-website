import type { Metadata } from 'next'

import { ExternalLink } from '@/components/external-link'
import { LegalPage } from '@/components/legal-page'
import { projectSupportRoutes } from '@/content/legal'
import { createPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = createPageMetadata({
  title: 'Security',
  description:
    'Verified vulnerability-reporting routes for NIPE open-source projects.',
  path: '/security',
})

export default function SecurityPage() {
  return (
    <LegalPage
      eyebrow="Project support"
      title="Security"
      introduction="Use the verified repository-specific destination for vulnerability reports."
    >
      <section aria-labelledby="security-routes-heading">
        <h2 id="security-routes-heading">Report a vulnerability</h2>
        <p>
          Do not disclose sensitive vulnerability details in a public issue.
          Reporting availability differs by repository, so use the destination
          listed for the affected project.
        </p>
        <ul className="support-directory" aria-label="Project security routes">
          {projectSupportRoutes.map(({ project, security, securityUrl }) => (
            <li key={project.slug}>
              <h3>{project.name}</h3>
              <p>{security.note}</p>
              <ExternalLink
                href={securityUrl}
                aria-label={`${project.name} ${security.label}`}
              >
                {security.label[0].toUpperCase() + security.label.slice(1)}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </section>
    </LegalPage>
  )
}
