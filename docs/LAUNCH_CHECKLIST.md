# Launch checklist

Record the commit, date, operator, commands, URLs, and results next to this
checklist. A checked automated item is evidence, not a substitute for the
manual and owner gates below. The release verdict is `NOT READY`, `READY WITH
MANUAL ITEMS`, or `READY`.

## Current verdict

**NOT READY** as of `2026-09-04T21:27:00Z`. Reviewed commit `b017acc` is live,
but `nipesolutions.com` and `www.nipesolutions.com` fail TLS hostname
validation. npm browser verification, GitHub repository settings, and final
owner/legal review also remain open. See the
[deployment record](./audits/deployment.md) and
[launch-polish final audit](./audits/launch-polish-final.md).

## Automated gates

- [x] Run `npm run check`: formatting, lint, typecheck, unit tests, registry
      validation, and the production build must pass.
- [x] Run `npm run test:e2e` for critical browser, accessibility, and
      responsive checks.
- [x] Run `npm run check:links` for the static link audit.
- [x] Verify sitemap, robots, and canonical behavior in the automated test
      suite and in the reviewed preview evidence.

Evidence: [GitHub Actions run 33920948789](https://github.com/NIPE-Solutions/oss-website/actions/runs/33920948789)
passed `npm run check` with 107 tests and a production build, plus 66 browser
E2E tests. The protected preview was inspected before production for indexing,
canonical, header, route, and 404 behavior.

## Manual gates

- [ ] Verify the production domain, DNS, TLS, HTTP-to-HTTPS behavior, response
      status, security headers, sitemap, robots, canonicals, and existing project
      domains after deployment. Record the outstanding nipesolutions.com TLS issue
      and its owner or resolution before declaring cross-domain health green.
- [ ] Complete npm browser verification for every published package: open its
      npm destination in a browser and confirm the install link and package state
      match the registry.
- [x] Inspect the visual social preview and representative light/dark layouts
      at required breakpoints.
- [ ] In GitHub repository **About**, set the description exactly to:
      `The website for NIPE Open Source — focused primitives and developer tools for the web.`
- [ ] Set the GitHub repository website exactly to `https://opensource.nipesolutions.com`.
- [ ] Set the GitHub repository topics exactly to `open-source`, `developer-tools`, `typescript`, `react`, `nipe-solutions`.
- [ ] Decide whether private vulnerability reporting is appropriate; enable and
      test it only if the owner chooses it.
- [ ] Configure GitHub Discussions only if the project will use them; otherwise
      do not imply a Discussions support route.
- [ ] For **React Anchored Layer**, publish and browser-check the npm package
      before setting `npm.published` to `true`; complete its GitHub About
      description, website, and topics.
- [ ] For **React Pull to Refresh**, publish and browser-check the npm package
      before setting `npm.published` to `true`; complete its GitHub About
      description, website, and topics.
- [ ] For **React Viewport**, publish and browser-check the npm package before
      setting `npm.published` to `true`; complete its GitHub About description,
      website, and topics.
- [ ] Verify `react-viewport.nipesolutions.com` DNS, TLS, production content,
      canonical metadata, and ownership before using it as the documentation
      destination. Keep the commit-pinned README fallback until that check
      passes, then update both `documentation` and `support.documentation` in
      the registry.

GitHub metadata, vulnerability reporting, and Discussions are manual settings:
this repository does not update them automatically.

Deployment-specific evidence is recorded in the
[deployment record](./audits/deployment.md). The production site,
custom-domain CNAME, HTTP-to-HTTPS redirect, route status, index/follow state,
canonicals, response headers, sitemap, robots, 404, project documentation
domains, and GitHub repositories passed. The combined cross-domain item remains
unchecked only because both NIPE Solutions hostnames fail certificate
validation. The visual gate is supported by the 28 responsive light/dark
captures, landscape inspection, contrast checks, and accessibility results in
the [launch-polish final audit](./audits/launch-polish-final.md).

## Owner and legal gates

- [ ] Confirm legal entity facts, privacy accuracy, and hosting/provider
      wording against the current approved source.
- [ ] Confirm project-specific security and support processes have clear,
      current destinations.
- [ ] Obtain final owner/legal review after any material operator, hosting, or
      processing change. Do not claim legal compliance from this checklist.
