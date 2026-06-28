'use client'

import { useState, useEffect } from 'react'
import { getBlogs } from '@/contents/blogs'
import type { Blog } from '@/types'
import Link from 'next/link'
import { FaCalendarAlt, FaClock } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function Blogs() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogs().then((data) => {
      setBlogs(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-xs text-[#666] mb-4">
            <span style={{ color: 'var(--terminal-accent)' }}>~</span> $ ls -la blogs/
          </div>
          <div className="terminal-card">
            <div className="text-xs text-[#666] font-mono">
              <span style={{ color: 'var(--terminal-accent)' }}>$</span> fetching blogs
              <span className="terminal-loading" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (blogs.length === 0) return null

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          className="text-xs text-[#666] mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span style={{ color: 'var(--terminal-accent)' }}>~</span> $ ls -la blogs/
          <hr className="terminal-separator my-2" />
        </motion.div>

        <div className="space-y-3">
          {blogs.map((blog, idx) => (
            <motion.div
              key={blog.slug}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06 }}
            >
              <Link
                href={`/blogs/${blog.slug}`}
                className="block terminal-card"
                style={{ transition: 'border-color 0.2s, transform 0.2s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--terminal-accent)'
                  e.currentTarget.style.transform = 'translateX(4px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = ''
                  e.currentTarget.style.transform = ''
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-xs text-[#666] font-mono w-16 shrink-0 pt-0.5">
                    {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-[#e0e0e0] mb-1 font-mono">
                      {blog.title}
                    </div>
                    <div className="text-xs text-[#666] line-clamp-1">
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
                  </div>
                  <div className="text-[#666] text-xs shrink-0 self-center">
                    -&gt;
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/blogs" className="terminal-btn text-xs">
            $ cat blogs/*
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
