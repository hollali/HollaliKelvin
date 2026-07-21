'use client'

import Image from 'next/image'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { techColors } from '@/lib/constants'
import type { Project } from '@/types'
import ImageCarousel from './ImageCarousel'

interface ProjectPhoneProps {
  project: Project
}

export default function ProjectPhone({ project }: ProjectPhoneProps) {
  const allImages = [project.image, ...(project.images || [])].filter(Boolean)

  return (
    <div className="iphone-frame group">
      {/* Dynamic Island */}
      <div className="dynamic-island" />
      
      {/* Screen content */}
      <div className="iphone-screen">
        {/* Full-bleed project image or carousel */}
        <div className="absolute inset-0">
          {allImages.length > 1 ? (
            <ImageCarousel images={allImages} alt={project.title} />
          ) : (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 200px, 260px"
            />
          )}
        </div>
        
        {/* Persistent gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        {/* Extra dark on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Project info - hidden by default, shown on hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col justify-end h-[60%] opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="text-[8px] text-white/60 mb-1 font-mono truncate">
            drwxr-xr-x  hollali  hollali  <span className="text-white/90">{project.title.toLowerCase().replace(/\s+/g, '-')}</span>
          </div>
          <h3 className="text-xs font-mono text-white mb-1 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-[9px] text-white/70 mb-2 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1 mb-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="terminal-tag text-[7px] px-1 py-0.5"
                style={{
                  borderColor: techColors[tech] || '#666',
                  color: techColors[tech] || '#666',
                }}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[7px] text-white/50">+{project.technologies.length - 3}</span>
            )}
          </div>
          <div className="flex gap-2 text-[8px]">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00bfff] hover:text-[var(--terminal-accent)] flex items-center gap-0.5"
              aria-label={`${project.title} source code on GitHub`}
            >
              <FaGithub className="w-2 h-2" /> ./code
            </a>
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00bfff] hover:text-[var(--terminal-accent)] flex items-center gap-0.5"
              aria-label={`${project.title} live demo`}
            >
              <FaExternalLinkAlt className="w-2 h-2" /> ./demo
            </a>
          </div>
        </div>
      </div>
      
      {/* Side buttons (decorative) */}
      <div className="iphone-button iphone-button-power" />
      <div className="iphone-button iphone-button-volume-up" />
      <div className="iphone-button iphone-button-volume-down" />
      <div className="iphone-button iphone-button-action" />
    </div>
  )
}