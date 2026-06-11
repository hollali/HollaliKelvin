'use client'

import { useState, useEffect } from 'react'
import { getBlogs } from '@/contents/blogs'
import type { Blog } from '@/types'
import Link from 'next/link'
import { FaCalendarAlt, FaClock } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, cardHoverSmall } from '@/utils/animations'

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
    <div className="container max-w-7xl mx-auto py-12">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Blog Posts
      </motion.h1>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white dark:bg-dark/50 rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mb-4" />
              <div className="flex gap-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {blogs.map((blog) => (
            <motion.article
              key={blog.slug}
              className="bg-white dark:bg-dark/50 rounded-lg shadow-md overflow-hidden"
              variants={fadeInUp}
              {...cardHoverSmall}
            >
              <div className="p-6">
                <motion.h2 
                  className="text-xl font-semibold mb-2"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link href={`/blogs/${blog.slug}`} className="hover:text-primary transition-colors">
                    {blog.title}
                  </Link>
                </motion.h2>
                
                <motion.p 
                  className="text-secondary mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {blog.excerpt}
                </motion.p>
                
                <motion.div 
                  className="flex items-center gap-4 text-sm text-secondary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <FaCalendarAlt className="h-4 w-4" />
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center gap-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <FaClock className="h-4 w-4" />
                    <span>{blog.readTime}</span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}
    </div>
  )
}
