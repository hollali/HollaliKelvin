'use client'

import { useState, useEffect, useMemo } from 'react'
import { getBlogs } from '@/contents/blogs'
import type { Blog } from '@/types'
import Link from 'next/link'
import { FaCalendarAlt, FaClock, FaTag, FaArrowRight } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { tagColors } from '@/lib/constants'
import AmbientBackground from '../components/AmbientBackground'

const PER_PAGE = 10

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
}

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

  const [featured, ...rest] = paged

  return (
    <div className="pb-16">
      {/* Header */}
      <section className="relative overflow-hidden pt-14 pb-8 md:pt-20 md:pb-10">
        <AmbientBackground />
        <div className="relative z-10 max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs md:text-sm mb-3" style={{ color: 'var(--terminal-accent)' }}>
              hollali@portfolio ~ % ls -la blogs/
            </p>
            <h1 className="text-2xl md:text-4xl font-bold text-[#e0e0e0] mb-3">Blogs</h1>
            <p className="text-sm md:text-base text-[#999] leading-relaxed max-w-2xl">
              Notes, tutorials, and deep dives on software engineering, web
              development, and tooling — written as I build and learn.
            </p>
            <hr className="terminal-separator" />
            <p className="mt-3 text-xs text-[#666] font-mono">
              {loading ? 'scanning directory...' : `total ${filtered.length} posts`}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4">
        {/* Tag filter */}
        {!loading && allTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-8">
            <button
              onClick={() => { setActiveTag(null); setPage(0) }}
              className="terminal-tag text-[10px] cursor-pointer transition-colors"
              style={!activeTag ? { borderColor: 'var(--terminal-accent)', color: 'var(--terminal-accent)' } : { opacity: 0.5 }}
            >
              all
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => { setActiveTag(tag === activeTag ? null : tag); setPage(0) }}
                className="terminal-tag text-[10px] cursor-pointer transition-colors flex items-center gap-1"
                style={{
                  borderColor: activeTag === tag ? (tagColors[tag] || '#666') : undefined,
                  color: activeTag === tag ? (tagColors[tag] || '#e0e0e0') : undefined,
                  opacity: activeTag === tag ? 1 : 0.5,
                }}
              >
                <FaTag className="h-2 w-2" aria-hidden="true" />
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
              <span style={{ color: 'var(--terminal-accent)' }}>$</span> grep -ri
              &ldquo;{activeTag}&rdquo; blogs/
              <br />
              <span className="text-[#555] mt-2 inline-block">No matching posts found</span>
            </div>
          </div>
        ) : (
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {/* Featured post */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link
                  href={`/blogs/${featured.slug}`}
                  className="group block terminal-card p-0 overflow-hidden"
                >
                  <div className="p-6 md:p-8 transition-colors" style={{ borderLeft: '3px solid var(--terminal-accent)' }}>
                    <div className="flex items-center gap-2 text-[10px] mb-3">
                      <span className="terminal-tag text-[9px]" style={{ borderColor: 'var(--terminal-accent)', color: 'var(--terminal-accent)' }}>
                        ★ featured
                      </span>
                      <span className="text-[#555] font-mono">~ $ cat blog/latest.md</span>
                    </div>
                    <h2 className="text-lg md:text-2xl font-bold text-[#e0e0e0] mb-2 group-hover:text-[var(--terminal-accent)] transition-colors">
                      {featured.title}
                    </h2>
                    <p className="text-xs md:text-sm text-[#999] leading-relaxed mb-4 max-w-2xl line-clamp-2">
                      {featured.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-[10px] text-[#666]">
                      <span className="flex items-center gap-1.5">
                        <FaCalendarAlt className="h-3 w-3" aria-hidden="true" />
                        {formatDate(featured.date)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <FaClock className="h-3 w-3" aria-hidden="true" />
                        {featured.readTime}
                      </span>
                      {featured.tags?.slice(0, 3).map((tag) => (
                        <span key={tag} className="font-mono" style={{ color: tagColors[tag] || '#666' }}>
                          {tag}
                        </span>
                      ))}
                      <span className="ml-auto flex items-center gap-1.5 text-xs transition-transform group-hover:translate-x-1"
                        style={{ color: 'var(--terminal-accent)' }}>
                        read <FaArrowRight className="h-3 w-3" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Rest */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {rest.map((blog, idx) => (
                <motion.div
                  key={blog.slug}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="group block terminal-card h-full transition-colors"
                  >
                    <div className="text-[10px] text-[#666] font-mono mb-2">
                      {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                    </div>
                    <div className="text-sm text-[#e0e0e0] mb-1 font-mono group-hover:text-[var(--terminal-accent)] transition-colors line-clamp-1">
                      {blog.title}
                    </div>
                    <div className="text-xs text-[#666] line-clamp-2 mb-3">
                      {blog.excerpt}
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-[#555]">
                      <span className="flex items-center gap-1">
                        <FaClock className="h-2.5 w-2.5" aria-hidden="true" />
                        {blog.readTime}
                      </span>
                      {blog.tags && blog.tags.length > 0 && (
                        <span className="flex items-center gap-1.5">
                          {blog.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="font-mono" style={{ color: tagColors[tag] || '#666' }}>
                              #{tag}
                            </span>
                          ))}
                        </span>
                      )}
                      <span className="ml-auto text-xs" style={{ color: 'var(--terminal-accent)' }}>
                        -&gt;
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {hasMore && (
              <motion.div
                className="text-center pt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="terminal-btn terminal-btn-accent text-xs cursor-pointer"
                >
                  $ cat blogs/* --page {page + 2}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}