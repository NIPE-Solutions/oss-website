import type { ReactNode } from 'react'

interface LegalPageProps {
  readonly eyebrow: string
  readonly title: string
  readonly introduction: string
  readonly children: ReactNode
  readonly reviewRequired?: boolean
}

export function LegalPage({
  eyebrow,
  title,
  introduction,
  children,
  reviewRequired = false,
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
        {reviewRequired ? (
          <aside className="review-notice" aria-label="Publication review">
            This draft legal text requires owner or legal review before
            publication. It is not a claim of legal compliance.
          </aside>
        ) : null}
        {children}
      </div>
    </article>
  )
}
