import { cleanup, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import Home from './page'

afterEach(cleanup)

describe('homepage', () => {
  it('introduces NIPE Open Source with one factual positioning heading', () => {
    render(<Home />)

    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Production-grade primitives and tools for the web.',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'NIPE Open Source maintains focused libraries and migration tools in public, with documentation and source kept close to each project.',
      ),
    ).toBeInTheDocument()
  })

  it('renders only populated project categories and each published project once', () => {
    render(<Home />)

    const directory = screen.getByRole('region', { name: 'Projects' })

    expect(
      within(directory)
        .getAllByRole('heading', { level: 3 })
        .map(({ textContent }) => textContent),
    ).toEqual(['UI & Interaction', 'Runtime', 'Tooling'])

    for (const projectName of [
      'React Spring Bottom Sheet',
      'Readonly View',
      'Angular Flex-Layout Codemod',
    ]) {
      expect(
        within(directory).getAllByRole('heading', { name: projectName }),
      ).toHaveLength(1)
    }

    expect(
      within(directory).queryByText(/swipe actions/i),
    ).not.toBeInTheDocument()
  })

  it('shows the verified description and status of every published project', () => {
    render(<Home />)

    expect(
      screen.getByText(
        'Accessible React 19 bottom sheets with a compound Sheet API, named snap points, and separately exported styles.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'A deeply readonly, lazy, live view of owner-controlled mutable data for JavaScript and TypeScript.',
      ),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'A beta Angular template codemod for Flex-Layout to Tailwind CSS v4 migrations.',
      ),
    ).toBeInTheDocument()

    expect(screen.getAllByText('Stable')).toHaveLength(2)
    expect(screen.getByText('Prerelease')).toBeInTheDocument()
  })

  it('routes every project to its documentation, source, and published package', () => {
    render(<Home />)

    const destinations = [
      {
        name: 'React Spring Bottom Sheet',
        documentation: 'https://react-spring-bottom-sheet.nipesolutions.com',
        source: 'https://github.com/NIPE-Solutions/react-spring-bottom-sheet',
        package:
          'https://www.npmjs.com/package/@nipe-solutions/react-spring-bottom-sheet',
      },
      {
        name: 'Readonly View',
        documentation: 'https://readonly-view.nipesolutions.com',
        source: 'https://github.com/NIPE-Solutions/readonly-view',
        package: 'https://www.npmjs.com/package/@nipe-solutions/readonly-view',
      },
      {
        name: 'Angular Flex-Layout Codemod',
        documentation:
          'https://github.com/NIPE-Solutions/flex-layout-migrator#readme',
        source: 'https://github.com/NIPE-Solutions/flex-layout-migrator',
        package:
          'https://www.npmjs.com/package/@nipe-solutions/flex-layout-codemod',
      },
    ]

    for (const destination of destinations) {
      const project = screen.getByRole('article', { name: destination.name })

      expect(
        within(project).getByRole('link', { name: 'Documentation' }),
      ).toHaveAttribute('href', destination.documentation)
      expect(
        within(project).getByRole('link', { name: 'Source' }),
      ).toHaveAttribute('href', destination.source)
      expect(
        within(project).getByRole('link', { name: 'npm' }),
      ).toHaveAttribute('href', destination.package)
    }

    expect(
      screen.queryByRole('link', { name: /swipe actions.*npm/i }),
    ).not.toBeInTheDocument()
  })

  it('links project titles to their local detail pages', () => {
    render(<Home />)

    for (const destination of [
      {
        name: 'React Spring Bottom Sheet',
        href: '/projects/react-spring-bottom-sheet',
      },
      {
        name: 'Readonly View',
        href: '/projects/readonly-view',
      },
      {
        name: 'Angular Flex-Layout Codemod',
        href: '/projects/flex-layout-codemod',
      },
    ]) {
      const project = screen.getByRole('article', { name: destination.name })

      expect(
        within(project).getByRole('link', { name: destination.name }),
      ).toHaveAttribute('href', destination.href)
    }
  })

  it('states qualified principles and routes project-specific support', () => {
    render(<Home />)

    const principles = screen.getByRole('region', {
      name: 'Engineering principles',
    })
    expect(within(principles).getByText('Evidence before claims')).toBeVisible()
    expect(
      within(principles).getByText('Automation leaves a review path'),
    ).toBeVisible()

    const support = screen.getByRole('region', {
      name: 'Contributing and security',
    })
    expect(
      within(support).getByRole('link', {
        name: 'React Spring Bottom Sheet issues',
      }),
    ).toHaveAttribute(
      'href',
      'https://github.com/NIPE-Solutions/react-spring-bottom-sheet/issues',
    )
    expect(
      within(support).getByRole('link', {
        name: 'Readonly View security',
      }),
    ).toHaveAttribute(
      'href',
      'https://github.com/NIPE-Solutions/readonly-view/security',
    )
    expect(
      within(support).getByRole('link', {
        name: 'Angular Flex-Layout Codemod security',
      }),
    ).toHaveAttribute(
      'href',
      'https://github.com/NIPE-Solutions/flex-layout-migrator/security',
    )
  })

  it('keeps concept visuals free of component-owned project facts', () => {
    render(<Home />)

    for (const projectName of [
      'React Spring Bottom Sheet',
      'Readonly View',
      'Angular Flex-Layout Codemod',
    ]) {
      const visual = screen.getByRole('img', {
        name: `${projectName} concept illustration`,
      })

      expect(visual).not.toHaveTextContent(/\S/)
    }
  })

  it('contains no placeholder, social-proof, or generic marketing language', () => {
    const { container } = render(<Home />)
    const publicCopy = container.textContent ?? ''

    expect(publicCopy).not.toMatch(
      /lorem ipsum|coming soon|trusted by|customers|downloads|stars|unlock|seamless|effortless|supercharge|robust|powerful|next-gen|modern developers|built for teams|at scale|enterprise-grade|beautiful|intuitive|revolutionize|transform/i,
    )
  })
})
