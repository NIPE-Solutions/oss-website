import { ExternalLink } from './external-link'
import { siteConfig } from '@/lib/site'

export function CommunitySupport() {
  return (
    <section
      className="community-support site-frame"
      aria-labelledby="community-heading"
    >
      <div>
        <h2 id="community-heading">Found something useful?</h2>
        <p>Found your next tool? Give this directory a star.</p>
      </div>
      <div className="community-support__actions">
        <ExternalLink
          className="community-support__primary"
          href={siteConfig.githubRepository}
        >
          Star on GitHub
        </ExternalLink>
        <ExternalLink href={siteConfig.githubOrganization}>
          Explore our GitHub projects
        </ExternalLink>
      </div>
    </section>
  )
}
