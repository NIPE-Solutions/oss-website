import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { ProjectMenu } from './project-menu'

afterEach(cleanup)

describe('ProjectMenu', () => {
  it('links every public project from one native disclosure', () => {
    render(<ProjectMenu />)

    const summary = screen.getByText('Projects', { selector: 'summary' })
    const disclosure = summary.closest('details')
    expect(disclosure).not.toBeNull()
    fireEvent.click(summary)

    const menu = within(disclosure!)
    expect(menu.getAllByRole('link')).toHaveLength(7)

    for (const project of [
      {
        name: 'React Spring Bottom Sheet',
        href: '/projects/react-spring-bottom-sheet',
      },
      {
        name: 'React Swipe Actions',
        href: '/projects/react-swipe-actions',
      },
      {
        name: 'React Anchored Layer',
        href: '/projects/react-anchored-layer',
      },
      {
        name: 'React Pull to Refresh',
        href: '/projects/react-pull-to-refresh',
      },
      { name: 'React Viewport', href: '/projects/react-viewport' },
      { name: 'Readonly View', href: '/projects/readonly-view' },
      {
        name: 'Angular Flex-Layout Codemod',
        href: '/projects/flex-layout-codemod',
      },
    ]) {
      expect(menu.getByRole('link', { name: project.name })).toHaveAttribute(
        'href',
        project.href,
      )
    }
  })

  it('shows shared text statuses in populated category groups only', () => {
    render(<ProjectMenu />)

    const summary = screen.getByText('Projects', { selector: 'summary' })
    const disclosure = summary.closest('details')
    expect(disclosure).not.toBeNull()
    fireEvent.click(summary)

    const menu = within(disclosure!)
    expect(
      menu
        .getAllByRole('heading', { level: 2 })
        .map(({ textContent }) => textContent),
    ).toEqual(['UI & Interaction', 'Runtime', 'Tooling'])

    const ui = menu.getByRole('region', { name: 'UI & Interaction' })
    const runtime = menu.getByRole('region', { name: 'Runtime' })
    const tooling = menu.getByRole('region', { name: 'Tooling' })

    expect(within(ui).getAllByRole('link')).toHaveLength(5)
    expect(within(runtime).getAllByRole('link')).toHaveLength(1)
    expect(within(tooling).getAllByRole('link')).toHaveLength(1)
    expect(menu.getAllByText('Stable')).toHaveLength(2)
    expect(menu.getAllByText('Beta')).toHaveLength(1)
    expect(menu.getAllByText('Alpha')).toHaveLength(4)
  })
})
