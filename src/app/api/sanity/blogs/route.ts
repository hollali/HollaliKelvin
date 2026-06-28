import { client } from '@/sanity/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug')

  if (slug) {
    const blog = await client.fetch(`*[_type == "blog" && slug.current == $slug][0] {
      title,
      excerpt,
      date,
      readTime,
      "slug": slug.current,
      content
    }`, { slug })
    return NextResponse.json(blog)
  }

  const blogs = await client.fetch(`*[_type == "blog"] | order(date desc) {
    title,
    excerpt,
    date,
    readTime,
    "slug": slug.current
  }`)
  return NextResponse.json(blogs)
}
