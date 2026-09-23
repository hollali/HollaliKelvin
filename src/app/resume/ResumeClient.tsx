'use client'

import Link from 'next/link'
import { FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaCheck, FaPrint } from 'react-icons/fa'
import { motion } from 'framer-motion'
import AmbientBackground from '../components/AmbientBackground'

const skillGroups = [
  { label: 'Frontend', items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript', 'Redux / Zustand'] },
  { label: 'Backend', items: ['Node.js / Express', 'PostgreSQL', 'MongoDB', 'Python / Django'] },
  { label: 'Tools', items: ['Git / GitHub', 'Docker', 'AWS / CI/CD', 'TurboRepo'] },
]

const experience = [
  {
    role: 'Software Developer',
    company: 'Freelance',
    period: '2023 - Present',
    items: [
      'Built full-stack web applications using Next.js, React, and Node.js',
      'Developed mobile applications with React Native and Flutter',
      'Implemented CI/CD pipelines and cloud deployments on AWS',
    ],
  },
  {
    role: 'Junior Developer',
    company: 'IPMC University College',
    period: '2021 - 2023',
    items: [
      'Developed and maintained RESTful APIs and web applications',
      'Built responsive user interfaces with React and TypeScript',
      'Collaborated on capstone projects involving full-stack development',
    ],
  },
]

export default function ResumeClient() {
  return (
    <div className="pb-20">
      {/* Header */}
      <section className="relative overflow-hidden pt-14 pb-8 md:pt-20 md:pb-10">
        <AmbientBackground />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs md:text-sm mb-3" style={{ color: 'var(--terminal-accent)' }}>
              hollali@portfolio ~ % cat resume.md
            </p>
            <h1 className="text-2xl md:text-4xl font-bold text-[#e0e0e0] mb-3">Resume</h1>
            <p className="text-sm md:text-base text-[#999] leading-relaxed max-w-2xl">
              A snapshot of my experience, skills, and education. Want the PDF
              version? Send me a message and I&apos;ll fire it over.
            </p>
            <hr className="terminal-separator" />
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 grid gap-8 lg:grid-cols-[minmax(240px,300px)_1fr] lg:items-start">
        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-6">
          <motion.div
            className="terminal-card py-6!"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="h-2 w-2 rounded-full" style={{ background: 'var(--terminal-accent)' }} />
              <span className="text-[10px] text-[#666] uppercase tracking-wider">
                status: available
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#e0e0e0] mb-1">Hollali Kelvin</h2>
            <p className="text-xs text-[#666] mb-4">Software Engineer / Mobile Developer</p>

            <dl className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <FaEnvelope className="h-3 w-3 shrink-0 text-[#555]" aria-hidden="true" />
                <a href="mailto:dheztinykartel@gmail.com" className="text-[#e0e0e0] hover:text-[var(--terminal-accent)] transition-colors break-all">
                  dheztinykartel@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="h-3 w-3 shrink-0 text-[#555]" aria-hidden="true" />
                <span className="text-[#e0e0e0]">Accra, Ghana</span>
              </div>
            </dl>

            <hr className="terminal-separator my-4" />

            <div className="flex gap-2 no-print">
              <button
                onClick={() => window.print()}
                className="terminal-btn terminal-btn-accent text-xs flex-1 flex items-center justify-center gap-2 py-2.5 cursor-pointer"
              >
                <FaPrint className="h-3 w-3" aria-hidden="true" /> ./save_as_pdf
              </button>
              <Link
                href="/contact"
                className="terminal-btn text-xs flex items-center justify-center gap-2 py-2.5 cursor-pointer"
              >
                <FaEnvelope className="h-3 w-3" aria-hidden="true" /> ./request_copy
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="terminal-card py-4!"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-[10px] uppercase tracking-wider text-[#666] mb-3">
              quick_skills/
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skillGroups.flatMap((g) => g.items.slice(0, 2)).map((item) => (
                <span key={item} className="terminal-tag text-[9px]">
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </aside>

        {/* Main document */}
        <div className="min-w-0 space-y-4">
          <motion.div
            className="terminal-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-xs mb-3" style={{ color: 'var(--terminal-accent)' }}># Summary</div>
            <p className="text-xs md:text-sm text-[#e0e0e0] leading-relaxed">
              Passionate Software Developer with expertise in building modern web
              applications. Strong foundation in both frontend and backend
              technologies, creating seamless user experiences and robust
              server-side solutions — from polished UIs to cloud-deployed services.
            </p>
          </motion.div>

          <motion.div
            className="terminal-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="text-xs mb-4" style={{ color: 'var(--terminal-accent)' }}># Experience</div>
            <ol className="relative border-l border-[#2a2a2a] ml-1 space-y-6">
              {experience.map((exp) => (
                <li key={exp.role} className="relative pl-5">
                  <span
                    className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-[#141414]"
                    style={{ background: 'var(--terminal-accent)' }}
                    aria-hidden
                  />
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-1.5">
                    <h3 className="text-sm text-[#e0e0e0]">{exp.role}</h3>
                    <span className="text-xs flex items-center gap-1" style={{ color: 'var(--terminal-accent)' }}>
                      <FaBriefcase className="h-3 w-3" aria-hidden="true" />
                      {exp.company}
                    </span>
                    <span className="text-[10px] text-[#555] border border-[#2a2a2a] px-1.5 py-0.5 ml-auto">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {exp.items.map((item, ii) => (
                      <li key={ii} className="text-xs text-[#666] flex items-start gap-2">
                        <span className="text-[#555]">*</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </motion.div>

          <motion.div
            className="terminal-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-xs mb-3" style={{ color: 'var(--terminal-accent)' }}># Education</div>
            <div className="flex items-start gap-3">
              <FaGraduationCap className="h-5 w-5 shrink-0 mt-0.5" style={{ color: 'var(--terminal-accent)' }} aria-hidden="true" />
              <div>
                <div className="text-sm text-[#e0e0e0]">Advanced Diploma in Software Engineering</div>
                <div className="text-xs mb-1" style={{ color: 'var(--terminal-accent)' }}>
                  IPMC University College | 2021 - 2025
                </div>
                <p className="text-xs text-[#666]">
                  Graduated with honors. Focused on software engineering, web
                  development, and database management.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="terminal-card"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="text-xs mb-4" style={{ color: 'var(--terminal-accent)' }}># Skills</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <div className="text-xs text-[#666] mb-2">
                    <span style={{ color: 'var(--terminal-accent)' }}>{group.label.toLowerCase()}/</span>
                  </div>
                  <ul className="space-y-1">
                    {group.items.map((item) => (
                      <li key={item} className="text-xs text-[#e0e0e0] flex items-start gap-2">
                        <FaCheck className="h-3 w-3 shrink-0 mt-0.5" style={{ color: 'var(--terminal-accent)' }} aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="text-center pt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/contact" className="terminal-btn terminal-btn-accent text-xs">
              $ ./contact
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}