import { client } from '@/sanity/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')

  const tag = request.nextUrl.searchParams.get('tag')

  if (slug) {
    const blog = await client.fetch(`*[_type == "blog" && slug.current == $slug][0] {
      title,
      excerpt,
      date,
      readTime,
      tags,
      "slug": slug.current,
      content
    }`, { slug })
    return NextResponse.json(blog)
  }

  const params: Record<string, string> = {}
  let query: string
  if (tag) {
    params.tag = tag
    query = `*[_type == "blog" && $tag in tags] | order(date desc) { title, excerpt, date, readTime, tags, "slug": slug.current }`
  } else {
    query = `*[_type == "blog"] | order(date desc) { title, excerpt, date, readTime, tags, "slug": slug.current }`
  }
  const blogs = await client.fetch(query, params)
  return NextResponse.json(blogs)
}
