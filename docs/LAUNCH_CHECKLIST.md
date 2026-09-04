# Launch checklist

Record the commit, date, operator, commands, URLs, and results next to this
checklist. A checked automated item is evidence, not a substitute for the
manual and owner gates below. The release verdict is `NOT READY`, `READY WITH
MANUAL ITEMS`, or `READY`.

## Automated gates

- [ ] Run `npm run check`: formatting, lint, typecheck, unit tests, registry
      validation, and the production build must pass.
- [ ] Run `npm run test:e2e` for critical browser, accessibility, and
      responsive checks.
- [ ] Run `npm run check:links` for the static link audit.
- [ ] Verify sitemap, robots, and canonical behavior in the automated test
      suite and in the reviewed preview evidence.

## Manual gates

- [ ] Verify the production domain, DNS, TLS, HTTP-to-HTTPS behavior, response
      status, security headers, sitemap, robots, canonicals, and existing project
      domains after deployment. Record the outstanding nipesolutions.com TLS issue
      and its owner or resolution before declaring cross-domain health green.
- [ ] Complete npm browser verification for every published package: open its
      npm destination in a browser and confirm the install link and package state
      match the registry.
- [ ] Inspect the visual social preview and representative light/dark layouts
      at required breakpoints.
- [ ] In GitHub repository **About**, set the description exactly to:
      `The website for NIPE Open Source — focused primitives and developer tools for the web.`
- [ ] Set the GitHub repository website exactly to `https://opensource.nipesolutions.com`.
- [ ] Set the GitHub repository topics exactly to `open-source`, `developer-tools`, `typescript`, `react`, `nipe-solutions`.
- [ ] Decide whether private vulnerability reporting is appropriate; enable and
      test it only if the owner chooses it.
- [ ] Configure GitHub Discussions only if the project will use them; otherwise
      do not imply a Discussions support route.

GitHub metadata, vulnerability reporting, and Discussions are manual settings:
this repository does not update them automatically.

## Owner and legal gates

- [ ] Confirm legal entity facts, privacy accuracy, and hosting/provider
      wording against the current approved source.
- [ ] Confirm project-specific security and support processes have clear,
      current destinations.
- [ ] Obtain final owner/legal review after any material operator, hosting, or
      processing change. Do not claim legal compliance from this checklist.
