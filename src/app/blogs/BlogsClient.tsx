'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { getBlogs } from '@/contents/blogs'
import type { Blog } from '@/types'
import Link from 'next/link'
import { FaCalendarAlt, FaClock, FaTag } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { tagColors } from '@/lib/constants'

const PER_PAGE = 10

export default function BlogsClient() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [page, setPage] = useState(0)

  const filtered = useMemo(
    () => (activeTag ? blogs.filter((b) => b.tags?.includes(activeTag)) : blogs),
    [blogs, activeTag]
  )

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    blogs.forEach((b) => b.tags?.forEach((t) => tags.add(t)))
    return Array.from(tags).sort()
  }, [blogs])

  const paged = useMemo(
    () => filtered.slice(0, (page + 1) * PER_PAGE),
    [filtered, page]
  )

  const hasMore = paged.length < filtered.length

  useEffect(() => {
    getBlogs()
      .then((data) => {
        setBlogs(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleTagClick = useCallback((tag: string) => {
    setActiveTag((prev) => (prev === tag ? null : tag))
    setPage(0)
  }, [])

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div
        className="text-xs text-[#666] mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span style={{ color: 'var(--terminal-accent)' }}>~</span> $ ls -la blogs/
        <span className="ml-2 text-[#555]">({filtered.length} results)</span>
        <hr className="terminal-separator my-2" />
      </motion.div>

      {!loading && allTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          <button
            onClick={() => { setActiveTag(null); setPage(0) }}
            className={`terminal-tag text-[10px] cursor-pointer transition-colors ${
              !activeTag ? 'opacity-100' : 'opacity-50 hover:opacity-80'
            }`}
            style={!activeTag ? { borderColor: 'var(--terminal-accent)', color: 'var(--terminal-accent)' } : {}}
          >
            all
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="terminal-tag text-[10px] cursor-pointer transition-colors flex items-center gap-1"
              style={{
                borderColor: activeTag === tag ? (tagColors[tag] || '#666') : undefined,
                color: activeTag === tag ? (tagColors[tag] || '#e0e0e0') : undefined,
                opacity: activeTag === tag ? 1 : 0.5,
              }}
            >
              <FaTag className="h-2 w-2" />
              {tag}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="terminal-card animate-pulse">
              <div className="h-4 bg-[#1a1a1a] w-56 mb-2" />
              <div className="h-3 bg-[#1a1a1a] w-full mb-1" />
              <div className="h-3 bg-[#1a1a1a] w-2/3" />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="terminal-card text-center py-12">
          <div className="text-xs text-[#666] font-mono">
            <span style={{ color: 'var(--terminal-accent)' }}>$</span> grep -r &ldquo;{activeTag}&rdquo; blogs/
            <br />
            <span className="text-[#555] mt-2 inline-block">No matching posts found</span>
          </div>
        </div>
      ) : (
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {paged.map((blog, idx) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.04 }}
            >
              <Link
                href={`/blogs/${blog.slug}`}
                className="block terminal-card"
                style={{ transition: 'border-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--terminal-accent)'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = ''}
              >
                <div className="flex items-start gap-4">
                  <div className="text-xs text-[#666] font-mono w-16 shrink-0 pt-0.5">
                    {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-[#e0e0e0] mb-1 font-mono">
                      {blog.title}
                    </div>
                    <div className="text-xs text-[#666] line-clamp-2">
                      {blog.excerpt}
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-[#555] mt-1.5">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="h-2.5 w-2.5" />
                        {new Date(blog.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="h-2.5 w-2.5" />
                        {blog.readTime}
                      </span>
                    </div>
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {blog.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] font-mono"
                            style={{ color: tagColors[tag] || '#666' }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-[#666] text-xs shrink-0 self-center">
                    -&gt;
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {hasMore && (
            <motion.div
              className="text-center pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="terminal-btn text-xs"
              >
                $ cat blogs/* --page {page + 2}
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  )
}
