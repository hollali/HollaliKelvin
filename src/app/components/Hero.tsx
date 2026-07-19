"use client";

import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const asciiArt = `
 _   _ ____  _       ____ _  __
| | | |  _ \\| |     / ___| |/ /
| |_| | |_) | |     \\___ \\ ' /
|  _  |  _ <| |___  ___) | . \\
|_| |_|_| \\_\\_____|____/|_|\\_\\`;

const tagline =
  "Building modern web & mobile applications with clean code and solid architecture.";

const bootLines = [
  { text: "Initializing kernel...", delay: 0 },
  { text: "Loading system modules...  [OK]", delay: 400 },
  { text: "Mounting filesystems...     [OK]", delay: 800 },
  { text: "Starting display server...  [OK]", delay: 1200 },
  { text: "Launching shell...          [OK]", delay: 1600 },
];

function getTypingDelay(char: string, prevChar: string): number {
  if (char === ' ') return 60;
  if (char === '|' || char === '-') return 80;
  if (prevChar === ' ') return 40;
  return 25 + Math.random() * 15;
}

export default function Hero() {
  const [bootComplete, setBootComplete] = useState(false);
  const [visibleBootLines, setVisibleBootLines] = useState(0);
  const [displayedTagline, setDisplayedTagline] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [showAscii, setShowAscii] = useState(false);

  useEffect(() => {
    if (visibleBootLines >= bootLines.length) {
      const t = setTimeout(() => {
        setBootComplete(true);
        setTimeout(() => setShowAscii(true), 200);
      }, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => setVisibleBootLines((prev) => prev + 1),
      bootLines[visibleBootLines]?.delay ?? 300
    );
    return () => clearTimeout(t);
  }, [visibleBootLines]);

  useEffect(() => {
    if (!bootComplete) return;
    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    function typeNext() {
      if (i >= tagline.length) {
        setTimeout(() => setShowCursor(false), 2000);
        return;
      }
      setDisplayedTagline(tagline.slice(0, i + 1));
      const delay = getTypingDelay(tagline[i], tagline[i - 1] || '');
      i++;
      timeoutId = setTimeout(typeNext, delay);
    }

    timeoutId = setTimeout(typeNext, 300);
    return () => clearTimeout(timeoutId);
  }, [bootComplete]);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          className="terminal-card relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          whileHover={{ boxShadow: "0 0 30px rgba(34,197,94,0.15)" }}
        >
          {!bootComplete ? (
            <div className="p-4 font-mono text-xs">
              <div className="text-[#555] mb-2">
                <span style={{ color: "var(--terminal-accent)" }}>hollali</span>
                @portfolio ~ % ./boot
              </div>
              {bootLines.slice(0, visibleBootLines).map((line, i) => (
                <motion.div
                  key={i}
                  className="mb-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-[#555]">[ {String(i + 1).padStart(2, "0")} ]</span>{" "}
                  <span className={line.text.includes("[OK]") ? "text-[#22c55e]" : "text-[#e0e0e0]"}>
                    {line.text}
                  </span>
                </motion.div>
              ))}
              <motion.span
                className="text-[#666]"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                _
              </motion.span>
            </div>
          ) : (
            <motion.div
              className="flex flex-col md:flex-row items-start gap-6 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="shrink-0 relative"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  className="absolute -inset-1 rounded-full opacity-40"
                  style={{
                    background: 'conic-gradient(from 0deg, var(--terminal-accent), transparent, var(--terminal-accent), transparent, var(--terminal-accent))',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="w-24 h-24 rounded-full overflow-hidden border-2 relative"
                  style={{
                    borderColor: 'var(--terminal-accent)',
                    boxShadow: '0 0 15px color-mix(in srgb, var(--terminal-accent) 30%, transparent)',
                  }}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/hollali.jpeg"
                    alt="Hollali"
                    fill
                    sizes="96px"
                    loading="eager"
                    className="object-cover"
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: 'linear-gradient(180deg, transparent 0%, var(--terminal-accent) 50%, transparent 100%)',
                      opacity: 0.1,
                    }}
                    animate={{ y: ['-100%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </motion.div>
              <div className="min-w-0 flex-1">
                <motion.div
                  className="text-sm text-[#666] mb-1"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <span style={{ color: "var(--terminal-accent)" }}>hollali</span>
                  @portfolio ~ %
                </motion.div>

                <motion.pre
                  className="text-[10px] md:text-xs mb-3 leading-tight font-mono whitespace-pre overflow-x-auto"
                  style={{ color: 'var(--terminal-accent)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: showAscii ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {asciiArt}
                </motion.pre>

                <motion.div
                  className="text-sm text-[#e0e0e0] mb-4 min-h-[20px]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <span style={{ color: "var(--terminal-accent)" }}>$ </span>
                  <span>{displayedTagline}</span>
                  {showCursor && <span className="cursor-blink">|</span>}
                </motion.div>
                <motion.div
                  className="text-xs text-[#999] mb-4 leading-relaxed max-w-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.4 }}
                >
                  Hi, I&apos;m <span className="text-[#e0e0e0]">Hollali Kelvin</span> — a software engineer from
                  Accra, Ghana. I specialize in <span style={{ color: "var(--terminal-accent)" }}>React</span>,{" "}
                  <span style={{ color: "var(--terminal-accent)" }}>Next.js</span>, and{" "}
                  <span style={{ color: "var(--terminal-accent)" }}>Node.js</span>, with experience building
                  full-stack web apps, mobile interfaces, and cloud-deployed services. Currently focused on
                  creating performant, accessible experiences and contributing to open source.
                </motion.div>
                <motion.div
                  className="flex flex-wrap gap-3 mb-4 text-xs"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 1.0 }}
                >
                  {[
                    { href: "/projects", label: "$ ./projects" },
                    { href: "/contact", label: "$ ./contact" },
                    { href: "https://github.com/hollali", label: "github", icon: FaGithub },
                    { href: "https://www.linkedin.com/in/hollali-kelvin-18600b225/", label: "linkedin", icon: FaLinkedin },
                    { href: "https://twitter.com/h_ollali", label: "twitter", icon: FaTwitter },
                  ].map((btn, i) => (
                    <motion.div
                      key={btn.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 1.0 + i * 0.08 }}
                    >
                      {btn.href.startsWith("http") ? (
                        <a
                          href={btn.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="terminal-btn text-xs flex items-center gap-1 cursor-pointer"
                          aria-label={btn.label}
                        >
                          {"icon" in btn && btn.icon && <btn.icon className="h-3 w-3" aria-hidden="true" />}
                          {btn.label}
                        </a>
                      ) : (
                        <Link href={btn.href} className="terminal-btn text-xs cursor-pointer">
                          {btn.label}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
