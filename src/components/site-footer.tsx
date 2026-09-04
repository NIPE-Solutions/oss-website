import Link from 'next/link'

import { ExternalLink } from '@/components/external-link'
import { publicProjects } from '@/content/projects'
import { siteConfig } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-frame site-footer__inner">
        <p>NIPE Open Source is maintained by NIPE Solutions e.U. in Vienna.</p>
        <nav className="footer-navigation" aria-label="Footer">
          <div>
            <h2>Projects</h2>
            {publicProjects.map((project) => (
              <Link href={`/projects/${project.slug}`} key={project.slug}>
                {project.name}
              </Link>
            ))}
          </div>
          <div>
            <h2>Resources</h2>
            <Link href="/contributing">Contributing</Link>
            <Link href="/security">Security</Link>
          </div>
          <div>
            <h2>NIPE</h2>
            <ExternalLink href={siteConfig.nipeUrl}>
              NIPE Solutions
            </ExternalLink>
            <ExternalLink href={siteConfig.githubOrganization}>
              GitHub
            </ExternalLink>
          </div>
          <div>
            <h2>Legal</h2>
            <Link href="/impressum">Impressum</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
        </nav>
      </div>
    </footer>
  )
}
