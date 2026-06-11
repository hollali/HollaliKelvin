import { createClient } from '@sanity/client'
import { apiVersion, dataset, projectId } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

export async function getProjects() {
  return client.fetch(`*[_type == "project"] | order(orderRank) {
    _id,
    title,
    description,
    technologies,
    githubLink,
    demoLink,
    "image": image.asset->url
  }`)
}

export async function getBlogs() {
  return client.fetch(`*[_type == "blog"] | order(date desc) {
    title,
    excerpt,
    date,
    readTime,
    "slug": slug.current
  }`)
}
