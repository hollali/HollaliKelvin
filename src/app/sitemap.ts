import { client } from '@/sanity/client'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hollali-portfolio.netlify.app'

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/blogs`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/resume`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ]

  try {
    const blogs: { slug: string; date: string }[] = await client.fetch(
      `*[_type == "blog" && defined(slug.current)] { "slug": slug.current, date }`
    )
    const blogPages = blogs.map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: new Date(blog.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
    return [...staticPages, ...blogPages]
  } catch {
    return staticPages
  }
}
