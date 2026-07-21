'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { FaSearch, FaFile, FaFolder } from 'react-icons/fa'

const pages = [
  { path: '/', label: 'Home', cmd: 'cd ~', type: 'page' as const },
  { path: '/about', label: 'About', cmd: 'cat about.md', type: 'page' as const },
  { path: '/projects', label: 'Projects', cmd: 'ls -la projects/', type: 'page' as const },
  { path: '/blogs', label: 'Blogs', cmd: 'ls -la blogs/', type: 'page' as const },
  { path: '/contact', label: 'Contact', cmd: './contact', type: 'page' as const },
  { path: '/resume', label: 'Resume', cmd: 'cat resume.md', type: 'page' as const },
]

interface ContentItem {
  path: string
  label: string
  cmd: string
  type: 'page' | 'blog' | 'project'
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [content, setContent] = useState<ContentItem[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const fetchingRef = useRef(false)

  const allItems = [...pages, ...content]

  const results = query
    ? allItems.filter(
        (p) =>
          p.label.toLowerCase().includes(query.toLowerCase()) ||
          p.path.toLowerCase().includes(query.toLowerCase())
      )
    : allItems

  const handleSelect = useCallback(
    (path: string) => {
      setOpen(false)
      setQuery('')
      router.push(path)
    },
    [router]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
        setQuery('')
        setSelectedIdx(0)
      }
      if (e.key === 'Escape' && open) {
        setOpen(false)
        setQuery('')
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
      setSelectedIdx(0)
      if (!fetchingRef.current) {
        fetchingRef.current = true
        Promise.all([
          fetch('/api/sanity/blogs').then(r => r.json()),
          fetch('/api/sanity/projects').then(r => r.json()),
        ]).then(([blogs, projects]) => {
          const blogItems: ContentItem[] = (blogs || []).map((b: { slug: string; title: string }) => ({
            path: `/blogs/${b.slug}`,
            label: b.title,
            cmd: `cat blogs/${b.slug}.md`,
            type: 'blog' as const,
          }))
          const projectItems: ContentItem[] = (projects || []).map((p: { title: string }) => ({
            path: '/projects',
            label: p.title,
            cmd: `./projects/${p.title.toLowerCase().replace(/\s+/g, '-')}`,
            type: 'project' as const,
          }))
          setContent([...blogItems, ...projectItems])
        }).catch(() => {})
      }
    } else {
      fetchingRef.current = false
    }
  }, [open])

  useEffect(() => {
    setSelectedIdx(0)
  }, [query])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIdx((prev) => Math.min(prev + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIdx((prev) => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIdx]) {
      handleSelect(results[selectedIdx].path)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div className="fixed inset-0 bg-black/70" />
      <div
        className="relative w-full max-w-lg terminal-card p-0 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2a2a2a]">
          <FaSearch className="h-3 w-3 text-[#666]" aria-hidden="true" />
          <span className="text-xs text-[#666]" style={{ color: 'var(--terminal-accent)' }}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="type a command or page name..."
            className="flex-1 bg-transparent border-none outline-none text-xs text-[#e0e0e0] font-mono placeholder:text-[#555]"
            aria-label="Search pages and content"
          />
          <kbd className="text-[10px] text-[#555] border border-[#2a2a2a] px-1.5 py-0.5">esc</kbd>
        </div>
        <div className="max-h-64 overflow-y-auto" role="listbox">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-xs text-[#555] font-mono">
              No results for &ldquo;{query}&rdquo;
            </div>
          ) : (
            results.map((item, idx) => (
              <button
                key={`${item.type}-${item.path}`}
                onClick={() => handleSelect(item.path)}
                onMouseEnter={() => setSelectedIdx(idx)}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs transition-colors"
                style={{
                  backgroundColor: idx === selectedIdx ? 'rgba(255,255,255,0.05)' : 'transparent',
                }}
                role="option"
                aria-selected={idx === selectedIdx}
              >
                <span className="font-mono shrink-0" style={{ color: item.type === 'page' ? 'var(--terminal-accent)' : '#666' }}>
                  {item.type === 'page' ? (
                    <FaFolder className="h-3 w-3" aria-hidden="true" />
                  ) : (
                    <FaFile className="h-3 w-3" aria-hidden="true" />
                  )}
                </span>
                <span className="font-mono text-[#e0e0e0] truncate">{item.cmd}</span>
                <span className="ml-auto text-[#555] font-mono truncate text-[9px]">{item.path}</span>
                {item.type !== 'page' && (
                  <span className="text-[9px] px-1 py-0.5 border border-[#2a2a2a] text-[#555] shrink-0">
                    {item.type}
                  </span>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
