'use client'

import dynamic from 'next/dynamic'

const ProjectsClient = dynamic(() => import('./ProjectsClient'), { ssr: false })

export default function ProjectsWrapper() {
  return <ProjectsClient />
}
