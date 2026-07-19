'use client'

import { useState, useEffect, useRef } from 'react'

interface Heading {
  level: number
  text: string
  id: string
}

interface TableOfContentsProps {
  content: Record<string, unknown>[]
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState('')
  const [collapsed, setCollapsed] = useState(false)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const headings: Heading[] = content
    .filter((block) => ['h2', 'h3'].includes(block.style as string))
    .map((block) => {
      const text = extractText(block)
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      return { level: block.style === 'h2' ? 2 : 3, text, id }
    })

  useEffect(() => {
    if (headings.length === 0) return

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    for (const h of headings) {
      const el = document.getElementById(h.id)
      if (el) observerRef.current.observe(el)
    }

    return () => observerRef.current?.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <div className="terminal-card p-3 mb-6">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center justify-between text-[10px] text-[#555] font-mono cursor-pointer"
      >
        <span>
          <span style={{ color: 'var(--terminal-accent)' }}>$</span> cat TOC.md
        </span>
        <span className="text-[#555]">{collapsed ? '[+]' : '[-]'}</span>
      </button>
      {!collapsed && (
        <nav className="mt-2 space-y-1" aria-label="Table of contents">
          {headings.map((h) => (
            <a
              key={h.id}
              href={`#${h.id}`}
              className="block text-[10px] font-mono transition-colors truncate"
              style={{
                paddingLeft: h.level === 3 ? '12px' : '0',
                color: activeId === h.id ? 'var(--terminal-accent)' : '#666',
              }}
            >
              {h.text}
            </a>
          ))}
        </nav>
      )}
    </div>
  )
}

function extractText(block: Record<string, unknown>): string {
  if (typeof block.children === 'string') return block.children
  if (Array.isArray(block.children)) {
    return block.children.map((c: Record<string, unknown>) => c.text || '').join('')
  }
  return ''
}
