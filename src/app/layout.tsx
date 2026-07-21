import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CommandPalette from "./components/CommandPalette";
import Analytics from "./components/Analytics";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hollali-portfolio.netlify.app";

export const metadata: Metadata = {
  title: "hollali@portfolio:~$",
  description: "Hollali's portfolio - a terminal-themed developer portfolio",
  metadataBase: new URL(baseUrl),
  openGraph: {
    title: "hollali@portfolio:~$",
    description: "Hollali's portfolio - a terminal-themed developer portfolio",
    url: baseUrl,
    siteName: "Hollali Portfolio",
    locale: "en_US",
    type: "website",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "hollali@portfolio:~$",
    description: "Hollali's portfolio - a terminal-themed developer portfolio",
    images: ["/api/og"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-mono bg-[#0a0a0a] text-[#e0e0e0] ${geistMono.variable}`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[10000] focus:top-2 focus:left-2 focus:terminal-btn focus:text-xs">
          Skip to content
        </a>
        <div className="scanline-overlay" />
        <div className="crt-overlay" />
        <ThemeProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main id="main-content" className="flex-1">{children}</main>
            <Footer />
          </div>
          <CommandPalette />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
