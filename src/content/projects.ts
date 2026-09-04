import type { OpenSourceProject } from './project-types'

export const projectCategories = [
  { id: 'ui-interaction', label: 'UI & Interaction' },
  { id: 'runtime', label: 'Runtime' },
  { id: 'tooling', label: 'Tooling' },
] as const

export const projects: readonly OpenSourceProject[] = [
  {
    slug: 'react-spring-bottom-sheet',
    name: 'React Spring Bottom Sheet',
    category: 'ui-interaction',
    description:
      'Accessible React 19 bottom sheets with a compound Sheet API, named snap points, and separately exported styles.',
    visibility: 'public',
    status: 'stable',
    repository: 'https://github.com/NIPE-Solutions/react-spring-bottom-sheet',
    documentation: 'https://react-spring-bottom-sheet.nipesolutions.com',
    npm: {
      package: '@nipe-solutions/react-spring-bottom-sheet',
      published: true,
    },
    support: {
      documentation: 'https://react-spring-bottom-sheet.nipesolutions.com',
    },
    license: 'MIT',
    purpose: {
      description:
        'It exists for React interfaces that need a bottom-anchored modal surface to coordinate snap points, gestures, nested scrolling, and accessible dialog behavior.',
      source: {
        label: 'Version 5 rationale',
        href: 'https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/README.md#why-version-5',
      },
    },
    claims: [
      {
        kind: 'capability',
        title: 'Compound sheet API',
        description:
          'Provides controlled or uncontrolled state and named snap points through the compound Sheet API.',
        source: {
          label: 'Released README',
          href: 'https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/README.md',
        },
      },
      {
        kind: 'capability',
        title: 'Accessible modal behavior',
        description:
          'Provides focus containment, background isolation, title and description registration, Escape handling, and focus restoration.',
        source: {
          label: 'Version 5 changelog',
          href: 'https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/CHANGELOG.md#500-2026-09-03',
        },
      },
      {
        kind: 'capability',
        title: 'Interaction and motion support',
        description:
          'Documents interruption-safe gestures, nested-scroll handling, reduced-motion behavior, and current evergreen browser verification.',
        source: {
          label: 'Version 5 rationale',
          href: 'https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/README.md#why-version-5',
        },
      },
      {
        kind: 'limitation',
        title: 'Independent continuation',
        description:
          'The NIPE package is an independently maintained continuation in the original fork network.',
        source: {
          label: 'Project lineage',
          href: 'https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/README.md#project-lineage',
        },
      },
    ],
    example: {
      language: 'tsx',
      code: `import { Sheet } from '@nipe-solutions/react-spring-bottom-sheet'

;<Sheet.Root snapPoints={[{ id: 'content', value: 'content' }]}>
  <Sheet.Trigger>Open account actions</Sheet.Trigger>
  <Sheet.Portal>
    <Sheet.Backdrop />
    <Sheet.Viewport>
      <Sheet.Content>
        <Sheet.Title>Account actions</Sheet.Title>
      </Sheet.Content>
    </Sheet.Viewport>
  </Sheet.Portal>
</Sheet.Root>`,
      source: {
        label: 'Released example',
        href: 'https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/README.md#example',
      },
    },
    accent: 'var(--project-bottom-sheet)',
    visual: 'bottom-sheet',
    featured: true,
    order: 1,
  },
  {
    slug: 'readonly-view',
    name: 'Readonly View',
    category: 'runtime',
    description:
      'A deeply readonly, lazy, live view of owner-controlled mutable data for JavaScript and TypeScript.',
    visibility: 'public',
    status: 'stable',
    repository: 'https://github.com/NIPE-Solutions/readonly-view',
    documentation: 'https://readonly-view.nipesolutions.com',
    npm: {
      package: '@nipe-solutions/readonly-view',
      published: true,
    },
    support: {
      documentation: 'https://readonly-view.nipesolutions.com',
      issues: 'https://github.com/NIPE-Solutions/readonly-view/issues',
      security:
        'https://github.com/NIPE-Solutions/readonly-view/security/policy',
    },
    license: 'MIT',
    purpose: {
      description:
        'It exists for ownership boundaries where an owner keeps mutating data while consumers need a live API that cannot mutate through the returned view.',
      source: {
        label: 'Ownership model',
        href: 'https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/README.md#ownership-mental-model',
      },
    },
    claims: [
      {
        kind: 'capability',
        title: 'Live readonly views',
        description:
          'readonlyView(source) exposes a deeply readonly, lazy view; owner-side changes remain visible while writes through the view throw DirectMutationError.',
        source: {
          label: 'Released guarantees',
          href: 'https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/README.md#guarantees',
        },
      },
      {
        kind: 'capability',
        title: 'Identity preservation',
        description:
          'Supported nested values are protected lazily, while shared references and cycles preserve identity within one membrane.',
        source: {
          label: 'Guarantees reference',
          href: 'https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/docs/guarantees.md',
        },
      },
      {
        kind: 'capability',
        title: 'Documented supported types',
        description:
          'Supports plain objects, arrays, Map, Set, Date, symbols, accessors, shared references, and cycles; functions and custom classes have documented caveats.',
        source: {
          label: 'Supported types',
          href: 'https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/docs/supported-types.md',
        },
      },
      {
        kind: 'limitation',
        title: 'Not immutable storage',
        description:
          'The source remains mutable through other aliases; the package is not an immutable snapshot, owner-mutation guard, or security sandbox.',
        source: {
          label: 'When not to use it',
          href: 'https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/README.md#when-not-to-use-it',
        },
      },
    ],
    example: {
      language: 'ts',
      code: `import { readonlyView } from '@nipe-solutions/readonly-view'

const source = { user: { name: 'Alice' } }
const view = readonlyView(source)
source.user.name = 'Bob'
console.log(view.user.name) // Bob`,
      source: {
        label: 'Released quick start',
        href: 'https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/README.md#quick-start',
      },
    },
    accent: 'var(--project-readonly-view)',
    visual: 'readonly-view',
    featured: true,
    order: 2,
  },
  {
    slug: 'flex-layout-codemod',
    name: 'Angular Flex-Layout Codemod',
    category: 'tooling',
    description:
      'A beta Angular template codemod for Flex-Layout to Tailwind CSS v4 migrations.',
    visibility: 'public',
    status: 'beta',
    repository: 'https://github.com/NIPE-Solutions/flex-layout-migrator',
    documentation:
      'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md',
    npm: {
      package: '@nipe-solutions/flex-layout-codemod',
      published: true,
    },
    support: {
      documentation:
        'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/docs/SUPPORT.md',
      issues: 'https://github.com/NIPE-Solutions/flex-layout-migrator/issues',
      security:
        'https://github.com/NIPE-Solutions/flex-layout-migrator/security/advisories/new',
    },
    license: 'MIT',
    purpose: {
      description:
        'It exists to make removal of Angular Flex-Layout reviewable by converting cases that can be proven and reporting unsupported work for manual follow-up.',
      source: {
        label: 'Released current scope',
        href: 'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md#current-scope',
      },
    },
    claims: [
      {
        kind: 'capability',
        title: 'Angular-aware edits',
        description:
          'Parses Angular templates with the Angular compiler and applies validated source-range edits without reserializing templates as generic HTML.',
        source: {
          label: 'Released current scope',
          href: 'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md#current-scope',
        },
      },
      {
        kind: 'capability',
        title: 'Proven static conversions',
        description:
          'Converts documented static and literal responsive inputs for standard viewport aliases to exact Tailwind CSS v4 utilities where behavior is provable.',
        source: {
          label: 'Compatibility reference',
          href: 'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/docs/compatibility.md',
        },
      },
      {
        kind: 'capability',
        title: 'Reviewable automation',
        description:
          'Provides dry-run planning, schema-version 1 JSON reports, deterministic automation exit codes, and diagnostics for unresolved or unsafe cases.',
        source: {
          label: 'Released CLI workflow',
          href: 'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md#cli-workflow',
        },
      },
      {
        kind: 'limitation',
        title: 'Beta scope',
        description:
          'Version 2 is a beta and does not claim production-ready coverage; dynamic bindings and other unsupported cases can remain for review.',
        source: {
          label: 'Released current scope',
          href: 'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md#current-scope',
        },
      },
    ],
    example: {
      language: 'bash',
      code: 'flex-layout-codemod ./src --target tailwind --output ./migrated-src --dry-run --report ./reports/flex-layout.json',
      source: {
        label: 'Released CLI workflow',
        href: 'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md#cli-workflow',
      },
    },
    accent: 'var(--project-codemod)',
    visual: 'codemod',
    featured: true,
    order: 3,
  },
  {
    slug: 'react-swipe-actions',
    name: 'React Swipe Actions',
    category: 'ui-interaction',
    description: 'No public project documentation is available.',
    visibility: 'hidden',
    status: 'development',
    repository: 'https://github.com/NIPE-Solutions/react-swipe-actions',
    purpose: {
      description:
        'The repository does not yet establish a public package purpose.',
      source: {
        label: 'Empty repository',
        href: 'https://github.com/NIPE-Solutions/react-swipe-actions',
      },
    },
    claims: [],
    accent: 'var(--ink)',
    visual: 'swipe-actions',
    featured: false,
    order: 4,
  },
] as const

export const publicProjects = projects.filter(
  ({ visibility }) => visibility === 'public',
)

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
