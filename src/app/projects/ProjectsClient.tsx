'use client'

import { useState, useEffect, useMemo } from 'react'
import { getProjects } from '@/contents/projects'
import type { Project } from '@/types'
import { motion } from 'framer-motion'
import ProjectPhone from '../components/ProjectPhone'
import TerminalCard from '../components/TerminalCard'
import { techColors, isMobileProject } from '@/lib/constants'

const PER_PAGE = 6

export default function ProjectsClient() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string | null>(null)
  const [page, setPage] = useState(0)

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    projects.forEach((p) => p.technologies.forEach((t) => tags.add(t)))
    return Array.from(tags).sort()
  }, [projects])

  const filtered = useMemo(
    () => (filter ? projects.filter((p) => p.technologies.includes(filter)) : projects),
    [projects, filter]
  )

  const paged = useMemo(
    () => filtered.slice(0, (page + 1) * PER_PAGE),
    [filtered, page]
  )

  const hasMore = paged.length < filtered.length

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <motion.div
        className="text-xs text-[#666] mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span style={{ color: 'var(--terminal-accent)' }}>~</span> $ ls -la projects/
        <span className="ml-2 text-[#555]">({filtered.length} results)</span>
        <hr className="terminal-separator my-2" />
      </motion.div>

      {!loading && allTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          <button
            onClick={() => { setFilter(null); setPage(0) }}
            className={`terminal-tag text-[10px] cursor-pointer transition-colors ${
              !filter ? 'opacity-100' : 'opacity-50 hover:opacity-80'
            }`}
            style={!filter ? { borderColor: 'var(--terminal-accent)', color: 'var(--terminal-accent)' } : {}}
          >
            all
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => { setFilter(tag === filter ? null : tag); setPage(0) }}
              className="terminal-tag text-[10px] cursor-pointer transition-colors"
              style={{
                borderColor: filter === tag ? (techColors[tag] || '#666') : undefined,
                color: filter === tag ? (techColors[tag] || '#e0e0e0') : undefined,
                opacity: filter === tag ? 1 : 0.5,
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="terminal-card animate-pulse">
              <div className="aspect-video bg-[#1a1a1a] mb-3" />
              <div className="h-4 bg-[#1a1a1a] w-3/4 mb-2" />
              <div className="h-3 bg-[#1a1a1a] w-full mb-1" />
              <div className="h-3 bg-[#1a1a1a] w-2/3" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="terminal-card text-center py-12">
          <div className="text-xs text-[#666] font-mono">
            <span style={{ color: 'var(--terminal-accent)' }}>$</span> grep -r &ldquo;{filter}&rdquo; projects/
            <br />
            <span className="text-[#555] mt-2 inline-block">No matching projects found</span>
          </div>
        </div>
      ) : (
        <>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {paged.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={isMobileProject(project.technologies) ? 'flex justify-center' : ''}
            >
              {isMobileProject(project.technologies) ? (
                <ProjectPhone project={project} />
              ) : (
                <TerminalCard project={project} />
              )}
            </motion.div>
          ))}
        </motion.div>

        {hasMore && (
          <motion.div
            className="text-center pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="terminal-btn text-xs"
            >
              $ ls projects/ --page {page + 2}
            </button>
          </motion.div>
        )}
        </>
      )}
    </div>
  )
}
