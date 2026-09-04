# NIPE Open Source

The public directory for NIPE-maintained open-source software. It is a static
Next.js site; individual project repositories and documentation sites remain
the technical sources of truth.

## Development

Use Node.js 24 and npm 11.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. Run the complete deterministic gate before
opening a pull request:

```bash
npm run check
```

## Quality checks

Build and serve the production output locally:

```bash
npm run build
npm run preview
```

Run browser checks separately. They start the configured local server when
needed:

```bash
npm run test:e2e
```

`npm run check` includes formatting, linting, type checking, unit tests,
project-registry validation, and the production build.

## Content maintenance

The project directory is driven by the single registry in
[`src/content/projects.ts`](src/content/projects.ts). Add or update a project
through the [registry-first workflow](docs/ADDING_A_PROJECT.md); do not copy
project facts into pages or introduce visitor-time GitHub/npm requests.

Public technical claims must be traceable to the evidence audit. The legal and
privacy pages use the owner-approved Bottom Sheet legal source and the actual
processing of this site. That source approval is not a claim of legal
compliance; professional owner/legal review remains recommended after material
operator, hosting, or processing changes.

Before release, use the [launch checklist](docs/LAUNCH_CHECKLIST.md). It keeps
deterministic checks separate from manual deployment and GitHub settings, and
from owner/legal review that cannot be automated.

## Deployment

Vercel deploys this Next.js repository. Use Node.js 24 and npm 11, and start
from the reviewed commit in a clean checkout:

```bash
npm ci
npm run check
npm run test:e2e
npx vercel@latest login
npx vercel@latest link
npx vercel@latest deploy
```

Copy the preview URL printed by the deploy command, wait for it to become
ready, then inspect the preview. Preview robots must disallow indexing while
canonical URLs continue to identify the production origin.

```bash
PREVIEW_URL=https://replace-with-preview-url.vercel.app
npx vercel@latest inspect "$PREVIEW_URL" --wait --timeout 3m
curl -fsSI "$PREVIEW_URL/"
curl -fsS "$PREVIEW_URL/robots.txt"
curl -fsSI "$PREVIEW_URL/impressum"
curl -fsSI "$PREVIEW_URL/privacy"
```

If deployment protection blocks plain `curl`, inspect the same paths in an
authenticated preview session. Verify the homepage, every project route,
legal pages, the security-reporting route, a deliberate 404, canonical and
Open Graph metadata, and response security headers before promotion.

Attach only the new subdomain to the linked Vercel project. The `domains add`
and `domains inspect` output is authoritative for the required record; enter
that exact record in GoDaddy without changing the existing project subdomains.

```bash
DOMAIN=opensource.nipesolutions.com
VERCEL_PROJECT=oss-website
npx vercel@latest domains add "$DOMAIN" "$VERCEL_PROJECT"
npx vercel@latest domains inspect "$DOMAIN"
```

After the GoDaddy record resolves, verify the domain and promote the already
reviewed preview rather than creating a different production build:

```bash
npx vercel@latest domains verify "$DOMAIN"
npx vercel@latest promote "$PREVIEW_URL" --yes
SITE_ORIGIN=https://opensource.nipesolutions.com
curl -fsSI "$SITE_ORIGIN/"
curl -fsS "$SITE_ORIGIN/robots.txt"
curl -fsS "$SITE_ORIGIN/sitemap.xml"
curl -fsSI "$SITE_ORIGIN/security"
curl -sS -o /dev/null -w '%{http_code}\n' "$SITE_ORIGIN/does-not-exist"
curl -fsSI https://react-spring-bottom-sheet.nipesolutions.com/
curl -fsSI https://readonly-view.nipesolutions.com/
```

Confirm HTTPS, the production canonical, indexable robots directives, sitemap
entries, legal and security routes, the expected 404 status, CSP and other
security headers, and uninterrupted responses from both existing project
domains. Record the deployment URL, DNS value, verification time, and commit in
the release handoff.

## Contributing and security

Read [CONTRIBUTING.md](CONTRIBUTING.md) before proposing a change. For a
vulnerability, follow [SECURITY.md](SECURITY.md); individual projects have
their own reporting routes.

## License

The website source is licensed under the [MIT License](LICENSE).
