'use client'

import { useEffect } from 'react'

export function useKeyboardShortcuts(opts: {
  onSlash?: () => void
  onJ?: () => void
  onK?: () => void
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return

      if (e.key === '/' && opts.onSlash) {
        e.preventDefault()
        opts.onSlash()
      }
      if (e.key === 'j' && opts.onJ) opts.onJ()
      if (e.key === 'k' && opts.onK) opts.onK()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [opts])
}
