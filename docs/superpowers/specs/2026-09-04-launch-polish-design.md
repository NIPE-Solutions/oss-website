# NIPE Open Source Launch Polish Design

## Objective

Refine the existing NIPE Open Source website without redesigning it. Preserve its editorial layout, project-specific accents and visuals, responsive behavior, restrained motion, static architecture, legal shell, and privacy-friendly baseline.

The pass improves copy precision, taxonomy consistency, project lifecycle modeling, support routing, evidence presentation, documentation, and launch verification.

## Copy and Taxonomy

Use “Focused primitives and tools for the web.” as the primary ecosystem tagline everywhere, including the hero, metadata, Open Graph output, structured descriptions, and repository guidance. Supporting copy may describe small tools for recurring application problems but must not imply that every visible project is stable.

The only public project categories are:

- UI & Interaction
- Runtime
- Tooling

Internal category keys remain stable slugs. All category labels in the hero visualization, directory, project pages, breadcrumbs, metadata, and structured data come from the same category registry. “Interface” and “Migration” may appear only as ordinary descriptive words, never as taxonomy labels.

Replace the codemod-specific ecosystem principle with “Focused by design”: each project solves a bounded problem rather than becoming a framework. Keep the existing number of principles.

Run the documented AI-copy audit after edits and replace generic marketing phrases with concrete behavior. Do not flatten compelling project-specific language into generic functional descriptions.

## Project Registry Contract

Extend the existing typed registry rather than introducing a content system.

```ts
type ProjectVisibility = 'public' | 'hidden'

type ProjectStatus =
  | 'stable'
  | 'beta'
  | 'alpha'
  | 'preview'
  | 'development'
  | 'maintenance'
  | 'archived'

interface ProjectSource {
  readonly label: string
  readonly href: string
}

interface ProjectClaim {
  readonly kind: 'capability' | 'limitation'
  readonly title: string
  readonly description?: string
  readonly source: ProjectSource
}

interface ProjectNpm {
  readonly package: string
  readonly published: boolean
}

interface ProjectSupport {
  readonly issues?: string
  readonly discussions?: string
  readonly security?: string
  readonly documentation?: string
}
```

Each project explicitly declares `visibility`, `status`, optional `npm`, and optional `support`. A known package name does not imply publication. Public selection uses `visibility === 'public'`, and the exported selector is named `publicProjects`. Install commands and npm links require `npm?.published === true`.

Hidden projects may use any lifecycle status and never appear in public pages, sitemap entries, footer links, or public structured data. Public development projects are allowed only by explicit editorial choice. Archived public projects remain discoverable with an Archived status.

Support UI renders only configured destinations. It does not construct Issues, Discussions, Security, or documentation URLs from repository naming conventions.

The registry remains the only source of public project facts. Evidence sources remain mandatory internally but are presented naturally to visitors.

## Project Detail Presentation

Rename “Verified claims” to “Capabilities.” Replace “Evidence for …” labels with short source labels such as “Source” or a precise source name. Preserve accessible names that identify the capability and destination when needed.

Render capability titles and descriptions as evaluation content. Show each source as a quiet supporting link. Present limitations separately and visibly. Purpose retains its source without internal-audit wording.

Project pages must continue to show status, category, purpose, real examples, canonical documentation/source/package links, and explicit limitations. They must not expose npm actions when `published` is false.

## Project Evidence Re-Audit

Recheck the current released/default sources for React Spring Bottom Sheet, Readonly View, Flex Layout Codemod, and React Swipe Actions. Record the date, commit/tag, package state, current documentation, support destinations, and any copy changes in the existing project source audit.

Bottom Sheet claims must reflect its current generation and released documentation. Readonly View must remain a live deeply readonly view over a mutable source, not immutability, state management, Immer replacement, or sandboxing. The codemod remains beta and review-oriented; no complete or risk-free automation claim is allowed. Swipe Actions remains absent or hidden unless current evidence supports intentional public visibility.

## Validation

The deterministic registry validator checks:

- unique slug;
- known category, visibility, and status;
- HTTPS repository, documentation, evidence, npm, and support URL shapes;
- explicit visibility and lifecycle status;
- valid scoped npm package syntax;
- `npm.published` is boolean and is the only gate for npm/install UI;
- public entries have required documentation and factual source metadata;
- configured support destinations are rendered without derived fallbacks.

Validation remains local and does not require external APIs. A separate link audit may verify current destinations without making the build depend on network availability.

## Navigation, Footer, and Legal Consistency

Keep header labels Projects, Principles, GitHub, and NIPE Solutions. The footer stays concise with NIPE Open Source identity plus Projects, Resources, NIPE Solutions, and Legal groups. Avoid duplicate navigation where it adds no discovery value.

Editorial branding uses NIPE Open Source or NIPE Solutions as appropriate. Legally operative content consistently identifies `NIPE Solutions e.U.` using the canonical verified source. Re-audit imprint, privacy, footer legal links, metadata, and structured data. Do not add compliance claims.

Preserve the analytics-free, cookie-free, external-font-free implementation. If the code audit finds any new processing or storage, update privacy text before release.

## Accessibility and Responsive Verification

Preserve the current semantics and strengthen launch checks for keyboard navigation, skip link, heading hierarchy, project entries, external-link names, statuses, focus visibility, reduced motion, mobile navigation, legal pages, and scrollable regions.

Check every project accent in both themes when used for text, links, controls, focus rings, badges, and project visuals. Automated contrast assertions should cover representative semantic uses, not merely raw color values.

Responsive verification covers 375, 430, 768, 1024, 1366, 1440, and wide desktop widths. Inspect hero wrapping, ecosystem map, directory density, code examples, claim/source links, footer, and project pages. This pass must not add height or decorative complexity.

## SEO, Links, and Structured Data

Update homepage and project-adjacent ecosystem metadata to the new tagline. Verify unique page titles/descriptions, production canonicals, sitemap, production/preview robots, Open Graph output, social images, and favicon.

Structured data stays conservative and registry-driven. Do not emit versions, download URLs, operating systems, or application categories unless current registry data explicitly supports them.

Audit internal routes and configured external documentation, repository, npm, NIPE, legal, security, and support links. Unpublished packages must never produce npm destinations. The custom 404 remains simple.

## Documentation and Launch Checklist

Update `docs/ADDING_A_PROJECT.md` for category, visibility, status, repository, documentation, npm publication state, support routes, accent identity, claims, and evidence. Include concise examples for a stable npm package, public beta, GitHub-only tool, hidden development project, and public archived project.

Add `docs/LAUNCH_CHECKLIST.md`, divided into:

- Automated: formatting, lint, typecheck, tests, registry validation, build, critical E2E, accessibility, sitemap/robots/canonical, and link checks.
- Manual: production domain/DNS/TLS, social preview, visual breakpoint inspection, GitHub repository About description, website URL, topics, optional private vulnerability reporting, and Discussions only if used.
- Owner/legal: legal entity facts, privacy accuracy, hosting/provider wording, security/support processes, and final legal review.

Document recommended GitHub metadata without changing repository settings automatically:

- Description: “The website for NIPE Open Source — focused primitives and developer tools for the web.”
- Website: `https://opensource.nipesolutions.com`
- Topics: `open-source`, `developer-tools`, `typescript`, `react`, `nipe-solutions`.

Keep the future centralized-docs note concise and unchanged in architecture.

## Verification and Release

Use test-first changes for registry behavior and rendered UI. The quality gate must continue to run format, lint, typecheck, unit tests, registry validation, and production build. CI continues to run critical Chromium E2E and accessibility smoke tests without material runtime growth.

Before release:

1. run the deterministic quality gate;
2. run browser/accessibility/responsive suites;
3. run the static and live link audit;
4. inspect light/dark representative screenshots against the existing baseline;
5. repeat the AI-slop scan;
6. review the launch checklist and classify remaining manual items;
7. deploy the reviewed commit to the existing Vercel project;
8. verify `https://opensource.nipesolutions.com`, preview noindex behavior, DNS, TLS, security headers, sitemap, robots, and existing project domains.

The final verdict is `NOT READY`, `READY WITH MANUAL ITEMS`, or `READY`. Legal review and GitHub settings remain manual unless explicitly completed.

