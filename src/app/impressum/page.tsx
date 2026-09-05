import type { Metadata } from 'next'

import { ExternalLink } from '@/components/external-link'
import { LegalPage } from '@/components/legal-page'
import { operator } from '@/content/legal'
import { createPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = createPageMetadata({
  title: 'Impressum',
  description: 'Provider and publisher information for NIPE Open Source.',
  path: '/impressum',
})

export default function ImpressumPage() {
  return (
    <LegalPage
      eyebrow="Legal / Provider information"
      title="Impressum"
      introduction="Provider, media-owner, and publisher information for NIPE Open Source."
    >
      <section aria-labelledby="provider-heading">
        <h2 id="provider-heading">
          Service provider, media owner, and publisher
        </h2>
        <address>
          <strong>{operator.company}</strong>
          <span>Proprietor: {operator.proprietor}</span>
          <span>{operator.street}</span>
          <span>
            {operator.postalCode} {operator.city}, {operator.country} /{' '}
            {operator.countryGerman}
          </span>
          <span>
            Email: <a href={`mailto:${operator.email}`}>{operator.email}</a>
          </span>
          <span>
            Phone:{' '}
            <a href={`tel:${operator.phoneHref}`}>{operator.phoneDisplay}</a>
          </span>
        </address>
      </section>

      <section aria-labelledby="company-heading">
        <h2 id="company-heading">Company information</h2>
        <dl>
          <div>
            <dt>VAT ID</dt>
            <dd>{operator.vatId}</dd>
          </div>
          <div>
            <dt>Company register number</dt>
            <dd>{operator.registerNumber}</dd>
          </div>
          <div>
            <dt>Company register court</dt>
            <dd>{operator.registerCourt}</dd>
          </div>
          <div>
            <dt>Registered office</dt>
            <dd>{operator.registeredOffice}</dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="trade-heading">
        <h2 id="trade-heading">Trade and supervision</h2>
        <p>Trade: {operator.trade}.</p>
        <p>
          Supervisory and trade authority: {operator.authority}. Chamber
          membership: {operator.chamber}. Applicable trade law is the Austrian
          Trade Regulation Act (GewO), available through the{' '}
          <ExternalLink href="https://www.ris.bka.gv.at/">
            Austrian Legal Information System
          </ExternalLink>
          .
        </p>
      </section>

      <section aria-labelledby="editorial-heading">
        <h2 id="editorial-heading">Editorial direction</h2>
        <p>
          Project information and technical summaries for open-source software
          maintained by NIPE Solutions. Media owner and editorial
          responsibility: {operator.company}, {operator.street},{' '}
          {operator.postalCode} {operator.city}.
        </p>
      </section>

      <section aria-labelledby="external-heading">
        <h2 id="external-heading">Projects and external links</h2>
        <p>
          Project source code is provided under the license named on each
          project page. External links, including links to GitHub, npm, and
          project documentation, lead to services operated under their
          respective providers’ terms and privacy information.
        </p>
      </section>
    </LegalPage>
  )
}
