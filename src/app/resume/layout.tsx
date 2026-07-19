import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "resume | hollali@portfolio",
  description: "View Hollali Kelvin's resume - skills, experience, and education in software engineering.",
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
