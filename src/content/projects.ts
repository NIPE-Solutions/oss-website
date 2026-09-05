import type { OpenSourceProject } from './project-types'

export const projectCategories = [
  { id: 'ui-interaction', label: 'UI & Interaction' },
  { id: 'runtime', label: 'Runtime' },
  { id: 'tooling', label: 'Tooling' },
] as const

const projectRegistry = [
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
    order: 6,
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
    order: 7,
  },
  {
    slug: 'react-swipe-actions',
    name: 'React Swipe Actions',
    category: 'ui-interaction',
    description:
      'Composable React rows with measured leading and trailing actions, keyboard support, logical RTL sides, and optional full-swipe activation.',
    visibility: 'public',
    status: 'alpha',
    repository: 'https://github.com/NIPE-Solutions/react-swipe-actions',
    documentation: 'https://react-swipe-actions.nipesolutions.com',
    npm: {
      package: '@nipe-solutions/react-swipe-actions',
      published: true,
    },
    support: {
      documentation: 'https://react-swipe-actions.nipesolutions.com',
      issues: 'https://github.com/NIPE-Solutions/react-swipe-actions/issues',
      discussions:
        'https://github.com/NIPE-Solutions/react-swipe-actions/discussions',
      security:
        'https://github.com/NIPE-Solutions/react-swipe-actions/security/advisories/new',
    },
    license: 'MIT',
    purpose: {
      description:
        'It supplies the row interaction while applications keep ownership of list data, mutations, undo, confirmation, and removal.',
      source: {
        label: 'Audited README',
        href: 'https://github.com/NIPE-Solutions/react-swipe-actions/blob/1c798c20878165cb2a3702ea18f4967834551b63/README.md',
      },
    },
    claims: [
      {
        kind: 'capability',
        title: 'Composable row actions',
        description:
          'Reveals measured leading and trailing actions through composable Root, Content, Leading, Trailing, and Action components.',
        source: {
          label: 'Audited row API',
          href: 'https://github.com/NIPE-Solutions/react-swipe-actions/blob/1c798c20878165cb2a3702ea18f4967834551b63/README.md#start-with-the-row-api',
        },
      },
      {
        kind: 'capability',
        title: 'Keyboard, focus, and RTL behavior',
        description:
          'Documents physical-arrow keyboard controls, Escape closing, inactive-action tab order, accessible row labels, and logical leading and trailing state in LTR and RTL.',
        source: {
          label: 'Interaction guide',
          href: 'https://github.com/NIPE-Solutions/react-swipe-actions/blob/1c798c20878165cb2a3702ea18f4967834551b63/docs/guides/interaction-accessibility.md',
        },
      },
      {
        kind: 'capability',
        title: 'Controlled rows and group coordination',
        description:
          'Supports controlled or uncontrolled open state, optional full-swipe activation, and groups that close the previously open sibling.',
        source: {
          label: 'State documentation',
          href: 'https://github.com/NIPE-Solutions/react-swipe-actions/blob/1c798c20878165cb2a3702ea18f4967834551b63/README.md#state-accessibility-and-platforms',
        },
      },
      {
        kind: 'limitation',
        title: 'Alpha scope',
        description:
          'The 0.1 line is alpha and intentionally excludes generic gesture hooks, nested swipe roots, portals, React Native, asChild, and application list lifecycle features.',
        source: {
          label: 'Documented alpha boundaries',
          href: 'https://github.com/NIPE-Solutions/react-swipe-actions/blob/1c798c20878165cb2a3702ea18f4967834551b63/README.md#state-accessibility-and-platforms',
        },
      },
    ],
    example: {
      language: 'tsx',
      code: `import {
  Action,
  Content,
  Leading,
  Root,
  Trailing,
} from '@nipe-solutions/react-swipe-actions'
import '@nipe-solutions/react-swipe-actions/core.css'

<Root aria-label="Message actions">
  <Leading>
    <Action onAction={archive}>Archive</Action>
  </Leading>
  <Content>Quarterly planning</Content>
  <Trailing>
    <Action destructive fullSwipe onAction={remove}>Delete</Action>
  </Trailing>
</Root>`,
      source: {
        label: 'Audited row example',
        href: 'https://github.com/NIPE-Solutions/react-swipe-actions/blob/1c798c20878165cb2a3702ea18f4967834551b63/README.md#start-with-the-row-api',
      },
    },
    accent: 'var(--project-swipe-actions)',
    visual: 'swipe-actions',
    featured: true,
    order: 2,
  },
  {
    slug: 'react-anchored-layer',
    name: 'React Anchored Layer',
    category: 'ui-interaction',
    description:
      'Anchored floating layers for React that keep arbitrary portal content aligned through scroll, resize, and layout changes.',
    visibility: 'public',
    status: 'alpha',
    repository: 'https://github.com/NIPE-Solutions/react-anchored-layer',
    documentation: 'https://react-anchored-layer.nipesolutions.com',
    npm: {
      package: '@nipe-solutions/react-anchored-layer',
      published: false,
    },
    support: {
      documentation: 'https://react-anchored-layer.nipesolutions.com',
      issues: 'https://github.com/NIPE-Solutions/react-anchored-layer/issues',
      security:
        'https://github.com/NIPE-Solutions/react-anchored-layer/security/policy',
    },
    license: 'MIT',
    purpose: {
      description:
        'It exists to keep arbitrary portal content aligned with an anchor while the application retains ownership of interaction and accessibility semantics.',
      source: {
        label: 'Audited responsibility boundary',
        href: 'https://github.com/NIPE-Solutions/react-anchored-layer/blob/93c83bd2cd569bfdc2c5bd128f1f3add39ae7696/README.md#responsibility',
      },
    },
    claims: [
      {
        kind: 'capability',
        title: 'Portal and anchor tracking',
        description:
          'Renders arbitrary content through a portal and keeps it aligned with its anchor through scrolling, resizing, and layout changes.',
        source: {
          label: 'Audited quick start',
          href: 'https://github.com/NIPE-Solutions/react-anchored-layer/blob/93c83bd2cd569bfdc2c5bd128f1f3add39ae7696/README.md#quick-start',
        },
      },
      {
        kind: 'capability',
        title: 'Collision and measurement ownership',
        description:
          'Owns positioning, portal placement, measurement, collision handling, and first-position visibility.',
        source: {
          label: 'Audited responsibility boundary',
          href: 'https://github.com/NIPE-Solutions/react-anchored-layer/blob/93c83bd2cd569bfdc2c5bd128f1f3add39ae7696/README.md#responsibility',
        },
      },
      {
        kind: 'capability',
        title: 'SSR-safe import',
        description:
          'Module import and server rendering are safe without DOM globals; portal content is established after mounting on the client.',
        source: {
          label: 'Audited responsibility boundary',
          href: 'https://github.com/NIPE-Solutions/react-anchored-layer/blob/93c83bd2cd569bfdc2c5bd128f1f3add39ae7696/README.md#responsibility',
        },
      },
      {
        kind: 'limitation',
        title: 'Application-owned interaction semantics',
        description:
          'Applications own dismissal, focus, keyboard selection, request state, and ARIA semantics, including dropdown, combobox, menu, and tooltip behavior.',
        source: {
          label: 'Audited responsibility boundary',
          href: 'https://github.com/NIPE-Solutions/react-anchored-layer/blob/93c83bd2cd569bfdc2c5bd128f1f3add39ae7696/README.md#responsibility',
        },
      },
    ],
    example: {
      language: 'tsx',
      code: `import { AnchoredLayer } from '@nipe-solutions/react-anchored-layer'
import '@nipe-solutions/react-anchored-layer/core.css'

;<AnchoredLayer.Root open={open} onOpenChange={setOpen}>
  <AnchoredLayer.Anchor asChild>
    <input aria-controls="address-results" aria-expanded={open} />
  </AnchoredLayer.Anchor>
  <AnchoredLayer.Content
    id="address-results"
    placement="bottom-start"
    offset={6}
    matchAnchorWidth
  >
    {results}
  </AnchoredLayer.Content>
</AnchoredLayer.Root>`,
      source: {
        label: 'Audited quick start',
        href: 'https://github.com/NIPE-Solutions/react-anchored-layer/blob/93c83bd2cd569bfdc2c5bd128f1f3add39ae7696/README.md#quick-start',
      },
    },
    accent: 'var(--project-anchored-layer)',
    visual: 'anchored-layer',
    featured: true,
    order: 3,
  },
  {
    slug: 'react-pull-to-refresh',
    name: 'React Pull to Refresh',
    category: 'ui-interaction',
    description:
      'Pull-to-refresh for React with scroll arbitration, resistance, threshold hysteresis, and an application-owned refresh lifecycle.',
    visibility: 'public',
    status: 'alpha',
    repository: 'https://github.com/NIPE-Solutions/react-pull-to-refresh',
    documentation: 'https://react-pull-to-refresh.nipesolutions.com',
    npm: {
      package: '@nipe-solutions/react-pull-to-refresh',
      published: false,
    },
    support: {
      documentation: 'https://react-pull-to-refresh.nipesolutions.com',
      issues: 'https://github.com/NIPE-Solutions/react-pull-to-refresh/issues',
      security:
        'https://github.com/NIPE-Solutions/react-pull-to-refresh/security/policy',
    },
    license: 'MIT',
    purpose: {
      description:
        'It exists to coordinate downward intent, the active scroll boundary, resistance, threshold hysteresis, exactly-once refresh commitment, and settling while applications own data and errors.',
      source: {
        label: 'Audited purpose statement',
        href: 'https://github.com/NIPE-Solutions/react-pull-to-refresh/blob/3e7b232a23b59e7e44ca0a6b8a13d3d02f839b18/README.md#why-this-exists',
      },
    },
    claims: [
      {
        kind: 'capability',
        title: 'Scroll-boundary and direction arbitration',
        description:
          'Resolves the active scroll surface, tolerates fractional WebKit offsets, and rejects horizontal or upward movement before taking pointer capture.',
        source: {
          label: 'Audited scroll ownership',
          href: 'https://github.com/NIPE-Solutions/react-pull-to-refresh/blob/3e7b232a23b59e7e44ca0a6b8a13d3d02f839b18/README.md#scroll-ownership',
        },
      },
      {
        kind: 'capability',
        title: 'Resistance and threshold hysteresis',
        description:
          'Coordinates resisted visual distance and threshold hysteresis without taking ownership of the feed or cache.',
        source: {
          label: 'Audited purpose statement',
          href: 'https://github.com/NIPE-Solutions/react-pull-to-refresh/blob/3e7b232a23b59e7e44ca0a6b8a13d3d02f839b18/README.md#why-this-exists',
        },
      },
      {
        kind: 'capability',
        title: 'Exactly-once async commitment',
        description:
          'Commits an armed gesture to the application-owned refresh function exactly once and coordinates the asynchronous refreshing and settling states.',
        source: {
          label: 'Audited purpose statement',
          href: 'https://github.com/NIPE-Solutions/react-pull-to-refresh/blob/3e7b232a23b59e7e44ca0a6b8a13d3d02f839b18/README.md#why-this-exists',
        },
      },
      {
        kind: 'limitation',
        title: 'Native refresh and device QA boundaries',
        description:
          'Browser-native page refresh can still win without application containment, and physical-device validation remains pending beyond automated browser checks.',
        source: {
          label: 'Audited browser notes',
          href: 'https://github.com/NIPE-Solutions/react-pull-to-refresh/blob/3e7b232a23b59e7e44ca0a6b8a13d3d02f839b18/README.md#browser-notes',
        },
      },
    ],
    example: {
      language: 'tsx',
      code: `import { PullToRefresh } from '@nipe-solutions/react-pull-to-refresh'
import '@nipe-solutions/react-pull-to-refresh/core.css'

export function Inbox() {
  async function refresh() {
    await refetch()
  }

  return (
    <>
      <button type="button" onClick={() => void refresh()}>
        Refresh inbox
      </button>
      <PullToRefresh.Root onRefresh={refresh}>
        <PullToRefresh.Indicator>
          <Spinner />
        </PullToRefresh.Indicator>
        <PullToRefresh.Content>
          <Messages />
        </PullToRefresh.Content>
      </PullToRefresh.Root>
    </>
  )
}`,
      source: {
        label: 'Audited quick start',
        href: 'https://github.com/NIPE-Solutions/react-pull-to-refresh/blob/3e7b232a23b59e7e44ca0a6b8a13d3d02f839b18/README.md#react-pull-to-refresh',
      },
    },
    accent: 'var(--project-pull-to-refresh)',
    visual: 'pull-to-refresh',
    featured: true,
    order: 4,
  },
  {
    slug: 'react-viewport',
    name: 'React Viewport',
    category: 'ui-interaction',
    description:
      'Reactive React geometry for layout and visual viewports, keyboard occlusion, and safe areas.',
    visibility: 'public',
    status: 'alpha',
    repository: 'https://github.com/NIPE-Solutions/react-viewport',
    documentation:
      'https://github.com/NIPE-Solutions/react-viewport/blob/08a4b3a2353d934835eb1054dd6ddadef2370e65/README.md',
    npm: {
      package: '@nipe-solutions/react-viewport',
      published: false,
    },
    support: {
      documentation:
        'https://github.com/NIPE-Solutions/react-viewport/blob/08a4b3a2353d934835eb1054dd6ddadef2370e65/README.md',
      issues: 'https://github.com/NIPE-Solutions/react-viewport/issues',
      security:
        'https://github.com/NIPE-Solutions/react-viewport/security/policy',
    },
    license: 'MIT',
    purpose: {
      description:
        'It exists for React behavior that needs measured viewport geometry or an explicit distinction between layout and visual viewports when CSS alone cannot express it.',
      source: {
        label: 'Audited project overview',
        href: 'https://github.com/NIPE-Solutions/react-viewport/blob/08a4b3a2353d934835eb1054dd6ddadef2370e65/README.md#nipe-solutionsreact-viewport',
      },
    },
    claims: [
      {
        kind: 'capability',
        title: 'Separate layout and visual geometry',
        description:
          'Keeps layout and visual viewport coordinate systems separate, with explicit fallback geometry when VisualViewport is unavailable.',
        source: {
          label: 'Audited viewport model',
          href: 'https://github.com/NIPE-Solutions/react-viewport/blob/08a4b3a2353d934835eb1054dd6ddadef2370e65/README.md#layout-viewport-versus-visual-viewport',
        },
      },
      {
        kind: 'capability',
        title: 'Conservative keyboard and safe-area state',
        description:
          'Reports safe-area geometry and infers keyboard occlusion only when focus, zoom, and occlusion thresholds provide conservative evidence.',
        source: {
          label: 'Audited keyboard model',
          href: 'https://github.com/NIPE-Solutions/react-viewport/blob/08a4b3a2353d934835eb1054dd6ddadef2370e65/README.md#keyboard-state-is-conservative',
        },
      },
      {
        kind: 'capability',
        title: 'SSR and CSS-variable support',
        description:
          'Provides an SSR-safe stable server snapshot and an optional hook that installs measured viewport, keyboard, and safe-area CSS variables.',
        source: {
          label: 'Audited SSR behavior',
          href: 'https://github.com/NIPE-Solutions/react-viewport/blob/08a4b3a2353d934835eb1054dd6ddadef2370e65/README.md#ssr-and-hydration',
        },
      },
      {
        kind: 'limitation',
        title: 'Heuristic and physical-device boundaries',
        description:
          'Keyboard inference can miss floating or split keyboards, the alpha makes no universal browser claim, and physical-device QA remains pending.',
        source: {
          label: 'Audited browser limitations',
          href: 'https://github.com/NIPE-Solutions/react-viewport/blob/08a4b3a2353d934835eb1054dd6ddadef2370e65/README.md#browser-terminology-and-limitations',
        },
      },
    ],
    example: {
      language: 'tsx',
      code: `import { useViewport } from '@nipe-solutions/react-viewport'

export function ViewportReadout() {
  const viewport = useViewport()

  if (!viewport.ready || viewport.visual === null) {
    return <p>Measuring viewport…</p>
  }

  return (
    <p>
      Visible size: {viewport.visual.width} × {viewport.visual.height}; keyboard:{' '}
      {viewport.keyboard.open ? \`\${viewport.keyboard.height}px\` : 'closed'}
    </p>
  )
}`,
      source: {
        label: 'Audited quick start',
        href: 'https://github.com/NIPE-Solutions/react-viewport/blob/08a4b3a2353d934835eb1054dd6ddadef2370e65/README.md#quick-start',
      },
    },
    accent: 'var(--project-viewport)',
    visual: 'viewport',
    featured: true,
    order: 5,
  },
] satisfies OpenSourceProject[]

export const projects: readonly OpenSourceProject[] = projectRegistry.sort(
  (first, second) => first.order - second.order,
)

export const publicProjects = projects.filter(
  ({ visibility }) => visibility === 'public',
)

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}
