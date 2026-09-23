import { client } from './client'

export const SANITY_REVALIDATE = 3600

export async function fetchBlogs(tag?: string) {
  const params: Record<string, string> = tag ? { tag } : {}
  const query = tag
    ? `*[_type == "blog" && $tag in tags] | order(date desc) { title, excerpt, date, readTime, tags, "slug": slug.current }`
    : `*[_type == "blog"] | order(date desc) { title, excerpt, date, readTime, tags, "slug": slug.current }`
  return client.fetch(
    query,
    params,
    { next: { revalidate: SANITY_REVALIDATE } }
  )
}

export async function fetchBlog(slug: string) {
  return client.fetch(
    `*[_type == "blog" && slug.current == $slug][0] {
      title,
      excerpt,
      date,
      readTime,
      tags,
      "slug": slug.current,
      content
    }`,
    { slug },
    { next: { revalidate: SANITY_REVALIDATE } }
  )
}

export async function fetchProjects(featured = false) {
  const filter = featured ? ' && featured == true' : ''
  return client.fetch(
    `*[_type == "project"${filter}] | order(orderRank) {
      _id,
      title,
      description,
      technologies,
      githubLink,
      demoLink,
      featured,
      "image": image.asset->url,
      "images": images[].asset->url
    }`,
    {},
    { next: { revalidate: SANITY_REVALIDATE } }
  )
}