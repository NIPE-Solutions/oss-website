# Expanded-ecosystem source decisions

Observed on **2026-09-05** in Europe/Vienna. Repository documentation and
package metadata remain the technical sources of truth; the ecosystem site
summarizes them.

## Registry decisions

| Project                     | Audited source                                                                                                                                     | Category         | Status | npm state                                                     |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- | ------ | ------------------------------------------------------------- |
| React Spring Bottom Sheet   | [`main@465d32f`](https://github.com/NIPE-Solutions/react-spring-bottom-sheet/commit/465d32fe2caf52f4d708e3a81d8fdff04350bfbe), released `v5.0.1`   | UI & Interaction | Stable | `@nipe-solutions/react-spring-bottom-sheet@5.0.1`, published  |
| React Swipe Actions         | [`main@1c798c2`](https://github.com/NIPE-Solutions/react-swipe-actions/commit/1c798c20878165cb2a3702ea18f4967834551b63)                            | UI & Interaction | Alpha  | `@nipe-solutions/react-swipe-actions`, alpha published        |
| React Anchored Layer        | [`main@93c83bd`](https://github.com/NIPE-Solutions/react-anchored-layer/commit/93c83bd2cd569bfdc2c5bd128f1f3add39ae7696)                           | UI & Interaction | Alpha  | package name reserved in source; not published                |
| React Pull to Refresh       | [`main@3e7b232`](https://github.com/NIPE-Solutions/react-pull-to-refresh/commit/3e7b232a23b59e7e44ca0a6b8a13d3d02f839b18)                          | UI & Interaction | Alpha  | package name reserved in source; not published                |
| React Viewport              | [`main@08a4b3a`](https://github.com/NIPE-Solutions/react-viewport/commit/08a4b3a2353d934835eb1054dd6ddadef2370e65)                                 | UI & Interaction | Alpha  | package name reserved in source; not published                |
| Readonly View               | [`main@8ab6b2d`](https://github.com/NIPE-Solutions/readonly-view/commit/8ab6b2d6031209926d49830d251b2b630608c2f7), released `v2.0.1`               | Runtime          | Stable | `@nipe-solutions/readonly-view@2.0.1`, published              |
| Angular Flex-Layout Codemod | [`main@72a4960`](https://github.com/NIPE-Solutions/flex-layout-migrator/commit/72a4960a738ba4f059afb28c9f1a0b30d827572b), released `v2.0.0-beta.1` | Tooling          | Beta   | `@nipe-solutions/flex-layout-codemod@2.0.0-beta.1`, published |

All seven repositories are intentionally public. Alpha denotes an early public
release or public development surface whose API/browser behavior can still
change. npm identity and publication are independent fields; only
`npm.published: true` enables install and npm links.

React Viewport stays under **UI & Interaction** because developers encounter it
as browser/UI geometry: layout viewport, visual viewport, keyboard occlusion,
and safe areas. Its dedicated hostname remains unavailable, so the current
documentation destination is the audited, commit-pinned README.

## Responsibility and limitation checks

- Bottom Sheet copy uses the released v5 compound API and accessibility,
  gesture, snap-point, and browser documentation. It does not describe v4.
- Readonly View keeps the ownership distinction: the source remains mutable;
  the lazy, deeply readonly view remains live. It is not presented as state
  management, immutable storage, an Immer replacement, or a security sandbox.
- The codemod is Beta and review-first. Copy does not promise automatic,
  risk-free, or complete migration.
- Swipe Actions reflects measured sides, gesture/keyboard/RTL behavior, and
  optional full swipe from the audited Alpha source.
- Anchored Layer owns portal positioning and anchor tracking, while dismissal,
  focus, menus, comboboxes, dropdowns, and other interaction semantics remain
  application-owned.
- Pull to Refresh owns gesture arbitration, resistance, threshold hysteresis,
  and refresh commitment, while applications own feed data. Native browser
  refresh and physical-device QA boundaries remain explicit.
- Viewport separates layout/visual geometry and documents conservative keyboard
  heuristics, SSR state, safe areas, and pending physical-device QA. No universal
  browser-support claim is made.

## Support and legal decisions

Support destinations are stored explicitly per project. The UI never invents
Issues, Discussions, Security, or Documentation URLs. React Spring Bottom Sheet
therefore exposes only its configured docs route; React Viewport points to its
commit-pinned README; and Discussions appear only for Swipe Actions.

The canonical legal source remains the Bottom Sheet website and audited NIPE
legal content: `NIPE Solutions e.U.`, proprietor Nicholas Petrasek,
Achtergasse 10, 1230 Wien, Austria, with the registered company identifiers
already recorded in the site legal module. This source record is evidence, not
legal approval; owner/legal review remains required before launch.
