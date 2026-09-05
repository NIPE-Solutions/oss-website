import { ExternalLink } from '@/components/external-link'
import { ProjectMenu } from '@/components/project-menu'
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
          <ProjectMenu />
          <a className="project-menu-fallback" href="/#projects">
            Projects
          </a>
          <a href="/#principles">Principles</a>
          <ExternalLink href={siteConfig.githubOrganization}>
            GitHub
          </ExternalLink>
          <ExternalLink href={siteConfig.nipeUrl}>NIPE Solutions</ExternalLink>
        </nav>
      </div>
    </header>
  )
}
