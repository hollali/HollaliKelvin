import { client } from '@/sanity/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const featured = searchParams.get('featured')

  const filter = featured === 'true' ? ' && featured == true' : ''

  const projects = await client.fetch(`*[_type == "project"${filter}] | order(orderRank) {
    _id,
    title,
    description,
    technologies,
    githubLink,
    demoLink,
    featured,
    "image": image.asset->url,
    "images": images[].asset->url
  }`)
  return NextResponse.json(projects)
}
