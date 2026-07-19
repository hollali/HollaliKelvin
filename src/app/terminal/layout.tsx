import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "terminal | hollali@portfolio",
  description: "Interactive terminal - type commands to explore the portfolio.",
};

export default function TerminalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
