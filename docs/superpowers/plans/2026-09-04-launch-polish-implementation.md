# NIPE Open Source Launch Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sharpen the existing NIPE Open Source website for launch by normalizing copy and taxonomy, future-proofing the project registry, polishing evidence presentation, and verifying production readiness without changing the established design.

**Architecture:** Extend the existing static Next.js application in place. One typed registry continues to drive all public project surfaces, now with explicit visibility, lifecycle, npm publication, support, and source metadata. Existing components and CSS are refined rather than redesigned.

**Tech Stack:** Node.js 24, npm, Next.js 16, React 19, TypeScript, local CSS, Vitest, Testing Library, Playwright, axe-core, Vercel

**Spec:** `docs/superpowers/specs/2026-09-04-launch-polish-design.md`

## Global Constraints

- Preserve the existing visual language, project accents, information architecture, motion, legal shell, and static/server-first architecture.
- Use `Focused primitives and tools for the web.` as the primary ecosystem tagline.
- Canonical categories are `UI & Interaction`, `Runtime`, and `Tooling`; render no empty categories.
- The registry remains the only source of project facts; evidence links remain mandatory internally and subtle publicly.
- Public visibility, lifecycle status, npm package identity/publication, and support destinations are explicit and independent.
- Add no analytics, CMS, metrics, testimonials, roadmap, central docs, decorative effects, or major dependencies.
- Canonical production origin remains `https://opensource.nipesolutions.com`; individual documentation sites remain canonical.
- Do not modify GitHub repository metadata automatically; document manual settings.

---

### Task 1: Re-Audit Current Project and Legal Sources

**Files:**
- Modify: `docs/audits/project-sources.md`
- Create: `docs/audits/launch-polish-sources.md`

**Interfaces:**
- Produces: dated source decisions for registry migration and copy edits.
- Produces: verified support destinations and npm publication facts for all candidate projects.

- [ ] **Step 1: Recheck primary sources**

Inspect current released/default GitHub content, package metadata, documentation sites, npm state, repository features, contributing/security policies, and the canonical Bottom Sheet legal pages for Bottom Sheet, Readonly View, Flex Layout Codemod, and Swipe Actions.

- [ ] **Step 2: Record differences and decisions**

Record source URL, commit/tag/version, observation date, category, lifecycle status, visibility decision, npm identity/publication, configured support destinations, purpose, capability/limitation sources, and any copy correction. Keep Swipe Actions hidden unless evidence supports an intentional public release.

- [ ] **Step 3: Verify deterministic documentation quality**

Run: `npx prettier --check docs/audits/project-sources.md docs/audits/launch-polish-sources.md && git diff --check`

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add docs/audits/project-sources.md docs/audits/launch-polish-sources.md
git commit -m "docs: refresh project evidence for launch"
```

### Task 2: Migrate the Project Registry Contract

**Files:**
- Modify: `src/content/project-types.ts`
- Modify: `src/content/projects.ts`
- Modify: `src/content/projects.test.ts`
- Modify: `scripts/validate-projects.mjs`
- Modify: `scripts/validate-projects.test.mjs`

**Interfaces:**
- Produces: `ProjectVisibility`, complete `ProjectStatus`, `ProjectSource`, `ProjectNpm`, `ProjectSupport`, and normalized `ProjectClaim`.
- Produces: `publicProjects`, `getProject(slug)`, and existing category helpers.
- Removes: misleading `publishedProjects` and `npmPackage` interfaces.

- [ ] **Step 1: Write failing registry behavior tests**

Assert explicit visibility/status for every entry; selection by `visibility === 'public'`; complete lifecycle vocabulary; hidden development entries stay out of `publicProjects`; known-but-unpublished npm packages remain representable; only `npm.published` gates install/npm behavior data; and support destinations are explicit.

```ts
expect(publicProjects.every(({ visibility }) => visibility === 'public')).toBe(true)
expect(projects.filter(({ visibility }) => visibility === 'hidden')).not.toEqual([])
expect(projects.some(({ npm }) => npm && !npm.published)).toBe(true)
```

- [ ] **Step 2: Verify RED**

Run: `npm test -- src/content/projects.test.ts scripts/validate-projects.test.mjs`

Expected: FAIL because the new registry contract and selector do not exist.

- [ ] **Step 3: Implement normalized types and data**

Use the exact type families from the specification. Add Swipe Actions as `visibility: 'hidden'`, `status: 'development'`, and a known unpublished package only if Task 1 confirms that identity. Preserve every project accent and visual. Convert claim `label/detail/verifiedFrom` to `title/description/source` and retain `kind`.

- [ ] **Step 4: Extend deterministic validation**

Validate unique slugs, category, visibility, lifecycle status, HTTPS URLs, npm syntax and boolean publication, required public documentation, source metadata, and configured support URLs. Add failing fixtures for every new rule and ensure the CLI reads the new registry shape.

- [ ] **Step 5: Verify GREEN and commit**

Run: `npm test -- src/content/projects.test.ts scripts/validate-projects.test.mjs && npm run validate:projects && npm run typecheck`

```bash
git add src/content scripts/validate-projects.mjs scripts/validate-projects.test.mjs
git commit -m "refactor: make project lifecycle metadata explicit"
```

### Task 3: Migrate Registry Consumers and Support Routing

**Files:**
- Modify: `src/app/sitemap.ts`
- Modify: `src/app/projects/[slug]/page.tsx`
- Modify: `src/app/projects/[slug]/opengraph-image.tsx`
- Modify: `src/content/legal.ts`
- Modify: `src/components/project-directory.tsx`
- Modify: `src/components/project-entry.tsx`
- Modify: `src/components/project-detail.tsx`
- Modify: `src/components/site-footer.tsx`
- Modify: `src/components/support-routing.tsx`
- Modify: `src/app/contributing/page.tsx`
- Modify: `src/app/security/page.tsx`
- Modify: relevant unit tests importing `publishedProjects`

**Interfaces:**
- Consumes: `publicProjects`, explicit `npm`, explicit `support`, normalized claims.
- Guarantees: hidden projects do not appear publicly and unpublished packages never emit npm/install UI.

- [ ] **Step 1: Write failing consumer tests**

Update tests to require `publicProjects`, configured support links only, local project routes only for public entries, no npm link/install command when `npm.published` is false, and public archived/development status labels when intentionally visible.

- [ ] **Step 2: Verify RED**

Run focused registry-consumer, policy, homepage, shell, project-page, and metadata tests.

Expected: FAIL on the old selector and package/support logic.

- [ ] **Step 3: Migrate public selection and npm rendering**

Replace all `publishedProjects` imports. Generate sitemap, routes, footer entries, OG images, structured data, and directories from `publicProjects`. Render package identity where useful, but link/install only when `project.npm?.published === true`.

- [ ] **Step 4: Migrate support rendering**

Render Issues, Discussions, Security, and Documentation only when their explicit configured URLs exist. Remove repository-string URL construction from UI and policies.

- [ ] **Step 5: Verify and commit**

Run: `npm test && npm run typecheck && npm run validate:projects`

```bash
git add src scripts
git commit -m "refactor: render projects from explicit visibility metadata"
```

### Task 4: Polish Tagline, Taxonomy, Principles, and Evidence Presentation

**Files:**
- Modify: `src/lib/site.ts`
- Modify: `src/components/hero.tsx`
- Modify: `src/components/ecosystem-map.tsx`
- Modify: `src/components/principles.tsx`
- Modify: `src/components/project-detail.tsx`
- Modify: `src/app/opengraph-image.tsx`
- Modify: metadata, homepage, and project-page tests
- Modify: `src/app/globals.css` only for small label/source-link adjustments

**Interfaces:**
- Produces: one tagline across hero, metadata, OG, and tests.
- Produces: project detail regions named `Capabilities` and `Limitations` with contextual source links.

- [ ] **Step 1: Write failing copy and taxonomy tests**

Assert the exact new tagline; canonical category labels in the ecosystem map; absence of old taxonomy/category labels; the `Focused by design` principle; absence of `Automation leaves a review path`; `Capabilities` instead of `Verified claims`; and contextual `Source` links without `Evidence for` public wording.

- [ ] **Step 2: Verify RED**

Run focused homepage, metadata, and project-page tests.

Expected: FAIL on current wording.

- [ ] **Step 3: Implement copy-only component changes**

Preserve layout and visual markup. Source category labels from the category registry where practical. Render purpose/capability/limitation sources as restrained supporting links with accessible names such as `Source for <capability title>`.

- [ ] **Step 4: Run the AI-slop/taxonomy audit**

Search public source for the forbidden/generic term list, old tagline, `Verified claims`, `Evidence for`, `Interface`, and `Migration`. Review each match in context rather than blindly deleting descriptive uses.

- [ ] **Step 5: Verify and commit**

Run: `npm test && npm run format:check && npm run typecheck`

```bash
git add src
git commit -m "feat: sharpen ecosystem copy and project details"
```

### Task 5: Re-Audit Legal, SEO, Structured Data, and Links

**Files:**
- Modify: `src/content/legal.ts` if verified facts changed
- Modify: `src/app/impressum/page.tsx` if consistency requires
- Modify: `src/app/privacy/page.tsx` if actual processing changed
- Modify: `src/components/site-footer.tsx`
- Modify: `src/lib/metadata.ts`
- Modify: `src/components/structured-data.tsx`
- Modify: metadata/policy tests
- Create: `scripts/check-links.mjs`
- Create: `scripts/check-links.test.mjs`
- Modify: `package.json`

**Interfaces:**
- Produces: deterministic `check:links` for internal/configured static destinations, with optional live mode separated from `npm run check`.
- Preserves: canonical entity `NIPE Solutions e.U.` in legally operative contexts.

- [ ] **Step 1: Write failing consistency/link tests**

Test canonical operator naming, actual privacy technologies, conservative JSON-LD fields, correct tagline metadata, project-specific OG data, production canonicals, preview noindex, and extraction of internal/configured links with no npm destination for unpublished packages.

- [ ] **Step 2: Verify RED**

Run focused metadata, policy, and link-script tests.

Expected: FAIL because the link checker and new registry semantics are missing.

- [ ] **Step 3: Implement legal/SEO/link refinements**

Keep legal wording unchanged unless evidence or technology differs. Ensure structured data emits no unsupported version/download/OS/application-category claims. Add deterministic link validation and an explicit opt-in live URL check.

- [ ] **Step 4: Verify static and live links**

Run: `npm run check:links` and the live link command. Record transient external failures separately; do not make ordinary builds network-dependent.

- [ ] **Step 5: Commit**

```bash
git add src scripts/check-links.mjs scripts/check-links.test.mjs package.json package-lock.json
git commit -m "test: validate launch metadata and project links"
```

### Task 6: Update Maintainer Guidance and Add Launch Checklist

**Files:**
- Modify: `docs/ADDING_A_PROJECT.md`
- Create: `docs/LAUNCH_CHECKLIST.md`
- Modify: `README.md`
- Modify: `scripts/repository-docs.test.mjs`
- Modify: `docs/FUTURE_CENTRAL_DOCS.md` only if wording needs tightening

**Interfaces:**
- Documents: explicit registry fields and five lifecycle examples.
- Documents: automated, manual, and owner/legal launch gates.
- Documents: manual GitHub About description, website, topics, security, and Discussions settings.

- [ ] **Step 1: Write failing documentation contract tests**

Require `slug`, name, category, visibility, status, repository, docs, npm publication, support URLs, accent, claims, and sources; require stable npm, public beta, GitHub-only, hidden development, and archived examples; require the three launch checklist sections and exact recommended GitHub metadata.

- [ ] **Step 2: Verify RED**

Run: `npm test -- scripts/repository-docs.test.mjs`

Expected: FAIL on missing launch-polish documentation.

- [ ] **Step 3: Write concise maintainer documentation**

Keep examples small and valid against the registry types. Mark GitHub metadata, vulnerability reporting, Discussions, visual social preview, and owner/legal review as manual. Preserve the future-docs architecture without implementation detail expansion.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- scripts/repository-docs.test.mjs && npm run format:check`

```bash
git add docs README.md scripts/repository-docs.test.mjs
git commit -m "docs: add launch and project registration guidance"
```

### Task 7: Run Launch Accessibility, Responsive, and Visual Regression Pass

**Files:**
- Modify: `e2e/accessibility.spec.ts`
- Modify: `e2e/responsive.spec.ts`
- Modify: `e2e/site.spec.ts`
- Modify: `e2e/metadata.spec.ts`
- Modify: application CSS/components only for defects exposed by tests
- Create: `docs/audits/launch-polish-final.md`

**Interfaces:**
- Produces: launch audit with breakpoint/theme, keyboard, accessibility, accent contrast, copy, privacy, and link evidence.

- [ ] **Step 1: Add missing launch regressions**

Cover canonical category/status labels, configured source/support links, hidden-project absence, unpublished-package absence, keyboard/source-link operation, skip link, focus, reduced motion, legal pages, and representative project accent contrast in light/dark themes.

- [ ] **Step 2: Cover all target widths**

Exercise 375, 430, 768, 1024, 1366, 1440, and 1920 widths on the homepage and representative detail routes. Assert no page overflow, usable code/source links, concise footer, and reasonable section geometry.

- [ ] **Step 3: Run the complete gates**

Run: `npm ci && npm run check && npm run test:e2e && npm run check:links`

Expected: all deterministic, browser, and static-link checks PASS.

- [ ] **Step 4: Inspect visual baselines and audit content**

Capture representative light/dark pages and compare against the current editorial baseline. Revert any change that makes the site more generic, busy, animated, tall, or SaaS-like. Repeat the AI-slop scan and reconcile project/legal sources.

- [ ] **Step 5: Record audit and commit**

```bash
git add e2e src docs/audits/launch-polish-final.md
git commit -m "test: complete launch polish audit"
```

### Task 8: Review, Deploy, and Verify Production

**Files:**
- Modify: `docs/audits/deployment.md`
- Modify: `docs/LAUNCH_CHECKLIST.md`

**Interfaces:**
- Produces: reviewed main commit deployed to the existing Vercel project and verified on the custom domain.
- Produces: final readiness verdict and remaining manual items.

- [ ] **Step 1: Run whole-branch review**

Review the complete diff against the design specification, with special attention to registry semantics, public visibility, npm/support gating, design preservation, factual copy, accessibility, SEO, legal/privacy, and checklist accuracy. Fix every Critical/Important finding and re-run covering tests.

- [ ] **Step 2: Verify preview before production**

Deploy a protected Vercel preview from the reviewed commit. Verify `noindex,nofollow`, `Disallow: /`, production canonicals, navigation, project/support/npm behavior, and security headers.

- [ ] **Step 3: Merge/push and deploy production**

Integrate the reviewed branch into `main`, push, wait for GitHub CI, and deploy using `npx vercel deploy --prod`. Do not modify the established GoDaddy DNS record unless Vercel reports a configuration change.

- [ ] **Step 4: Verify live production**

Check DNS CNAME, Vercel domain verification, TLS, HTTP-to-HTTPS, status codes, canonicals, index directives, sitemap, robots, Open Graph images, security headers, legal/support/project links, 404, and existing project documentation domains.

- [ ] **Step 5: Close the launch checklist**

Mark automated items with evidence. Leave GitHub repository metadata and owner/legal review manual unless explicitly completed. Classify readiness as `NOT READY`, `READY WITH MANUAL ITEMS`, or `READY`.

- [ ] **Step 6: Commit deployment evidence and hand off**

```bash
git add docs/audits/deployment.md docs/LAUNCH_CHECKLIST.md
git commit -m "docs: record launch polish deployment"
git push origin main
```

