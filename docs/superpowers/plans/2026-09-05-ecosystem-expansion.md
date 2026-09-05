# NIPE Open Source Ecosystem Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Show seven verified NIPE Open Source projects through a semantic project constellation, denser editorial directory, registry-driven discovery, and complete project detail/SEO coverage.

**Architecture:** Keep `src/content/projects.ts` as the only project data source and derive hero nodes, directory groups, header discovery, detail routes, support surfaces, sitemap, and metadata from `publicProjects`. Build project motifs as dependency-free presentational components and CSS; the only interactive discovery control is a native semantic disclosure on desktop, with a simple projects link on mobile.

**Tech Stack:** Next.js 16 App Router, React 19 server components, TypeScript 6, CSS, Vitest/Testing Library, Playwright, axe-core.

**Spec:** `docs/superpowers/specs/2026-09-05-ecosystem-expansion-design.md`

## Global Constraints

- The umbrella tagline is exactly `Focused primitives and tools for the web.`
- Canonical categories are exactly `UI & Interaction`, `Runtime`, and `Tooling`; no empty category renders.
- Technical documentation remains on each project's dedicated site or repository.
- `visibility`, `status`, and `npm.published` are explicit editorial data; package-name existence never implies publication.
- Anchored Layer, Pull to Refresh, and Viewport must not render npm links or install commands until npm publication is verified.
- Viewport uses commit-pinned repository documentation until `react-viewport.nipesolutions.com` resolves.
- The constellation uses semantic HTML links; decorative SVG/CSS is never the only project representation.
- No animation library, continuous animation loop, canvas, WebGL, analytics, metrics, CMS, search backend, or new major dependency.
- Motion occurs only on hover/focus and is removed by `prefers-reduced-motion: reduce`.
- Preserve the existing neutral light/dark foundation and use muted project-specific accent tokens.
- All public claims and examples require commit-pinned authoritative source metadata.
- Routine registry validation remains deterministic and does not call external APIs.

---

### Task 1: Expand the typed registry and structural validation

**Files:**
- Modify: `src/content/project-types.ts`
- Modify: `src/content/projects.ts`
- Modify: `src/content/projects.test.ts`
- Modify: `scripts/validate-projects.mjs`
- Modify: `scripts/validate-projects.test.mjs`
- Modify: `docs/audits/project-sources.md`

**Interfaces:**
- Consumes: existing `OpenSourceProject`, `ProjectStatus`, `ProjectSupport`, `projects`, `publicProjects`, and `validateProjects(entries)`.
- Produces: visual identifiers `'anchored-layer' | 'pull-to-refresh' | 'viewport'`; seven ordered public projects; deterministic validation of required public content and visual identity.

- [ ] **Step 1: Write failing registry tests for seven verified projects**

Update `src/content/projects.test.ts` so the ordered slug/status/category matrix is explicit:

```ts
expect(
  projects.map(({ slug, category, status, visibility, order }) => ({
    slug,
    category,
    status,
    visibility,
    order,
  })),
).toEqual([
  { slug: 'react-spring-bottom-sheet', category: 'ui-interaction', status: 'stable', visibility: 'public', order: 1 },
  { slug: 'react-swipe-actions', category: 'ui-interaction', status: 'alpha', visibility: 'public', order: 2 },
  { slug: 'react-anchored-layer', category: 'ui-interaction', status: 'alpha', visibility: 'public', order: 3 },
  { slug: 'react-pull-to-refresh', category: 'ui-interaction', status: 'alpha', visibility: 'public', order: 4 },
  { slug: 'react-viewport', category: 'ui-interaction', status: 'alpha', visibility: 'public', order: 5 },
  { slug: 'readonly-view', category: 'runtime', status: 'stable', visibility: 'public', order: 6 },
  { slug: 'flex-layout-codemod', category: 'tooling', status: 'beta', visibility: 'public', order: 7 },
])

for (const slug of [
  'react-anchored-layer',
  'react-pull-to-refresh',
  'react-viewport',
]) {
  expect(getProject(slug)?.npm).toMatchObject({ published: false })
}
```

Add assertions for each new repository, documentation destination, support URL set, MIT license, accent token, visual identifier, purpose source, at least two capability claims, one limitation, and a real example source.

- [ ] **Step 2: Run the registry tests and confirm RED**

Run: `npm test -- src/content/projects.test.ts`

Expected: FAIL because the three new slugs and visual identifiers do not exist and the current order is four projects.

- [ ] **Step 3: Write failing validation tests for missing public content and invalid visuals**

In `scripts/validate-projects.test.mjs`, add concrete cases based on its existing valid fixture:

```js
it('requires a license, claims, visual, and unique editorial order', () => {
  const invalid = [
    { ...validProject, slug: 'missing-license', license: '' },
    { ...validProject, slug: 'missing-claims', order: 2, claims: [] },
    { ...validProject, slug: 'unknown-visual', order: 3, visual: 'orb' },
  ]

  expect(validateProjects(invalid)).toEqual(
    expect.arrayContaining([
      'Project "missing-license" is missing a license.',
      'Project "missing-claims" must define at least one claim.',
      'Project "unknown-visual" has an unknown visual "orb".',
    ]),
  )
})
```

- [ ] **Step 4: Run validation tests and confirm RED**

Run: `npm test -- scripts/validate-projects.test.mjs`

Expected: FAIL because `validateProjects` does not yet enforce license, non-empty claims, or known visual identifiers.

- [ ] **Step 5: Extend the type and validator**

In `src/content/project-types.ts`, extend the visual union:

```ts
readonly visual:
  | 'bottom-sheet'
  | 'readonly-view'
  | 'swipe-actions'
  | 'anchored-layer'
  | 'pull-to-refresh'
  | 'viewport'
  | 'codemod'
```

In `scripts/validate-projects.mjs`, add:

```js
const knownVisuals = new Set([
  'bottom-sheet',
  'readonly-view',
  'swipe-actions',
  'anchored-layer',
  'pull-to-refresh',
  'viewport',
  'codemod',
])
```

Validate `entry.license`, `entry.claims.length`, and `knownVisuals.has(entry.visual)` with the exact messages asserted above. Preserve all existing status, visibility, npm, support, order, and source validation.

- [ ] **Step 6: Add the three evidence-backed registry entries and reorder the existing entries**

Use these fixed lifecycle/publication facts in `src/content/projects.ts`:

```ts
{
  slug: 'react-anchored-layer',
  category: 'ui-interaction',
  visibility: 'public',
  status: 'alpha',
  npm: { package: '@nipe-solutions/react-anchored-layer', published: false },
  visual: 'anchored-layer',
  accent: 'var(--project-anchored-layer)',
  order: 3,
}
{
  slug: 'react-pull-to-refresh',
  category: 'ui-interaction',
  visibility: 'public',
  status: 'alpha',
  npm: { package: '@nipe-solutions/react-pull-to-refresh', published: false },
  visual: 'pull-to-refresh',
  accent: 'var(--project-pull-to-refresh)',
  order: 4,
}
{
  slug: 'react-viewport',
  category: 'ui-interaction',
  visibility: 'public',
  status: 'alpha',
  npm: { package: '@nipe-solutions/react-viewport', published: false },
  visual: 'viewport',
  accent: 'var(--project-viewport)',
  order: 5,
}
```

Use these exact content/source boundaries for the complete objects:

| Project | Homepage description | Documentation | Purpose/example source root |
| --- | --- | --- | --- |
| Anchored Layer | `Anchored floating layers for React that keep arbitrary portal content aligned through scroll, resize, and layout changes.` | `https://react-anchored-layer.nipesolutions.com` | `https://github.com/NIPE-Solutions/react-anchored-layer/blob/93c83bd2cd569bfdc2c5bd128f1f3add39ae7696/README.md` |
| Pull to Refresh | `Pull-to-refresh for React with scroll arbitration, resistance, threshold hysteresis, and an application-owned refresh lifecycle.` | `https://react-pull-to-refresh.nipesolutions.com` | `https://github.com/NIPE-Solutions/react-pull-to-refresh/blob/3e7b232a23b59e7e44ca0a6b8a13d3d02f839b18/README.md` |
| Viewport | `Reactive React geometry for layout and visual viewports, keyboard occlusion, and safe areas.` | `https://github.com/NIPE-Solutions/react-viewport/blob/08a4b3a2353d934835eb1054dd6ddadef2370e65/README.md` | `https://github.com/NIPE-Solutions/react-viewport/blob/08a4b3a2353d934835eb1054dd6ddadef2370e65/README.md` |

Anchored Layer claims are portal/anchor tracking, collision and measurement ownership, and SSR-safe import; its limitation is that applications own dismissal, focus, keyboard, request, and ARIA semantics. Pull to Refresh claims are scroll-boundary/direction arbitration, resistance and threshold hysteresis, and exactly-once async commitment; its limitation records browser-native pull-to-refresh and pending physical-device QA. Viewport claims are separate layout/visual geometry, conservative keyboard/safe-area state, and SSR/CSS-variable support; its limitation records heuristic keyboard gaps, no universal browser claim, and pending physical-device QA. Use each README quick-start block as the exact example and its heading fragment as the source URL. Update every Swipe Actions source to commit `1c798c20878165cb2a3702ea18f4967834551b63`. Keep Bottom Sheet `5.0.1`, Readonly View `2.0.1`, and Codemod `2.0.0-beta.1`. Sort `projects` by `order` and preserve `publicProjects` as an explicit visibility filter.

- [ ] **Step 7: Record the source audit**

Append a dated section to `docs/audits/project-sources.md` containing all seven audited commits, npm results, documentation reachability, and the explicit Viewport DNS/npm limitations. State that npm 404 suppresses install actions; do not convert repository package versions into publication claims.

- [ ] **Step 8: Run registry and validation tests GREEN**

Run: `npm test -- src/content/projects.test.ts scripts/validate-projects.test.mjs && npm run validate:projects`

Expected: PASS and `Validated 7 projects.`

- [ ] **Step 9: Commit the registry expansion**

```bash
git add src/content/project-types.ts src/content/projects.ts src/content/projects.test.ts scripts/validate-projects.mjs scripts/validate-projects.test.mjs docs/audits/project-sources.md
git commit -m "feat: register expanded project ecosystem"
```

---

### Task 2: Build reusable project motifs and accessible accent tokens

**Files:**
- Create: `src/components/project-motif.tsx`
- Create: `src/components/project-motif.test.tsx`
- Modify: `src/components/project-visual.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/content/projects.test.ts`

**Interfaces:**
- Consumes: `OpenSourceProject['visual']`, `project.name`, and `project.accent`.
- Produces: `ProjectMotif({ visual, decorative? })`; `ProjectVisual` delegates its inner drawing to the same motif language; CSS tokens for all seven projects.

- [ ] **Step 1: Write failing motif tests**

Create `src/components/project-motif.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ProjectMotif } from './project-motif'

const visuals = [
  'bottom-sheet',
  'swipe-actions',
  'anchored-layer',
  'pull-to-refresh',
  'viewport',
  'readonly-view',
  'codemod',
] as const

describe('ProjectMotif', () => {
  it.each(visuals)('renders the %s motif without text', (visual) => {
    const { container } = render(<ProjectMotif visual={visual} />)
    expect(screen.getByTestId(`project-motif-${visual}`)).toBeInTheDocument()
    expect(container).not.toHaveTextContent(/\S/)
  })

  it('hides decorative motifs from assistive technology', () => {
    render(<ProjectMotif visual="viewport" decorative />)
    expect(screen.getByTestId('project-motif-viewport')).toHaveAttribute(
      'aria-hidden',
      'true',
    )
  })
})
```

- [ ] **Step 2: Run motif tests and confirm RED**

Run: `npm test -- src/components/project-motif.test.tsx`

Expected: FAIL because `project-motif.tsx` does not exist.

- [ ] **Step 3: Implement the motif component**

Create a typed switch in `project-motif.tsx`:

```tsx
import type { OpenSourceProject } from '@/content/project-types'

interface ProjectMotifProps {
  readonly visual: OpenSourceProject['visual']
  readonly decorative?: boolean
}

export function ProjectMotif({ visual, decorative = false }: ProjectMotifProps) {
  const parts = {
    'bottom-sheet': ['surface', 'snap-high', 'snap-low'],
    'swipe-actions': ['leading', 'row', 'trailing'],
    'anchored-layer': ['anchor', 'measure', 'layer'],
    'pull-to-refresh': ['pull', 'threshold', 'indicator'],
    viewport: ['layout', 'visual', 'keyboard'],
    'readonly-view': ['source', 'membrane', 'view'],
    codemod: ['input', 'review', 'output'],
  } satisfies Record<OpenSourceProject['visual'], readonly string[]>

  return (
    <span
      className={`project-motif project-motif--${visual}`}
      data-testid={`project-motif-${visual}`}
      aria-hidden={decorative || undefined}
    >
      {parts[visual].map((part) => (
        <span key={part} className={`project-motif__${part}`} />
      ))}
    </span>
  )
}
```

Implement the seven exact concepts from the spec using empty semantic-neutral spans. Keep text in the consuming link/card, not the motif.

- [ ] **Step 4: Refactor `ProjectVisual` to reuse motif language**

Keep its existing accessible `<figure role="img" aria-label="… concept illustration">`, but render `<ProjectMotif visual={project.visual} decorative />` inside it. Remove duplicated old drawing branches only after each established visual remains equivalent in its tests.

- [ ] **Step 5: Add muted theme tokens and interaction CSS**

In `globals.css`, retain existing colors and add:

```css
--project-anchored-layer: #526e82;
--project-pull-to-refresh: #46756d;
--project-viewport: #78694d;
```

Provide dark-theme counterparts with sufficient contrast. Add motif-specific geometry, a single local transform on `.project-entry:hover` and `:focus-within`, and this mandatory fallback:

```css
@media (prefers-reduced-motion: reduce) {
  .project-motif *,
  .project-entry .project-motif * {
    transition: none !important;
    transform: none !important;
  }
}
```

Do not introduce keyframes for the motifs.

- [ ] **Step 6: Run motif and registry tests GREEN**

Run: `npm test -- src/components/project-motif.test.tsx src/content/projects.test.ts`

Expected: PASS for all seven motifs and accent identities.

- [ ] **Step 7: Commit the motif system**

```bash
git add src/components/project-motif.tsx src/components/project-motif.test.tsx src/components/project-visual.tsx src/app/globals.css src/content/projects.test.ts
git commit -m "feat: add project motif system"
```

---

### Task 3: Replace the abstract ecosystem map with the project constellation

**Files:**
- Create: `src/components/project-constellation.tsx`
- Create: `src/components/project-constellation.test.tsx`
- Create: `src/content/project-status.ts`
- Modify: `src/components/hero.tsx`
- Delete: `src/components/ecosystem-map.tsx`
- Modify: `src/app/home.test.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `publicProjects`, `ProjectMotif`, project `slug`, `name`, `status`, `accent`, and registry order.
- Produces: `projectStatusLabels: Record<ProjectStatus, string>` and `ProjectConstellation()` with seven semantic links; hero copy and CTA remain server-rendered.

- [ ] **Step 1: Write failing constellation component tests**

Create `src/components/project-constellation.test.tsx`:

```tsx
import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { publicProjects } from '@/content/projects'
import { ProjectConstellation } from './project-constellation'

it('links every public project in registry order with textual status', () => {
  render(<ProjectConstellation />)
  const constellation = screen.getByRole('navigation', {
    name: 'NIPE Open Source projects',
  })

  expect(within(constellation).getAllByRole('link').map((link) => link.textContent))
    .toEqual(publicProjects.map(({ name, status }) => `${name}${status[0].toUpperCase()}${status.slice(1)}`))

  for (const project of publicProjects) {
    expect(within(constellation).getByRole('link', { name: new RegExp(project.name) }))
      .toHaveAttribute('href', `/projects/${project.slug}`)
  }
})
```

Use exact accessible-name expectations rather than a regular expression if Testing Library exposes duplicated names.

- [ ] **Step 2: Replace the old map expectation with a failing homepage test**

In `src/app/home.test.tsx`, remove the category-map test and assert:

```tsx
const constellation = screen.getByRole('navigation', {
  name: 'NIPE Open Source projects',
})
expect(within(constellation).getAllByRole('link')).toHaveLength(7)
expect(screen.queryByRole('img', {
  name: /connects UI & Interaction, Runtime, and Tooling/,
})).not.toBeInTheDocument()
expect(screen.getByText(/do not require each other/i)).toBeInTheDocument()
```

- [ ] **Step 3: Run constellation tests and confirm RED**

Run: `npm test -- src/components/project-constellation.test.tsx src/app/home.test.tsx`

Expected: FAIL because the hero still renders `EcosystemMap` and no project constellation navigation exists.

- [ ] **Step 4: Implement `ProjectConstellation`**

Render one central decorative hub and one link per `publicProjects` entry:

```tsx
<nav className="project-constellation" aria-label="NIPE Open Source projects">
  <span className="project-constellation__hub" aria-hidden="true">
    <span>NIPE</span><span>Open Source</span>
  </span>
  {publicProjects.map((project) => (
    <Link
      key={project.slug}
      className={`project-node project-node--${project.visual}`}
      href={`/projects/${project.slug}`}
      style={{ '--project-accent': project.accent } as CSSProperties}
    >
      <ProjectMotif visual={project.visual} decorative />
      <span className="project-node__name">{project.name}</span>
      <span className="project-node__status">{statusLabels[project.status]}</span>
    </Link>
  ))}
</nav>
```

Create `src/content/project-status.ts` and replace the duplicate maps in
`ProjectEntry` and `ProjectDetail`:

```ts
import type { ProjectStatus } from './project-types'

export const projectStatusLabels: Record<ProjectStatus, string> = {
  stable: 'Stable',
  beta: 'Beta',
  alpha: 'Alpha',
  preview: 'Preview',
  development: 'Development',
  maintenance: 'Maintenance',
  archived: 'Archived',
}
```

- [ ] **Step 5: Update the hero copy and remove the map**

Replace the `EcosystemMap` import with `ProjectConstellation`. Use concise copy:

```tsx
<p>
  Small, independently useful libraries and developer tools for browser and
  application problems that should not need to be rebuilt from scratch.
</p>
<p className="hero__independence">
  These projects compose, but they do not require each other.
</p>
```

Keep `Explore the projects` targeting `#projects`. Delete `ecosystem-map.tsx`.

- [ ] **Step 6: Implement responsive constellation CSS**

Desktop uses a positioned editorial field with seven individually placed nodes
and a central hub. Tablet relaxes absolute offsets. At the existing compact
breakpoint, switch to a two-column grid, hide the hub/diagram lines, reduce motif
height, and keep a minimum 44px interactive target. Do not change DOM order for
visual positioning.

- [ ] **Step 7: Run constellation/home tests GREEN**

Run: `npm test -- src/components/project-constellation.test.tsx src/app/home.test.tsx`

Expected: PASS with seven links and no old ecosystem-map role/image.

- [ ] **Step 8: Commit the hero redesign**

```bash
git add src/components/project-constellation.tsx src/components/project-constellation.test.tsx src/components/hero.tsx src/app/home.test.tsx src/app/globals.css src/content/project-status.ts
git rm src/components/ecosystem-map.tsx
git commit -m "feat: show projects in hero constellation"
```

---

### Task 4: Tighten directory density and add registry-driven header discovery

**Files:**
- Create: `src/components/project-menu.tsx`
- Create: `src/components/project-menu.test.tsx`
- Modify: `src/components/site-header.tsx`
- Modify: `src/components/site-shell.test.tsx`
- Modify: `src/components/project-entry.tsx`
- Modify: `src/components/project-directory.tsx`
- Modify: `src/app/home.test.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `projectCategories`, `publicProjects`, shared status labels, and `ProjectEntry`.
- Produces: `ProjectMenu()` grouped by populated categories; dense directory entry presentation; mobile link fallback.

- [ ] **Step 1: Write failing project-menu tests**

Create `src/components/project-menu.test.tsx` asserting one disclosure trigger,
three category groups, seven local project links, and text statuses:

```tsx
render(<ProjectMenu />)
const disclosure = screen.getByText('Projects').closest('details')
expect(disclosure).not.toBeNull()
expect(within(disclosure!).getAllByRole('link')).toHaveLength(7)
expect(within(disclosure!).getByRole('link', { name: 'React Viewport Alpha' }))
  .toHaveAttribute('href', '/projects/react-viewport')
```

Also assert that no empty category group renders.

- [ ] **Step 2: Update shell tests for progressive navigation and confirm RED**

In `site-shell.test.tsx`, require both the desktop disclosure and a narrow-layout
fallback anchor with `href="/#projects"`. Assert every `publicProjects` item is
derived into the menu without hard-coded project arrays.

Run: `npm test -- src/components/project-menu.test.tsx src/components/site-shell.test.tsx`

Expected: FAIL because `SiteHeader` has only the current projects anchor.

- [ ] **Step 3: Implement `ProjectMenu` with native disclosure semantics**

Use `<details className="project-menu"><summary>Projects</summary>…</details>`.
Group `publicProjects` through `projectCategories`, omit empty groups, and render
local `Link` elements with project name and shared text status. Do not add a
client component or focus trap. Use CSS to show the disclosure only on desktop;
retain a normal `Projects` link for compact navigation.

- [ ] **Step 4: Make directory entries denser without changing content ownership**

Add the canonical category label beside status using a lookup derived from
`projectCategories`. Keep the one-sentence `project.description`, docs/source,
conditional npm, and motif. Reduce visual block height and vertical padding at
compact widths. Do not add claims, evidence, or accordion behavior.

- [ ] **Step 5: Update homepage tests for seven scan-friendly entries**

Assert category heading order, five UI project headings, one Runtime heading,
one Tooling heading, all one-sentence descriptions, and missing npm links for
the three unpublished entries. Retain the existing test proving a known package
with `published: false` never renders npm.

- [ ] **Step 6: Run menu, shell, and homepage tests GREEN**

Run: `npm test -- src/components/project-menu.test.tsx src/components/site-shell.test.tsx src/app/home.test.tsx`

Expected: PASS with seven menu links and seven directory entries.

- [ ] **Step 7: Commit discovery improvements**

```bash
git add src/components/project-menu.tsx src/components/project-menu.test.tsx src/components/site-header.tsx src/components/site-shell.test.tsx src/components/project-entry.tsx src/components/project-directory.tsx src/app/home.test.tsx src/app/globals.css
git commit -m "feat: improve ecosystem project discovery"
```

---

### Task 5: Complete new detail pages and cross-project recovery

**Files:**
- Modify: `src/components/project-detail.tsx`
- Modify: `src/app/projects/project-pages.test.tsx`
- Modify: `src/app/projects/[slug]/page.tsx`
- Modify: `src/app/projects/[slug]/opengraph-image.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: `publicProjects`, `getProject`, `ProjectVisual`, conditional npm metadata, evidence sources.
- Produces: three new statically generated detail routes; detail motif; registry-backed `Explore other projects` link; unique project metadata/OG output.

- [ ] **Step 1: Write failing detail-route tests**

Extend `project-pages.test.tsx` with a table for Anchored Layer, Pull to Refresh,
and Viewport. For each route assert heading, Alpha text, overview, two sourced
capabilities, one limitation, real example, documentation/source links, and no
`npm package` link or install command. Assert:

```tsx
expect(screen.getByRole('link', { name: 'Explore other projects' }))
  .toHaveAttribute('href', '/#projects')
expect(screen.getByRole('img', {
  name: `${project.name} concept illustration`,
})).toBeInTheDocument()
```

- [ ] **Step 2: Run project-page tests and confirm RED**

Run: `npm test -- src/app/projects/project-pages.test.tsx`

Expected: FAIL because the new routes are not in the registry yet or detail
headers do not render visuals/cross-project navigation.

- [ ] **Step 3: Add detail motif and recovery navigation**

In `ProjectDetail`, render `<ProjectVisual project={project} />` beside the title
inside the existing project-accent header. Add this after project actions:

```tsx
<nav className="project-detail__ecosystem" aria-label="Ecosystem discovery">
  <Link href="/#projects">Explore other projects</Link>
</nav>
```

Keep evidence links subtle and conditional npm/install behavior unchanged.

- [ ] **Step 4: Verify route and OpenGraph generation remains registry-driven**

Update page/metadata tests to compare generated static params and image metadata
against `publicProjects`, including all seven slugs. Do not add manual arrays to
`page.tsx`, `opengraph-image.tsx`, or sitemap code.

- [ ] **Step 5: Run detail and metadata tests GREEN**

Run: `npm test -- src/app/projects/project-pages.test.tsx src/lib/metadata.test.ts`

Expected: PASS with seven generated project pages, unique descriptions, and
three unpublished projects without npm/install actions.

- [ ] **Step 6: Commit project-detail expansion**

```bash
git add src/components/project-detail.tsx src/app/projects/project-pages.test.tsx src/app/projects/[slug]/page.tsx src/app/projects/[slug]/opengraph-image.tsx src/app/globals.css
git commit -m "feat: complete expanded project details"
```

---

### Task 6: Update SEO, support surfaces, documentation, and launch gates

**Files:**
- Modify: `src/lib/site.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/components/structured-data.tsx`
- Modify: `src/app/policies.test.tsx`
- Modify: `src/components/support-routing.tsx`
- Modify: `src/app/contributing/page.tsx`
- Modify: `src/app/security/page.tsx`
- Modify: `src/components/site-footer.tsx`
- Modify: `src/components/site-shell.test.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/lib/metadata.test.ts`
- Modify: `scripts/check-links.test.mjs`
- Modify: `docs/ADDING_A_PROJECT.md`
- Modify: `docs/LAUNCH_CHECKLIST.md`

**Interfaces:**
- Consumes: seven-project `publicProjects` and configured support destinations.
- Produces: updated homepage metadata, conservative structured data, seven sitemap routes, registry-driven support/footer links, documented manual launch gates.

- [ ] **Step 1: Write failing SEO and sitemap assertions**

Update metadata tests to require:

```ts
expect(siteConfig.title).toBe(
  'NIPE Open Source — Focused primitives and tools for the web',
)
expect(siteConfig.description).toContain('React interaction primitives')
expect(siteConfig.description).toContain('runtime utilities')
expect(siteConfig.description).toContain('developer tooling')
expect(sitemap().filter(({ url }) => url.includes('/projects/'))).toHaveLength(7)
```

Assert structured data does not contain `softwareVersion`, `downloadUrl`, or
invented operating-system data.

- [ ] **Step 2: Write failing support/footer/link assertions**

Extend policy, shell, and link tests to derive expected local project routes and
configured support destinations from `publicProjects`. Assert no npm URL is
collected for projects with `npm.published === false`.

- [ ] **Step 3: Run focused tests and confirm RED**

Run: `npm test -- src/lib/metadata.test.ts src/app/policies.test.tsx src/components/site-shell.test.tsx scripts/check-links.test.mjs`

Expected: FAIL on old title/description and missing new registry-driven link
expectations.

- [ ] **Step 4: Update metadata and registry-driven consumers**

Set the exact homepage title and factual description in `site.ts`. Keep the
production canonical and preview robots behavior unchanged. Make
`support-routing.tsx`, Contributing, Security, `site-footer.tsx`, sitemap, and
structured data iterate `publicProjects` and each project's configured fields;
remove every local four-project array from those consumers.

- [ ] **Step 5: Update maintainer and launch documentation**

In `ADDING_A_PROJECT.md`, document constellation placement/motif, explicit npm
publication, commit-pinned evidence, documentation fallbacks, support URLs,
order, and accent contrast. In `LAUNCH_CHECKLIST.md`, add manual items for:

- Anchored Layer npm publication and GitHub About metadata;
- Pull to Refresh npm publication and GitHub About metadata;
- Viewport npm publication, docs DNS/domain verification, and GitHub About
  metadata;
- replacing repository documentation only after the Viewport hostname resolves.

- [ ] **Step 6: Run SEO/policy/link tests GREEN**

Run: `npm test -- src/lib/metadata.test.ts src/app/policies.test.tsx src/components/site-shell.test.tsx scripts/check-links.test.mjs && npm run check:links`

Expected: PASS with seven project routes and no unpublished npm destinations.

- [ ] **Step 7: Commit SEO and launch documentation**

```bash
git add src/lib/site.ts src/app/layout.tsx src/components/structured-data.tsx src/app/policies.test.tsx src/components/support-routing.tsx src/app/contributing/page.tsx src/app/security/page.tsx src/components/site-footer.tsx src/components/site-shell.test.tsx src/app/sitemap.ts src/lib/metadata.test.ts scripts/check-links.test.mjs docs/ADDING_A_PROJECT.md docs/LAUNCH_CHECKLIST.md
git commit -m "docs: prepare expanded ecosystem for launch"
```

---

### Task 7: Extend browser coverage and complete the visual/accessibility audit

**Files:**
- Modify: `e2e/site.spec.ts`
- Modify: `e2e/accessibility.spec.ts`
- Modify: `e2e/metadata.spec.ts`
- Modify: `e2e/responsive.spec.ts`
- Modify: `docs/audits/launch-polish-final.md`
- Modify: `docs/audits/launch-polish-sources.md`

**Interfaces:**
- Consumes: final seven-project server-rendered site and existing Playwright configuration.
- Produces: keyboard, axe, reduced-motion, responsive, metadata, and live-source evidence for launch review.

- [ ] **Step 1: Write failing E2E expectations for the constellation and menu**

In `e2e/site.spec.ts`, update the project fixture to seven entries and add:

```ts
test('constellation exposes every project to keyboard discovery', async ({ page }) => {
  await page.goto('/')
  const constellation = page.getByRole('navigation', {
    name: 'NIPE Open Source projects',
  })
  await expect(constellation.getByRole('link')).toHaveCount(7)

  for (const project of projects) {
    const link = constellation.getByRole('link', {
      name: `${project.name} ${project.status}`,
    })
    await link.focus()
    await expect(link).toBeFocused()
    await expect(link).toHaveAttribute('href', project.path)
  }
})
```

Add desktop disclosure keyboard activation and mobile fallback-link coverage.

- [ ] **Step 2: Add failing reduced-motion and responsive assertions**

In `responsive.spec.ts`, cover the existing width matrix
`[375, 430, 768, 1024, 1366, 1440, 1920]`. At every width assert
`scrollWidth === innerWidth`, readable project nodes, bounded directory entries,
and no clipped footer/detail actions. At 375/430 assert the constellation uses a
two-column strip and the desktop menu is absent.

Use `page.emulateMedia({ reducedMotion: 'reduce' })` and assert motif computed
transition duration is `0s` and focused content remains visible.

- [ ] **Step 3: Run focused E2E and confirm RED**

Run: `npx playwright test e2e/site.spec.ts e2e/responsive.spec.ts --project=chromium`

Expected: FAIL because the old hero/menu/responsive behavior does not satisfy the new selectors.

- [ ] **Step 4: Extend accessibility and metadata coverage**

Run axe on the homepage and each of the seven detail routes in both themes.
Assert status is text, constellation links have accessible names, menu disclosure
is keyboard reachable, headings remain ordered, and all project pages expose
production canonicals plus unique OG metadata.

- [ ] **Step 5: Run the full local quality gate**

Run: `npm run check`

Expected: PASS for formatting, lint, typecheck, unit tests, seven-project registry validation, deterministic links, and production build.

- [ ] **Step 6: Run all browser tests**

Run: `npm run test:e2e`

Expected: PASS for Chromium accessibility, navigation, metadata, responsive,
theme, and reduced-motion tests.

- [ ] **Step 7: Run the live-source audit separately**

Run: `npm run check:links:live`

Expected: repositories and configured documentation/support URLs resolve. Record
npm frontend automation failures and the unresolved Viewport docs hostname as
manual gates rather than weakening deterministic CI.

- [ ] **Step 8: Perform manual keyboard and visual inspection**

Inspect light/dark homepage and all new detail pages at 375, 430, 768, 1024,
1366, 1440, and 1920 widths. Verify hero rhythm, node focus, status readability,
one-active-accent behavior, motif distinction, menu dismissal/navigation,
directory density, code overflow, and footer height. Confirm the result is not a
card grid, dashboard, dependency graph, or mandatory stack.

- [ ] **Step 9: Update final audit records**

Record exact command results, test counts, manual viewport results, source
limitations, privacy unchanged status, and the homepage verdict in
`launch-polish-final.md`. Update `launch-polish-sources.md` with the seven audited
commits and publication/domain state.

- [ ] **Step 10: Run final repository hygiene checks**

Run: `git diff --check && git status --short && git log --oneline --decorate -10`

Expected: no whitespace errors, no generated Next.js instruction files, no
secrets, and only the intended audit changes pending.

- [ ] **Step 11: Commit the final audit**

```bash
git add e2e/site.spec.ts e2e/accessibility.spec.ts e2e/metadata.spec.ts e2e/responsive.spec.ts docs/audits/launch-polish-final.md docs/audits/launch-polish-sources.md
git commit -m "test: verify expanded ecosystem experience"
```

---

### Task 8: Review, publish the stacked pull request, and verify its preview

**Files:**
- Review only: all files changed by Tasks 1–7

**Interfaces:**
- Consumes: complete feature branch based on `feat/add-react-swipe-actions`.
- Produces: reviewed stacked pull request targeting `feat/add-react-swipe-actions`, automatic Vercel preview, and handoff report.

- [ ] **Step 1: Review the branch against the design specification**

Check every section in
`docs/superpowers/specs/2026-09-05-ecosystem-expansion-design.md` against the
diff. Search for stale four-project assumptions, hard-coded project lists,
`Production-grade`, `Interface`, `Migration`, generic marketing terms, runtime
metrics, and accidental new dependencies.

- [ ] **Step 2: Re-run completion verification from a clean state**

Run: `npm ci && npm run check && npm run test:e2e`

Expected: clean install, all checks pass, seven projects validate, production
build succeeds, and all Chromium tests pass.

- [ ] **Step 3: Push the separate branch**

```bash
git push -u origin feat/ecosystem-expansion
```

- [ ] **Step 4: Open the stacked pull request**

Create the pull request with base `feat/add-react-swipe-actions`, explain that it
depends on PR #4, include the seven-project source audit, list unpublished npm
and Viewport-domain gates, and report exact unit/E2E counts.

- [ ] **Step 5: Verify automatic Vercel preview**

Wait for the Vercel check to report Ready. Open the preview, verify the seven
hero links and project routes, confirm `noindex, nofollow`, production canonical
URLs, and no unexpected external runtime requests.

- [ ] **Step 6: Deliver the final assessment**

Report the hero redesign, mobile behavior, registry/status matrix, category
decision, directory/header changes, accessibility, performance, SEO/sitemap,
manual GitHub/npm/domain follow-ups, remaining limitations, and classify the
homepage as `TOO STATIC`, `TOO BUSY`, or `WELL BALANCED` based on the verified
preview.
