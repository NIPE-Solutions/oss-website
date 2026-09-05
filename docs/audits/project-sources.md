# Project source audit

Observed on **2026-09-04 at 22:07 CEST** in Europe/Vienna, refreshed for the launch-polish pass, and re-audited for React Swipe Actions on **2026-09-05**. This inventory records the public evidence available for the NIPE Open Source directory. GitHub state was queried with `gh api`; npm publication state was queried with `npm view`. Live sites were checked with `curl`. Local sibling checkouts were treated as read-only hints only, because several were behind their remotes.

## Publication decision

| Candidate                   | Directory decision             | Status to show                                | Published package                                   |
| --------------------------- | ------------------------------ | --------------------------------------------- | --------------------------------------------------- |
| React Spring Bottom Sheet   | Include under UI & Interaction | Stable, independently maintained continuation | `@nipe-solutions/react-spring-bottom-sheet@5.0.1`   |
| Readonly View               | Include under Runtime          | Stable                                        | `@nipe-solutions/readonly-view@2.0.1`               |
| React Swipe Actions         | Include under UI & Interaction | Alpha                                         | `@nipe-solutions/react-swipe-actions@0.1.0-alpha.0` |
| Angular Flex-Layout Codemod | Include under Tooling          | Beta                                          | `@nipe-solutions/flex-layout-codemod@2.0.0-beta.1`  |

Present React Swipe Actions as Alpha and retain its documented boundaries. Do not describe the codemod as stable or as completing every migration automatically.

## React Spring Bottom Sheet

- Repository: <https://github.com/NIPE-Solutions/react-spring-bottom-sheet>
- Canonical documentation: <https://react-spring-bottom-sheet.nipesolutions.com> (HTTP 200 when observed)
- Default branch evidence: `main` at [`465d32fe2caf52f4d708e3a81d8fdff04350bfbe`](https://github.com/NIPE-Solutions/react-spring-bottom-sheet/commit/465d32fe2caf52f4d708e3a81d8fdff04350bfbe). It is four website-branding commits ahead of `v5.0.1`; the released package/API evidence remains the correct public-copy source.
- Released evidence: tag [`v5.0.1`](https://github.com/NIPE-Solutions/react-spring-bottom-sheet/releases/tag/v5.0.1) at `0af40514e172dc68a07180b13d2f35163b60d4ad`, published 2026-09-04.
- Package: [`@nipe-solutions/react-spring-bottom-sheet`](https://www.npmjs.com/package/@nipe-solutions/react-spring-bottom-sheet), version `5.0.1`, npm `latest`; MIT; Node `>=24 <25`; React/React DOM peer range `^19.0.0`.
- Package exports: root ESM/CJS/types plus `core.css`, `theme.css`, `tokens.css`, `styles.css`, and `package.json`, verified in the [released package metadata](https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/package.json).
- Primary sources inspected: released [README](https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/README.md), [changelog](https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/CHANGELOG.md), [v4-to-v5 migration guide](https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/docs/migration-v4-to-v5.md), default-branch [contribution guide](https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/465d32fe2caf52f4d708e3a81d8fdff04350bfbe/CONTRIBUTING.md), live documentation, GitHub release, and npm metadata.
- Configured support destinations: documentation at <https://react-spring-bottom-sheet.nipesolutions.com> only. The released manifest declares `https://github.com/NIPE-Solutions/react-spring-bottom-sheet/issues` as its `bugs` URL, but repository issues are disabled. Discussions are disabled, no root `SECURITY.md` is present, and GitHub private vulnerability reporting is disabled. Do not render Issues, Discussions, or Security actions from derived repository URLs.
- Contribution state: the default-branch [contribution guide](https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/465d32fe2caf52f4d708e3a81d8fdff04350bfbe/CONTRIBUTING.md) still discusses the older v4/v5 planning split and some obsolete script names, so it is not a source for current public API claims.

Verified capabilities suitable for public copy:

- Accessible React 19 bottom sheets using a compound `Sheet` API, controlled or uncontrolled state, and named snap points. Source: [v5 README](https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/README.md) and [v5.0.0 release notes](https://github.com/NIPE-Solutions/react-spring-bottom-sheet/releases/tag/v5.0.0).
- Modal focus containment, background isolation, accessible title/description registration, Escape handling, and focus restoration. Source: [v5.0.0 changelog](https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/CHANGELOG.md#500-2026-09-03).
- Interruption-safe gestures, nested-scroll handling, reduced-motion behavior, and current evergreen Chromium, Firefox, and WebKit verification. Source: [v5 README](https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/README.md#why-version-5).
- Separately exported mechanical, theme, token, and combined styles with an `rsbs` namespace. Source: [v5 README styles section](https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/README.md#styles) and released package exports.

Limitations and boundaries:

- Version 5 requires React 19 and replaces the v4 imperative ref, spring lifecycle callbacks, legacy stylesheet imports, and wrapper presentation props. Source: [v5.0.0 changelog](https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/CHANGELOG.md#500-2026-09-03).
- The NIPE package is an independently maintained continuation in the original fork network, not the original package. Preserve the lineage language from the [README](https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/README.md#project-lineage).

Real example source: use the compound-component example from the [released README](https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/v5.0.1/README.md#example), beginning with:

```tsx
import { Sheet } from '@nipe-solutions/react-spring-bottom-sheet'

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
</Sheet.Root>
```

## Readonly View

- Repository: <https://github.com/NIPE-Solutions/readonly-view>
- Canonical documentation: <https://readonly-view.nipesolutions.com> (HTTP 200 when observed)
- Default branch evidence: `main` at [`8ab6b2d6031209926d49830d251b2b630608c2f7`](https://github.com/NIPE-Solutions/readonly-view/commit/8ab6b2d6031209926d49830d251b2b630608c2f7). It is one documentation-site backlink commit ahead of `v2.0.1`; the released package/API evidence remains current.
- Released evidence: tag [`v2.0.1`](https://github.com/NIPE-Solutions/readonly-view/releases/tag/v2.0.1) at `5941a8b8f0e76b1e5bac6188a0d00fbf1d71556c`, published 2026-09-04.
- Package: [`@nipe-solutions/readonly-view`](https://www.npmjs.com/package/@nipe-solutions/readonly-view), version `2.0.1`, npm `latest`; MIT; Node `>=22 <25`.
- Package exports: root ESM/CJS/types and `package.json`, verified in the [released package metadata](https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/package.json).
- Primary sources inspected: released [README](https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/README.md), [API reference](https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/docs/api.md), [guarantees](https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/docs/guarantees.md), [supported types](https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/docs/supported-types.md), [changelog](https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/CHANGELOG.md), default-branch [security policy](https://github.com/NIPE-Solutions/readonly-view/blob/8ab6b2d6031209926d49830d251b2b630608c2f7/SECURITY.md) and [contribution guide](https://github.com/NIPE-Solutions/readonly-view/blob/8ab6b2d6031209926d49830d251b2b630608c2f7/CONTRIBUTING.md), live documentation, GitHub release, and npm metadata.
- Configured support destinations: [documentation](https://readonly-view.nipesolutions.com), [Issues](https://github.com/NIPE-Solutions/readonly-view/issues), and the repository [security policy](https://github.com/NIPE-Solutions/readonly-view/security/policy). Discussions are disabled. The released package manifest also declares the same Issues URL.
- Security state: `SECURITY.md` tells reporters to use GitHub private vulnerability reporting, but the GitHub API reported that private vulnerability reporting was disabled. Until reconciled, link to the policy without claiming the private route is operational.

Verified capabilities suitable for public copy:

- `readonlyView(source)` exposes a deeply readonly, lazy, live view of owner-controlled mutable data; owner-side changes remain visible while writes through the view throw `DirectMutationError`. Source: [released README guarantees](https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/README.md#guarantees).
- Supported nested values are protected lazily, and shared references and cycles preserve identity inside one membrane. Source: [guarantees reference](https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/docs/guarantees.md).
- Supported values include plain objects, arrays, Map, Set, Date, symbols, accessors, shared references, and cycles; functions and custom classes have documented caveats. Source: [supported-types matrix](https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/docs/supported-types.md).
- The public API includes `readonlyView`, `isReadonlyView`, `DirectMutationError`, `UnsupportedTypeError`, and `DeepReadonly`. Source: [API reference](https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/docs/api.md).

Limitations and boundaries:

- The source is not immutable: Readonly View removes mutation capability only from the returned view and does not revoke other mutable aliases. Source: [ownership model](https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/README.md#ownership-mental-model).
- It is not an immutable snapshot, new-state producer, owner-mutation guard, or security sandbox. Source: [when not to use it](https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/README.md#when-not-to-use-it).
- RegExp, Error, URL, URLSearchParams, buffers, DataView, typed arrays, weak collections, and Promise are rejected. Consumer Proxy traps limit guarantees. Source: [supported-types matrix](https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/docs/supported-types.md).
- Lazy proxy reads still add overhead. Source: [performance section](https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/README.md#performance).

Real example source: use the owner/view example from the [released README](https://github.com/NIPE-Solutions/readonly-view/blob/v2.0.1/README.md#quick-start):

```ts
import { readonlyView } from '@nipe-solutions/readonly-view'

const source = { user: { name: 'Alice' } }
const view = readonlyView(source)
source.user.name = 'Bob'
console.log(view.user.name) // Bob
```

## React Swipe Actions

- Repository: <https://github.com/NIPE-Solutions/react-swipe-actions>
- Re-audited 2026-09-05 at default branch [`main@6cf9c5c`](https://github.com/NIPE-Solutions/react-swipe-actions/commit/6cf9c5ccd7608158455ba86963fb4d5610690e53). The public MIT repository contains source, tests, documentation, examples, contribution and security policies, and the dedicated website <https://react-swipe-actions.nipesolutions.com>. No GitHub tag or release exists yet.
- Package: [`@nipe-solutions/react-swipe-actions@0.1.0-alpha.0`](https://www.npmjs.com/package/@nipe-solutions/react-swipe-actions), published 2026-09-05 with npm `latest` and `alpha`; React and React DOM `^18.3.0 || ^19.0.0` are peers; the manifest reports no runtime dependencies.
- Public scope: composable rows reveal measured leading and trailing actions while the application owns list data and side effects. The package documents controlled and uncontrolled state, optional full swipe, group coordination, keyboard and focus behavior, logical RTL sides, and SSR-safe imports.
- Documented boundaries: the `0.1` line is alpha and excludes generic gesture hooks, nested swipe roots, portals, React Native, `asChild`, and application list lifecycle features.
- Support: documentation site, public Issues, enabled Discussions, and the documented private vulnerability form are configured explicitly.
- Decision: publish the existing registry record as `alpha`, with explicit published npm metadata, support destinations, commit-pinned evidence, and a local ecosystem overview that links outward to the canonical project site.

## Angular Flex-Layout Codemod

- Repository: <https://github.com/NIPE-Solutions/flex-layout-migrator>
- Canonical documentation: the repository [README](https://github.com/NIPE-Solutions/flex-layout-migrator#readme); no separate project site is declared.
- Default branch evidence: `main` at [`72a4960a738ba4f059afb28c9f1a0b30d827572b`](https://github.com/NIPE-Solutions/flex-layout-migrator/commit/72a4960a738ba4f059afb28c9f1a0b30d827572b). It is 15 commits ahead of `v2.0.0-beta.1` and contains substantial unreleased behavior, including default planning, opt-in writes, schema-version `2` reports, native CSS work, Grid coverage, and responsive-image work. Do not describe those default-branch capabilities as published package behavior.
- Released evidence: prerelease tag [`v2.0.0-beta.1`](https://github.com/NIPE-Solutions/flex-layout-migrator/releases/tag/v2.0.0-beta.1) at `c6f12d81273deaacbe86fbc80c227055fc13b096`, published 2026-09-02.
- Package: [`@nipe-solutions/flex-layout-codemod`](https://www.npmjs.com/package/@nipe-solutions/flex-layout-codemod), version `2.0.0-beta.1`, npm `latest` and `beta`; MIT; Node `>=24`; executable `flex-layout-codemod` maps to `dist/cli.js`.
- Primary sources inspected: released [README](https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md), [compatibility reference](https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/docs/compatibility.md), [changelog](https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/CHANGELOG.md), released package metadata, default-branch [security policy](https://github.com/NIPE-Solutions/flex-layout-migrator/blob/72a4960a738ba4f059afb28c9f1a0b30d827572b/SECURITY.md) and [contribution guide](https://github.com/NIPE-Solutions/flex-layout-migrator/blob/72a4960a738ba4f059afb28c9f1a0b30d827572b/CONTRIBUTING.md), GitHub prerelease, and npm metadata.
- Configured support destinations: the released [support guide](https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/docs/SUPPORT.md), [Issues](https://github.com/NIPE-Solutions/flex-layout-migrator/issues), and [GitHub private vulnerability reporting](https://github.com/NIPE-Solutions/flex-layout-migrator/security/advisories/new). Private vulnerability reporting is enabled and is the documented security route. GitHub Discussions are enabled as a repository feature but are not named by the support guide, so do not render a Discussions action.

Verified capabilities suitable for public copy:

- Parses Angular templates with the Angular compiler and uses validated source-range edits, preserving unrelated source text instead of reserializing templates as generic HTML. Source: [released README current scope](https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md#current-scope).
- Converts documented static inputs and literal responsive inputs for the standard Angular Flex-Layout viewport aliases to exact Tailwind CSS v4 utilities where behavior is provable. Source: [released README](https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md#current-scope) and [compatibility reference](https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/docs/compatibility.md).
- Provides dry-run planning, schema-version `1` JSON reports, and deterministic automation exit codes. Source: [CLI workflow](https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md#cli-workflow).
- Preserves unresolved or unsafe cases with structured diagnostics instead of silently approximating them. Source: [released README](https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md#current-scope).

Limitations and boundaries:

- Version 2 is a beta under active development and explicitly makes no production-ready coverage claim. Source: [released README](https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md).
- Dynamic bindings, orientation, print, custom breakpoints, unsupported directives, and conflicting responsive values can remain unchanged for review. Source: [released README current scope](https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md#current-scope).
- It does not inspect application styles or Tailwind configuration and does not generate a companion stylesheet. Native CSS output is outside the released beta's scope. Source: [released README](https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md#current-scope).
- Users must review generated diffs; strict mode exits `2` when unresolved work remains. Source: [CLI workflow](https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md#cli-workflow).

Real example source: use the dry-run/report command from the [released README](https://github.com/NIPE-Solutions/flex-layout-migrator/blob/v2.0.0-beta.1/README.md#cli-workflow):

```bash
flex-layout-codemod ./src --target tailwind --output ./migrated-src --dry-run --report ./reports/flex-layout.json
```

## Canonical NIPE legal values

The current live [Impressum](https://react-spring-bottom-sheet.nipesolutions.com/impressum/) and [Privacy page](https://react-spring-bottom-sheet.nipesolutions.com/privacy/) both returned HTTP `200` and were re-checked on 2026-09-04. Their operator values are also visible in [`website/content/legal.ts`](https://github.com/NIPE-Solutions/react-spring-bottom-sheet/blob/465d32fe2caf52f4d708e3a81d8fdff04350bfbe/website/content/legal.ts); the live Impressum additionally states the registered office as Wien.

| Field                           | Current value                                                                   |
| ------------------------------- | ------------------------------------------------------------------------------- |
| Company / controller            | NIPE Solutions e.U.                                                             |
| Proprietor                      | Nicholas Petrasek                                                               |
| Address                         | Achtergasse 10, 1230 Wien, Austria / Österreich                                 |
| Email                           | `office@nipesolutions.com`                                                      |
| Phone                           | `+43 676 9654266`                                                               |
| VAT ID                          | `ATU78464412`                                                                   |
| Company register number         | `FN 585066t`                                                                    |
| Company register court          | Handelsgericht Wien                                                             |
| Registered office               | Wien                                                                            |
| Trade                           | Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik |
| Supervisory and trade authority | Magistratisches Bezirksamt für den 23. Bezirk                                   |
| Chamber                         | Wirtschaftskammer Wien                                                          |

The current privacy page says the static site may process URL, timestamp, IP address, browser information, and response status in server/security logs; uses Vercel Inc. and its subprocessors for hosting; intentionally sets no non-essential cookies and runs no product analytics; and directs data-subject complaints to the Austrian Data Protection Authority. This is evidence for later adaptation, not legal approval. Re-check the live pages immediately before production publication and flag the new site's legal text for owner/legal review.
