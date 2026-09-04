# NIPE Open Source Website Design

## Purpose

Build and deploy the public discovery site for NIPE-maintained open-source software at `https://opensource.nipesolutions.com`. The site is the ecosystem directory, trust layer, and navigation surface. Individual project repositories and documentation sites remain the technical sources of truth.

The public identity is **NIPE Open Source**. The primary positioning is “Production-grade primitives and tools for the web.” Supporting copy must remain concrete, restrained, and based on current project evidence.

## Scope

The first release includes:

- a compact homepage with hero, categorized project directory, engineering principles, contribution/security guidance, NIPE relationship, and footer;
- concise detail routes for every project that has sufficient public evidence;
- imprint, privacy, contribution, security, and custom 404 pages;
- project registry and claim validation;
- metadata, canonical URLs, Open Graph images, structured data where appropriate, sitemap, and robots directives;
- unit, accessibility smoke, navigation, responsive, and build checks;
- Vercel deployment and the `opensource.nipesolutions.com` custom domain configured through GoDaddy.

The release does not include centralized documentation ingestion, search, a CMS, analytics, a blog, live vanity metrics, a release feed, or speculative project cards.

## Architecture

Use Next.js 16, React 19, and strict TypeScript with npm. Render all public content statically. Prefer server components and plain local CSS; client components are limited to interactions that require browser state, such as navigation, theme controls, and copying commands.

A single typed project registry drives homepage sections, project routes, footer links, sitemap entries, and validation. Registry entries include category, verified status, destinations, package identity when published, presentation data, and internally recorded claim sources. Project pages summarize facts and link to canonical project documentation rather than duplicating it.

Do not fetch GitHub or npm data per visitor. The site remains fully useful when external services are unavailable.

## Technology Decision

Next.js is preferred over Astro or plain Vite because it matches the current React Spring Bottom Sheet website, supports static project routes and route metadata directly, and maps cleanly to Vercel. Astro would marginally reduce runtime code but introduce a second site framework. Plain Vite would require bespoke metadata and route-generation infrastructure.

Use local components and CSS rather than a large component library or animation dependency. Self-host fonts only when their licenses allow redistribution; otherwise use a high-quality system stack.

## Project Evidence and Publication Rules

Before writing public copy, audit sources in this order:

1. current released project documentation;
2. current repository README and documentation on the relevant released/default branch;
3. published package metadata;
4. release notes;
5. ecosystem summary copy.

Initial candidates are:

- React Spring Bottom Sheet under UI & Interaction;
- Readonly View under Runtime;
- React Swipe Actions under UI & Interaction only if its public repository is meaningfully usable;
- Angular Flex-Layout Codemod under Tooling.

Statuses must follow current evidence. Install commands and npm links appear only for published packages. Real code examples must match current exports or documented CLI syntax. No star counts, download counts, testimonials, customer logos, adoption claims, or inferred compatibility claims appear.

Every public capability claim records an internal source reference. The validator checks duplicate slugs, known categories/statuses, required URLs, npm package syntax, and claim-source presence. Optional network link checking is kept separate from the deterministic local quality gate.

## Information Architecture

The header contains the NIPE Open Source identity, Projects, Principles, GitHub, and NIPE Solutions. It remains compact and uses a simple accessible mobile navigation.

The homepage order is:

1. restrained hero that answers who NIPE Open Source is, what it builds, and why the directory exists;
2. categorized project directory as the primary content;
3. concise engineering principles supported by repository-specific evidence;
4. contribution, security, and support routing;
5. relationship to NIPE Solutions;
6. project, resource, NIPE, and legal footer links.

Project routes use `/projects/<slug>` and contain a short overview, reason for existence, verified capabilities and limitations, current status, a real example, an install command if published, and canonical documentation/source/package links.

## Visual Language

Use a neutral editorial foundation: warm off-white and near-black surfaces, disciplined spacing, crisp rules, and a restrained NIPE red ecosystem accent. Dark mode mirrors the same hierarchy rather than introducing a new aesthetic. Each project receives one muted accent and concept-specific visual treatment without creating a rainbow palette.

Use readable sans-serif typography for prose and monospace only for packages, commands, statuses, and code. The hero fits comfortably within a laptop viewport and pairs concise copy with a lightweight ecosystem map.

The project directory uses varied editorial rows instead of repeated rounded SaaS cards:

- Bottom Sheet uses layered vertical panels;
- Readonly View shows a mutable source related to a deeply readonly live view;
- Swipe Actions uses a horizontal action reveal only if the project is published;
- the codemod uses a verified compact migration diff.

Motion is limited to explanatory state changes, navigation feedback, and focus/hover states. `prefers-reduced-motion` disables nonessential movement. Do not use generated imagery, stock media, gradient blobs, glass panels, floating terminals, decorative counters, or generic dashboard motifs.

On small screens, content density is reconsidered rather than mechanically stacking oversized desktop cards. Every interactive target remains keyboard accessible and touch friendly.

## Copy Standard

Copy describes the problem, scope, current status, constraints, and destinations. Avoid claims such as “enterprise-grade,” “blazing fast,” “powerful,” “seamless,” “robust,” or “production ready” without precise evidence. Do not describe the Readonly View source as immutable. Do not imply that the codemod completes every migration automatically.

Before release, search all copy for generic marketing terms listed in the product brief and either replace each occurrence with technical meaning or justify it. Avoid repetitive em dashes, three-adjective slogans, and copy transferable to an unrelated SaaS product.

## Accessibility and Responsive Behavior

Implement semantic landmarks, one coherent heading hierarchy, a skip link, visible focus styles, logical tab order, accessible names, minimum touch targets, sufficient contrast, no hover-only information, and reduced-motion behavior. Legal content works without client JavaScript.

Automated browser smoke tests cover the homepage, project visibility, mobile navigation, keyboard operation, legal links, the 404 route, and theme behavior if a manual theme control is included. Axe checks run on representative pages. Visual QA covers mobile portrait, large mobile, tablet, laptop, 1440 desktop, and wide desktop.

## SEO and Social Metadata

Set the production base URL to `https://opensource.nipesolutions.com`. Every public page gets a unique title, factual description, and production canonical. Generate `sitemap.xml` and `robots.txt`; preview deployments must use `noindex` and never become canonical.

The homepage Open Graph image uses the NIPE Open Source identity and ecosystem visual language. Project pages use project-specific Open Graph images when practical. Use `WebSite`, `Organization`, and `SoftwareSourceCode` structured data only where their properties are factual and semantically appropriate.

## Privacy and Legal Content

The site runs without analytics, advertising, session replay, embedded third-party media, external font requests, or consent-requiring storage. Therefore it has no cosmetic cookie banner. A theme preference may be stored locally only if a manual theme control is implemented and must be disclosed accurately.

Use the current legal pages at `react-spring-bottom-sheet.nipesolutions.com` as the canonical company-information source. At design time these identify:

- NIPE Solutions e.U.;
- proprietor Nicholas Petrasek;
- Achtergasse 10, 1230 Wien, Austria;
- `office@nipesolutions.com`.

The implementation must re-check those pages immediately before publication and reproduce additional register, VAT, authority, or contact details only if they are actually present. The privacy policy must be rewritten for this site’s real processing, including Vercel hosting/CDN and server logs, outbound GitHub/npm/NIPE links, local assets, and any local storage. It must not copy services used only by the Bottom Sheet site.

The footer links to Impressum and Privacy. Cookie settings appear only if a consent system becomes necessary. Legal wording is flagged for owner/legal review without claiming legal compliance.

## Repository and Maintenance

The existing repository is `NIPE-Solutions/oss-website`. License the website source under MIT. Include `README.md`, `LICENSE`, `CONTRIBUTING.md`, `SECURITY.md`, and an appropriate code of conduct. Dependabot or Renovate follows the dominant current NIPE convention, never both.

`docs/ADDING_A_PROJECT.md` explains the registry-first workflow. A short architecture note records a possible future build-time documentation aggregation model while explicitly excluding its implementation from this release. Project archiving and maintenance states remain supported without deleting historic pages.

## Quality Gates

Provide scripts for development, formatting, linting, type checking, unit tests, registry validation, browser tests, build, preview, and a combined `npm run check`. The deterministic quality gate runs formatting, linting, types, tests, registry validation, and production build. Chromium Playwright and axe smoke tests run separately or in CI with a controlled preview server.

CI checks the quality gate and browser smoke suite. Final verification includes production build, security-header inspection, metadata and structured-data inspection, responsive screenshots, keyboard testing, and Lighthouse performance/accessibility audits. Significant trade-offs are documented rather than hidden.

## Deployment and DNS

Create or link a Vercel project for this repository, configure the framework/build settings, deploy a preview, verify it, and promote a production deployment. Attach `opensource.nipesolutions.com` in Vercel and use the exact DNS target Vercel returns when editing GoDaddy DNS. Do not modify existing project subdomains.

Verify HTTPS issuance, redirects, canonical metadata, sitemap, robots behavior, legal routes, and security headers on the production domain. Document the repeatable deployment procedure in the README.

## Completion Report

The handoff reports architecture, information architecture, visual system, project representation and sources, accessibility, performance, SEO, privacy/analytics, legal pages and review items, CI/tests, deployment, known limitations, future improvements, and exact local commands.

