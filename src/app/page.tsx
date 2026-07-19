import HomeClient from './HomeClient'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "hollali@portfolio:~$",
  description: "Hollali Kelvin - Software Engineer, Mobile Developer, and Web Developer. View my projects, blog posts, and get in touch.",
  openGraph: {
    title: "hollali@portfolio:~$",
    description: "Hollali Kelvin - Software Engineer, Mobile Developer, and Web Developer.",
  },
};

export default function Home() {
  return <HomeClient />
}
