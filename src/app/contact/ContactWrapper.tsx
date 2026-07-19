'use client'

import dynamic from 'next/dynamic'

const ContactClient = dynamic(() => import('./ContactClient'), { ssr: false })

export default function ContactWrapper() {
  return <ContactClient />
}
