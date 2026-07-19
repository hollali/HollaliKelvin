'use client'

import dynamic from 'next/dynamic'

const BlogsClient = dynamic(() => import('./BlogsClient'), { ssr: false })

export default function BlogsWrapper() {
  return <BlogsClient />
}
