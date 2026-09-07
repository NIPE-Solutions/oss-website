import type { OpenSourceProject } from './project-types'

export const projectContent: Readonly<
  Record<string, Pick<OpenSourceProject, 'purpose' | 'claims'>>
> = {
  'react-data-inspector': {
    purpose: {
      description:
        'Inspect JavaScript values as object graphs while keeping application state and styling under application control.',
      source: {
        label: 'Audited project README',
        href: 'https://github.com/NIPE-Solutions/react-data-inspector/blob/f9f3e09504467b1ac44dd21d370895d5541b36d7/README.md',
      },
    },
    claims: [
      {
        kind: 'capability',
        title: 'Types, identity and safe inspection',
        description:
          'Real JavaScript types, distinct shared and circular references, descriptor-based inspection, and controlled expansion and selection.',
        source: {
          label: 'Audited project README',
          href: 'https://github.com/NIPE-Solutions/react-data-inspector/blob/f9f3e09504467b1ac44dd21d370895d5541b36d7/README.md',
        },
      },
      {
        kind: 'limitation',
        title: 'Read-only beta',
        description:
          'Editing is not part of the public API. Getters are not evaluated, promises are not awaited, and functions are not executed. WeakMap and WeakSet contents remain opaque.',
        source: {
          label: 'Audited project README',
          href: 'https://github.com/NIPE-Solutions/react-data-inspector/blob/f9f3e09504467b1ac44dd21d370895d5541b36d7/README.md',
        },
      },
    ],
  },
  'react-spring-bottom-sheet': {
    purpose: {
      description:
        'Coordinates a bottom-anchored modal surface with nested scrolling and accessible dialog behavior.',
      source: {
        label: 'Audited project README',
        href: 'https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/465d32fe2caf52f4d708e3a81d8fdff04350bfbe/README.md',
      },
    },
    claims: [
      {
        kind: 'capability',
        title: 'What it owns',
        description:
          'Snap points, gesture arbitration, focus containment and motion.',
        source: {
          label: 'Audited project README',
          href: 'https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/465d32fe2caf52f4d708e3a81d8fdff04350bfbe/README.md',
        },
      },
      {
        kind: 'limitation',
        title: 'What the application owns',
        description: 'Content, application state and visual styling.',
        source: {
          label: 'Audited project README',
          href: 'https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/465d32fe2caf52f4d708e3a81d8fdff04350bfbe/README.md',
        },
      },
    ],
  },
  'react-swipe-actions': {
    purpose: {
      description:
        'Reveals leading and trailing actions while keeping list data and side effects in the application.',
      source: {
        label: 'Audited project README',
        href: 'https://github.com/NIPE-Solutions/react-swipe-actions/blob/7fe35ed00a70ddb7b91c4e4ee5603761a7b81ca8/README.md',
      },
    },
    claims: [
      {
        kind: 'capability',
        title: 'What it owns',
        description:
          'Row interaction, measured action regions, keyboard behavior and logical RTL sides.',
        source: {
          label: 'Audited project README',
          href: 'https://github.com/NIPE-Solutions/react-swipe-actions/blob/7fe35ed00a70ddb7b91c4e4ee5603761a7b81ca8/README.md',
        },
      },
      {
        kind: 'limitation',
        title: 'What the application owns',
        description:
          'Row removal, undo, confirmation, asynchronous mutations and virtualization.',
        source: {
          label: 'Audited project README',
          href: 'https://github.com/NIPE-Solutions/react-swipe-actions/blob/7fe35ed00a70ddb7b91c4e4ee5603761a7b81ca8/README.md',
        },
      },
    ],
  },
  'react-anchored-layer': {
    purpose: {
      description:
        'Adds a focused React composition model and portal behavior around Floating UI positioning.',
      source: {
        label: 'Audited project README',
        href: 'https://github.com/NIPE-Solutions/react-anchored-layer/blob/0c54f0577aef7622073ce9111e324dc883e39236/README.md',
      },
    },
    claims: [
      {
        kind: 'capability',
        title: 'What it owns',
        description:
          'Positioning, portal placement, measurement, collision handling and first-position visibility.',
        source: {
          label: 'Audited project README',
          href: 'https://github.com/NIPE-Solutions/react-anchored-layer/blob/0c54f0577aef7622073ce9111e324dc883e39236/README.md',
        },
      },
      {
        kind: 'limitation',
        title: 'What the application owns',
        description:
          'Open intent, dismissal, focus, keyboard selection and ARIA semantics. Virtual anchors are not currently supported.',
        source: {
          label: 'Audited project README',
          href: 'https://github.com/NIPE-Solutions/react-anchored-layer/blob/0c54f0577aef7622073ce9111e324dc883e39236/README.md',
        },
      },
    ],
  },
  'react-pull-to-refresh': {
    purpose: {
      description:
        'Coordinates downward intent and the active scroll boundary with exactly-once refresh commitment and settling.',
      source: {
        label: 'Audited project README',
        href: 'https://github.com/NIPE-Solutions/react-pull-to-refresh/blob/6847a5546bb5bdac8c2c38242e00af7c77292eb0/README.md',
      },
    },
    claims: [
      {
        kind: 'capability',
        title: 'What it owns',
        description:
          'Gesture arbitration, resistance, threshold hysteresis and refresh lifecycle coordination.',
        source: {
          label: 'Audited project README',
          href: 'https://github.com/NIPE-Solutions/react-pull-to-refresh/blob/6847a5546bb5bdac8c2c38242e00af7c77292eb0/README.md',
        },
      },
      {
        kind: 'limitation',
        title: 'What the application owns',
        description:
          'Fetching, cache, feed content, errors and an accessible refresh button. Physical mobile QA remains pending.',
        source: {
          label: 'Audited project README',
          href: 'https://github.com/NIPE-Solutions/react-pull-to-refresh/blob/6847a5546bb5bdac8c2c38242e00af7c77292eb0/README.md',
        },
      },
    ],
  },
  'react-drag-dismiss': {
    purpose: {
      description:
        'Separates a dismissal gesture and its departure motion from the application lifecycle.',
      source: {
        label: 'Audited project README',
        href: 'https://github.com/NIPE-Solutions/react-drag-dismiss/blob/c54b614af81c4cefdbbfc0d608b46b78cce38ce1/README.md',
      },
    },
    claims: [
      {
        kind: 'capability',
        title: 'What it owns',
        description:
          'Intent detection, velocity, resistance, settling and dismissal callbacks.',
        source: {
          label: 'Audited project README',
          href: 'https://github.com/NIPE-Solutions/react-drag-dismiss/blob/c54b614af81c4cefdbbfc0d608b46b78cce38ce1/README.md',
        },
      },
      {
        kind: 'limitation',
        title: 'What the application owns',
        description:
          'Removal, unmounting, undo, focus, persistence and an accessible dismissal control.',
        source: {
          label: 'Audited project README',
          href: 'https://github.com/NIPE-Solutions/react-drag-dismiss/blob/c54b614af81c4cefdbbfc0d608b46b78cce38ce1/README.md',
        },
      },
    ],
  },
  'caret-geometry': {
    purpose: {
      description:
        'Resolves caret geometry in viewport-relative CSS pixels so a compatible positioner can place floating content.',
      source: {
        label: 'Audited project README',
        href: 'https://github.com/NIPE-Solutions/caret-geometry/blob/ba21b1d058863468ca7899e3611329d869528375/README.md',
      },
    },
    claims: [
      {
        kind: 'capability',
        title: 'What it owns',
        description:
          'Caret measurement for supported inputs, textareas, contenteditable, Range and Selection; virtual references and caret observation.',
        source: {
          label: 'Audited project README',
          href: 'https://github.com/NIPE-Solutions/caret-geometry/blob/ba21b1d058863468ca7899e3611329d869528375/README.md',
        },
      },
      {
        kind: 'limitation',
        title: 'What the application owns',
        description:
          'Floating placement, collision detection, portals, overlay semantics and surrounding layout tracking. Password inputs are unsupported.',
        source: {
          label: 'Audited project README',
          href: 'https://github.com/NIPE-Solutions/caret-geometry/blob/ba21b1d058863468ca7899e3611329d869528375/README.md',
        },
      },
    ],
  },
  'react-viewport': {
    purpose: {
      description:
        'CSS owns layout. React Viewport exposes geometry to application logic. Use it when React needs a consistent reactive snapshot shared across consumers.',
      source: {
        label: 'Audited project README',
        href: 'https://github.com/NIPE-Solutions/react-viewport/blob/e9e25e720d460cdbc1afb1df7e2f7f3c100125c9/README.md',
      },
    },
    claims: [
      {
        kind: 'capability',
        title: 'What it owns',
        description:
          'Shared layout and visual viewport state, scale, offsets, safe-area values and measured or inferred keyboard occlusion.',
        source: {
          label: 'Audited project README',
          href: 'https://github.com/NIPE-Solutions/react-viewport/blob/e9e25e720d460cdbc1afb1df7e2f7f3c100125c9/README.md',
        },
      },
      {
        kind: 'limitation',
        title: 'What the application owns',
        description:
          'Layout, focus, scrolling and responsive breakpoints. Physical iPhone Safari and Android Chrome testing is pending; keyboard inference has documented limits.',
        source: {
          label: 'Audited project README',
          href: 'https://github.com/NIPE-Solutions/react-viewport/blob/e9e25e720d460cdbc1afb1df7e2f7f3c100125c9/README.md',
        },
      },
    ],
  },
  'readonly-view': {
    purpose: {
      description:
        'Exposes live internal data without exposing mutation through the published view.',
      source: {
        label: 'Audited project README',
        href: 'https://github.com/NIPE-Solutions/readonly-view/blob/8ab6b2d6031209926d49830d251b2b630608c2f7/README.md',
      },
    },
    claims: [
      {
        kind: 'capability',
        title: 'What it owns',
        description:
          'A lazy readonly membrane over supported data, with identity preservation for shared references and cycles.',
        source: {
          label: 'Audited project README',
          href: 'https://github.com/NIPE-Solutions/readonly-view/blob/8ab6b2d6031209926d49830d251b2b630608c2f7/README.md',
        },
      },
      {
        kind: 'limitation',
        title: 'What the application owns',
        description:
          'Mutable source aliases and updates. This is not a snapshot, state manager or security sandbox.',
        source: {
          label: 'Audited project README',
          href: 'https://github.com/NIPE-Solutions/readonly-view/blob/8ab6b2d6031209926d49830d251b2b630608c2f7/README.md',
        },
      },
    ],
  },
  'flex-layout-codemod': {
    purpose: {
      description:
        'Makes Flex Layout removal reviewable: plan first, inspect unresolved cases and write only when ready.',
      source: {
        label: 'Audited project README',
        href: 'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/8a7fa4f89e05944d83c0f86ef871a298fb380b48/README.md',
      },
    },
    claims: [
      {
        kind: 'capability',
        title: 'What it owns',
        description:
          'Compiler-aware analysis, supported Tailwind CSS v4 or native CSS transformations, plans and diagnostics.',
        source: {
          label: 'Audited project README',
          href: 'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/8a7fa4f89e05944d83c0f86ef871a298fb380b48/README.md',
        },
      },
      {
        kind: 'limitation',
        title: 'What the application owns',
        description:
          'Reviewing unresolved cases, applying the plan and validating the migrated application. Unsupported cases stay in place.',
        source: {
          label: 'Audited project README',
          href: 'https://github.com/NIPE-Solutions/flex-layout-migrator/blob/8a7fa4f89e05944d83c0f86ef871a298fb380b48/README.md',
        },
      },
    ],
  },
}
