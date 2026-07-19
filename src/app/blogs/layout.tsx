import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "blogs | hollali@portfolio",
  description: "Read my latest blog posts about software development, web technologies, and programming tutorials.",
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
