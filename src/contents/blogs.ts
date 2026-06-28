import type { Blog } from '@/types'

export async function getBlogs(): Promise<Blog[]> {
  const res = await fetch('/api/sanity/blogs')
  if (!res.ok) throw new Error('Failed to fetch blogs')
  return res.json()
}
