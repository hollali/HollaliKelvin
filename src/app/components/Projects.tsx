'use client'

import { useState, useEffect } from 'react'
import { getProjects } from '@/contents/projects'
import type { Project } from '@/types'
import { motion } from 'framer-motion'
import { isMobileProject } from '@/lib/constants'
import TerminalCard from './TerminalCard'
import ProjectPhone from './ProjectPhone'

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProjects({ featured: true })
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className={isMobileProject(project.technologies) ? 'flex justify-center' : ''}
            >
              {isMobileProject(project.technologies) ? (
                <ProjectPhone project={project} />
              ) : (
                <TerminalCard project={project} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
