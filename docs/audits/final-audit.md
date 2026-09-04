# Final product, privacy, and performance audit

Audited on **2026-09-04** in Europe/Vienna against the production-preview
configuration for `https://opensource.nipesolutions.com`. The final review fix
wave started from commit `b11ca02`; its implementation and this corrected report
are committed together.

## Outcome

The site is ready for the ordered deployment wave after local verification. The
original audit fixes remain in place, and final review fixes now cover keyboard
access to install-command overflow, complete footer routing, evidence-backed
project purpose copy with explicit claim kinds, and dark-mode contrast on NIPE
red surfaces. The owner approved the React Spring Bottom Sheet legal source and
page design for publication, so the legal pages no longer display a draft
warning. Professional legal review remains recommended; this audit does not
claim legal compliance.

## Verification evidence

- `npm run check` passes: formatting, lint, type checking, 9 Vitest files / 71
  tests, 3-project registry validation, and the 14-page static production build.
- `npm run test:e2e` passes all 37 Chromium tests, including the three narrow
  axe/focus regressions and computed dark-mode contrast regression.
- `npm audit --omit=dev --audit-level=moderate` reports 0 vulnerabilities.
- Lighthouse 13.4.1 ran against a build created with
  `VERCEL_ENV=production NODE_ENV=production` and served by `next start`.
- Twelve full-page homepage screenshots were captured and visually inspected at
  widths 375, 430, 768, 1366, 1440, and 1920 CSS pixels in both light and dark
  color schemes. Each capture reported `scrollWidth === innerWidth`; no clipping,
  collisions, accidental overflow, missing content, or illegible color-scheme
  transition was found.
- Blocking review exposed that the original responsive suite covered only the
  homepage and therefore missed long code content enlarging all three project
  detail pages. Six browser regressions now cover every project route at 375 and
  430 CSS pixels and require `scrollWidth <= innerWidth`. Final review then found
  that install-command scroll regions were not keyboard focusable; three narrow
  viewport axe/focus regressions now cover that separate accessibility behavior.
- Browser inspection also covered the homepage, Readonly View detail page,
  privacy page, and a 404 at 430 and 1366 CSS pixels. The 404 exposes one
  `noindex` directive, no canonical, and a route-specific title.

### Lighthouse baseline

These Lighthouse 13.4.1 measurements were captured during the preceding audit
before the final-review HTML/CSS fixes. They remain useful baseline evidence but
were not rerun in this fix wave and are not presented as fresh final-build
scores.

| Route                     | Performance | Accessibility | Best Practices | SEO |   FCP |   LCP |   TBT | CLS | Transfer |
| ------------------------- | ----------: | ------------: | -------------: | --: | ----: | ----: | ----: | --: | -------: |
| `/`                       |          99 |           100 |            100 | 100 | 0.8 s | 2.0 s | 10 ms |   0 |  153 KiB |
| `/projects/readonly-view` |          99 |           100 |            100 | 100 | 0.8 s | 2.0 s | 10 ms |   0 |  147 KiB |

The remaining performance point is the simulated-mobile 2.0 second LCP. The
reports also estimate roughly 55 KiB of unused JavaScript from the selected
Next.js runtime. This is accepted as a measured framework trade-off: total
transfer remains below 155 KiB, main-thread work is 0.2 seconds, TBT is 10 ms,
and the application architecture deliberately standardizes on Next.js. Revisit
the framework/runtime cost only if field measurements after deployment show a
material user impact.

## Finding disposition

| ID   | Area                     | Finding                                                                                                                              | Disposition                                                                                                                                                                                                                               | Evidence                                                                                                                       |
| ---- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| F-01 | Privacy                  | The notice said fonts were served locally, but CSS uses device system stacks and serves no font files.                               | Fixed. The notice distinguishes local styles/assets from device-installed system fonts.                                                                                                                                                   | Policy regression; prior browser inspection found no loaded font faces or font requests.                                       |
| F-02 | SEO                      | The custom 404 inherited the homepage canonical and environment-level robots metadata.                                               | Fixed. `not-found.tsx` clears inherited canonical and robots values; Next supplies one 404 `noindex` tag.                                                                                                                                 | Unit metadata assertion and browser regression for HTTP 404, zero canonicals, and exactly one `noindex`.                       |
| F-03 | Product / Best Practices | `/favicon.ico` returned 404, producing a console error and a Lighthouse Best Practices deduction.                                    | Fixed. A local App Router icon matching the site identity was added.                                                                                                                                                                      | Browser regression requires one local icon link and HTTP 200; baseline Lighthouse Best Practices returned to 100.              |
| F-04 | Legal                    | The public legal pages still displayed an unapproved-draft warning.                                                                  | Resolved by owner ruling. The owner approved the Bottom Sheet legal source and page design and ordered deployment; the visible draft warning was removed. Professional legal review remains recommended, and no compliance claim is made. | Unit regressions require publication-ready pages without draft/compliance wording; maintenance guidance retains review advice. |
| F-05 | Responsive layout        | Every project detail route overflowed horizontally at 375 and 430 CSS pixels because long code content enlarged the body grid track. | Fixed. The main grid item can shrink while wide code stays locally scrollable.                                                                                                                                                            | Six browser regressions cover all three project routes at 375 and 430 CSS pixels.                                              |
| F-06 | Keyboard accessibility   | Horizontally scrollable install commands had no keyboard focus target.                                                               | Fixed. Install `pre` regions join example code as explicit tab stops.                                                                                                                                                                     | Three 375 CSS pixel browser tests focus both scroll regions and run axe; unit tests assert the install tab stop.               |
| F-07 | Information architecture | The footer exposed only legal links and omitted project/resource/NIPE groups; website vulnerability reporting was not public.        | Fixed. A registry-driven footer groups projects, Contributing/Security, NIPE, and legal routes. `/security` now publishes the website email route specified by `SECURITY.md`.                                                             | Footer and policy component regressions assert every destination and all four groups.                                          |
| F-08 | Project evidence         | Project pages lacked a sourced reason for existence and inferred limitations from claim position.                                    | Fixed. Every registry entry has a separately sourced purpose; claims use an explicit `capability`/`limitation` discriminator and render by kind regardless of order.                                                                      | Registry, validator, and page regressions cover purpose evidence, valid kinds, and reordered claims.                           |
| F-09 | Color contrast           | Dark-mode white text on the lighter NIPE red measured 2.77:1.                                                                        | Fixed. A theme-aware on-red token uses dark ink in dark mode while retaining white on the darker light-mode red.                                                                                                                          | Browser regression computes contrast for selection and ecosystem-hub surfaces and requires at least 4.5:1.                     |

No unresolved technical defect is accepted by this audit.

## Evidence-backed claims

The complete registry was reconciled with
[`project-sources.md`](./project-sources.md): all 18 purpose/claim/example
`verifiedFrom` references occur in the Task 1 inventory, and the registry
validator passes.

| Project                     | Audit result                                                                                                                                                                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| React Spring Bottom Sheet   | Stable status, React 19 scope, compound API, named snap points, modal behavior, motion/browser wording, separately exported styles, lineage limitation, example, package, and destinations all match the v5.0.1 evidence.                   |
| Readonly View               | Stable status, live/lazy/deeply-readonly wording, owner-controlled mutable source, identity behavior, supported-type caveats, explicit non-immutability/security limitations, example, package, and destinations all match v2.0.1 evidence. |
| Angular Flex-Layout Codemod | Prerelease/beta status, Angular compiler/source-range edits, provable static conversions, dry-run/report/exit behavior, unresolved-case limitations, example, package, and destinations all match v2.0.0-beta.1 evidence.                   |
| React Swipe Actions         | Correctly omitted: Task 1 found no usable implementation, release, NIPE-scoped package, documentation, or claims.                                                                                                                           |

The site publishes no stars, download counts, customer/adoption claims,
testimonials, inferred compatibility, or live vanity data. Project purposes,
claims, and examples are rendered from the single typed registry; no
visitor-time GitHub or npm fetch exists.

## Five-perspective review

### Senior frontend engineer

The application remains a small, statically rendered Next.js site with strict
TypeScript, server-first components, one content registry, local CSS, no UI or
animation dependency, deterministic metadata helpers, security headers, and
separate unit/browser gates. Heading order, landmarks, focus behavior, reduced
motion, responsive overflow, structured data, and production indexing are
covered. The measured client-runtime cost is documented above rather than
hidden.

### OSS maintainer

Each project routes to its canonical documentation, repository, npm package,
contribution guide, and evidence. Security routing does not overstate private
reporting availability: Bottom Sheet links to its security overview, Readonly
View links to its policy while describing the current mismatch, and the codemod
uses its verified private-report route. The website itself exposes the email
route documented in `SECURITY.md`. Registry-first maintenance and project
archiving/status behavior remain documented.

### First-time developer

The homepage answers who maintains the directory, groups the three published
projects by problem, shows status at the point of discovery, and provides direct
documentation/source/package routes. Detail pages add a separately sourced
reason for existence, verified capabilities, explicit limitations,
source-linked examples, install commands, and recovery navigation without
duplicating full project documentation.

### Skeptical technical buyer

The umbrella “Production-grade primitives and tools for the web” positioning is
the approved site identity, not a blanket maturity claim. The codemod is visibly
marked Prerelease/beta and explicitly disclaims production-ready coverage.
Readonly View does not describe its source as immutable, and the codemod does
not imply complete automatic migration. Every substantive capability and
limitation has a linked source.

### Privacy-conscious EU visitor

The site works without analytics, advertising, session replay, embedded media,
external fonts, consent-requiring storage, or intentionally set cookies. The
privacy page identifies the controller, Vercel delivery/security logging,
possible international processing, outbound-link timing, email handling,
retention boundaries, GDPR rights, and the Austrian Data Protection Authority.
The absence of a cookie banner matches the measured implementation.

## Accessibility and responsive review

- Axe checks cover the homepage, all project routes, contributing, security,
  imprint, privacy, and all project routes again at a 375 CSS pixel viewport.
- Keyboard tests cover the skip link, primary navigation, mobile activation,
  and both horizontal code regions on every narrow project route.
- The homepage has no horizontal overflow at all six target widths, and every
  project detail route has no page-level overflow at 375 and 430 CSS pixels.
  Primary controls meet the 44 CSS pixel minimum tested by the suite.
- Light and dark palettes remain legible, project accents stay subordinate to
  content, and concept visuals convey no hover-only facts. A computed-color
  regression requires at least 4.5:1 for text on red selection and hub surfaces
  in dark mode.
- `prefers-reduced-motion` removes smooth scrolling and reduces transition
  duration.
- The 404 and legal pages remain complete without client-side interaction.

## SEO, metadata, and security

- Every indexable route has a factual title, description, production canonical,
  and sitemap entry. Project metadata and social images are registry-derived.
- Production robots rules allow crawling and advertise the production sitemap;
  preview and local builds default to `noindex`/disallow.
- Missing routes return HTTP 404, a route-specific title, one `noindex`, and no
  canonical.
- Global `WebSite` and `Organization` JSON-LD and project-only
  `SoftwareSourceCode` JSON-LD contain factual fields only.
- CSP limits content to the same origin (plus data images), prohibits objects and
  framing, and is accompanied by nosniff, referrer, permissions, frame, and
  production HSTS headers. `script-src 'unsafe-inline'` is retained because
  Next's statically rendered App Router output includes framework bootstrap and
  local JSON-LD scripts; `style-src 'unsafe-inline'` permits registry-derived
  inline accent custom properties. This weakens CSP injection protection, so
  the site accepts no visitor-authored content and loads no third-party scripts.
  Revisit hashes/nonces if Next static output provides a stable deployment-safe
  mechanism.
- The local favicon, CSS, scripts, and generated social images are same-origin.

## Privacy, storage, cookies, assets, and third parties

A fresh browser context loaded the homepage using only same-origin document,
stylesheet, and Next.js script requests. It contained no cookies, localStorage,
sessionStorage, IndexedDB databases, registered font faces, third-party embeds,
forms, or background network calls.

| Surface                                                         | Role and timing                                                                      | Storage / data note                                                                                                                            |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Vercel Inc. and subprocessors                                   | Hosting/CDN and security delivery on every request.                                  | URL, time, IP address, browser information, and response status may enter delivery/security logs; disclosed with privacy policy and DPA links. |
| GitHub                                                          | Repository, documentation evidence, issues, contribution, and security destinations. | Receives request data only after the visitor follows a link; never embedded or fetched per visitor.                                            |
| npm                                                             | Package destinations.                                                                | Receives request data only after a visitor follows a link; no registry/package API runs in the browser.                                        |
| NIPE Solutions and project documentation domains                | Organization and canonical technical destinations.                                   | Navigated only after link activation; no embedded assets.                                                                                      |
| Austrian Legal Information System and Data Protection Authority | Legal-reference and complaint destinations.                                          | Navigated only after link activation.                                                                                                          |
| Email service provider                                          | May process a message if a visitor emails the published controller address.          | No contact form or email transmission occurs on this site.                                                                                     |
| Schema.org                                                      | Vocabulary identifier inside local JSON-LD.                                          | It is a string in structured data, not a browser request to Schema.org.                                                                        |

Assets are limited to same-origin compiled CSS/JavaScript, the local SVG icon,
CSS-drawn project concepts, and generated Open Graph images. Text uses the
visitor device’s system sans-serif and monospace stacks; no font asset is
served or requested.

## Legal data and review boundary

The live React Spring Bottom Sheet imprint and privacy pages were re-read on
2026-09-04. The new site matches the current source values: NIPE Solutions e.U.;
proprietor Nicholas Petrasek; Achtergasse 10, 1230 Wien, Austria/Österreich;
`office@nipesolutions.com`; `+43 676 9654266`; VAT ID `ATU78464412`; register
number `FN 585066t`; Handelsgericht Wien; registered office Wien; the recorded
IT trade, district authority, and Wirtschaftskammer Wien.

The owner has approved the React Spring Bottom Sheet legal source and the new
page design as the publication basis and ordered deployment. That decision
resolves the visible draft blocker; it is not a legal-compliance claim.
Professional legal review remains recommended, especially after changes to the
operator, processor, international transfers, retention, or email handling.

## AI-slop and copy audit

The repeated scan found no placeholders, generic social proof, fake metrics,
transferable SaaS slogans, decorative three-adjective claims, gradient/glass
motifs, stock/generated imagery, floating terminals, or unjustified uses of
“enterprise-grade,” “blazing fast,” “powerful,” “seamless,” “robust,” or
similar marketing terms. The only “production-ready” occurrence negates such a
claim for the beta codemod. Em dashes occur only in concise Open Graph alt text.

## Existing-domain isolation

`next.config.ts` contains no redirects, rewrites, proxying, or hostname rules;
`vercel.json` declares only the Next.js framework. The audit changes touch no
DNS or external project configuration. Both existing documentation origins,
`react-spring-bottom-sheet.nipesolutions.com` and
`readonly-view.nipesolutions.com`, returned HTTP 200 without redirect during
the audit. Task 12 must repeat this check before and after the narrowly scoped
`opensource` DNS change.

## Remaining actions

1. In Task 12, verify the preview deployment, production headers and indexing,
   exact Vercel DNS target, TLS, redirects, sitemap, 404 behavior, outbound
   links, and non-interference with existing project domains.
2. Record professional legal review when obtained and repeat owner review after
   material operator, processor, transfer, retention, or contact changes.
3. Revisit the pinned ESLint 9 toolchain when the plugins bundled by
   `eslint-config-next` support ESLint 10; the current compatible version is
   retained because ESLint 10 currently crashes those rules. Weekly Dependabot
   checks remain configured.
