# Adding a project

The directory is registry-first: one entry in
[`src/content/projects.ts`](../src/content/projects.ts) supplies project cards,
detail routes, metadata, sitemap entries, and validation. Do not create a
separate page, data file, or visitor-time data fetch for a project.

## Required registry shape

Each entry needs a unique `slug`, `name`, `category`, `description`,
`visibility`, lifecycle `status`, HTTPS `repository`, `accent`, `visual`,
`featured`, and positive `order`. Public entries also need HTTPS
`documentation`; hidden entries may omit it. `category` is one of
`ui-interaction`, `runtime`, or `tooling`; `visibility` is `public` or
`hidden`; use a status from `stable`, `beta`, `alpha`, `preview`,
`development`, `maintenance`, or `archived`.

`npm` is optional. When present, use an `@nipe-solutions/…` package and set
`npm.published` explicitly; only `true` enables npm/install UI. Configure
optional support URLs directly in `support` (`issues`, `discussions`,
`security`, or `documentation`); no fallback URL is inferred.

Use a dedicated `visual` motif and accent token for each public project. The
same registry entry places that motif in the hero constellation, homepage
directory, and project detail page. Open Graph images currently use the fixed
NIPE Open Source treatment with project text metadata; they do not render the
project motif or registry accent. Set `order` deliberately: it controls the
constellation and directory narrative rather than indicating quality or
adoption. Check accent text, links, focus rings, and motif edges in both themes
before publishing the entry.

Every entry has a purpose description and purpose source. Each item in
`claims` is either `capability` or `limitation` and needs its own claim source
with a label and HTTPS URL. An example, if present, also needs a source. Keep
the wording factual and cite the exact release, documentation page, or other
primary source that supports it. Prefer release-tagged evidence for released
packages and commit-pinned evidence for public development or prerelease
projects so later default-branch changes cannot silently alter the cited fact.

Use the dedicated project site as `documentation` when it resolves and is the
project's canonical documentation destination. If that hostname is not ready,
use a commit-pinned repository document as a temporary fallback and record the
domain follow-up in `docs/LAUNCH_CHECKLIST.md`. Replace the fallback only after
the intended hostname, TLS certificate, and content have been checked.

## Lifecycle examples

The fragments below are valid against the current `OpenSourceProject` schema.
They share the required factual fields; replace every placeholder URL and copy
with the real repository and primary evidence before adding an entry.

```ts
import type { OpenSourceProject } from '../src/content/project-types'

const shared: Pick<
  OpenSourceProject,
  | 'category'
  | 'description'
  | 'purpose'
  | 'claims'
  | 'accent'
  | 'visual'
  | 'featured'
  | 'order'
> = {
  category: 'tooling',
  description: 'A deliberately narrow example project.',
  purpose: {
    description: 'It exists to solve one bounded problem.',
    source: {
      label: 'Example primary source',
      href: 'https://github.com/NIPE-Solutions/example-project',
    },
  },
  claims: [
    {
      kind: 'capability',
      title: 'Bounded behavior',
      source: {
        label: 'Example primary source',
        href: 'https://github.com/NIPE-Solutions/example-project',
      },
    },
  ],
  accent: 'var(--project-codemod)',
  visual: 'codemod',
  featured: false,
  order: 99,
}
```

### Stable npm package

```ts
const stableNpmPackage = {
  ...shared,
  slug: 'stable-package',
  name: 'Stable Package',
  visibility: 'public',
  status: 'stable',
  repository: 'https://github.com/NIPE-Solutions/example-project',
  documentation: 'https://github.com/NIPE-Solutions/example-project#readme',
  npm: { package: '@nipe-solutions/stable-package', published: true },
  support: {
    issues: 'https://github.com/NIPE-Solutions/example-project/issues',
  },
} satisfies OpenSourceProject
```

### Public beta

```ts
const publicBeta = {
  ...shared,
  slug: 'public-beta',
  name: 'Public Beta',
  visibility: 'public',
  status: 'beta',
  repository: 'https://github.com/NIPE-Solutions/example-project',
  documentation: 'https://github.com/NIPE-Solutions/example-project#readme',
  npm: { package: '@nipe-solutions/public-beta', published: false },
} satisfies OpenSourceProject
```

### GitHub-only tool

```ts
const githubOnlyTool = {
  ...shared,
  slug: 'github-only-tool',
  name: 'GitHub-only Tool',
  visibility: 'public',
  status: 'stable',
  repository: 'https://github.com/NIPE-Solutions/example-project',
  documentation: 'https://github.com/NIPE-Solutions/example-project#readme',
} satisfies OpenSourceProject
```

### Hidden development project

```ts
const hiddenDevelopmentProject = {
  ...shared,
  slug: 'hidden-development-project',
  name: 'Hidden Development Project',
  visibility: 'hidden',
  status: 'development',
  repository: 'https://github.com/NIPE-Solutions/example-project',
} satisfies OpenSourceProject
```

### Public archived project

```ts
const archivedProject = {
  ...shared,
  slug: 'archived-project',
  name: 'Archived Project',
  visibility: 'public',
  status: 'archived',
  repository: 'https://github.com/NIPE-Solutions/example-project',
  documentation: 'https://github.com/NIPE-Solutions/example-project#readme',
} satisfies OpenSourceProject
```

## Workflow

1. Confirm that the repository has a reviewable public implementation and that
   its lifecycle, package identity, license, documentation, purpose,
   capabilities, and limitations have current primary evidence.
2. Record source URLs, observation date, exact release/default-branch state,
   and publication decision in
   [`docs/audits/project-sources.md`](audits/project-sources.md).
3. Add one registry entry and update `src/content/projects.test.ts` when the
   public directory, lifecycle, or ordering changes. Keep archived projects
   accurate rather than deleting historic pages without an owner decision.
4. Run focused tests, `npm run validate:projects`, and `npm run check`. Run
   `npm run test:e2e` for visitor-facing changes.
5. Verify the motif's constellation placement and compact mobile treatment at
   the supported breakpoints, including keyboard focus and reduced motion.
6. Request maintainer review of the evidence and wording before merge.

Individual project repositories and documentation sites remain the technical
sources of truth. The directory summarizes verified facts and links outward;
it does not replace project documentation.
