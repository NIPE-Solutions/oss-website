import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The requested NIPE Open Source page does not exist.',
  alternates: null,
  robots: null,
}

export default function NotFound() {
  return (
    <article className="not-found site-frame reading-width">
      <p className="legal-page__eyebrow">404 / Missing route</p>
      <h1>Page not found</h1>
      <p>
        The requested page does not exist. Return to the directory or choose a
        project-support destination.
      </p>
      <nav aria-label="Page recovery">
        <a href="/">Back to project index</a>
        <a href="/#projects">Projects</a>
        <a href="/contributing">Contributing</a>
        <a href="/security">Security</a>
      </nav>
    </article>
  )
}
