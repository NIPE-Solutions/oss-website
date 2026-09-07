import { featuredProjects } from '@/content/projects'
import { ExternalLink } from '@/components/external-link'
import { siteConfig } from '@/lib/site'

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <div className="site-frame site-header__inner">
        <a
          className="site-identity"
          href="/"
          aria-label="NIPE Open Source home"
        >
          <span className="site-identity__mark" aria-hidden="true" />
          <span>NIPE</span>
          <span className="site-identity__scope">Open Source</span>
        </a>
        <nav className="primary-navigation" aria-label="Primary">
          <a href="/#projects">Projects</a>
          {featuredProjects.map((project) => (
            <a key={project.slug} href={`/#${project.slug}`}>
              {project.name}
            </a>
          ))}
          <a href="/#principles">Principles</a>
          <ExternalLink href={siteConfig.githubOrganization}>
            GitHub
          </ExternalLink>
        </nav>
      </div>
    </header>
  )
}
