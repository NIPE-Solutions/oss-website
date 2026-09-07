import { featuredProjects } from '@/content/projects'
import Link from 'next/link'
import { ExternalLink } from './external-link'
import { siteConfig } from '@/lib/site'
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-frame site-footer__inner">
        <div>
          <strong>NIPE Open Source</strong>
          <p>Maintained by NIPE Solutions e.U. · Vienna</p>
          <p>© {new Date().getFullYear()} NIPE Solutions e.U.</p>
        </div>
        <nav className="footer-navigation" aria-label="Footer">
          <Link href="/#projects">Projects</Link>
          {featuredProjects.map((project) => (
            <Link key={project.slug} href={`/projects/${project.slug}`}>
              {project.name}
            </Link>
          ))}
          <ExternalLink href={siteConfig.githubOrganization}>
            GitHub
          </ExternalLink>
          <Link href="/contributing">Contributing</Link>
          <Link href="/security">Security</Link>
          <Link href="/impressum">Imprint</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </div>
    </footer>
  )
}
