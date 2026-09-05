import { ProjectConstellation } from '@/components/project-constellation'
import { siteConfig } from '@/lib/site'

export function Hero() {
  const [taglineLead, ...taglineRest] = siteConfig.tagline.split(' ')

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="site-frame hero__inner">
        <div className="hero__copy">
          <h1 id="hero-heading">
            <span className="hero__unbroken">{taglineLead}</span>{' '}
            {taglineRest.join(' ')}
          </h1>
          <p>
            Small, independently useful libraries and developer tools for
            browser and application problems that should not need to be rebuilt
            from scratch.
          </p>
          <p className="hero__independence">
            These projects compose, but they do not require each other.
          </p>
          <a className="text-link" href="#projects">
            Explore the projects
          </a>
        </div>
        <ProjectConstellation />
      </div>
    </section>
  )
}
