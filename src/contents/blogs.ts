import { client } from '@/sanity/client'
import type { Blog } from '@/types'

export async function getBlogs(): Promise<Blog[]> {
  return client.fetch(`*[_type == "blog"] | order(date desc) {
    title,
    excerpt,
    date,
    readTime,
    "slug": slug.current
  }`)
}
