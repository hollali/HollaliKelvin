'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Analytics() {
  const pathname = usePathname()

  useEffect(() => {
    const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN
    if (plausibleDomain) {
      fetch(`https://plausible.io/api/event`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: plausibleDomain,
          name: 'pageview',
          url: `${window.location.origin}${pathname}`,
        }),
      }).catch(() => {})
    }
  }, [pathname])

  return null
}
