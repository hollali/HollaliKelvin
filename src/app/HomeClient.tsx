import Hero from './components/Hero'
import Projects from './components/Projects'
import Blogs from './components/Blogs'
import Newsletter from './components/Newsletter'
import type { Project, Blog } from '@/types'

interface HomeClientProps {
  projects: Project[]
  blogs: Blog[]
}

export default function HomeClient({ projects, blogs }: HomeClientProps) {
  return (
    <main>
      <Hero />
      <Projects initial={projects} />
      <Blogs initial={blogs} />
      <Newsletter />
    </main>
  )
}