import { ExternalLink } from '@/components/external-link'
import { LegalPage } from '@/components/legal-page'
import { projectSupportRoutes } from '@/content/legal'

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
          Read the project’s current contribution guide before opening a pull
          request. Use its issue tracker for non-sensitive bug reports and
          feature proposals.
        </p>
        <ul
          className="support-directory"
          aria-label="Project contribution guides"
        >
          {projectSupportRoutes.map(({ project, contributionUrl }) => (
            <li key={project.slug}>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <span className="support-directory__links">
                <ExternalLink
                  href={contributionUrl}
                  aria-label={`${project.name} contribution guide`}
                >
                  Contribution guide
                </ExternalLink>
                <ExternalLink
                  href={`${project.repository}/issues`}
                  aria-label={`${project.name} issues`}
                >
                  Issues
                </ExternalLink>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </LegalPage>
  )
}
