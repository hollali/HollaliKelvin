import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "contact | hollali@portfolio",
  description: "Get in touch with Hollali Kelvin for collaboration, projects, or opportunities.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
