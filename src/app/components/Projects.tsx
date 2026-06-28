'use client'

import { useState, useEffect } from 'react'
import { getProjects } from '@/contents/projects'
import type { Project } from '@/types'
import Image from 'next/image'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { motion } from 'framer-motion'

const techColors: Record<string, string> = {
  'React': '#61dafb',
  'Next.js': '#fff',
  'TypeScript': '#3178c6',
  'JavaScript': '#f7df1e',
  'Tailwind': '#06b6d4',
  'Node.js': '#339933',
  'Express': '#fff',
  'MongoDB': '#47a248',
  'PostgreSQL': '#336791',
  'Docker': '#2496ed',
  'AWS': '#ff9900',
  'Python': '#3776ab',
  'HTML': '#e34f26',
  'CSS': '#1572b6',
  'Git': '#f05032',
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-xs text-[#666] mb-4">
            <span style={{ color: 'var(--terminal-accent)' }}>~</span> $ ls -la projects/
          </div>
          <div className="terminal-card">
            <div className="text-xs text-[#666] font-mono">
              <span style={{ color: 'var(--terminal-accent)' }}>$</span> fetching projects
              <span className="terminal-loading" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (projects.length === 0) return null

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-xs text-[#666] mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span style={{ color: 'var(--terminal-accent)' }}>~</span> $ ls -la projects/
          <span className="ml-2">| head -{projects.length}</span>
          <hr className="terminal-separator my-2" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              className="terminal-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -4, boxShadow: "0 8px 30px rgba(0,0,0,0.3)" }}
            >
              <div className="relative aspect-video mb-3 overflow-hidden border border-[#2a2a2a]">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="text-xs text-[#666] mb-1">
                drwxr-xr-x  hollali  hollali  <span className="text-[#e0e0e0]">{project.title.toLowerCase().replace(/\s+/g, '-')}</span>
              </div>
              <h3 className="text-sm font-mono text-[#e0e0e0] mb-1">
                {project.title}
              </h3>
              <p className="text-xs text-[#666] mb-3 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="terminal-tag text-[10px]"
                    style={{
                      borderColor: techColors[tech] || '#666',
                      color: techColors[tech] || '#666',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3 text-xs">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-link text-[10px] flex items-center gap-1"
                >
                  <FaGithub className="h-3 w-3" /> ./code
                </a>
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-link text-[10px] flex items-center gap-1"
                >
                  <FaExternalLinkAlt className="h-3 w-3" /> ./demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
