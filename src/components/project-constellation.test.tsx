import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProjectConstellation } from './project-constellation'

const expectedProjects = [
  {
    name: 'React Spring Bottom Sheet',
    href: '/projects/react-spring-bottom-sheet',
    status: 'Stable',
  },
  {
    name: 'React Swipe Actions',
    href: '/projects/react-swipe-actions',
    status: 'Alpha',
  },
  {
    name: 'React Anchored Layer',
    href: '/projects/react-anchored-layer',
    status: 'Alpha',
  },
  {
    name: 'React Pull to Refresh',
    href: '/projects/react-pull-to-refresh',
    status: 'Alpha',
  },
  {
    name: 'React Viewport',
    href: '/projects/react-viewport',
    status: 'Alpha',
  },
  {
    name: 'Readonly View',
    href: '/projects/readonly-view',
    status: 'Stable',
  },
  {
    name: 'Angular Flex-Layout Codemod',
    href: '/projects/flex-layout-codemod',
    status: 'Beta',
  },
] as const

describe('ProjectConstellation', () => {
  it('links every public project in editorial order with textual status', () => {
    render(<ProjectConstellation />)
    const constellation = screen.getByRole('navigation', {
      name: 'NIPE Open Source projects',
    })
    const links = within(constellation).getAllByRole('link')

    expect(
      links.map((link) => ({
        href: link.getAttribute('href'),
        text: link.textContent,
      })),
    ).toEqual(
      expectedProjects.map(({ href, name, status }) => ({
        href,
        text: `${name}${status}`,
      })),
    )

    for (const { name, status } of expectedProjects) {
      expect(
        within(constellation).getByRole('link', {
          name: `${name} ${status}`,
        }),
      ).toBeInTheDocument()
    }
  })
})
