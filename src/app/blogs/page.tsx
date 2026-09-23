import BlogsClient from './BlogsClient'
import { fetchBlogs } from '@/sanity/data'

export const revalidate = 3600

export default async function BlogsPage() {
  const blogs = await fetchBlogs()
  return <BlogsClient initial={blogs} />
}