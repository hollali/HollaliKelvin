'use client'

import { useState, useEffect, useMemo } from 'react'
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
  const [filter, setFilter] = useState<string | null>(null)

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data)
      setLoading(false)
    })
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
            onClick={() => setFilter(null)}
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
              onClick={() => setFilter(tag === filter ? null : tag)}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="terminal-card animate-pulse">
              <div className="aspect-video bg-[#1a1a1a] mb-3" />
              <div className="h-4 bg-[#1a1a1a] rounded w-3/4 mb-2" />
              <div className="h-3 bg-[#1a1a1a] rounded w-full mb-1" />
              <div className="h-3 bg-[#1a1a1a] rounded w-2/3" />
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
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {filtered.map((project, idx) => (
            <motion.div
              key={project.title}
              className="terminal-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
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
              <div className="text-xs text-[#666] mb-1 font-mono truncate">
                drwxr-xr-x  hollali  hollali  <span className="text-[#e0e0e0]">{project.title.toLowerCase().replace(/\s+/g, '-')}</span>
              </div>
              <h2 className="text-sm font-mono text-[#e0e0e0] mb-1">
                {project.title}
              </h2>
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
        </motion.div>
      )}
    </div>
  )
}
