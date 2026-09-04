# Production deployment record

**Recorded:** 2026-09-04 (Europe/Vienna).
**Reviewed source commit:** [`6ecb5d1`](https://github.com/NIPE-Solutions/oss-website/commit/6ecb5d1)
(`fix: resolve final publication review findings`) on `main`.

## Repository and continuous integration

- The reviewed commit was pushed to `NIPE-Solutions/oss-website` on `main`.
- The production CI workflow succeeded: [GitHub Actions run 33912004228](https://github.com/NIPE-Solutions/oss-website/actions/runs/33912004228).

## Vercel project and deployments

| Item                      | Recorded value                                            |
| ------------------------- | --------------------------------------------------------- |
| Team / project            | `nipe-solutions` / `oss-website`                          |
| Project ID                | `prj_OvJwAMRsJx6c37q34AjqwGalfSNM`                        |
| Production deployment     | `dpl_C2Vuh2bmJmEPX9TQbdrGg1US2eTc`                        |
| Production deployment URL | <https://oss-website-ny7qhn9zn-nipe-solutions.vercel.app> |
| Production alias          | <https://oss-website-vert.vercel.app>                     |
| Preview deployment        | `dpl_Gq5NC1H86J7tyX68d75AUmrMHtRd`                        |
| Preview URL               | <https://oss-website-ji0g4iu81-nipe-solutions.vercel.app> |

The preview is deployment-protected. An authenticated inspection confirmed its
preview isolation: `noindex, nofollow`, production canonical URLs, and
`Disallow` robots directives. The reviewed commit was also deployed to the
production alias with the Vercel CLI.

## Deployment timeline

| Timestamp                            | Evidence                                                                    |
| ------------------------------------ | --------------------------------------------------------------------------- |
| 2026-09-04T19:38:34Z (21:38:34 CEST) | Production deployment created.                                              |
| 2026-09-04T19:42:41Z                 | DNS and Vercel domain configuration verified; first HTTP response received. |
| 2026-09-04T19:44:09Z                 | HTTPS/TLS issuance and response security headers verified.                  |
| 2026-09-04T19:44:44Z                 | Protected preview deployment created.                                       |
| 2026-09-04T19:49:49Z                 | Final live production recheck completed.                                    |

## Process deviation: production before preview

The release plan called for preview verification before attaching the custom
domain. In this release, the Vercel CLI output reported that it automatically
assigned the project's first deployment to production. Consequently, the
custom domain was attached before the separate protected preview was created.

No unreviewed code was exposed: the production deployment used reviewed commit
[`6ecb5d1`](https://github.com/NIPE-Solutions/oss-website/commit/6ecb5d1)
after local quality-gate and full-branch review. The later protected preview
still verified the required `noindex, nofollow`, production-canonical, and
`Disallow` robots behavior. No pre-domain preview was created or verified, so
this record does not invent a pre-domain preview time.

This is a process deviation and a known deployment-process limitation. Future
releases should explicitly confirm the Vercel CLI deployment mode and complete
protected-preview verification before attaching a custom domain.

## Custom domain and DNS

- Production domain: <https://opensource.nipesolutions.com>
- The domain is attached to and verified by the Vercel project.
- The narrow GoDaddy change was the exact Vercel record:

  | Type    | Name         | Target                                |
  | ------- | ------------ | ------------------------------------- |
  | `CNAME` | `opensource` | `c9997db25044abeb.vercel-dns-017.com` |

- Authoritative DNS was confirmed through `ns67`; no unrelated apex, mail,
  verification, or existing project-subdomain record was changed.

## Post-deployment verification

The following checks passed after the certificate issued:

- `https://opensource.nipesolutions.com` returned `200`; HTTP redirected to
  HTTPS with `308`.
- HSTS and the expected response security headers were present.
- Production canonical metadata identified `https://opensource.nipesolutions.com`.

The final live recheck at `2026-09-04T19:49:49Z` recorded these route results:

| Checked URL or path                                    | Result     |
| ------------------------------------------------------ | ---------- |
| `https://opensource.nipesolutions.com/`                | HTTP `200` |
| `/projects/react-spring-bottom-sheet`                  | HTTP `200` |
| `/projects/readonly-view`                              | HTTP `200` |
| `/projects/flex-layout-codemod`                        | HTTP `200` |
| `/impressum`                                           | HTTP `200` |
| `/privacy`                                             | HTTP `200` |
| `/security`                                            | HTTP `200` |
| `/robots.txt`                                          | HTTP `200` |
| `/sitemap.xml`                                         | HTTP `200` |
| `/does-not-exist`                                      | HTTP `404` |
| `https://react-spring-bottom-sheet.nipesolutions.com/` | HTTP `200` |
| `https://readonly-view.nipesolutions.com/`             | HTTP `200` |

## Known operational limitation

Vercel Git auto-connect was not enabled because the Vercel GitHub integration
does not currently have permission for this repository. This does not block
the authenticated CLI workflow: preview and production deployments succeeded.

When the repository owner has intentionally granted that integration the
needed repository access, reconnect it from the linked project with:

```bash
vercel git connect
```

Do not change GitHub or Vercel integration permissions as part of routine
deployments; that is an owner-controlled follow-up.

## Legal review status

The live legal routes and privacy disclosures were verified as reachable, but
this deployment record makes no legal or compliance claim. Professional
owner/legal review remains recommended, particularly after a material change
to the operator, hosting, or data processing.
