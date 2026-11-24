import ProjectsClient from './ProjectsClient'
import { fetchProjects } from '@/sanity/data'

export const revalidate = 60

export default async function ProjectsPage() {
  const projects = await fetchProjects()
  return <ProjectsClient initial={projects} />
}