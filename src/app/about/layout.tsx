import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "about | hollali@portfolio",
  description: "Learn about Hollali Kelvin - skills, experience, and education in software engineering.",
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
