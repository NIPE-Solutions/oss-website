import { ExternalLink } from '@/components/external-link'
import { publishedProjects } from '@/content/projects'
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
          {publishedProjects.map((project) => (
            <li key={project.slug}>
              <span>{project.name}</span>
              <span>
                <ExternalLink
                  href={`${project.repository}/issues`}
                  aria-label={`${project.name} issues`}
                >
                  Issues
                </ExternalLink>
                <ExternalLink
                  href={`${project.repository}/security`}
                  aria-label={`${project.name} security`}
                >
                  Security
                </ExternalLink>
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
