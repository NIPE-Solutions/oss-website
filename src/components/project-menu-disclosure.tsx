'use client'

import { usePathname } from 'next/navigation'
import { type ReactNode, useEffect, useRef } from 'react'

interface ProjectMenuDisclosureProps {
  readonly children: ReactNode
}

export function ProjectMenuDisclosure({
  children,
}: ProjectMenuDisclosureProps) {
  const pathname = usePathname()
  const disclosureRef = useRef<HTMLDetailsElement>(null)
  const previousPathnameRef = useRef(pathname)

  useEffect(() => {
    if (previousPathnameRef.current !== pathname) {
      disclosureRef.current?.removeAttribute('open')
      previousPathnameRef.current = pathname
    }
  }, [pathname])

  return (
    <details
      className="project-menu"
      ref={disclosureRef}
      onKeyDown={(event) => {
        if (event.key !== 'Escape' || !event.currentTarget.open) {
          return
        }

        event.preventDefault()
        event.currentTarget.open = false
        event.currentTarget.querySelector('summary')?.focus()
      }}
    >
      {children}
    </details>
  )
}
