# Launch-polish final audit

> Historical audit note: this document records the 2026-09-04 three-project
> launch-polish baseline. React Swipe Actions became a public Alpha on
> 2026-09-05; its current evidence and publication decision are recorded in
> [launch-polish-sources.md](./launch-polish-sources.md) and
> [project-sources.md](./project-sources.md). Statements below about its hidden
> state describe the earlier snapshot and are no longer the current registry
> state.

Audited on **2026-09-04 at 23:04 CEST** in Europe/Vienna against the
launch-polish worktree and the production origin
`https://opensource.nipesolutions.com`.

## Verdict

**NOT READY.** The application, deterministic checks, production origin, and
project documentation domains are healthy, but the prominent
`https://nipesolutions.com` destination is not safe to launch as linked: its
server presents a `*.netlify.app` certificate that does not cover
`nipesolutions.com`. Fix that certificate/host mapping or remove the public link,
then repeat the live audit. npm's web frontend also rejects this automated live
checker with HTTP 403, so the three package pages remain a documented manual
browser gate rather than a deterministic failure.

This verdict does not claim legal compliance. Owner/legal review and the manual
repository settings in the launch checklist remain open.

## Fresh automated gate

The exact clean sequence `npm ci && npm run check && npm run test:e2e && npm
run check:links` passed after the final code and audit edits:

- `npm ci`: 456 packages installed, 0 vulnerabilities reported. npm emitted
  informational deprecation/install-script-policy warnings; no install failed.
- `npm run check`: formatting, zero-warning lint, typecheck, 10 Vitest files / 106
  tests, four-entry registry validation, 46-destination deterministic link
  audit, and the 14-page production build passed.
- `npm run test:e2e`: 66 Chromium tests passed.
- The explicit final `npm run check:links`: 46 deterministic destinations
  passed again.

## Changes made by this pass

- Added browser coverage for canonical category and lifecycle labels, explicit
  public selection, hidden-project absence, configured evidence/support
  destinations, keyboard activation, visible focus, skip-link focus transfer,
  reduced motion, legal routes, and light/dark accent contrast.
- Added component regressions that render a public project with
  `{ package, published: false }` and require both the homepage project entry and
  detail page to suppress npm/install actions while preserving other project
  destinations. The live registry intentionally has no such public entry.
- Added responsive coverage for the homepage and all three public project pages
  at 375, 430, 768, 1024, 1366, 1440, and 1920 CSS pixels. The checks bound page,
  hero, project, detail-section, and footer height; require no page overflow;
  and keep source/code controls operable.
- Fixed a hidden-project metadata leak. A rejected dynamic project route
  returned HTTP 404 but inherited the homepage canonical; missing project
  metadata now explicitly clears inherited canonical and robots values.
- Fixed a footer overflow found in the supplemental 812×375 landscape review by
  stacking the footer's two primary columns below 60rem. No visual redesign,
  new decoration, animation, or dependency was introduced.

Both production fixes followed a red/green cycle: the hidden-route browser and
unit assertions failed before the metadata change, and the 812×375 responsive
test failed with 116px of overflow before the footer breakpoint change. The
false-publication component tests were mutation-checked: weakening each
`npm.published` guard made its focused test fail before the guarded
implementation was restored.

## Accessibility and interaction evidence

- Axe reported no serious or critical violations on the homepage, all three
  project pages, Impressum, Privacy, Contributing, and Security.
- Keyboard tests cover the ordered primary navigation, skip link, mobile Enter
  activation, a contextual project evidence source, a configured support link,
  and both horizontal code regions on every project page at 375px.
- Focused source links retain a 3px visible outline and remain unobscured after
  scrolling into view. Source and support destinations activate with Enter.
- Reduced-motion emulation changes document scrolling to `auto` and reduces the
  transition token to `0.01ms`.
- Project accent text is at least 4.59:1 in light mode and 6.79:1 in dark mode.
  Project visual boundaries are at least 5.02:1 in light mode and 6.18:1 in dark
  mode. NIPE red text/surface pairs measure 6.50:1 light and 6.53:1 dark; focus
  indicators measure 5.72:1 light and 7.23:1 dark.

## Responsive and visual evidence

Twenty-eight full-page captures were reviewed: homepage and React Spring Bottom
Sheet detail, each in light and dark themes at all seven target widths. A
separate dark 812×375 landscape capture was reviewed after the footer fix.

| Width | Homepage height | Tallest detail page | Result                                                                   |
| ----: | --------------: | ------------------: | ------------------------------------------------------------------------ |
|   375 |          5853px |              3596px | No page overflow; single-column editorial flow and footer remain usable. |
|   430 |          5898px |              3561px | No page overflow; project links and code regions remain contained.       |
|   768 |          5810px |              3157px | No page overflow; breakpoint transition remains coherent.                |
|  1024 |          4211px |              3075px | No page overflow; two-column project entries remain balanced.            |
|  1366 |          4464px |              3212px | No page overflow; readable measure and restrained whitespace preserved.  |
|  1440 |          4554px |              3243px | No page overflow; current editorial baseline preserved.                  |
|  1920 |          4735px |              3397px | No page overflow; content remains deliberately width-constrained.        |

The reviewed pages retain the established asymmetric editorial layout, local
project accents, CSS-drawn diagrams, restrained rules, system typography, and
quiet source links. No clipping, overlap, illegible theme transition, excessive
motion, SaaS-card treatment, extra decoration, or unjustified height increase
was found. At 812×375 after the fix, both homepage and representative detail
reported `scrollWidth === innerWidth` and a 332px footer.

## Registry, content, legal, and privacy reconciliation

- Public categories are exactly `UI & Interaction`, `Runtime`, and `Tooling`;
  rendered statuses are `Stable`, `Stable`, and `Beta` for the three public
  projects.
- React Swipe Actions remains hidden, has no public route, sitemap entry,
  canonical, support destination, npm destination, footer entry, or structured
  public surface. Its source audit does not establish a package identity.
- Published npm/install actions remain gated by the explicit Boolean
  publication flag. The configured package versions were rechecked with
  `npm view` as
  `5.0.1`, `2.0.1`, and `2.0.0-beta.1`.
- Homepage/project copy remains reconciled with
  [`launch-polish-sources.md`](./launch-polish-sources.md) and
  [`project-sources.md`](./project-sources.md). The repeated phrase scan found no
  placeholder text, fake social proof, vanity metrics, or generic marketing
  claims. Matches for `transform` were CSS properties; `analytics` occurs only
  in the accurate privacy disclosure that this site does not run analytics.
- A fresh local browser context loaded only same-origin resources, created no
  cookies, local/session storage, or IndexedDB databases, and honored reduced
  motion. The four reported font faces are device system faces; no external font
  origin was requested.
- Impressum and Privacy continue to identify `NIPE Solutions e.U.` and the
  documented controller/hosting facts. Final owner/legal review remains a
  manual gate.

## Link and deployment evidence

- The deterministic static audit validates all configured URL shapes and public
  routes without network access.
- `https://opensource.nipesolutions.com/` returned HTTP 200 over a valid
  hostname-matching Let's Encrypt certificate and included CSP, HSTS,
  `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, and
  `X-Frame-Options` headers.
- `https://react-spring-bottom-sheet.nipesolutions.com/` and
  `https://readonly-view.nipesolutions.com/` returned HTTP 200 with valid
  hostname-matching certificates.
- `https://nipesolutions.com/` failed certificate verification. The endpoint
  presented a certificate whose subject/SANs cover `*.netlify.app` and
  `netlify.app`, not `nipesolutions.com`.
- The three `www.npmjs.com/package/...` endpoints returned HTTP 403 to the live
  script's HEAD and ranged-GET strategy. Because `npm view` confirms the
  configured versions but does not exercise the browser pages, a human must open
  all three package links and confirm their visible package state before launch.

## Remaining launch actions

1. Correct the `nipesolutions.com` TLS/host configuration or remove the link;
   rerun `npm run check:links:live` afterward.
2. Open and verify all three npm package pages in a normal browser.
3. Complete the GitHub About description, website, topics, optional private
   vulnerability reporting, and Discussions decisions in
   [`LAUNCH_CHECKLIST.md`](../LAUNCH_CHECKLIST.md).
4. Record final owner/legal review and repeat production checks after deploying
   the reviewed commit.
