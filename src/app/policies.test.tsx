import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import ContributingPage from '@/app/contributing/page'
import ImpressumPage from '@/app/impressum/page'
import NotFound from '@/app/not-found'
import PrivacyPage from '@/app/privacy/page'
import SecurityPage from '@/app/security/page'
import { publishedProjects } from '@/content/projects'

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
    expect(outbound).toHaveTextContent(/GitHub, npm, and NIPE Solutions/)
    expect(outbound).toHaveTextContent(/only after you follow a link/i)
    expect(outbound).toHaveTextContent(/not embedded/i)
  })

  it.each([ImpressumPage, PrivacyPage])(
    'flags the legal copy for owner or legal review',
    (Page) => {
      render(<Page />)

      expect(screen.getByText(/owner or legal review/i)).toBeInTheDocument()
    },
  )
})

describe('project support routes', () => {
  it('routes every published project to its repository contribution guide', () => {
    render(<ContributingPage />)

    const directory = screen.getByRole('list', {
      name: 'Project contribution guides',
    })

    for (const project of publishedProjects) {
      expect(
        within(directory).getByRole('link', {
          name: `${project.name} contribution guide`,
        }),
      ).toHaveAttribute(
        'href',
        `${project.repository}/blob/main/CONTRIBUTING.md`,
      )
    }
  })

  it('uses only verified project-specific security destinations', () => {
    render(<SecurityPage />)

    expect(
      screen.getByRole('link', {
        name: 'React Spring Bottom Sheet security overview',
      }),
    ).toHaveAttribute(
      'href',
      'https://github.com/NIPE-Solutions/react-spring-bottom-sheet/security',
    )
    expect(
      screen.getByRole('link', { name: 'Readonly View security policy' }),
    ).toHaveAttribute(
      'href',
      'https://github.com/NIPE-Solutions/readonly-view/security/policy',
    )
    expect(
      screen.getByRole('link', {
        name: 'Angular Flex-Layout Codemod private vulnerability report',
      }),
    ).toHaveAttribute(
      'href',
      'https://github.com/NIPE-Solutions/flex-layout-migrator/security/advisories/new',
    )
    expect(
      screen.getByText(
        /No verified private reporting route or published policy/,
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        /Private vulnerability reporting is not currently enabled/,
      ),
    ).toBeInTheDocument()
  })
})

describe('not-found route', () => {
  it('offers useful recovery and disclosure destinations', () => {
    render(<NotFound />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Page not found' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'href',
      '/',
    )
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
