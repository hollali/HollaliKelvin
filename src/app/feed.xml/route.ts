import { client } from '@/sanity/client'
import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://hollali-portfolio.netlify.app'

  const blogs: { title: string; slug: string; excerpt: string; date: string }[] = await client.fetch(
    `*[_type == "blog" && defined(slug.current)] | order(date desc) {
      title,
      excerpt,
      date,
      "slug": slug.current
    }`
  )

  const items = blogs.map((blog) => `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <link>${baseUrl}/blogs/${blog.slug}</link>
      <description><![CDATA[${blog.excerpt}]]></description>
      <pubDate>${new Date(blog.date).toUTCString()}</pubDate>
      <guid>${baseUrl}/blogs/${blog.slug}</guid>
    </item>
  `).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Hollali's Blog</title>
    <link>${baseUrl}</link>
    <description>Blog posts by Hollali</description>
    <language>en</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
