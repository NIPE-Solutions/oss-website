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
    status: 'stable',
    repository: 'https://github.com/NIPE-Solutions/react-spring-bottom-sheet',
    documentation: 'https://react-spring-bottom-sheet.nipesolutions.com',
    npmPackage: '@nipe-solutions/react-spring-bottom-sheet',
    license: 'MIT',
    purpose: {
      detail:
        'It exists for React interfaces that need a bottom-anchored modal surface to coordinate snap points, gestures, nested scrolling, and accessible dialog behavior.',
      verifiedFrom:
        'https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/README.md#why-version-5',
    },
    claims: [
      {
        kind: 'capability',
        label: 'Compound sheet API',
        detail:
          'Provides controlled or uncontrolled state and named snap points through the compound Sheet API.',
        verifiedFrom:
          'https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/README.md',
      },
      {
        kind: 'capability',
        label: 'Accessible modal behavior',
        detail:
          'Provides focus containment, background isolation, title and description registration, Escape handling, and focus restoration.',
        verifiedFrom:
          'https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/CHANGELOG.md#500-2026-09-03',
      },
      {
        kind: 'capability',
        label: 'Interaction and motion support',
        detail:
          'Documents interruption-safe gestures, nested-scroll handling, reduced-motion behavior, and current evergreen browser verification.',
        verifiedFrom:
          'https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/README.md#why-version-5',
      },
      {
        kind: 'limitation',
        label: 'Independent continuation',
        detail:
          'The NIPE package is an independently maintained continuation in the original fork network.',
        verifiedFrom:
          'https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/README.md#project-lineage',
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
      verifiedFrom:
        'https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/README.md#example',
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
    status: 'stable',
    repository: 'https://github.com/NIPE-Solutions/readonly-view',
    documentation: 'https://readonly-view.nipesolutions.com',
    npmPackage: '@nipe-solutions/readonly-view',
    license: 'MIT',
    purpose: {
      detail:
        'It exists for ownership boundaries where an owner keeps mutating data while consumers need a live API that cannot mutate through the returned view.',
      verifiedFrom:
        'https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/README.md#ownership-mental-model',
    },
    claims: [
      {
        kind: 'capability',
        label: 'Live readonly views',
        detail:
          'readonlyView(source) exposes a deeply readonly, lazy view; owner-side changes remain visible while writes through the view throw DirectMutationError.',
        verifiedFrom:
          'https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/README.md#guarantees',
      },
      {
        kind: 'capability',
        label: 'Identity preservation',
        detail:
          'Supported nested values are protected lazily, while shared references and cycles preserve identity within one membrane.',
        verifiedFrom:
          'https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/docs/guarantees.md',
      },
      {
        kind: 'capability',
        label: 'Documented supported types',
        detail:
          'Supports plain objects, arrays, Map, Set, Date, symbols, accessors, shared references, and cycles; functions and custom classes have documented caveats.',
        verifiedFrom:
          'https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/docs/supported-types.md',
      },
      {
        kind: 'limitation',
        label: 'Not immutable storage',
        detail:
          'The source remains mutable through other aliases; the package is not an immutable snapshot, owner-mutation guard, or security sandbox.',
        verifiedFrom:
          'https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/README.md#when-not-to-use-it',
      },
    ],
    example: {
      language: 'ts',
      code: `import { readonlyView } from '@nipe-solutions/readonly-view'

const source = { user: { name: 'Alice' } }
const view = readonlyView(source)
source.user.name = 'Bob'
console.log(view.user.name) // Bob`,
      verifiedFrom:
        'https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/README.md#quick-start',
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
    status: 'prerelease',
    repository: 'https://github.com/NIPE-Solutions/flex-layout-migrator',
    documentation:
      'https://github.com/NIPE-Solutions/flex-layout-migrator#readme',
    npmPackage: '@nipe-solutions/flex-layout-codemod',
    license: 'MIT',
    purpose: {
      detail:
        'It exists to make removal of Angular Flex-Layout reviewable by converting cases that can be proven and reporting unsupported work for manual follow-up.',
      verifiedFrom:
        'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md#current-scope',
    },
    claims: [
      {
        kind: 'capability',
        label: 'Angular-aware edits',
        detail:
          'Parses Angular templates with the Angular compiler and applies validated source-range edits without reserializing templates as generic HTML.',
        verifiedFrom:
          'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md#current-scope',
      },
      {
        kind: 'capability',
        label: 'Proven static conversions',
        detail:
          'Converts documented static and literal responsive inputs for standard viewport aliases to exact Tailwind CSS v4 utilities where behavior is provable.',
        verifiedFrom:
          'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/docs/compatibility.md',
      },
      {
        kind: 'capability',
        label: 'Reviewable automation',
        detail:
          'Provides dry-run planning, schema-version 1 JSON reports, deterministic automation exit codes, and diagnostics for unresolved or unsafe cases.',
        verifiedFrom:
          'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md#cli-workflow',
      },
      {
        kind: 'limitation',
        label: 'Beta scope',
        detail:
          'Version 2 is a beta and does not claim production-ready coverage; dynamic bindings and other unsupported cases can remain for review.',
        verifiedFrom:
          'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md#current-scope',
      },
    ],
    example: {
      language: 'bash',
      code: 'flex-layout-codemod ./src --target tailwind --output ./migrated-src --dry-run --report ./reports/flex-layout.json',
      verifiedFrom:
        'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md#cli-workflow',
    },
    accent: 'var(--project-codemod)',
    visual: 'codemod',
    featured: true,
    order: 3,
  },
] as const

export const publishedProjects = projects.filter(({ npmPackage }) =>
  Boolean(npmPackage),
)

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
