import type { ComponentPropsWithoutRef } from 'react'

type ExternalLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'rel'>

export function ExternalLink({ children, ...props }: ExternalLinkProps) {
  return (
    <a {...props} rel="noopener noreferrer">
      {children}
      <span aria-hidden="true"> ↗</span>
    </a>
  )
}
