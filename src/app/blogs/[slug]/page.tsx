'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { getBlog } from '@/contents/blogs'
import type { Blog } from '@/types'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/sanity/lib/image'
import { FaCalendarAlt, FaClock, FaArrowLeft } from 'react-icons/fa'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    getBlog(slug).then((data) => {
      setBlog(data)
      setLoading(false)
    })
  }, [slug])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <div className="terminal-card animate-pulse space-y-3">
          <div className="h-6 bg-[#1a1a1a] rounded w-3/4" />
          <div className="h-3 bg-[#1a1a1a] rounded w-1/3" />
          <div className="h-3 bg-[#1a1a1a] rounded w-full mt-6" />
          <div className="h-3 bg-[#1a1a1a] rounded w-full" />
          <div className="h-3 bg-[#1a1a1a] rounded w-5/6" />
        </div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center">
        <div className="terminal-card">
          <div className="text-sm text-[#666] mb-4"># Blog not found</div>
          <Link href="/blogs" className="terminal-btn text-xs">
            $ cd ../blogs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <motion.div
        className="text-xs text-[#666] mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Link href="/blogs" className="hover:opacity-80 transition-opacity" style={{ color: 'var(--terminal-accent)' }}>
          <FaArrowLeft className="inline h-3 w-3 mr-1" />
          $ cd ../blogs
        </Link>
        <hr className="terminal-separator my-3" />
      </motion.div>

      <motion.article
        className="terminal-card"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-xs text-[#666] mb-2 font-mono">
          <span style={{ color: 'var(--terminal-accent)' }}>~</span> $ cat blogs/{blog.slug}.md
        </div>

        <h1 className="text-xl md:text-2xl font-mono text-[#e0e0e0] mb-3">
          {blog.title}
        </h1>

        <div className="flex items-center gap-4 text-[10px] text-[#555] mb-6 pb-4 border-b border-[#2a2a2a]">
          <span className="flex items-center gap-1">
            <FaCalendarAlt className="h-3 w-3" />
            {new Date(blog.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1">
            <FaClock className="h-3 w-3" />
            {blog.readTime} min read
          </span>
        </div>

        {blog.content && blog.content.length > 0 ? (
          <div className="prose-custom text-xs text-[#e0e0e0] leading-relaxed space-y-4">
            <PortableText
              value={blog.content}
              components={{
                block: {
                  normal: ({ children }) => <p className="text-xs text-[#e0e0e0] leading-relaxed mb-4">{children}</p>,
                  h1: ({ children }) => <h1 className="text-lg font-mono text-[#e0e0e0] mt-6 mb-3" style={{ color: 'var(--terminal-accent)' }}>{children}</h1>,
                  h2: ({ children }) => <h2 className="text-base font-mono text-[#e0e0e0] mt-5 mb-2" style={{ color: 'var(--terminal-accent)' }}>{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-mono text-[#e0e0e0] mt-4 mb-2" style={{ color: 'var(--terminal-accent)' }}>{children}</h3>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 px-4 py-2 my-4 text-xs text-[#666] italic" style={{ borderColor: 'var(--terminal-accent)' }}>
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="text-xs bg-[#1a1a1a] px-1.5 py-0.5 rounded" style={{ color: 'var(--terminal-accent)' }}>
                      {children}
                    </code>
                  ),
                },
                list: {
                  bullet: ({ children }) => <ul className="list-disc list-inside space-y-1 text-xs text-[#e0e0e0] mb-4">{children}</ul>,
                  number: ({ children }) => <ol className="list-decimal list-inside space-y-1 text-xs text-[#e0e0e0] mb-4">{children}</ol>,
                },
                listItem: {
                  bullet: ({ children }) => <li className="text-xs text-[#e0e0e0]">{children}</li>,
                  number: ({ children }) => <li className="text-xs text-[#e0e0e0]">{children}</li>,
                },
                marks: {
                  link: ({ children, value }) => (
                    <a
                      href={value?.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="terminal-link text-xs"
                    >
                      {children}
                    </a>
                  ),
                  code: ({ children }) => (
                    <code className="text-xs bg-[#1a1a1a] px-1.5 py-0.5" style={{ color: 'var(--terminal-accent)' }}>
                      {children}
                    </code>
                  ),
                  strong: ({ children }) => <strong className="text-[#e0e0e0] font-bold">{children}</strong>,
                  em: ({ children }) => <em className="italic">{children}</em>,
                },
                types: {
                  image: ({ value }) => {
                    const src = urlFor(value).width(800).url()
                    return (
                      <div className="relative my-4 border border-[#2a2a2a] overflow-hidden" style={{ aspectRatio: '16/9' }}>
                        <Image src={src} alt={value?.alt || ''} fill className="object-cover" sizes="(max-width: 768px) 100vw, 800px" unoptimized />
                      </div>
                    )
                  },
                },
                hardBreak: () => <br />,
              }}
            />
          </div>
        ) : (
          <p className="text-xs text-[#666] italic">No content</p>
        )}

        <hr className="terminal-separator my-6" />
        <div className="text-[10px] text-[#555] text-center font-mono">
          --- EOF ---
        </div>
      </motion.article>
    </div>
  )
}
