'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { techColors } from '@/lib/constants'
import type { Project } from '@/types'
import ImageCarousel from './ImageCarousel'

interface TerminalCardProps {
  project: Project
}

export default function TerminalCard({ project }: TerminalCardProps) {
  const [active, setActive] = useState(false)
  const allImages = [project.image, ...(project.images || [])].filter(Boolean)

  return (
    <div
      className="project-card relative overflow-hidden group"
      onClick={() => setActive((prev) => !prev)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {/* Full-bleed image or carousel */}
      <div className="absolute inset-0">
        {allImages.length > 1 ? (
          <ImageCarousel images={allImages} alt={project.title} />
        ) : (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>

      {/* Persistent gradient for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Extra dark on active */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0'}`} />

      {/* Project info - hidden by default, shown on hover/tap */}
      <div className={`absolute inset-x-0 bottom-0 p-4 flex flex-col justify-end h-[70%] transition-all duration-300 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <div className="text-[10px] text-white/60 mb-1 font-mono truncate">
          drwxr-xr-x  hollali  hollali  <span className="text-white/90">{project.title.toLowerCase().replace(/\s+/g, '-')}</span>
        </div>
        <h3 className="text-sm font-mono text-white mb-1 line-clamp-1">
          {project.title}
        </h3>
        <p className="text-xs text-white/70 mb-3 line-clamp-2">
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
            className="text-[#00bfff] hover:text-[var(--terminal-accent)] flex items-center gap-1"
            aria-label={`${project.title} source code on GitHub`}
            onClick={(e) => e.stopPropagation()}
          >
            <FaGithub className="h-3 w-3" /> ./code
          </a>
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#00bfff] hover:text-[var(--terminal-accent)] flex items-center gap-1"
            aria-label={`${project.title} live demo`}
            onClick={(e) => e.stopPropagation()}
          >
            <FaExternalLinkAlt className="h-3 w-3" /> ./demo
          </a>
        </div>
      </div>
    </div>
  )
}