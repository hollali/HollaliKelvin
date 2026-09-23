"use client";

import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const roles = [
  "web applications",
  "mobile interfaces",
  "cloud services",
  "open-source tools",
];

const stack = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "React Native",
  "PostgreSQL",
];

const stats = [
  { value: "5+", label: "years of experience" },
  { value: "30+", label: "technologies in stack" },
  { value: "OSS", label: "open-source contributor" },
];

const socials = [
  { href: "https://github.com/hollali", label: "github", icon: FaGithub },
  {
    href: "https://www.linkedin.com/in/hollali-kelvin-18600b225/",
    label: "linkedin",
    icon: FaLinkedin,
  },
  { href: "https://twitter.com/h_ollali", label: "twitter", icon: FaTwitter },
];

const bootLines: { text: string; delay: number }[] = [
  { text: "Initializing kernel...", delay: 60 },
  { text: "Enumerating filesystems... [OK]", delay: 70 },
  { text: "Loading system modules...  [OK]", delay: 75 },
  { text: "Mounting root partition...  [OK]", delay: 80 },
  { text: "Enabling network interfaces. [OK]", delay: 85 },
  { text: "Starting display server...  [OK]", delay: 90 },
  { text: "Launching shell...          [OK]", delay: 95 },
];

function useTypewriter(
  words: string[],
  opts?: { typing?: number; deleting?: number; pause?: number }
) {
  const { typing = 85, deleting: deleteSpeed = 40, pause = 1800 } = opts ?? {};
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setText(words[0]);
      return;
    }
    const word = words[index % words.length];
    let t: ReturnType<typeof setTimeout>;

    if (!deleting && text === word) {
      t = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIndex((i) => i + 1);
    } else {
      t = setTimeout(() => {
        setText(deleting ? word.slice(0, -1) : word.slice(0, text.length + 1));
      }, deleting ? deleteSpeed : typing);
    }
    return () => clearTimeout(t);
  }, [text, deleting, index, words, typing, deleteSpeed, pause]);

  return text;
}

export default function Hero() {
  const typedRole = useTypewriter(roles);
  const [visibleBootLines, setVisibleBootLines] = useState(0);
  const [bootComplete, setBootComplete] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setBootComplete(true);
      return;
    }
    if (visibleBootLines >= bootLines.length) {
      const t = setTimeout(() => setBootComplete(true), 180);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => setVisibleBootLines((prev) => prev + 1),
      bootLines[visibleBootLines]?.delay ?? 120
    );
    return () => clearTimeout(t);
  }, [visibleBootLines]);

  const bootProgress = Math.min(visibleBootLines / bootLines.length, 1);

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 hero-grid" />
        <div
          className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full blur-[72px]"
          style={{
            background:
              "color-mix(in srgb, var(--terminal-accent) 12%, transparent)",
          }}
        />
        <div
          className="absolute top-1/3 -right-24 h-[360px] w-[360px] rounded-full blur-[72px]"
          style={{
            background:
              "color-mix(in srgb, var(--terminal-accent) 8%, transparent)",
          }}
        />
      </div>

      <AnimatePresence>
        {!bootComplete && (
          <motion.div
            className="absolute inset-0 z-20 flex items-center justify-center px-4 bg-[#0a0a0a]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full max-w-xl">
              <div className="terminal-card p-0 overflow-hidden">
            <div className="terminal-titlebar">
              <div className="flex gap-1.5">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
              </div>
              <span className="text-xs text-[#666] ml-2">~/boot</span>
              <span className="ml-auto text-xs text-[#555]">bash</span>
            </div>
            <div className="p-5">
              <div
                className="text-xs mb-4"
                style={{ color: "var(--terminal-accent)" }}
              >
                hollali@portfolio ~ % ./boot
              </div>

              <div className="font-mono text-xs space-y-1.5 min-h-[150px]">
                {bootLines.slice(0, visibleBootLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-[#555]">
                      [ {String(i + 1).padStart(2, "0")} ]
                    </span>
                    <span
                      className={
                        line.text.includes("[OK]") ? "text-[#22c55e]" : "text-[#e0e0e0]"
                      }
                    >
                      {line.text}
                    </span>
                  </motion.div>
                ))}
                {visibleBootLines < bootLines.length && (
                  <motion.span
                    className="text-[#666]"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    _
                  </motion.span>
                )}
              </div>

              <div
                className="mt-5 h-0.5 w-full rounded-full overflow-hidden"
                style={{ background: "var(--color-terminal-border)" }}
              >
                <motion.div
                  className="h-full"
                  style={{ background: "var(--terminal-accent)" }}
                  animate={{ width: `${bootProgress * 100}%` }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-[10px] text-[#555] font-mono">
                <span>booting hollali@portfolio...</span>
                <span>{bootProgress === 1 ? "done" : `${Math.round(bootProgress * 100)}%`}</span>
              </div>
            </div>
</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

        <motion.div
          className="relative z-10 max-w-6xl mx-auto px-4 grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <span className="inline-flex items-center gap-2 terminal-btn text-xs px-3 py-1.5 mb-6">
              <span className="relative flex h-2 w-2">
                <motion.span
                  className="absolute inset-0 -m-1 rounded-full border"
                  style={{ borderColor: "var(--terminal-accent)" }}
                  animate={{ scale: [0.5, 1.6], opacity: [0.8, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ background: "var(--terminal-accent)" }}
                />
              </span>
              <span className="text-[#e0e0e0]">
                system online · available for freelance & full-time roles
              </span>
            </span>

            <p className="text-xs md:text-sm mb-3" style={{ color: "var(--terminal-accent)" }}>
              hollali@portfolio ~ % ./introduce
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-5">
              Hey, I&apos;m{" "}
              <span style={{ color: "var(--terminal-accent)" }}>Hollali Kelvin</span>
              .
              <span className="block mt-2">
                I build{" "}
                <span style={{ color: "var(--terminal-accent)" }}>
                  {typedRole}
                  <span className="cursor-blink">▍</span>
                </span>
              </span>
            </h1>

            <p className="text-sm md:text-base text-[#999] leading-relaxed max-w-xl mb-8">
              A software engineer from Accra, Ghana, crafting performant,
              accessible, and solidly-architected experiences — from modern web
              apps to mobile interfaces and cloud-deployed services.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link href="/projects" className="terminal-btn terminal-btn-accent text-sm cursor-pointer">
                $ ./view_projects
              </Link>
              <Link href="/contact" className="terminal-btn text-sm cursor-pointer">
                $ ./get_in_touch
              </Link>
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-6 mb-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: "var(--terminal-accent)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-[#666] uppercase tracking-wider mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center flex-wrap gap-3">
              <span className="text-[11px] text-[#666] uppercase tracking-wider mr-1">
                find_me_at:
              </span>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-btn text-xs flex items-center gap-1.5 px-3 py-1.5 cursor-pointer"
                  aria-label={social.label}
                >
                  <social.icon className="h-3 w-3" aria-hidden="true" />
                  {social.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <motion.div
              className="absolute -top-5 -right-2 md:-right-6 terminal-btn text-xs px-3 py-1.5 pointer-events-none"
              style={{ background: "var(--color-terminal-surface)" }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              <span style={{ color: "var(--terminal-accent)" }}>[</span>React
              <span style={{ color: "var(--terminal-accent)" }}>]</span>
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-2 md:-left-6 terminal-btn text-xs px-3 py-1.5 pointer-events-none"
              style={{ background: "var(--color-terminal-surface)" }}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden
            >
              <span style={{ color: "var(--terminal-accent)" }}>&lt;/&gt;</span>{" "}
              Next.js
            </motion.div>

            <div className="terminal-card overflow-hidden p-0">
              <div className="terminal-titlebar">
                <div className="flex gap-1.5">
                  <div className="terminal-dot terminal-dot-red" />
                  <div className="terminal-dot terminal-dot-yellow" />
                  <div className="terminal-dot terminal-dot-green" />
                </div>
                <span className="text-xs text-[#666] ml-2">~/about</span>
                <span className="ml-auto text-xs text-[#555]">zsh</span>
              </div>

              <div className="p-6">
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
                  <motion.div
                    className="shrink-0 relative"
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <motion.div
                      className="absolute -inset-1 rounded-full opacity-40"
                      style={{
                        background:
                          "conic-gradient(from 0deg, var(--terminal-accent), transparent, var(--terminal-accent), transparent, var(--terminal-accent))",
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="w-28 h-28 rounded-full overflow-hidden border-2 relative"
                      style={{
                        borderColor: "var(--terminal-accent)",
                        boxShadow:
                          "0 0 15px color-mix(in srgb, var(--terminal-accent) 30%, transparent)",
                      }}
                      animate={{ scale: [1, 1.03, 1] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Image
                        src="/hollali.jpeg"
                        alt="Hollali Kelvin"
                        fill
                        sizes="112px"
                        loading="eager"
                        className="object-cover"
                      />
                    </motion.div>
                  </motion.div>

                  <div className="font-mono text-xs leading-relaxed w-full min-w-0">
                    <p>
                      <span className="text-[#555]">$</span>{" "}
                      <span style={{ color: "var(--terminal-accent)" }}>whoami</span>
                    </p>
                    <p className="text-[#e0e0e0] mb-2">Hollali Kelvin</p>
                    <p>
                      <span className="text-[#555]">$</span>{" "}
                      <span style={{ color: "var(--terminal-accent)" }}>pwd</span>
                    </p>
                    <p className="text-[#e0e0e0] mb-2">~/accra/ghana</p>
                    <p>
                      <span className="text-[#555]">$</span>{" "}
                      <span style={{ color: "var(--terminal-accent)" }}>cat</span>{" "}
                      ./stack
                    </p>
                    <p className="text-[#e0e0e0] mb-2">[{stack.join(", ")}]</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-t border-[#2a2a2a] pt-3 text-xs text-[#666]">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--terminal-accent)" }}
                  />
                  <span>system_online</span>
                  <span className="ml-auto">
                    <span className="text-[#22c55e]">[OK]</span> open for new work
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
    </section>
  );
}