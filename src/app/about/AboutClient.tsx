"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaCode,
  FaLaptopCode,
  FaGraduationCap,
  FaDatabase,
  FaLock,
  FaCogs,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBriefcase,
} from "react-icons/fa";
import AmbientBackground from "../components/AmbientBackground";
import SectionHeading from "../components/SectionHeading";

const navSections = [
  { id: "overview", label: "overview", num: "01" },
  { id: "skills", label: "skills", num: "02" },
  { id: "experience", label: "experience", num: "03" },
  { id: "education", label: "education", num: "04" },
];

const skills = {
  frontend: [
    "React / Next.js",
    "TypeScript",
    "Tailwind CSS",
    "HTML5 / CSS3",
    "JavaScript",
    "SASS / SCSS",
    "Vue.js",
    "Angular",
    "Redux",
    "Zustand",
  ],
  backend: [
    "Node.js",
    "Express",
    "PostgreSQL",
    "PHP",
    "MongoDB",
    "Python",
    "Django",
    "Flask",
  ],
  build: [
    "Vite",
    "Webpack",
    "Babel",
    "ESLint",
    "Prettier",
    "TurboRepo",
    "Prisma",
  ],
  authentication: [
    "JWT",
    "OAuth2",
    "Next Auth",
    "Firebase Auth",
    "Auth0",
    "Clerk",
    "Appwrite Auth",
    "Supabase Auth",
    "BetterStack Auth",
  ],
  database: [
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "SQLite",
    "Firebase",
    "Appwrite",
    "Supabase",
    "Neo4j",
  ],
  CLI: ["Bash", "Zsh", "Fish", "PowerShell", "Windows Command Prompt"],
  tools: ["Git / GitHub", "GitLab", "Docker", "AWS", "CI/CD"],
};

const skillGroups = [
  { title: "frontend", icon: FaCode, items: skills.frontend, span: "2" },
  { title: "backend", icon: FaLaptopCode, items: skills.backend },
  { title: "database", icon: FaDatabase, items: skills.database },
  { title: "authentication", icon: FaLock, items: skills.authentication },
  { title: "build", icon: FaCogs, items: skills.build },
  { title: "tools", icon: FaGraduationCap, items: skills.tools },
  { title: "CLI", icon: FaLaptopCode, items: skills.CLI },
];

const experience = [
  {
    title: "Software Developer",
    company: "Freelance",
    period: "2023 - Present",
    items: [
      "Built full-stack web applications using Next.js, React, and Node.js",
      "Developed mobile applications with React Native and Flutter",
      "Implemented CI/CD pipelines and cloud deployments on AWS",
    ],
  },
  {
    title: "Junior Developer",
    company: "IPMC University College",
    period: "2021 - 2023",
    items: [
      "Developed and maintained RESTful APIs and web applications",
      "Built responsive user interfaces with React and TypeScript",
      "Collaborated on capstone projects involving full-stack development",
    ],
  },
];

const quickStats = [
  { value: "5+", label: "years of experience" },
  { value: "30+", label: "technologies" },
  { value: "OSS", label: "open source" },
  { value: "Accra", label: "based in Ghana" },
];

export default function AboutClient() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    for (const sec of navSections) {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden pt-14 pb-10 md:pt-20 md:pb-14">
        <AmbientBackground />
        <div className="relative z-10 max-w-6xl mx-auto px-4 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p
              className="text-xs md:text-sm mb-3"
              style={{ color: "var(--terminal-accent)" }}
            >
              hollali@portfolio ~ % whoami
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-[#e0e0e0] mb-3">
              Hollali <span style={{ color: "var(--terminal-accent)" }}>Kelvin</span>
            </h1>
            <p className="text-sm md:text-base text-[#999] mb-5">
              Software Engineer & Mobile Developer building for the web and
              beyond.
            </p>
            <p className="text-xs md:text-sm text-[#666] leading-relaxed max-w-lg mb-6">
              Passionate about clean code and solid architecture. With a strong
              foundation in both frontend and backend engineering, I turn ideas
              into seamless user experiences and robust server-side solutions.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="terminal-btn terminal-btn-accent text-sm cursor-pointer">
                $ ./contact
              </Link>
              <Link href="/resume" className="terminal-btn text-sm cursor-pointer">
                $ cat resume.md
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="terminal-card p-0! overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="terminal-titlebar">
              <div className="flex gap-1.5">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
              </div>
              <span className="text-xs text-[#666] ml-2">neofetch</span>
            </div>
            <div className="p-5">
              <pre
                className="text-[10px] md:text-[11px] leading-relaxed font-mono overflow-x-auto"
                style={{ color: "var(--terminal-accent)" }}
              >
{`      .--.       hollali@portfolio
     |o_o |      ----------------
     |:_/ |      OS:      Portfolio v1.0
    //   \\ \\     Host:    hollali-portfolio.netlify.app
   (|     | )    Kernel:  Next.js 16.2.9
  /'\\_   _/\`\\    Shell:   React 19.0.0
  \\___)=(___/    Terminal: Geist Mono
                 CPU:     Full Stack Developer
                 Memory:  50+ GB of knowledge
                 Uptime:  5+ yrs and counting`}
              </pre>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Scroll-spy section nav */}
      <nav
        className="sticky top-0 z-30 border-y border-[#2a2a2a] bg-[#141414]/95 backdrop-blur"
        aria-label="On this page"
      >
        <div className="max-w-6xl mx-auto px-4 flex items-center gap-1 overflow-x-auto py-1.5 no-scrollbar">
          <span className="text-[10px] text-[#555] font-mono mr-2 shrink-0">$ ls sections/</span>
          {navSections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="terminal-tag text-[10px] shrink-0 transition-colors cursor-pointer"
              style={{
                borderColor: active === sec.id ? "var(--terminal-accent)" : "var(--color-terminal-border)",
                color: active === sec.id ? "var(--terminal-accent)" : "#666",
                background: active === sec.id ? "color-mix(in srgb, var(--terminal-accent) 8%, transparent)" : "transparent",
              }}
            >
              [{sec.num}] {sec.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Overview */}
      <section id="overview" className="max-w-6xl mx-auto px-4 py-12">
        <SectionHeading
          prompt="$ cat overview.md"
          title="Overview"
          description="A quick look at who I am, what I do, and where I'm based."
        />
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] items-start">
          <p className="text-xs md:text-sm text-[#999] leading-relaxed">
            I&apos;m a self-driven software developer from{" "}
            <span className="text-[#e0e0e0]">Accra, Ghana</span>, currently focused on
            building performant, accessible web applications and mobile
            interfaces. I love working across the full stack — from designing
            polished UIs to shipping robust APIs and cloud deployments — and I
            regularly contribute to open source.
          </p>
          <dl className="grid grid-cols-2 gap-3">
            {quickStats.map((stat) => (
              <div key={stat.label} className="terminal-card py-3! text-center">
                <dd
                  className="text-lg font-bold"
                  style={{ color: "var(--terminal-accent)" }}
                >
                  {stat.value}
                </dd>
                <dt className="text-[10px] text-[#666] uppercase tracking-wider mt-0.5">
                  {stat.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-6xl mx-auto px-4 py-12">
        <SectionHeading
          prompt="$ tree skills/"
          title="Skills & Stack"
          description="The languages, frameworks, and tooling I reach for day to day."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.title}
              className={group.span === "2" && gi === 0 ? "terminal-card md:col-span-2" : "terminal-card"}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: gi * 0.05 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="flex items-center gap-2 mb-3">
                <group.icon
                  className="h-4 w-4"
                  style={{ color: "var(--terminal-accent)" }}
                />
                <span className="text-xs" style={{ color: "var(--terminal-accent)" }}>
                  {group.title}/
                </span>
              </div>
              <div className="space-y-1">
                {group.items.map((item) => (
                  <div
                    key={item}
                    className="text-xs text-[#e0e0e0] flex items-center gap-2"
                  >
                    <span className="text-[#666]">|--</span>
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="max-w-6xl mx-auto px-4 py-12">
        <SectionHeading
          prompt="$ cat experience.log"
          title="Experience"
          description="Where I've worked and what I shipped along the way."
        />
        <ol className="relative border-l border-[#2a2a2a] ml-2 space-y-8">
          {experience.map((exp, ei) => (
            <motion.li
              key={exp.title}
              className="relative pl-6"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: ei * 0.1 }}
            >
              <span
                className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[#141414]"
                style={{ background: "var(--terminal-accent)" }}
                aria-hidden
              />
              <div className="terminal-card py-4!">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-2">
                  <h3 className="text-sm text-[#e0e0e0]">{exp.title}</h3>
                  <span
                    className="text-xs flex items-center gap-1"
                    style={{ color: "var(--terminal-accent)" }}
                  >
                    <FaBriefcase className="h-3 w-3" />
                    {exp.company}
                  </span>
                  <span className="text-[10px] text-[#555] border border-[#2a2a2a] px-1.5 py-0.5 ml-auto">
                    {exp.period}
                  </span>
                </div>
                <ul className="space-y-1">
                  {exp.items.map((item, ii) => (
                    <li
                      key={ii}
                      className="text-xs text-[#666] flex items-start gap-2"
                    >
                      <span className="text-[#555]">*</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Education */}
      <section id="education" className="max-w-6xl mx-auto px-4 py-12">
        <SectionHeading
          prompt="$ cat education.md"
          title="Education"
          description="The foundation it all started on."
        />
        <motion.div
          className="terminal-card py-5!"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
        >
          <div className="flex items-start gap-4">
            <FaGraduationCap
              className="h-6 w-6 shrink-0 mt-0.5"
              style={{ color: "var(--terminal-accent)" }}
            />
            <div className="min-w-0">
              <div className="text-sm text-[#e0e0e0] mb-1">
                Advanced Diploma in Software Engineering
              </div>
              <div
                className="text-xs mb-2"
                style={{ color: "var(--terminal-accent)" }}
              >
                IPMC University College &mdash; 2021 - 2025
              </div>
              <p className="text-xs text-[#666] leading-relaxed">
                Graduated with honors. Focused on software engineering, web
                development, and database management. Completed several projects
                involving full-stack development, including both frontend and
                backend components.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 pt-12">
        <motion.div
          className="terminal-card p-6! flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
        >
          <div>
            <div className="text-sm md:text-base font-bold text-[#e0e0e0] mb-1">
              Let&apos;s build something great together.
            </div>
            <p className="text-xs text-[#666]">
              Open to freelance projects, full-time roles, and collaborations.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/contact" className="terminal-btn terminal-btn-accent text-sm cursor-pointer">
              $ ./contact
            </Link>
            <a
              href="mailto:dheztinykartel@gmail.com"
              className="terminal-btn text-sm cursor-pointer flex items-center gap-2"
            >
              <FaEnvelope className="h-3 w-3" />
              email
            </a>
          </div>
        </motion.div>
        <div className="flex items-center justify-center gap-6 mt-8 text-[10px] text-[#555] font-mono">
          <span className="flex items-center gap-1.5">
            <FaMapMarkerAlt className="h-3 w-3" /> accra, ghana
          </span>
          <span>|</span>
          <span>exit code: <span style={{ color: "var(--terminal-accent)" }}>0</span></span>
        </div>
      </section>
    </div>
  );
}