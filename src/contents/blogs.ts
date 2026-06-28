import type { Blog } from '@/types'

export async function getBlogs(): Promise<Blog[]> {
  const res = await fetch('/api/sanity/blogs')
  if (!res.ok) throw new Error('Failed to fetch blogs')
  return res.json()
}

export async function getBlog(slug: string): Promise<Blog | null> {
  const res = await fetch(`/api/sanity/blogs?slug=${slug}`)
  if (!res.ok) throw new Error('Failed to fetch blog')
  const data = await res.json()
  return data || null
}
