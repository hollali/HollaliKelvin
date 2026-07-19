'use client'

import dynamic from 'next/dynamic'

const TerminalClient = dynamic(() => import('./TerminalClient'), { ssr: false })

export default function TerminalWrapper() {
  return <TerminalClient />
}
