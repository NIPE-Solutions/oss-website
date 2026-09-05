# Expanded-ecosystem launch audit

Audited on **2026-09-05** in Europe/Vienna against the seven-project registry
and the production origin `https://opensource.nipesolutions.com`. The final
review corrections apply to application commit `63414a1`; production deployment
of this expanded-ecosystem branch remains a manual gate.

## Verdict

**READY WITH MANUAL ITEMS.** The application, deterministic checks, project
routes, canonical metadata, responsive layouts, and accessibility checks are
healthy. Launch still requires owner/legal review, normal-browser confirmation
of the four published npm pages, GitHub metadata decisions, and deployment-time
production checks. The TLS-broken `nipesolutions.com` destination was removed
from navigation and structured data rather than shipped as a broken link.

This verdict is an engineering assessment, not a claim of legal compliance.

## Automated evidence

- `npm run check`: passed formatting, zero-warning lint, typecheck, 13 Vitest
  files / 133 tests, seven-entry registry validation, 83 deterministic link
  destinations, and the 18-page production build.
- `npm run test:e2e`: 128 Chromium tests passed.
- Axe reported no serious or critical violations on the homepage and all seven
  project pages in both light and dark themes. Impressum, Privacy,
  Contributing, and Security also passed.
- Browser coverage verifies seven keyboard-focusable constellation links, the
  desktop project disclosure including navigation and Escape dismissal, the
  mobile Projects fallback, status text, ordered headings, visible focus, the
  skip link, reduced motion, support
  destinations, sitemap routes, unique project OG text, and production
  canonicals/OG URLs.
- Every project detail route was checked at 375, 430, 768, 1024, 1366, 1440,
  and 1920 CSS pixels. Code regions remain keyboard-focusable and project
  actions, footer content, and page width remain contained.

## Changes found by the audit

The first red browser run exposed three production gaps:

1. the seven-project footer exceeded its intended narrow-screen bound;
2. the mobile constellation made the hero roughly 1,100px tall;
3. project pages supplied canonical links and OG text but no explicit OG URL.

The final implementation keeps the footer in two columns on narrow screens,
tightens only the mobile hero spacing and motif height, and adds an explicit
production `openGraph.url` through the shared metadata helper. No dependency,
continuous animation, tracking service, or third-party asset was added.

## Responsive and visual evidence

Fifty-six full-page captures were reviewed: the homepage plus React Anchored
Layer, React Pull to Refresh, and React Viewport detail pages, in light and dark
themes at all seven target widths.

| Width | Homepage | Tallest new detail |  Hero | Result                                                  |
| ----: | -------: | -----------------: | ----: | ------------------------------------------------------- |
|   375 |   8382px |             4036px | 899px | Two-column project strip; no clipping or overflow.      |
|   430 |   8281px |             3948px | 876px | Compact constellation and contained footer.             |
|   768 |   8008px |             3740px | 843px | Mobile-to-desktop transition remains coherent.          |
|  1024 |   5896px |             3492px | 755px | Constellation and directory retain clear hierarchy.     |
|  1366 |   6092px |             3607px | 782px | Editorial rhythm and project accents remain restrained. |
|  1440 |   6146px |             3629px | 788px | Detail actions and code examples remain contained.      |
|  1920 |   6281px |             3683px | 823px | Content stays deliberately width-constrained.           |

The constellation reads as independent project discovery, not a dependency
graph. The directory remains an editorial sequence rather than a generic card
grid. Motifs stay distinct, status remains textual, and simultaneous accent
intensity remains controlled in both themes. The homepage assessment is
**WELL BALANCED**.

## Registry, privacy, and source state

- Public categories remain exactly `UI & Interaction`, `Runtime`, and
  `Tooling`.
- Status is explicit: Bottom Sheet and Readonly View are Stable; the codemod is
  Beta; Swipe Actions, Anchored Layer, Pull to Refresh, and Viewport are Alpha.
- npm/install UI is controlled by explicit publication state. Anchored Layer,
  Pull to Refresh, and Viewport expose no npm/install action.
- The website remains analytics-free, loads no third-party runtime assets, and
  adds no non-essential storage or cookies. Existing Privacy wording remains
  consistent with the implementation.
- Legal pages consistently identify `NIPE Solutions e.U.`. Owner/legal review
  remains required.

## Live-source findings

The live link audit no longer includes a NIPE company-homepage destination.
Read-only investigation found no verified working canonical replacement: both
the apex and `www` host fail TLS hostname validation, alternate host spellings
do not resolve, and the GitHub organization exposes no website URL. Remaining
external gates are:

- The four published `www.npmjs.com/package/...` pages returned HTTP 403 to the
  automated checker. Registry publication evidence comes from the package
  audit; confirm the web pages in a normal browser before launch.
- Configured project repositories and documentation/support destinations
  otherwise resolved. React Viewport deliberately links to its commit-pinned
  README while the intended documentation hostname is unavailable.

## Remaining launch actions

1. Deploy application commit `63414a1` (or its documentation-only successor)
   and repeat the production smoke checks.
2. Repair and independently verify `nipesolutions.com` before restoring the
   company-homepage link.
3. Open the four published npm package pages in a normal browser.
4. Complete repository About metadata and security/discussion decisions listed
   in `docs/LAUNCH_CHECKLIST.md`.
5. Record owner/legal approval after deploy.
