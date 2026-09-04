import { ExternalLink } from '@/components/external-link'
import { publicProjects } from '@/content/projects'
import { siteConfig } from '@/lib/site'

export function SupportRouting() {
  return (
    <section
      className="support-routing"
      aria-labelledby="support-routing-heading"
    >
      <div className="site-frame support-routing__inner">
        <div className="support-routing__copy">
          <h2 id="support-routing-heading">Contributing and security</h2>
          <p>
            Changes, bug reports, and sensitive disclosures belong with the
            project that owns the code. Review the repository guidance before
            sharing details.
          </p>
        </div>
        <ul className="support-routing__projects">
          {publicProjects.map((project) => (
            <li key={project.slug}>
              <span>{project.name}</span>
              <span>
                {project.support?.documentation ? (
                  <ExternalLink
                    href={project.support.documentation}
                    aria-label={`${project.name} documentation`}
                  >
                    Documentation
                  </ExternalLink>
                ) : null}
                {project.support?.issues ? (
                  <ExternalLink
                    href={project.support.issues}
                    aria-label={`${project.name} issues`}
                  >
                    Issues
                  </ExternalLink>
                ) : null}
                {project.support?.discussions ? (
                  <ExternalLink
                    href={project.support.discussions}
                    aria-label={`${project.name} discussions`}
                  >
                    Discussions
                  </ExternalLink>
                ) : null}
                {project.support?.security ? (
                  <ExternalLink
                    href={project.support.security}
                    aria-label={`${project.name} security`}
                  >
                    Security
                  </ExternalLink>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
        <aside className="nipe-relationship" aria-label="About NIPE Solutions">
          <p>
            NIPE Open Source is maintained by{' '}
            <ExternalLink href={siteConfig.nipeUrl}>
              NIPE Solutions
            </ExternalLink>
            , an independent software studio in Vienna.
          </p>
        </aside>
      </div>
    </section>
  )
}
