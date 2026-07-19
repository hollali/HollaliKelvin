'use client'

import dynamic from 'next/dynamic'

const AboutClient = dynamic(() => import('./AboutClient'), { ssr: false })

export default function AboutWrapper() {
  return <AboutClient />
}
