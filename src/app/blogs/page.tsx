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

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div
        className="text-xs text-[#666] mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span style={{ color: 'var(--terminal-accent)' }}>~</span> $ ls -la blogs/
        <hr className="terminal-separator my-2" />
      </motion.div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="terminal-card animate-pulse">
              <div className="h-4 bg-[#1a1a1a] rounded w-56 mb-2" />
              <div className="h-3 bg-[#1a1a1a] rounded w-full mb-1" />
              <div className="h-3 bg-[#1a1a1a] rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {blogs.map((blog, idx) => (
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
                  </div>
                  <div className="text-[#666] text-xs shrink-0 self-center">
                    -&gt;
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
