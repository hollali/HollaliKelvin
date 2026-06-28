import type { Project } from '@/types'

export async function getProjects(): Promise<Project[]> {
  const res = await fetch('/api/sanity/projects')
  if (!res.ok) throw new Error('Failed to fetch projects')
  return res.json()
}
