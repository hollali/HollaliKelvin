import HomeClient from './HomeClient'
import type { Metadata } from "next";
import { fetchBlogs, fetchProjects } from '@/sanity/data'

export const revalidate = 3600

export const metadata: Metadata = {
  title: "hollali@portfolio:~$",
  description: "Hollali Kelvin - Software Engineer, Mobile Developer, and Web Developer. View my projects, blog posts, and get in touch.",
  openGraph: {
    title: "hollali@portfolio:~$",
    description: "Hollali Kelvin - Software Engineer, Mobile Developer, and Web Developer.",
  },
};

export default async function Home() {
  const [projects, blogs] = await Promise.all([
    fetchProjects(true),
    fetchBlogs(),
  ])
  return <HomeClient projects={projects} blogs={blogs} />
}