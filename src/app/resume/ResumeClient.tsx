'use client'

import Link from 'next/link'
import { FaDownload } from 'react-icons/fa'
import { motion } from 'framer-motion'

export default function ResumeClient() {
  const sections = [
    { title: '# Summary', delay: 0.15, content: (
      <p className="text-xs text-[#e0e0e0] leading-relaxed">
        Passionate Software Developer with expertise in building modern web applications.
        Strong foundation in both frontend and backend technologies, creating seamless
        user experiences and robust server-side solutions.
      </p>
    )},
    { title: '# Skills', delay: 0.25, content: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {[
          { label: 'Frontend', items: ['React / Next.js', 'TypeScript', 'Tailwind CSS'] },
          { label: 'Backend', items: ['Node.js / Express', 'PostgreSQL', 'MongoDB'] },
          { label: 'Tools', items: ['Git / GitHub', 'Docker', 'AWS / CI/CD'] },
        ].map((group) => (
          <motion.div
            key={group.label}
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <div className="text-[#666] mb-1">{group.label}</div>
            <div className="text-[#e0e0e0] space-y-0.5">
              {group.items.map((item) => (
                <div key={item}>|-- {item}</div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    )},
    { title: '# Experience', delay: 0.35, content: (
      <>
        {[
          { role: 'Software Developer', company: 'Freelance', period: '2023 - Present', items: [
            'Built full-stack web applications using Next.js, React, and Node.js',
            'Developed mobile applications with React Native and Flutter',
            'Implemented CI/CD pipelines and cloud deployments on AWS',
          ]},
          { role: 'Junior Developer', company: 'IPMC University College', period: '2021 - 2023', items: [
            'Developed and maintained RESTful APIs and web applications',
            'Built responsive user interfaces with React and TypeScript',
            'Collaborated on capstone projects involving full-stack development',
          ]},
        ].map((exp, ei) => (
          <motion.div
            key={ei}
            className={ei === 0 ? 'mb-4' : ''}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ei * 0.1 }}
          >
            <div className="text-sm text-[#e0e0e0]">{exp.role}</div>
            <div className="text-xs" style={{ color: 'var(--terminal-accent)' }}>{exp.company} | {exp.period}</div>
            <ul className="text-xs text-[#666] mt-1 space-y-0.5">
              {exp.items.map((item, ii) => (
                <motion.li
                  key={ii}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + ei * 0.1 + ii * 0.05 }}
                >
                  * {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </>
    )},
    { title: '# Education', delay: 0.45, content: (
      <>
        <div className="text-sm text-[#e0e0e0]">Advanced Diploma in Software Engineering</div>
        <div className="text-xs" style={{ color: 'var(--terminal-accent)' }}>IPMC University College | 2021 - 2025</div>
        <p className="text-xs text-[#666] mt-1">Graduated with honors. Focused on software engineering, web development, and database management.</p>
      </>
    )},
  ]

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div
        className="text-xs text-[#666] mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span style={{ color: 'var(--terminal-accent)' }}>~</span> $ cat resume.md
        <hr className="terminal-separator my-2" />
      </motion.div>

      <motion.div
        className="terminal-card mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <div className="flex items-start justify-between mb-4">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h1 className="text-lg font-mono text-[#e0e0e0]">Hollali Kelvin</h1>
            <p className="text-xs text-[#666]">Software Engineer / Mobile Developer</p>
            <p className="text-xs text-[#555]">dheztinykartel@gmail.com | Accra, Ghana</p>
          </motion.div>
          <motion.a
            href="#"
            className="terminal-btn text-xs flex items-center gap-1.5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.preventDefault()}
          >
            <FaDownload className="h-3 w-3" /> ./download.pdf
          </motion.a>
        </div>
      </motion.div>

      {sections.map((section) => (
        <motion.div
          key={section.title}
          className="terminal-card mb-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: section.delay }}
        >
          <div className="text-xs mb-2" style={{ color: 'var(--terminal-accent)' }}>{section.title}</div>
          {section.content}
        </motion.div>
      ))}

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Link href="/contact" className="terminal-btn text-xs">
          $ ./contact
        </Link>
      </motion.div>
    </div>
  )
}
