import { ExternalLink } from '@/components/external-link'
import { publicProjects } from '@/content/projects'
import { siteConfig } from '@/lib/site'

export function Hero() {
  const areas = new Set(publicProjects.map((project) => project.category)).size
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="site-frame hero__inner">
        <div className="hero__edition">
          <span>Independent software / Public source</span>
          <span>{new Date().getFullYear()}</span>
        </div>
        <h1 id="hero-heading">
          Focused primitives <br />
          and tools for the web.
        </h1>
        <div className="hero__bottom">
          <p>
            Small software for browser and application problems that should not
            need to be solved from scratch.
          </p>
          <div>
            <p className="hero__count">
              {String(publicProjects.length).padStart(2, '0')} projects ·{' '}
              {areas} areas · independently installable
            </p>
            <nav aria-label="Explore the ecosystem">
              <a href="#projects">
                Explore projects <span aria-hidden="true">↓</span>
              </a>
              <ExternalLink href={siteConfig.githubOrganization}>
                GitHub
              </ExternalLink>
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}
