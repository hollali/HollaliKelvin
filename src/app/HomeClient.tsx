'use client'

import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('./components/Hero'), { ssr: false })
const Projects = dynamic(() => import('./components/Projects'), { ssr: false })
const Blogs = dynamic(() => import('./components/Blogs'), { ssr: false })
const Newsletter = dynamic(() => import('./components/Newsletter'), { ssr: false })

export default function HomeClient() {
  return (
    <main>
      <Hero />
      <Projects />
      <Blogs />
      <Newsletter />
    </main>
  )
}
