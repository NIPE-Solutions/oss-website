# Production deployment record

**Recorded:** 2026-09-04 (Europe/Vienna).

**Reviewed source commit:** [`b017acc`](https://github.com/NIPE-Solutions/oss-website/commit/b017acc)
(`fix: align launch copy with public lifecycle`) on `main`.

## Launch readiness

**NOT READY.** The reviewed release is deployed and the application, preview
isolation, production routes, project documentation domains, and GitHub
repositories passed their recorded checks. The prominent NIPE Solutions
destination remains a launch blocker: both `nipesolutions.com` and
`www.nipesolutions.com` fail TLS hostname validation (`curl` code 60; verify
result 1). npm package pages also remain a manual browser gate because their
web frontend rejected the automated checker with HTTP 403.

Owner/legal review and the manual GitHub settings in the
[launch checklist](../LAUNCH_CHECKLIST.md) remain open. This record makes no
legal or compliance claim.

## Repository and continuous integration

- The reviewed commit was pushed to `NIPE-Solutions/oss-website` on `main`.
- [GitHub Actions run 33920948789](https://github.com/NIPE-Solutions/oss-website/actions/runs/33920948789)
  succeeded. Its quality job ran `npm run check`, including 107 tests and the
  production build; its browser job passed 66 E2E tests.

## Current Vercel deployments

| Item                      | Recorded value                                            |
| ------------------------- | --------------------------------------------------------- |
| Team / project            | `nipe-solutions` / `oss-website`                          |
| Project ID                | `prj_OvJwAMRsJx6c37q34AjqwGalfSNM`                        |
| Protected preview         | `dpl_F1dCxPNcYgNv3SBJpggHs9jS4VfA`                        |
| Preview URL               | <https://oss-website-1lcxgarel-nipe-solutions.vercel.app> |
| Production deployment     | `dpl_GF9ovWh1XLztDHNgSL4xp28bCSXF`                        |
| Production deployment URL | <https://oss-website-fxzhx1tvx-nipe-solutions.vercel.app> |
| Production custom domain  | <https://opensource.nipesolutions.com>                    |

The protected preview was created at `2026-09-04T21:23:11Z` and verified
before production. Authenticated checks confirmed HTTP 200 for intended routes,
`X-Robots-Tag: noindex`, `noindex, nofollow` page metadata, `Disallow: /` in
robots, production canonical URLs, expected security headers, and the custom
404 response.

The production deployment was created at `2026-09-04T21:25:49Z`. Its aliases
include `https://opensource.nipesolutions.com`. The final live recheck completed
at `2026-09-04T21:27:00Z`. This release followed the required preview-first
sequence.

## Custom domain and DNS

- The production domain is attached to and verified by the Vercel project.
- DNS remained unchanged during this polish pass:

  | Type    | Name         | Target                                |
  | ------- | ------------ | ------------------------------------- |
  | `CNAME` | `opensource` | `c9997db25044abeb.vercel-dns-017.com` |

- No GoDaddy record was changed during this release.

## Production verification

The final live recheck confirmed:

- HTTP redirects to HTTPS.
- The root, all public project pages, Contributing, Security, Impressum,
  Privacy, `robots.txt`, `sitemap.xml`, and OpenGraph image routes return HTTP 200.
- An unknown route returns HTTP 404.
- Production pages permit indexing and use
  `https://opensource.nipesolutions.com` canonicals.
- Expected CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`,
  `Permissions-Policy`, and framing protections are present.
- OpenGraph image responses use `image/png`.
- The React Spring Bottom Sheet and Readonly View documentation domains and all
  configured GitHub repositories return HTTP 200.

The responsive, theme, keyboard, focus, contrast, and accessibility inspection
evidence is recorded in the
[launch-polish final audit](./launch-polish-final.md).

## Open gates and external blocker

- `https://nipesolutions.com` and `https://www.nipesolutions.com` both fail TLS
  hostname validation (`curl` code 60; verify result 1). The cross-domain gate
  must remain open until that external host is corrected or the public link is
  removed and production is rechecked.
- The three npm package pages require verification in a normal browser; earlier
  automation received HTTP 403 from npm's web frontend.
- GitHub About description, website, topics, and the vulnerability-reporting
  and Discussions decisions remain manual owner settings.
- Final owner/legal review remains outstanding.

## Historical deployment context

The original 2026-09-04 deployment used reviewed commit `6ecb5d1`, production
deployment `dpl_C2Vuh2bmJmEPX9TQbdrGg1US2eTc`, and protected preview
`dpl_Gq5NC1H86J7tyX68d75AUmrMHtRd`. That first deployment established the
Vercel project and custom-domain DNS but attached production before its
separate preview was inspected. The current `b017acc` release supersedes that
deployment evidence and completed preview verification before production.

Vercel Git auto-connect remains unavailable because the Vercel GitHub
integration does not have repository permission. Authenticated CLI preview and
production deployments are working. Granting integration access and running
`vercel git connect` is an optional owner-controlled follow-up.
