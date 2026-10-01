import { ExternalLink } from './external-link'
import { siteConfig } from '@/lib/site'

export function CustomWork() {
  return (
    <section className="custom-work" aria-labelledby="custom-work-heading">
      <div className="custom-work__inner site-frame">
        <div>
          <h2 id="custom-work-heading">Need something built for your team?</h2>
          <p>Have a project in mind? Talk to NIPE Solutions.</p>
        </div>
        <ExternalLink
          className="custom-work__link"
          href={siteConfig.companyWebsite}
        >
          Discuss custom work
        </ExternalLink>
      </div>
    </section>
  )
}
