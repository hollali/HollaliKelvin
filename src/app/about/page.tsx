"use client";

import { FaCode, FaLaptopCode, FaGraduationCap } from "react-icons/fa";
import { motion } from "framer-motion";

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
  build: ["Vite", "Webpack", "Babel", "ESLint", "Prettier"],
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
  tools: ["Git / GitHub", "GitLab", "Docker", "AWS", "CI/CD"],
};

const experience = [
  {
    title: "Senior Full Stack Developer",
    company: "Company Name",
    period: "2020 - Present",
    items: [
      "Led development of multiple web applications using React and Node.js",
      "Implemented CI/CD pipelines reducing deployment time by 50%",
      "Mentored junior developers and conducted code reviews",
    ],
  },
  {
    title: "Full Stack Developer",
    company: "Previous Company",
    period: "2018 - 2020",
    items: [
      "Developed and maintained RESTful APIs",
      "Built responsive user interfaces with modern JavaScript frameworks",
      "Optimized database queries improving performance by 40%",
    ],
  },
];

export default function About() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <motion.div
        className="text-xs text-[#666] mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span style={{ color: "var(--terminal-accent)" }}>~</span> $ cat
        about.md
        <hr className="terminal-separator my-2" />
      </motion.div>

      <motion.div
        className="terminal-card mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div
          className="text-sm mb-1"
          style={{ color: "var(--terminal-accent)" }}
        >
          # About Me
        </div>
        <p className="text-xs text-[#e0e0e0] leading-relaxed">
          I&apos;m a passionate Software Developer with expertise in building
          modern web applications. With a strong foundation in both frontend and
          backend technologies, I create seamless user experiences and robust
          server-side solutions.
        </p>
      </motion.div>

      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-xs text-[#666] mb-4">
          <span style={{ color: "var(--terminal-accent)" }}>~</span> $ tree
          skills/
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "frontend", icon: FaCode, items: skills.frontend },
            { title: "backend", icon: FaLaptopCode, items: skills.backend },
            { title: "tools", icon: FaGraduationCap, items: skills.tools },
          ].map((group, gi) => (
            <motion.div
              key={group.title}
              className="terminal-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + gi * 0.1 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <group.icon
                  className="h-4 w-4"
                  style={{ color: "var(--terminal-accent)" }}
                />
                <span
                  className="text-xs"
                  style={{ color: "var(--terminal-accent)" }}
                >
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
      </motion.div>

      <motion.div
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="text-xs text-[#666] mb-4">
          <span style={{ color: "var(--terminal-accent)" }}>~</span> $ cat
          experience.log
        </div>
        {experience.map((exp, ei) => (
          <motion.div
            key={ei}
            className="terminal-card mb-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + ei * 0.1 }}
          >
            <div className="flex items-start gap-3">
              <div className="text-[#666] text-xs font-mono mt-0.5">
                {ei === 0 ? "│" : " "}
                <br />{" "}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm text-[#e0e0e0] mb-1">{exp.title}</div>
                <div
                  className="text-xs mb-2"
                  style={{ color: "var(--terminal-accent)" }}
                >
                  {exp.company} &mdash; {exp.period}
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
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <div className="text-xs text-[#666] mb-4">
          <span style={{ color: "var(--terminal-accent)" }}>~</span> $ cat
          education.md
        </div>
        <div className="terminal-card">
          <div className="text-sm text-[#e0e0e0] mb-1">
            Advanced Diploma in Software Engineering
          </div>
          <div
            className="text-xs mb-2"
            style={{ color: "var(--terminal-accent)" }}
          >
            IPMC University Collage &mdash; 2021 - 2025
          </div>
          <p className="text-xs text-[#666]">
            Graduated with honors. Focused on software engineering , web
            development, and database management. Completed several projects
            that involved full-stack development, including both frontend and
            backend components.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
