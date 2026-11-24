import BlogsClient from './BlogsClient'
import { fetchBlogs } from '@/sanity/data'

export const revalidate = 60

export default async function BlogsPage() {
  const blogs = await fetchBlogs()
  return <BlogsClient initial={blogs} />
}