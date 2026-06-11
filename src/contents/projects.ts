import { client } from '@/sanity/client'
import type { Project } from '@/types'

export async function getProjects(): Promise<Project[]> {
  return client.fetch(`*[_type == "project"] | order(orderRank) {
    title,
    description,
    technologies,
    githubLink,
    demoLink,
    "image": image.asset->url
  }`)
}
