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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: "Hollali Kelvin",
      url: baseUrl,
      image: `${baseUrl}/hollali.jpeg`,
      jobTitle: "Software Engineer",
      description: "Software engineer from Accra, Ghana building web applications, mobile interfaces, and cloud services.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Accra",
        addressCountry: "GH",
      },
      email: "mailto:dheztinykartel@gmail.com",
      telephone: "+233050306932",
      knowsAbout: ["React", "Next.js", "Node.js", "TypeScript", "React Native", "PostgreSQL"],
      sameAs: [
        "https://github.com/hollali",
        "https://www.linkedin.com/in/hollali-kelvin-18600b225/",
        "https://twitter.com/h_ollali",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Hollali Kelvin — Software Engineer Portfolio",
      description: "Terminal-themed developer portfolio of Hollali Kelvin.",
    },
  ],
};

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
