import { client } from '@/sanity/client'
import { NextResponse } from 'next/server'

export async function GET() {
  const projects = await client.fetch(`*[_type == "project"] | order(orderRank) {
    _id,
    title,
    description,
    technologies,
    githubLink,
    demoLink,
    "image": image.asset->url
  }`)
  return NextResponse.json(projects)
}
