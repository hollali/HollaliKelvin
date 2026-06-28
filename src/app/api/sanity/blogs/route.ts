import { client } from '@/sanity/client'
import { NextResponse } from 'next/server'

export async function GET() {
  const blogs = await client.fetch(`*[_type == "blog"] | order(date desc) {
    title,
    excerpt,
    date,
    readTime,
    "slug": slug.current
  }`)
  return NextResponse.json(blogs)
}
