import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import ContributingPage from '@/app/contributing/page'
import ImpressumPage from '@/app/impressum/page'
import NotFound, { metadata as notFoundMetadata } from '@/app/not-found'
import PrivacyPage from '@/app/privacy/page'
import SecurityPage from '@/app/security/page'
import { publicProjects } from '@/content/projects'

afterEach(cleanup)

describe('legal routes', () => {
  it.each([
    ['Impressum', ImpressumPage],
    ['Privacy', PrivacyPage],
  ])('renders the verified operator on %s', (title, Page) => {
    render(<Page />)

    expect(
      screen.getByRole('heading', { level: 1, name: title }),
    ).toBeInTheDocument()
    const operatorRegion = screen.getByRole('region', {
      name:
        title === 'Impressum'
          ? 'Service provider, media owner, and publisher'
          : 'Controller',
    })
    expect(operatorRegion).toHaveTextContent('NIPE Solutions e.U.')
    expect(operatorRegion).toHaveTextContent(/Nicholas Petrasek/)
    expect(operatorRegion).toHaveTextContent(/Achtergasse 10/)
    expect(operatorRegion).toHaveTextContent(/1230 Wien/)
    expect(
      within(operatorRegion).getByRole('link', {
        name: 'office@nipesolutions.com',
      }),
    ).toHaveAttribute('href', 'mailto:office@nipesolutions.com')
  })

  it('renders the verified company and trade facts on the imprint', () => {
    render(<ImpressumPage />)

    expect(screen.getByText(/\+43 676 9654266/)).toBeInTheDocument()
    expect(screen.getByText(/ATU78464412/)).toBeInTheDocument()
    expect(screen.getByText(/FN 585066t/)).toBeInTheDocument()
    expect(screen.getByText(/Handelsgericht Wien/)).toBeInTheDocument()
    expect(
      screen.getByText(
        /Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik/,
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Magistratisches Bezirksamt für den 23\. Bezirk/),
    ).toBeInTheDocument()
    expect(screen.getByText(/Wirtschaftskammer Wien/)).toBeInTheDocument()
  })

  it('describes only the outbound destinations currently linked by the site', () => {
    render(<ImpressumPage />)

    const external = screen.getByRole('region', {
      name: 'Projects and external links',
    })
    expect(external).toHaveTextContent(/GitHub, npm, and project documentation/)
    expect(external).not.toHaveTextContent(/and NIPE Solutions/)
  })

  it('describes only this static site’s actual processing', () => {
    const { container } = render(<PrivacyPage />)

    const hosting = screen.getByRole('region', {
      name: 'Hosting, delivery, and security logs',
    })
    expect(within(hosting).getByText(/Vercel Inc\./)).toBeInTheDocument()
    expect(
      within(hosting).getByRole('link', { name: 'Vercel privacy policy' }),
    ).toHaveAttribute('href', 'https://vercel.com/legal/privacy-policy')
    expect(within(hosting).getByText(/requested URL/)).toHaveTextContent(
      /timestamp.*IP address.*browser information.*response status/,
    )

    const storage = screen.getByRole('region', {
      name: 'Cookies, storage, and analytics',
    })
    expect(storage).toHaveTextContent(/does not run analytics/i)
    expect(storage).toHaveTextContent(/does not request external fonts/i)
    expect(storage).toHaveTextContent(/does not use browser storage/i)
    expect(storage).toHaveTextContent(/does not intentionally set cookies/i)
    expect(storage).toHaveTextContent(/uses your device’s system fonts/i)
    expect(storage).not.toHaveTextContent(
      /Styles, fonts, and other page assets are served locally/i,
    )
    expect(container).not.toHaveTextContent(
      /Google Analytics|Plausible|Matomo|Hotjar|Meta Pixel/i,
    )
    expect(
      screen.queryByRole('link', { name: /cookie settings/i }),
    ).not.toBeInTheDocument()
  })

  it('explains when outbound providers receive request data', () => {
    render(<PrivacyPage />)

    const outbound = screen.getByRole('region', {
      name: 'Outbound links',
    })
    expect(outbound).toHaveTextContent(/GitHub and npm/)
    expect(outbound).not.toHaveTextContent(/NIPE Solutions/)
    expect(outbound).toHaveTextContent(/only after you follow a link/i)
    expect(outbound).toHaveTextContent(/not embedded/i)
  })

  it.each([ImpressumPage, PrivacyPage])(
    'presents the approved source-based legal copy without a draft warning or compliance claim',
    (Page) => {
      const { container } = render(<Page />)

      expect(container).not.toHaveTextContent(/draft|before publication/i)
      expect(container).not.toHaveTextContent(
        /legally compliant|legal compliance/i,
      )
      expect(
        screen.queryByRole('complementary', { name: 'Publication review' }),
      ).not.toBeInTheDocument()
    },
  )
})

describe('project support routes', () => {
  it('publishes the website vulnerability-reporting route from SECURITY.md', () => {
    render(<SecurityPage />)

    const website = screen.getByRole('region', {
      name: 'NIPE Open Source website',
    })
    expect(website).toHaveTextContent(
      /affected URL.*reproduction steps.*impact/i,
    )
    expect(
      within(website).getByRole('link', {
        name: 'Email a website vulnerability report',
      }),
    ).toHaveAttribute('href', 'mailto:office@nipesolutions.com')
  })

  it('renders only explicitly configured contribution support destinations', () => {
    render(<ContributingPage />)

    const directory = screen.getByRole('list', {
      name: 'Project contribution routes',
    })

    for (const project of publicProjects) {
      for (const [kind, href] of Object.entries(project.support ?? {})) {
        if (kind === 'security') continue

        expect(
          within(directory).getByRole('link', {
            name: `${project.name} ${kind}`,
          }),
        ).toHaveAttribute('href', href)
      }
    }
  })

  it('uses only verified project-specific security destinations', () => {
    render(<SecurityPage />)

    for (const project of publicProjects) {
      const link = screen.queryByRole('link', {
        name: `${project.name} security`,
      })

      if (project.support?.security) {
        expect(link).toHaveAttribute('href', project.support.security)
      } else {
        expect(link).not.toBeInTheDocument()
      }
    }
  })
})

describe('not-found route', () => {
  it('does not publish the homepage canonical or invite indexing', () => {
    expect(notFoundMetadata).toMatchObject({
      title: 'Page not found',
      alternates: null,
      robots: null,
    })
  })

  it('offers useful recovery and disclosure destinations', () => {
    render(<NotFound />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Page not found' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Back to project index' }),
    ).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Projects' })).toHaveAttribute(
      'href',
      '/#projects',
    )
    expect(screen.getByRole('link', { name: 'Contributing' })).toHaveAttribute(
      'href',
      '/contributing',
    )
    expect(screen.getByRole('link', { name: 'Security' })).toHaveAttribute(
      'href',
      '/security',
    )
  })
})
