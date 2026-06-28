export const projectsQuery = `*[_type == "project"] | order(orderRank) {
  _id,
  title,
  description,
  technologies,
  githubLink,
  demoLink,
  "image": image.asset->url
}`

export const blogsQuery = `*[_type == "blog"] | order(date desc) {
  title,
  excerpt,
  date,
  readTime,
  tags,
  "slug": slug.current
}`
