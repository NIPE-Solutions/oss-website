import { projectContent } from './project-content'
import type { OpenSourceProject } from './project-types'

export const projectCategories = [
  {
    id: 'ui-interaction',
    label: 'UI & Interaction',
    description:
      'Focused React inspection and interaction primitives with explicit gesture, accessibility and ownership boundaries.',
  },
  {
    id: 'browser-primitives',
    label: 'Browser Primitives',
    description:
      'Small abstractions around browser behavior and geometry that application code otherwise has to rebuild.',
  },
  {
    id: 'runtime',
    label: 'Runtime',
    description:
      'Framework-independent JavaScript primitives for application semantics.',
  },
  {
    id: 'tooling',
    label: 'Tooling',
    description:
      'Conservative developer tools for migration, analysis and source transformation.',
  },
] as const

const entries = [
  {
    slug: 'react-data-inspector',
    name: 'React Data Inspector',
    category: 'ui-interaction',
    description:
      'A React inspector for real JavaScript object graphs. Explore values, follow shared references and cycles, and keep your application in control.',
    visibility: 'public',
    status: 'beta',
    website: 'https://react-data-inspector.nipesolutions.com/',
    playground: 'https://react-data-inspector.nipesolutions.com/playground',
    documentation: 'https://react-data-inspector.nipesolutions.com/docs',
    repository: 'https://github.com/NIPE-Solutions/react-data-inspector',
    npm: {
      package: '@nipe-solutions/react-data-inspector',
      published: true,
      version: '0.1.0-beta.0',
    },
    support: {
      issues: 'https://github.com/NIPE-Solutions/react-data-inspector/issues',
      documentation: 'https://react-data-inspector.nipesolutions.com/docs',
    },
    changelog:
      'https://github.com/NIPE-Solutions/react-data-inspector/blob/main/CHANGELOG.md',
    license: 'MIT',
    accent: 'var(--nipe-red)',
    visual: 'data-inspector',
    featured: true,
    feature: {
      headline: 'Inspect the object you actually have.',
      signals: ['React 18.3 / 19', 'TypeScript', 'Circular + shared refs'],
    },
    order: 1,
  },
  {
    slug: 'react-spring-bottom-sheet',
    name: 'React Spring Bottom Sheet',
    category: 'ui-interaction',
    description:
      'Accessible bottom sheets for React with snap points, gesture and scroll coordination, focus management and interruption-safe motion.',
    visibility: 'public',
    status: 'stable',
    repository: 'https://github.com/NIPE-Solutions/react-spring-bottom-sheet',
    documentation: 'https://react-spring-bottom-sheet.nipesolutions.com/',
    npm: {
      package: '@nipe-solutions/react-spring-bottom-sheet',
      published: true,
      version: '5.0.1',
    },
    support: {
      issues:
        'https://github.com/NIPE-Solutions/react-spring-bottom-sheet/issues',
      documentation: 'https://react-spring-bottom-sheet.nipesolutions.com/',
    },
    changelog:
      'https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/main/CHANGELOG.md',
    license: 'MIT',
    accent: 'var(--project-bottom-sheet)',
    visual: 'bottom-sheet',
    featured: false,
    order: 2,
  },
  {
    slug: 'react-swipe-actions',
    name: 'React Swipe Actions',
    category: 'ui-interaction',
    description:
      'Composable swipe-reveal actions for React rows with measured action regions, logical RTL sides, keyboard interaction and optional full swipe.',
    visibility: 'public',
    status: 'alpha',
    repository: 'https://github.com/NIPE-Solutions/react-swipe-actions',
    documentation: 'https://react-swipe-actions.nipesolutions.com/',
    npm: {
      package: '@nipe-solutions/react-swipe-actions',
      published: true,
      version: '0.1.0-alpha.3',
    },
    support: {
      issues: 'https://github.com/NIPE-Solutions/react-swipe-actions/issues',
      documentation: 'https://react-swipe-actions.nipesolutions.com/',
      security:
        'https://github.com/NIPE-Solutions/react-swipe-actions/security/policy',
    },
    changelog:
      'https://github.com/NIPE-Solutions/react-swipe-actions/blob/main/CHANGELOG.md',
    license: 'MIT',
    accent: 'var(--project-swipe-actions)',
    visual: 'swipe-actions',
    featured: false,
    order: 3,
  },
  {
    slug: 'react-anchored-layer',
    name: 'React Anchored Layer',
    category: 'ui-interaction',
    description:
      'Keep floating React content aligned with an anchor through portals, scrolling, resizing and layout changes — without owning popup semantics.',
    visibility: 'public',
    status: 'alpha',
    repository: 'https://github.com/NIPE-Solutions/react-anchored-layer',
    documentation: 'https://react-anchored-layer.nipesolutions.com/',
    npm: {
      package: '@nipe-solutions/react-anchored-layer',
      published: true,
      version: '0.1.0-alpha.0',
    },
    support: {
      issues: 'https://github.com/NIPE-Solutions/react-anchored-layer/issues',
      documentation: 'https://react-anchored-layer.nipesolutions.com/',
      security:
        'https://github.com/NIPE-Solutions/react-anchored-layer/security/policy',
    },
    changelog:
      'https://github.com/NIPE-Solutions/react-anchored-layer/blob/main/CHANGELOG.md',
    license: 'MIT',
    accent: 'var(--project-anchored-layer)',
    visual: 'anchored-layer',
    featured: false,
    order: 4,
  },
  {
    slug: 'react-pull-to-refresh',
    name: 'React Pull to Refresh',
    category: 'ui-interaction',
    description:
      'Pull-to-refresh mechanics with scroll ownership, resistance, threshold hysteresis and an application-owned asynchronous refresh lifecycle.',
    visibility: 'public',
    status: 'alpha',
    repository: 'https://github.com/NIPE-Solutions/react-pull-to-refresh',
    documentation: 'https://react-pull-to-refresh.nipesolutions.com/',
    npm: {
      package: '@nipe-solutions/react-pull-to-refresh',
      published: true,
      version: '0.1.0-alpha.1',
    },
    support: {
      issues: 'https://github.com/NIPE-Solutions/react-pull-to-refresh/issues',
      documentation: 'https://react-pull-to-refresh.nipesolutions.com/',
      security:
        'https://github.com/NIPE-Solutions/react-pull-to-refresh/security/policy',
    },
    changelog:
      'https://github.com/NIPE-Solutions/react-pull-to-refresh/blob/main/CHANGELOG.md',
    license: 'MIT',
    accent: 'var(--project-pull-to-refresh)',
    visual: 'pull-to-refresh',
    featured: false,
    order: 5,
  },
  {
    slug: 'react-drag-dismiss',
    name: 'React Drag Dismiss',
    category: 'ui-interaction',
    description:
      'Drag-to-dismiss mechanics for arbitrary React content with intent detection, velocity, resistance and settling — while the application owns removal.',
    visibility: 'public',
    status: 'alpha',
    repository: 'https://github.com/NIPE-Solutions/react-drag-dismiss',
    documentation: 'https://react-drag-dismiss.nipesolutions.com/',
    npm: {
      package: '@nipe-solutions/react-drag-dismiss',
      published: true,
      version: '0.1.0-alpha.1',
    },
    support: {
      issues: 'https://github.com/NIPE-Solutions/react-drag-dismiss/issues',
      documentation: 'https://react-drag-dismiss.nipesolutions.com/',
      security:
        'https://github.com/NIPE-Solutions/react-drag-dismiss/security/policy',
    },
    changelog:
      'https://github.com/NIPE-Solutions/react-drag-dismiss/blob/main/CHANGELOG.md',
    license: 'MIT',
    accent: 'var(--project-drag-dismiss)',
    visual: 'drag-dismiss',
    featured: false,
    order: 6,
  },
  {
    slug: 'caret-geometry',
    name: 'Caret Geometry',
    category: 'browser-primitives',
    description:
      'Reliable viewport coordinates for carets in inputs, textareas and editable DOM, with observation and virtual references for floating UI.',
    visibility: 'public',
    status: 'alpha',
    repository: 'https://github.com/NIPE-Solutions/caret-geometry',
    documentation: 'https://caret-geometry.nipesolutions.com/',
    npm: {
      package: '@nipe-solutions/caret-geometry',
      published: true,
      version: '0.1.0-alpha.0',
    },
    support: {
      issues: 'https://github.com/NIPE-Solutions/caret-geometry/issues',
      documentation: 'https://caret-geometry.nipesolutions.com/',
      security:
        'https://github.com/NIPE-Solutions/caret-geometry/security/policy',
    },
    changelog:
      'https://github.com/NIPE-Solutions/caret-geometry/blob/main/CHANGELOG.md',
    license: 'MIT',
    accent: 'var(--project-caret-geometry)',
    visual: 'caret-geometry',
    featured: false,
    order: 7,
  },
  {
    slug: 'react-viewport',
    name: 'React Viewport',
    category: 'browser-primitives',
    description:
      'Shared reactive visual-viewport, zoom, keyboard-occlusion and safe-area geometry for React logic when CSS or a one-off browser API read is not enough.',
    visibility: 'public',
    status: 'alpha',
    repository: 'https://github.com/NIPE-Solutions/react-viewport',
    documentation: 'https://react-viewport.nipesolutions.com/',
    npm: {
      package: '@nipe-solutions/react-viewport',
      published: true,
      version: '0.1.0-alpha.0',
    },
    support: {
      issues: 'https://github.com/NIPE-Solutions/react-viewport/issues',
      documentation: 'https://react-viewport.nipesolutions.com/',
      security:
        'https://github.com/NIPE-Solutions/react-viewport/security/policy',
    },
    changelog:
      'https://github.com/NIPE-Solutions/react-viewport/blob/main/CHANGELOG.md',
    license: 'MIT',
    accent: 'var(--project-viewport)',
    visual: 'viewport',
    featured: false,
    order: 8,
    resources: [
      {
        label: 'CSS baseline',
        href: 'https://react-viewport.nipesolutions.com/lab/css',
      },
      {
        label: 'Geometry Lab',
        href: 'https://react-viewport.nipesolutions.com/lab',
      },
    ],
  },
  {
    slug: 'readonly-view',
    name: 'Readonly View',
    category: 'runtime',
    description:
      'Deeply readonly, lazy, live views over owner-controlled mutable JavaScript data.',
    visibility: 'public',
    status: 'stable',
    repository: 'https://github.com/NIPE-Solutions/readonly-view',
    documentation: 'https://readonly-view.nipesolutions.com/',
    npm: {
      package: '@nipe-solutions/readonly-view',
      published: true,
      version: '2.0.1',
    },
    support: {
      issues: 'https://github.com/NIPE-Solutions/readonly-view/issues',
      documentation: 'https://readonly-view.nipesolutions.com/',
      security:
        'https://github.com/NIPE-Solutions/readonly-view/security/policy',
    },
    changelog:
      'https://github.com/NIPE-Solutions/readonly-view/blob/main/CHANGELOG.md',
    license: 'MIT',
    accent: 'var(--project-readonly-view)',
    visual: 'readonly-view',
    featured: false,
    order: 9,
  },
  {
    slug: 'flex-layout-codemod',
    name: 'Angular Flex-Layout Codemod',
    category: 'tooling',
    description:
      'Review-first Angular template migration tooling for removing Flex Layout with compiler-aware analysis, explicit targets and diagnostics for cases that should remain manual.',
    visibility: 'public',
    status: 'beta',
    repository: 'https://github.com/NIPE-Solutions/flex-layout-migrator',
    documentation: 'https://angular-flex-layout-codemod.nipesolutions.com/',
    npm: {
      package: '@nipe-solutions/flex-layout-codemod',
      published: true,
      version: '2.0.0-beta.4',
    },
    support: {
      issues: 'https://github.com/NIPE-Solutions/flex-layout-migrator/issues',
      documentation: 'https://angular-flex-layout-codemod.nipesolutions.com/',
      security:
        'https://github.com/NIPE-Solutions/flex-layout-migrator/security/policy',
    },
    changelog:
      'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/main/CHANGELOG.md',
    license: 'MIT',
    accent: 'var(--project-codemod)',
    visual: 'codemod',
    featured: false,
    order: 10,
  },
] as const

export const projects: readonly OpenSourceProject[] = entries.map((entry) => ({
  ...entry,
  ...projectContent[entry.slug],
}))

export const publicProjects = projects
  .filter((p) => p.visibility === 'public')
  .sort((a, b) => a.order - b.order)
export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
export function projectNumber(slug: string) {
  return String(publicProjects.findIndex((p) => p.slug === slug) + 1).padStart(
    2,
    '0',
  )
}

export const featuredProjects = publicProjects.filter(
  (project) => project.featured,
)
