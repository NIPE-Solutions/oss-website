import { EcosystemMap } from '@/components/ecosystem-map'

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="site-frame hero__inner">
        <div className="hero__copy">
          <h1 id="hero-heading">
            <span className="hero__unbroken">Production-grade</span> primitives
            and tools for the web.
          </h1>
          <p>
            NIPE Open Source maintains focused libraries and migration tools in
            public, with documentation and source kept close to each project.
          </p>
          <a className="text-link" href="#projects">
            Explore the projects
          </a>
        </div>
        <EcosystemMap />
      </div>
    </section>
  )
}
