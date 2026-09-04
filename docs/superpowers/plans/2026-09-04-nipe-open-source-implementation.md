# NIPE Open Source Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, verify, and deploy the NIPE Open Source ecosystem website at `https://opensource.nipesolutions.com`.

**Architecture:** A statically rendered Next.js 16 application uses one typed project registry to generate discovery content, project routes, metadata, sitemap entries, and navigation. Public claims are backed by repository evidence recorded in that registry; deterministic local checks do not depend on GitHub or npm availability. Vercel serves the site, and GoDaddy delegates only the requested subdomain record.

**Tech Stack:** Node.js 24, npm, Next.js 16, React 19, TypeScript, local CSS, Vitest, Testing Library, Playwright, axe-core, ESLint, Prettier, Vercel

**Spec:** `docs/superpowers/specs/2026-09-04-nipe-open-source-design.md`

## Global Constraints

- Public identity is `NIPE Open Source`; canonical origin is `https://opensource.nipesolutions.com`.
- Use current released docs, repository docs, package metadata, and release notes in that order; never invent project APIs or compatibility claims.
- Publish no fake metrics, social proof, speculative projects, centralized docs, CMS, analytics, third-party fonts, or consent banner.
- Render public content statically and keep client JavaScript limited to necessary interactions.
- Use the current Bottom Sheet legal pages as the canonical NIPE entity source, then adapt privacy wording to the actual site.
- Use MIT for the website source.
- Do not change or redirect existing individual project domains.

---

### Task 1: Capture Current Evidence and Bootstrap the Quality Toolchain

**Files:**
- Create: `.nvmrc`
- Create: `.gitignore`
- Create: `.prettierignore`
- Create: `.prettierrc.json`
- Create: `package.json`
- Create: `package-lock.json`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `next.config.ts`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `src/test/setup.ts`
- Create: `docs/audits/project-sources.md`

**Interfaces:**
- Produces: npm scripts `dev`, `format`, `format:check`, `lint`, `typecheck`, `test`, `validate:projects`, `build`, `preview`, `test:e2e`, and `check`.
- Produces: a dated evidence inventory consumed by Task 2.

- [ ] **Step 1: Audit authoritative sources without modifying sibling repositories**

Inspect the current default/release branches, tags, READMEs, package metadata, release notes, exports, security policies, contributing guides, and canonical sites for all four candidates. Check npm publication state with `npm view` and GitHub state with `gh api`. Record exact URLs, branch/tag/commit, observation date, current status, package name/version, real example source, capabilities, limitations, and legal-page values in `docs/audits/project-sources.md`.

- [ ] **Step 2: Write the minimal Node/Next toolchain**

Use exact major versions compatible with Node 24. Define the combined script as:

```json
{
  "scripts": {
    "check": "npm run format:check && npm run lint && npm run typecheck && npm run test && npm run validate:projects && npm run build"
  }
}
```

Install only Next.js, React, TypeScript, ESLint, Prettier, Vitest, Testing Library, Playwright, and axe dependencies needed by later tasks. Commit the generated lockfile.

- [ ] **Step 3: Run the empty quality tools**

Run: `npm run format:check && npm run lint && npm run typecheck && npm test`

Expected: PASS with no application code and no ignored configuration errors.

- [ ] **Step 4: Commit**

```bash
git add .nvmrc .gitignore .prettierignore .prettierrc.json package.json package-lock.json tsconfig.json next-env.d.ts next.config.ts eslint.config.mjs vitest.config.ts src/test/setup.ts docs/audits/project-sources.md
git commit -m "chore: bootstrap website quality toolchain"
```

### Task 2: Build the Typed Project Registry and Validator

**Files:**
- Create: `src/content/project-types.ts`
- Create: `src/content/projects.ts`
- Create: `src/content/projects.test.ts`
- Create: `scripts/validate-projects.mjs`
- Create: `scripts/validate-projects.test.mjs`

**Interfaces:**
- Produces: `ProjectCategory`, `ProjectStatus`, `ProjectClaim`, and `OpenSourceProject` types.
- Produces: `projects`, `publishedProjects`, `getProject(slug)`, and `projectCategories`.
- Produces: CLI exit code `0` for a valid registry and nonzero with actionable messages for invalid entries.

- [ ] **Step 1: Write failing registry tests**

Test that every public entry has a unique slug, known category/status, HTTPS repository URL, evidence-backed claims, correct editorial ordering, and a valid scoped npm name only when published. Assert that Swipe Actions is absent when Task 1 found no meaningfully usable public implementation.

```ts
expect(new Set(projects.map(({ slug }) => slug)).size).toBe(projects.length)
expect(projects.find(({ slug }) => slug === 'flex-layout-codemod')?.category).toBe('tooling')
expect(projects.flatMap(({ claims }) => claims).every(({ verifiedFrom }) => Boolean(verifiedFrom))).toBe(true)
```

- [ ] **Step 2: Verify the tests fail**

Run: `npm test -- src/content/projects.test.ts`

Expected: FAIL because registry modules do not exist.

- [ ] **Step 3: Implement the registry from recorded evidence**

Define immutable objects. Keep technical examples as validated strings with a source reference. Include presentation metadata without duplicating names, URLs, or statuses elsewhere.

```ts
export interface ProjectClaim {
  readonly label: string
  readonly detail: string
  readonly verifiedFrom: string
}

export interface OpenSourceProject {
  readonly slug: string
  readonly name: string
  readonly category: ProjectCategory
  readonly description: string
  readonly status: ProjectStatus
  readonly repository: string
  readonly documentation?: string
  readonly npmPackage?: string
  readonly license: string
  readonly claims: readonly ProjectClaim[]
  readonly example?: { readonly language: string; readonly code: string; readonly verifiedFrom: string }
  readonly accent: string
  readonly visual: 'bottom-sheet' | 'readonly-view' | 'swipe-actions' | 'codemod'
  readonly featured: boolean
  readonly order: number
}
```

- [ ] **Step 4: Implement and test the standalone validator**

Export a pure `validateProjects(entries)` function from the script and a CLI wrapper. Tests inject duplicate slugs, `http:` links, missing evidence, invalid npm identities, and unknown statuses and assert exact diagnostics.

- [ ] **Step 5: Run focused checks and commit**

Run: `npm test -- src/content/projects.test.ts scripts/validate-projects.test.mjs && npm run validate:projects`

```bash
git add src/content scripts/validate-projects.mjs scripts/validate-projects.test.mjs package.json
git commit -m "feat: add evidence-backed project registry"
```

### Task 3: Establish the Design Foundation and Shared Shell

**Files:**
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`
- Create: `src/components/site-header.tsx`
- Create: `src/components/site-footer.tsx`
- Create: `src/components/external-link.tsx`
- Create: `src/components/site-shell.test.tsx`
- Create: `src/lib/site.ts`

**Interfaces:**
- Produces: `siteConfig` containing canonical origin, title, description, GitHub organization, and NIPE URL.
- Produces: semantic `SiteHeader`, `SiteFooter`, and `ExternalLink` components.

- [ ] **Step 1: Write failing shell tests**

Render the layout components and assert a skip link, banner, labeled primary navigation, main target, content information, Projects/Principles/GitHub/NIPE links, and Impressum/Privacy links. Assert external links have safe `rel` behavior without forcing new tabs.

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/components/site-shell.test.tsx`

Expected: FAIL because shell components do not exist.

- [ ] **Step 3: Implement the shell and tokens**

Create CSS custom properties for neutral canvases, ink, muted text, NIPE red, project accents, spacing, type scale, border widths, focus ring, and motion durations. Use system fonts unless Task 1 identifies a redistributable NIPE font. Support `prefers-color-scheme`, `prefers-reduced-motion`, print styles, logical properties, and a maximum reading width.

- [ ] **Step 4: Run checks and commit**

Run: `npm test -- src/components/site-shell.test.tsx && npm run typecheck && npm run lint`

```bash
git add src/app/globals.css src/app/layout.tsx src/components src/lib/site.ts
git commit -m "feat: establish accessible site shell"
```

### Task 4: Build the Homepage and Project Visuals

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/components/hero.tsx`
- Create: `src/components/ecosystem-map.tsx`
- Create: `src/components/project-directory.tsx`
- Create: `src/components/project-entry.tsx`
- Create: `src/components/project-visual.tsx`
- Create: `src/components/principles.tsx`
- Create: `src/components/support-routing.tsx`
- Create: `src/app/home.test.tsx`

**Interfaces:**
- Consumes: `publishedProjects`, `projectCategories`, and shell components.
- Produces: static homepage sections with stable IDs `projects` and `principles`.

- [ ] **Step 1: Write failing homepage tests**

Assert one H1, the positioning copy, only nonempty categories, each published project once, verified descriptions/statuses, correct docs/source/package destinations, no unavailable npm action, and no banned placeholder/social-proof language.

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/app/home.test.tsx`

Expected: FAIL because homepage components do not exist.

- [ ] **Step 3: Implement the editorial homepage**

Build the compact hero and ecosystem map, then category sections containing varied project rows. Use CSS/SVG/semantic HTML for the four concept visuals; do not import project runtimes. Render the philosophy as qualified principles and route contributions/security issues to the relevant repository.

- [ ] **Step 4: Audit copy mechanically**

Run a repository search for `unlock|seamless|effortless|supercharge|robust|powerful|next-gen|modern developers|built for teams|at scale|enterprise-grade|beautiful|intuitive|revolutionize|transform` and replace or justify every occurrence in public copy.

- [ ] **Step 5: Run checks and commit**

Run: `npm test -- src/app/home.test.tsx && npm run typecheck && npm run lint`

```bash
git add src/app/page.tsx src/app/home.test.tsx src/components
git commit -m "feat: build ecosystem discovery homepage"
```

### Task 5: Generate Concise Project Detail Routes

**Files:**
- Create: `src/app/projects/[slug]/page.tsx`
- Create: `src/components/code-example.tsx`
- Create: `src/components/install-command.tsx`
- Create: `src/components/project-detail.tsx`
- Create: `src/app/projects/project-pages.test.tsx`

**Interfaces:**
- Consumes: `getProject(slug)` and `publishedProjects`.
- Produces: `generateStaticParams()` and `generateMetadata()` for every published project.

- [ ] **Step 1: Write failing route tests**

For every registry entry, assert generated params, unique title/description/canonical, overview, status, claims, real example when present, limitations, documentation/source links, and conditional npm/install actions. Assert unknown slugs call `notFound()`.

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/app/projects/project-pages.test.tsx`

Expected: FAIL because dynamic route modules do not exist.

- [ ] **Step 3: Implement static detail pages**

Use server-rendered code blocks. If copy-to-clipboard would materially increase hydration, omit it for v1; otherwise isolate one tiny client button with a visible success announcement. Preserve all examples exactly as audited.

- [ ] **Step 4: Run checks and commit**

Run: `npm test -- src/app/projects/project-pages.test.tsx && npm run typecheck && npm run build`

```bash
git add src/app/projects src/components/code-example.tsx src/components/install-command.tsx src/components/project-detail.tsx
git commit -m "feat: add evidence-based project pages"
```

### Task 6: Implement Legal, Contribution, Security, and Error Routes

**Files:**
- Create: `src/content/legal.ts`
- Create: `src/components/legal-page.tsx`
- Create: `src/app/impressum/page.tsx`
- Create: `src/app/privacy/page.tsx`
- Create: `src/app/contributing/page.tsx`
- Create: `src/app/security/page.tsx`
- Create: `src/app/not-found.tsx`
- Create: `src/app/policies.test.tsx`

**Interfaces:**
- Produces: one typed `operator` record reused by imprint and privacy pages.
- Consumes: audited legal facts and per-project repository routes.

- [ ] **Step 1: Re-verify the canonical Bottom Sheet legal pages**

Compare `/impressum` and `/privacy` immediately before writing. Record any discrepancy from Task 1 and stop publication if identity data conflicts.

- [ ] **Step 2: Write failing policy-route tests**

Assert the verified operator identity/address/contact, Vercel hosting disclosure, absence of nonexistent analytics/cookie providers, outbound-link disclosure, no cookie-settings link, project-specific contribution/security routing, and useful 404 destinations.

- [ ] **Step 3: Verify failure**

Run: `npm test -- src/app/policies.test.tsx`

Expected: FAIL because routes do not exist.

- [ ] **Step 4: Implement policy routes**

Use the same shell with narrow readable content and print CSS. State that legal text requires owner/legal review; do not claim compliance. Link private vulnerability reporting only where it is verified to exist, otherwise link the repository security policy.

- [ ] **Step 5: Run checks and commit**

Run: `npm test -- src/app/policies.test.tsx && npm run build`

```bash
git add src/content/legal.ts src/components/legal-page.tsx src/app/impressum src/app/privacy src/app/contributing src/app/security src/app/not-found.tsx src/app/policies.test.tsx
git commit -m "feat: add legal and project support routes"
```

### Task 7: Add SEO, Structured Data, Social Images, and Security Headers

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `src/app/opengraph-image.tsx`
- Create: `src/app/projects/[slug]/opengraph-image.tsx`
- Create: `src/components/structured-data.tsx`
- Create: `src/lib/metadata.ts`
- Create: `src/lib/metadata.test.ts`
- Modify: `next.config.ts`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Produces: `createPageMetadata({ title, description, path })` with production canonical URLs.
- Produces: production-aware robots rules based on `VERCEL_ENV`.

- [ ] **Step 1: Write failing metadata tests**

Assert canonical production URLs, unique project metadata, all public sitemap routes, preview `noindex`, production indexing, factual JSON-LD, and exact security headers including CSP, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, frame restrictions, and HSTS on production responses.

- [ ] **Step 2: Verify failure**

Run: `npm test -- src/lib/metadata.test.ts`

Expected: FAIL because metadata utilities do not exist.

- [ ] **Step 3: Implement metadata and headers**

Generate restrained `ImageResponse` social images using local/system typography. Define the smallest CSP that supports Next’s generated assets and no external services. Add `WebSite` and `Organization` JSON-LD globally and `SoftwareSourceCode` only on applicable project pages.

- [ ] **Step 4: Run checks and inspect output**

Run: `npm test -- src/lib/metadata.test.ts && npm run build`

Inspect `.next/server/app/sitemap.xml.body`, robots output, and built headers/config for the production origin.

- [ ] **Step 5: Commit**

```bash
git add src/app/sitemap.ts src/app/robots.ts src/app/opengraph-image.tsx src/app/projects src/components/structured-data.tsx src/lib next.config.ts src/app/layout.tsx
git commit -m "feat: add production metadata and security policy"
```

### Task 8: Add Browser, Accessibility, and Responsive Tests

**Files:**
- Create: `playwright.config.ts`
- Create: `e2e/site.spec.ts`
- Create: `e2e/accessibility.spec.ts`
- Create: `e2e/responsive.spec.ts`
- Create: `e2e/metadata.spec.ts`

**Interfaces:**
- Consumes: production build via `npm run preview -- --port 4173`.
- Produces: Chromium E2E suite and screenshot artifacts on failure.

- [ ] **Step 1: Write the browser tests**

Cover homepage loading, all project names and links, mobile navigation, skip-link focus, keyboard-only traversal, legal navigation, unknown-route 404, reduced motion, project canonical metadata, and external-link destinations. Run axe against homepage, every project route, imprint, privacy, contribution, and security.

- [ ] **Step 2: Add responsive assertions**

Test widths `375`, `430`, `768`, `1366`, `1440`, and `1920`; assert no horizontal overflow, visible primary content, usable navigation, and touch targets of at least 44 CSS pixels for primary controls.

- [ ] **Step 3: Run and fix the suite**

Run: `npx playwright install chromium && npm run test:e2e`

Expected: all tests PASS with zero serious/critical axe violations and no overflow assertions.

- [ ] **Step 4: Commit**

```bash
git add playwright.config.ts e2e package.json package-lock.json
git commit -m "test: cover navigation accessibility and responsiveness"
```

### Task 9: Add Maintainer and Repository Documentation

**Files:**
- Create: `README.md`
- Create: `LICENSE`
- Create: `CONTRIBUTING.md`
- Create: `SECURITY.md`
- Create: `CODE_OF_CONDUCT.md`
- Create: `docs/ADDING_A_PROJECT.md`
- Create: `docs/FUTURE_CENTRAL_DOCS.md`
- Create: `docs/PROJECT_SITE_BACKLINKS.md`
- Create: `.github/dependabot.yml`

**Interfaces:**
- Documents exact commands and the one-registry-entry project workflow.
- Documents repository-specific security routing and Vercel deployment.

- [ ] **Step 1: Write documentation checks**

Extend a Node test to assert README sections and exact commands, MIT license presence, required registry workflow steps, future aggregation remaining explicitly unimplemented, and the recommended “Part of NIPE Open Source” backlink.

- [ ] **Step 2: Write concise repository documents**

Document `npm install`, `npm run dev`, `npm run check`, `npm run build`, `npm run preview`, and `npm run test:e2e`. Explain legal-source maintenance and owner review. Configure weekly npm Dependabot only.

- [ ] **Step 3: Run checks and commit**

Run: `npm test && npm run format:check`

```bash
git add README.md LICENSE CONTRIBUTING.md SECURITY.md CODE_OF_CONDUCT.md docs .github/dependabot.yml
git commit -m "docs: add maintainer and community guidance"
```

### Task 10: Configure CI and Vercel Deployment Metadata

**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `vercel.json`
- Create: `.vercelignore`
- Create: `src/config/environment.ts`
- Create: `src/config/environment.test.ts`

**Interfaces:**
- Produces: `readEnvironment(env)` validating production canonical assumptions without requiring secrets.
- Produces: CI jobs `quality` and `browser` on pushes and pull requests.

- [ ] **Step 1: Write failing environment tests**

Assert that production resolves to the custom origin, preview stays `noindex`, and unexpected explicit site URLs fail rather than emitting incorrect canonicals.

- [ ] **Step 2: Implement environment validation and CI**

Use Node 24 and `npm ci`. Cache Playwright browsers appropriately, upload failure artifacts only, and keep workflow permissions read-only. Configure Vercel for Next.js without unnecessary rewrites.

- [ ] **Step 3: Run YAML/config and local gates**

Run: `npm test -- src/config/environment.test.ts && npm run check && npm run test:e2e`

Expected: all checks PASS.

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/ci.yml vercel.json .vercelignore src/config package.json
git commit -m "ci: validate and build the static website"
```

### Task 11: Perform the Final Product, Privacy, and Performance Audit

**Files:**
- Create: `docs/audits/final-audit.md`
- Modify: application files found deficient by the audit

**Interfaces:**
- Produces: dated audit covering claims, accessibility, performance, SEO, privacy, legal review, and third parties.

- [ ] **Step 1: Run the complete deterministic and browser gates**

Run: `npm ci && npm run check && npm run test:e2e`

Expected: PASS from a clean dependency install.

- [ ] **Step 2: Run Lighthouse and inspect representative screenshots**

Use a production preview and Lighthouse for homepage and one project route. Record performance/accessibility/SEO results and meaningful trade-offs. Capture and inspect all six target viewport sizes and both color schemes.

- [ ] **Step 3: Complete the five-perspective review**

Review as a senior frontend engineer, OSS maintainer, first-time developer, skeptical technical buyer, and privacy-conscious EU visitor. Re-check every claim against Task 1, repeat the AI-slop scan, enumerate all third parties/storage/cookies/assets, verify legal data and navigation, and verify no existing project domain is affected.

- [ ] **Step 4: Fix findings and rerun affected checks**

Every recorded finding must be fixed, explicitly accepted with rationale, or marked as requiring NIPE owner/legal review. Do not mark an unresolved technical defect as accepted.

- [ ] **Step 5: Commit the audit**

```bash
git add src e2e docs/audits/final-audit.md
git commit -m "chore: complete production readiness audit"
```

### Task 12: Publish Repository, Deploy to Vercel, and Configure GoDaddy DNS

**Files:**
- Modify: `README.md` only if actual deployment details differ
- Create: `docs/audits/deployment.md`

**Interfaces:**
- Produces: public GitHub repository state, Vercel preview and production deployments, attached custom domain, valid HTTPS, and verified GoDaddy DNS record.

- [ ] **Step 1: Push the reviewed repository**

Verify `git status --short` is clean and `git remote -v` targets `NIPE-Solutions/oss-website`. Push `main` only after all local gates pass. Confirm GitHub Actions succeeds.

- [ ] **Step 2: Link or create the Vercel project**

Use the authenticated Vercel CLI or signed-in Vercel browser session. Link `NIPE-Solutions/oss-website`, record the project/team identifiers, configure Next.js defaults, and deploy a preview.

- [ ] **Step 3: Verify preview isolation**

Check preview navigation, headers, legal routes, assets, robots `noindex`, and production canonicals. Do not attach the custom domain until this passes.

- [ ] **Step 4: Deploy production and request the domain**

Deploy the reviewed commit to production and add `opensource.nipesolutions.com` in Vercel. Record the exact DNS record type, name, and target returned by Vercel.

- [ ] **Step 5: Make the narrow GoDaddy DNS change**

Using the signed-in GoDaddy session, inspect existing `nipesolutions.com` records, ensure there is no conflicting `opensource` record, and create or update only the precise record Vercel requested. Do not touch apex, mail, verification, or other project subdomain records.

- [ ] **Step 6: Verify DNS, TLS, redirects, and production behavior**

Wait for propagation using bounded polling. Confirm authoritative DNS, Vercel domain verification, HTTPS certificate, HTTP-to-HTTPS, canonical origin, sitemap, robots, security headers, project/external links, legal routes, 404, and no redirect impact on existing project domains.

- [ ] **Step 7: Record deployment evidence and commit if needed**

Write timestamps, Vercel project/deployment URLs, DNS record without secrets, verification results, and remaining legal-owner review items to `docs/audits/deployment.md`. If documentation changed, run `npm run check`, commit, push, and verify the final production deployment again.

```bash
git add README.md docs/audits/deployment.md
git commit -m "docs: record production deployment"
git push origin main
```

### Task 13: Final Handoff

**Files:**
- No required file changes

**Interfaces:**
- Produces: concise completion report required by the specification.

- [ ] **Step 1: Gather final evidence**

Record the exact reviewed commit, clean worktree, GitHub Actions result, production URL/status, DNS answer, TLS result, latest `npm run check`, E2E, and Lighthouse outputs.

- [ ] **Step 2: Deliver the completion report**

Report technology/architecture, information architecture, design system, project representation, claim sources, accessibility, performance, SEO, privacy/analytics, legal pages, owner/legal review items, CI/tests, deployment, known limitations, future recommendations, and exact commands for development, quality gate, build, preview, and deployment.

