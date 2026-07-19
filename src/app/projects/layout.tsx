import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "projects | hollali@portfolio",
  description: "Browse my software development projects built with React, Next.js, Node.js, and more.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
