import type { Metadata } from 'next'

import { ExternalLink } from '@/components/external-link'
import { LegalPage } from '@/components/legal-page'
import { operator } from '@/content/legal'
import { createPageMetadata } from '@/lib/metadata'

export const metadata: Metadata = createPageMetadata({
  title: 'Privacy',
  description: 'Privacy information for the static NIPE Open Source website.',
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal / Data protection"
      title="Privacy"
      introduction="This notice describes the limited processing required to deliver and protect this static website."
      reviewRequired
    >
      <section aria-labelledby="controller-heading">
        <h2 id="controller-heading">Controller</h2>
        <p>
          The controller is {operator.company}, proprietor {operator.proprietor}
          , {operator.street}, {operator.postalCode} {operator.city},{' '}
          {operator.country}. Contact:{' '}
          <a href={`mailto:${operator.email}`}>{operator.email}</a>.
        </p>
      </section>

      <section aria-labelledby="hosting-heading">
        <h2 id="hosting-heading">Hosting, delivery, and security logs</h2>
        <p>
          This static website is hosted by Vercel Inc. When you request a page,
          technically necessary information such as the requested URL,
          timestamp, IP address, browser information, and response status may be
          processed in delivery and security logs. This supports reliable
          delivery, fault diagnosis, and protection against abuse.
        </p>
        <p>
          Vercel and its subprocessors may process request data outside the
          European Economic Area under applicable transfer safeguards. Current
          provider details are available in the{' '}
          <ExternalLink href="https://vercel.com/legal/privacy-policy">
            Vercel privacy policy
          </ExternalLink>{' '}
          and{' '}
          <ExternalLink href="https://vercel.com/legal/dpa">
            data processing addendum
          </ExternalLink>
          .
        </p>
      </section>

      <section aria-labelledby="storage-heading">
        <h2 id="storage-heading">Cookies, storage, and analytics</h2>
        <p>
          This site does not run analytics, advertising, or session replay. It
          does not intentionally set cookies, does not use browser storage, does
          not embed third-party media, and does not request external fonts.
          Styles and other page assets are served locally as part of the site,
          while text uses your device’s system fonts without making a font
          request. Because there is no consent system, there is no
          cookie-settings control.
        </p>
      </section>

      <section aria-labelledby="outbound-heading">
        <h2 id="outbound-heading">Outbound links</h2>
        <p>
          GitHub, npm, and NIPE Solutions are external destinations and are not
          embedded in this site. Those providers receive request data only after
          you follow a link, and then apply their own privacy terms.
        </p>
      </section>

      <section aria-labelledby="contact-heading">
        <h2 id="contact-heading">Contact and retention</h2>
        <p>
          If you contact the operator by email, the supplied contact and message
          data is processed to answer your request and retained only as long as
          needed for that purpose or applicable legal obligations. An email
          service provider may process the message on the controller’s behalf.
          Operational-log retention is limited by Vercel’s configured service
          and security requirements.
        </p>
      </section>

      <section aria-labelledby="rights-heading">
        <h2 id="rights-heading">Your rights</h2>
        <p>
          Subject to the GDPR’s conditions, you may request access,
          rectification, erasure, restriction, portability, or object to
          processing. You may complain to the{' '}
          <ExternalLink href="https://www.dsb.gv.at/">
            Austrian Data Protection Authority
          </ExternalLink>
          . Contact the controller to exercise a right.
        </p>
      </section>
    </LegalPage>
  )
}
