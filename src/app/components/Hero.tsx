"use client";

import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const tagline =
  "Software Engineer | Mobile Developer | Web Developer |  Open Source Contributor";

export default function Hero() {
  const [displayedTagline, setDisplayedTagline] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedTagline(tagline.slice(0, i + 1));
      i++;
      if (i >= tagline.length) {
        clearInterval(interval);
        setTimeout(() => setShowCursor(false), 2000);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="terminal-card">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="shrink-0">
              <Image
                src="/hollali.jpeg"
                alt="Hollali"
                width={96}
                height={96}
                className="rounded-full object-cover border-2 border-[#2a2a2a]"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm text-[#666] mb-1">
                <span style={{ color: "var(--terminal-accent)" }}>hollali</span>
                @portfolio ~ %
              </div>
              <motion.h1
                className="text-2xl md:text-3xl font-mono mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span style={{ color: "var(--terminal-accent)" }}>
                  Hi, I&apos;m{" "}
                </span>
                <span className="text-[#ffb000]">Hollali</span>
              </motion.h1>
              <div className="text-sm text-[#e0e0e0] mb-4 min-h-[20px]">
                <span style={{ color: "var(--terminal-accent)" }}>$ </span>
                <span>{displayedTagline}</span>
                {showCursor && <span className="animate-pulse">|</span>}
              </div>
              <div className="flex flex-wrap gap-3 mb-4 text-xs">
                <Link href="/projects" className="terminal-btn text-xs">
                  $ ./projects
                </Link>
                <Link href="/contact" className="terminal-btn text-xs">
                  $ ./contact
                </Link>
                <a
                  href="https://github.com/hollali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-btn text-xs flex items-center gap-1"
                >
                  <FaGithub className="h-3 w-3" /> github
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-btn text-xs flex items-center gap-1"
                >
                  <FaLinkedin className="h-3 w-3" /> linkedin
                </a>
                <a
                  href="https://twitter.com/h_ollali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-btn text-xs flex items-center gap-1"
                >
                  <FaTwitter className="h-3 w-3" /> twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
