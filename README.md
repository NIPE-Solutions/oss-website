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

Public technical claims must be traceable to the evidence audit. Legal and
privacy wording must reflect this site's actual processing and receive owner
review before publication.

## Deployment

Vercel deploys this Next.js repository. First validate a preview deployment,
then promote the reviewed commit to production and attach
`opensource.nipesolutions.com` using the exact DNS record Vercel provides.
Do not alter existing NIPE project domains. Verify HTTPS, canonical metadata,
robots, sitemap, legal routes, and security headers after production deploys.

## Contributing and security

Read [CONTRIBUTING.md](CONTRIBUTING.md) before proposing a change. For a
vulnerability, follow [SECURITY.md](SECURITY.md); individual projects have
their own reporting routes.

## License

The website source is licensed under the [MIT License](LICENSE).
