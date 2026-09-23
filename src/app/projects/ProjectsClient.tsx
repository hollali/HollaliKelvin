'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { getProjects } from '@/contents/projects'
import type { Project } from '@/types'
import { motion } from 'framer-motion'
import ProjectPhone from '../components/ProjectPhone'
import TerminalCard from '../components/TerminalCard'
import AmbientBackground from '../components/AmbientBackground'
import { techColors, isMobileProject } from '@/lib/constants'
import { FaGithub, FaExternalLinkAlt, FaSearch, FaBorderAll, FaList } from 'react-icons/fa'

const PER_PAGE = 6

function slugify(title: string) {
  return title.toLowerCase().replace(/\s+/g, '-')
}

export default function ProjectsClient({ initial }: { initial?: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initial ?? [])
  const [loading, setLoading] = useState(initial === undefined)
  const [filter, setFilter] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [page, setPage] = useState(0)

  useEffect(() => {
    if (initial !== undefined) return
    getProjects()
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [initial])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    projects.forEach((p) => p.technologies.forEach((t) => tags.add(t)))
    return Array.from(tags).sort()
  }, [projects])

  const filtered = useMemo(() => {
    let list = projects
    if (filter) list = list.filter((p) => p.technologies.includes(filter))
    if (query.trim()) {
      const q = query.trim().toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.technologies.some((t) => t.toLowerCase().includes(q))
      )
    }
    return list
  }, [projects, filter, query])

  const paged = useMemo(
    () => filtered.slice(0, (page + 1) * PER_PAGE),
    [filtered, page]
  )

  const hasMore = paged.length < filtered.length

  const reset = () => {
    setFilter(null)
    setQuery('')
    setPage(0)
  }

  return (
    <div className="pb-16">
      {/* Header */}
      <section className="relative overflow-hidden pt-14 pb-8 md:pt-20 md:pb-10">
        <AmbientBackground />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs md:text-sm mb-3" style={{ color: 'var(--terminal-accent)' }}>
              hollali@portfolio ~ % ls -la projects/
            </p>
            <h1 className="text-2xl md:text-4xl font-bold text-[#e0e0e0] mb-3">Projects</h1>
            <p className="text-sm md:text-base text-[#999] leading-relaxed max-w-2xl">
              A curated collection of web and mobile projects I&apos;ve designed, built,
              and shipped — from product apps to developer tooling.
            </p>
            <hr className="terminal-separator" />
            <p className="mt-3 text-xs text-[#666] font-mono">
              {loading ? 'scanning directory...' : `total ${filtered.length} entries`}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sticky toolbar */}
      <div className="sticky top-0 z-30 border-y border-[#2a2a2a] bg-[#141414]/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-3">
          <div className="flex-1 relative min-w-0">
            <FaSearch
              className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-[#555]"
              aria-hidden="true"
            />
            <label htmlFor="project-search" className="sr-only">Search projects</label>
            <input
              id="project-search"
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(0) }}
              placeholder='grep -ri "react" projects/'
              className="w-full bg-transparent border border-[#2a2a2a] pl-8 pr-3 py-1.5 text-xs text-[#e0e0e0] font-mono outline-none focus:border-[var(--terminal-accent)] placeholder:text-[#555]"
            />
          </div>
          <div className="flex items-center gap-1 text-xs shrink-0" role="group" aria-label="View mode">
            <button
              onClick={() => setView('grid')}
              className="terminal-btn text-xs px-2.5 py-1.5 flex items-center gap-1.5 cursor-pointer"
              style={view === 'grid' ? { borderColor: 'var(--terminal-accent)', color: 'var(--terminal-accent)' } : {}}
              aria-pressed={view === 'grid'}
            >
              <FaBorderAll className="h-3 w-3" aria-hidden="true" /> grid
            </button>
            <button
              onClick={() => setView('list')}
              className="terminal-btn text-xs px-2.5 py-1.5 flex items-center gap-1.5 cursor-pointer"
              style={view === 'list' ? { borderColor: 'var(--terminal-accent)', color: 'var(--terminal-accent)' } : {}}
              aria-pressed={view === 'list'}
            >
              <FaList className="h-3 w-3" aria-hidden="true" /> list
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Tag filter */}
        {!loading && allTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-5 mb-6">
            <button
              onClick={() => { setFilter(null); setPage(0) }}
              className="terminal-tag text-[10px] cursor-pointer transition-colors"
              style={!filter ? { borderColor: 'var(--terminal-accent)', color: 'var(--terminal-accent)' } : { opacity: 0.5 }}
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
              <span style={{ color: 'var(--terminal-accent)' }}>$</span> grep -ri
              &ldquo;{query || filter || '*'}&rdquo; projects/
              <br />
              <span className="text-[#555] mt-2 inline-block">No matching projects found</span>
            </div>
            {(query || filter) && (
              <button onClick={reset} className="terminal-btn text-xs mt-4 cursor-pointer">
                $ reset --filters
              </button>
            )}
          </div>
        ) : view === 'grid' ? (
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
        ) : (
          <motion.div
            className="terminal-card p-0! overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {paged.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="group flex flex-wrap md:flex-nowrap items-center gap-x-4 gap-y-1 border-b border-[#1e1e1e] last:border-b-0 px-4 py-3 transition-colors hover:bg-[rgba(255,255,255,0.02)]"
              >
                <div className="hidden md:block text-[10px] text-[#666] font-mono w-[88px] shrink-0">
                  drwxr-xr-x
                </div>
                <div className="hidden lg:block w-[72px] shrink-0 text-[10px] font-mono"
                  style={{ color: project.featured ? 'var(--terminal-accent)' : '#555' }}>
                  {project.featured ? '★ featured' : '──────'}
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={project.demoLink || project.githubLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs md:text-sm font-mono text-[#e0e0e0] hover:text-[var(--terminal-accent)] truncate transition-colors"
                    aria-label={`Open ${project.title}`}
                  >
                    ./{slugify(project.title)}
                  </Link>
                  <p className="text-[10px] text-[#666] truncate mt-0.5 hidden sm:block">
                    {project.description}
                  </p>
                </div>
                <div className="hidden lg:flex flex-wrap gap-1.5 w-[230px] shrink-0">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="terminal-tag text-[9px]"
                      style={{ borderColor: techColors[tech] || '#666', color: techColors[tech] || '#666' }}>
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-[9px] text-[#555] self-center">+{project.technologies.length - 3}</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs shrink-0">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#999] hover:text-[var(--terminal-accent)] transition-colors flex items-center gap-1 text-[10px]"
                      aria-label={`${project.title} source code on GitHub`}
                    >
                      <FaGithub className="h-3 w-3" aria-hidden="true" />
                      code
                    </a>
                  )}
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#999] hover:text-[var(--terminal-accent)] transition-colors flex items-center gap-1 text-[10px]"
                      aria-label={`${project.title} live demo`}
                    >
                      <FaExternalLinkAlt className="h-3 w-3" aria-hidden="true" />
                      demo
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {hasMore && (
          <motion.div
            className="text-center pt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="terminal-btn terminal-btn-accent text-xs cursor-pointer"
            >
              $ ls projects/ --page {page + 2}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}