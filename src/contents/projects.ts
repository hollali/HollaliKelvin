import type { Project } from '@/types'

export async function getProjects(params?: { featured?: boolean }): Promise<Project[]> {
  const query = params?.featured ? '?featured=true' : ''
  const res = await fetch(`/api/sanity/projects${query}`)
  if (!res.ok) throw new Error('Failed to fetch projects')
  return res.json()
}
