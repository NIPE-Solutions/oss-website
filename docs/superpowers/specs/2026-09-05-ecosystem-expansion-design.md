# NIPE Open Source Ecosystem Expansion Design

## Outcome

Evolve the existing NIPE Open Source homepage from a three-category directory
into a seven-project ecosystem experience. The redesign must show real projects
in the hero, improve discovery as the registry grows, and preserve the site's
restrained editorial character, static rendering, factual claims, dedicated
documentation sites, accessibility, and privacy baseline.

This work is a separate pull request stacked on the React Swipe Actions pull
request. It does not introduce centralized documentation, analytics, live
metrics, a CMS, search, or a new visual-design foundation.

## Verified source snapshot

Project copy and lifecycle data are reviewed against the following repository
commits and package state on 2026-09-05:

| Project | Audited repository commit | Public state |
| --- | --- | --- |
| React Spring Bottom Sheet | `465d32fe2caf52f4d708e3a81d8fdff04350bfbe` | Stable; npm `5.0.1`; docs live |
| Readonly View | `8ab6b2d6031209926d49830d251b2b630608c2f7` | Stable; npm `2.0.1`; docs live |
| Angular Flex-Layout Codemod | `72a4960a738ba4f059afb28c9f1a0b30d827572b` | Beta; npm `2.0.0-beta.1`; repository docs |
| React Swipe Actions | `1c798c20878165cb2a3702ea18f4967834551b63` | Alpha; npm alpha published; docs live |
| React Anchored Layer | `93c83bd2cd569bfdc2c5bd128f1f3add39ae7696` | Public Alpha development; npm unavailable; docs live |
| React Pull to Refresh | `3e7b232a23b59e7e44ca0a6b8a13d3d02f839b18` | Public Alpha source/docs; npm unavailable; docs live |
| React Viewport | `08a4b3a2353d934835eb1054dd6ddadef2370e65` | Public Alpha source; npm unavailable; intended docs hostname unresolved |

The registry must preserve commit-pinned evidence links. A package name in a
repository is not publication evidence. npm links and install commands render
only when `npm.published` is explicitly true. Until the Viewport documentation
hostname resolves, its registry documentation destination is a commit-pinned
repository document rather than a dead domain.

## Information architecture

The homepage remains:

1. compact header;
2. hero and project constellation;
3. project directory grouped by category;
4. engineering principles;
5. support and contribution guidance;
6. concise footer.

No additional marketing section is added. All seven public projects appear in
the directory. The hero shows the same public registry, but may use different
layout emphasis without a public `Featured` badge.

Canonical categories and editorial order are:

- **UI & Interaction:** React Spring Bottom Sheet, React Swipe Actions, React
  Anchored Layer, React Pull to Refresh, React Viewport.
- **Runtime:** Readonly View.
- **Tooling:** Angular Flex-Layout Codemod.

React Viewport belongs in UI & Interaction because its primary discovery path
is browser geometry and keyboard-aware interface behavior. Runtime remains the
home of data/runtime semantics rather than browser layout measurement.

## Hero and project constellation

The hero uses the established title, `Focused primitives and tools for the
web.` Supporting copy explains that the packages are independently useful,
have bounded responsibilities, and keep technical documentation with each
project. The primary action remains `Explore projects`; a quiet GitHub action
may be included only if it does not compete with discovery.

The old abstract ecosystem map is removed. Its replacement is server-rendered
semantic HTML links positioned over a quiet CSS/SVG diagram layer. A central
NIPE Open Source axis organizes the composition but does not connect projects
as dependencies. Supporting copy states that the projects compose without
requiring each other.

Every node exposes its project name and textual lifecycle status. Every node is
a normal internal link to `/projects/<slug>`. The visual layer is decorative;
it is never the only source of project information.

Project motifs are:

- Bottom Sheet: a surface rising past snap marks.
- Swipe Actions: a displaced row exposing an action edge.
- Anchored Layer: an anchor, measurement line, and floating rectangle.
- Pull to Refresh: downward travel crossing a threshold.
- Viewport: a visual viewport inside a layout viewport with a keyboard inset.
- Readonly View: a mutable source connected through a readonly membrane.
- Codemod: template input, review/transform step, and CSS output.

Hover and keyboard focus strengthen only the active project's muted accent and
move its motif by a few pixels. There is no continuous animation, pointer
tracking, requestAnimationFrame loop, canvas, WebGL, particle treatment, or
animation dependency. With `prefers-reduced-motion: reduce`, motifs do not move;
focus, status, project name, and accent remain visible.

On mobile, the visual becomes a compact two-column project strip below the
copy. It preserves real links, readable names, text statuses, and simplified
motifs rather than shrinking the desktop constellation. Reading and tab order
follow registry order, independent of visual positioning.

## Project directory density

The directory retains editorial entries rather than becoming an equal-card
grid. Category headings provide rhythm and scanning. Each homepage entry shows:

- project name;
- one factual sentence;
- category and text status;
- canonical docs and source destinations;
- npm only when explicitly published;
- one compact project motif.

Capabilities, limitations, examples, and evidence stay on detail pages. Mobile
entries reduce decorative space and metadata repetition without hiding the
description or actions. Directory interaction may make the existing motif move
slightly on hover/focus, using the same reduced-motion rules as the hero.

A client-side category filter is not introduced at seven projects. Static
category sections are simpler, preserve URL/keyboard behavior, and remain easy
to scan.

## Header and detail-page discovery

The desktop `Projects` item becomes a compact registry-driven disclosure grouped
by populated category. Entries link to local project detail pages and may show a
quiet text status. It is implemented with native HTML disclosure semantics or
an equally small progressively enhanced component; it must support keyboard
operation, visible focus, outside navigation, and Escape where applicable.

On narrow screens the header remains simple: `Projects` navigates to the
directory rather than opening a dense seven-item overlay. No mega-menu,
focus-trapping dialog, search backend, or menu framework is added.

Every detail page keeps its existing overview, capabilities, limitation,
example, status, evidence links, canonical documentation, source, support, and
conditional npm/install actions. New projects receive the same structure and a
compact version of their motif. A quiet registry-driven `Explore other
projects` destination returns users to the ecosystem; no cross-sell carousel is
added.

## Project content boundaries

### React Swipe Actions

Describe measured leading/trailing actions, pointer arbitration, keyboard and
focus behavior, logical RTL sides, optional full swipe, application-owned data
and side effects, and the documented Alpha exclusions. Use current Alpha source
and package evidence rather than the earlier audited commit.

### React Anchored Layer

Describe arbitrary portal content aligned to an anchor through scroll, resize,
and layout changes; collision/measurement responsibilities; and safe server
imports. State that the application retains dropdown, combobox, menu, tooltip,
dismissal, focus, keyboard, request, and ARIA semantics. Do not show an npm
action until registry publication is verified.

### React Pull to Refresh

Describe downward-intent and scroll-boundary arbitration, resistance, threshold
hysteresis, exactly-once refresh commitment, settling, and application-owned
fetching/data/errors. Preserve the browser-native pull-to-refresh and pending
physical-device caveats. Do not show an npm action until publication is
verified.

### React Viewport

Describe distinct layout and visual viewport geometry, conservative keyboard
occlusion, safe-area values, SSR-safe snapshots, and optional CSS variables.
State that the Alpha does not claim universal browser support and that physical
device QA remains pending. Do not show an npm action until publication is
verified. Use repository documentation until the dedicated hostname resolves.

### Existing projects

Retain the current released generations: Bottom Sheet `5.0.1`, Readonly View
`2.0.1`, and Flex Codemod `2.0.0-beta.1`, unless a fresh verification immediately
before implementation shows a newer authoritative release. Their purpose and
limitations remain unchanged in substance.

## Registry and data flow

The existing `OpenSourceProject` registry remains the sole project source for:

- constellation nodes;
- directory entries;
- header disclosure;
- project routes and static parameters;
- footer and support routing;
- sitemap;
- detail metadata and OpenGraph images;
- optional derived project count.

Lifecycle is explicit through `visibility`, `status`, and `npm.published`.
Support destinations remain configured per project and are never inferred from
repository URL conventions. `publicProjects` means visible ecosystem entries;
`published` is reserved for actual package publication.

Validation must enforce unique slug and order, valid category/status/visibility,
HTTPS repository and documentation URLs, license, purpose, at least one claim,
evidence sources, visual identity, npm publication consistency, and valid
configured support URLs. Structural validation remains deterministic and does
not add flaky network calls to routine CI.

## Visual system

The existing neutral light/dark foundation, typography, spacing rhythm, borders,
and editorial composition remain. Add muted ecosystem tokens for Anchored
Layer, Pull to Refresh, and Viewport while preserving the established project
accents. Seven colors must not appear at maximum intensity simultaneously;
inactive nodes use restrained contrast and only the active node gains emphasis.

Each accent must pass the existing text, link, focus, and motif contrast tests
in both themes. Motifs use CSS and small inline decorative SVG where geometry is
clearer than nested elements. No external image or font request is introduced.

## Accessibility

- The hero has one level-one heading and project links in logical registry
  order.
- Project names and lifecycle states are text, not SVG labels or color-only
  signals.
- The constellation is fully understandable without hover or motion.
- All interactive nodes and menu entries have visible focus indicators and
  adequate touch targets.
- The header disclosure is keyboard operable and does not trap focus.
- Reduced motion removes transforms and transitions that imply movement.
- Decorative motif elements are hidden from assistive technology; useful text
  remains in the DOM.
- Existing skip navigation, landmarks, legal pages, and mobile navigation stay
  intact.

## SEO, privacy, and performance

The homepage title is `NIPE Open Source — Focused primitives and tools for the
web`. Its factual description mentions React interaction primitives, runtime
utilities, and developer tooling. Registry-driven project metadata, canonical
URLs, OpenGraph output, and sitemap entries extend automatically to all seven
public routes.

Preview deployments remain `noindex, nofollow` with production canonicals.
Structured data stays conservative and does not invent versions, download URLs,
operating systems, or categories.

The redesign adds no analytics, cookies, external font host, third-party embed,
or runtime service. The privacy policy therefore needs only a verification
pass, not new service wording. The constellation ships no new major dependency
and no continuously running JavaScript.

## Verification

Implementation follows test-driven changes. The quality gate must cover:

- seven public registry entries, order, categories, status, visibility,
  evidence, and support metadata;
- unpublished npm suppression for Anchored Layer, Pull to Refresh, and Viewport;
- semantic constellation links and textual statuses;
- header project discovery and keyboard behavior;
- detail routes, metadata, OpenGraph generation, sitemap, footer, and support
  surfaces driven from the registry;
- axe accessibility smoke tests and manual keyboard inspection;
- light/dark accent contrast;
- reduced-motion behavior;
- responsive behavior at 375, 430, 768, 1024, 1366, 1440, and wide desktop;
- production build and existing deterministic link validation;
- a separate live-source audit for documentation, repositories, npm state, and
  support links.

## Manual launch follow-ups

The launch checklist records, without blocking implementation:

- publish or intentionally withhold the Anchored Layer, Pull to Refresh, and
  Viewport npm packages;
- connect and verify `react-viewport.nipesolutions.com` before making it the
  canonical documentation destination;
- complete GitHub About description, website, and topics for Anchored Layer,
  Viewport, and any other incomplete repository;
- keep project status and evidence pins current when releases advance.

## Explicit non-goals

- No centralized documentation ingestion or search.
- No package database, CMS, fuzzy search, or release aggregation.
- No GitHub stars, npm download counts, testimonials, company logos, or roadmap
  cards.
- No dashboard layout, generic seven-card hero, mandatory NIPE stack framing,
  or dependency graph.
- No new analytics, tracking, animation library, canvas, WebGL, or always-on
  motion.
