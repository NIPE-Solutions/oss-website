import type { ComponentPropsWithoutRef } from 'react'

type ExternalLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'rel'>

export function ExternalLink(props: ExternalLinkProps) {
  return <a {...props} rel="noopener noreferrer" />
}
