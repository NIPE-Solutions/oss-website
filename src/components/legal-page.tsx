import type { ReactNode } from 'react'

interface LegalPageProps {
  readonly eyebrow: string
  readonly title: string
  readonly introduction: string
  readonly children: ReactNode
}

export function LegalPage({
  eyebrow,
  title,
  introduction,
  children,
}: LegalPageProps) {
  return (
    <article className="legal-page">
      <header className="legal-page__header">
        <div className="site-frame reading-width">
          <p className="legal-page__eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="legal-page__introduction">{introduction}</p>
        </div>
      </header>
      <div className="site-frame reading-width legal-page__content">
        {children}
      </div>
    </article>
  )
}
