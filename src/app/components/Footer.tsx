"use client";
import Link from "next/link";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const iconLinks = [
  { href: "https://github.com/hollali", icon: FaGithub, label: "GitHub" },
  { href: "https://twitter.com/h_ollali", icon: FaTwitter, label: "Twitter" },
  { href: "https://www.linkedin.com/in/hollali-kelvin-18600b225/", icon: FaLinkedin, label: "LinkedIn" },
]

const navLinks = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/blogs", label: "blogs" },
  { href: "/resume", label: "resume" },
  { href: "/contact", label: "contact" },
]

export default function Footer() {
  const pathname = usePathname()
  const [time, setTime] = useState('')

  useEffect(() => {
    function update() {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.footer
      className="border-t border-[#2a2a2a] bg-[#141414]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {/* Main footer row */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid gap-8 sm:grid-cols-3 text-xs">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="text-[11px] font-mono" style={{ color: 'var(--terminal-accent)' }}>hollali@portfolio</div>
            <p className="text-[#666] mt-2 leading-relaxed max-w-xs">
              Software engineer building performant web & mobile experiences from Accra, Ghana.
            </p>
          </motion.div>

          <motion.nav
            aria-label="Footer navigation"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="text-[11px] uppercase tracking-wider text-[#666] mb-2">navigate</div>
            <ul className="space-y-1 font-mono">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[#666] hover:text-[var(--terminal-accent)] transition-colors"
                    style={pathname === item.href ? { color: 'var(--terminal-accent)' } : undefined}
                  >
                    ./{item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="text-[11px] uppercase tracking-wider text-[#666] mb-2">connect</div>
            <div className="flex gap-2 mb-4">
              {iconLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-btn text-[10px] px-2.5 py-1.5"
                  style={{ color: "#666" }}
                  whileHover={{ color: "var(--terminal-accent)", scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  aria-label={link.label}
                >
                  <link.icon className="h-3 w-3" />
                </motion.a>
              ))}
            </div>
            <div className="text-[#555] font-mono">
              <span className="text-[#666]">&copy; {new Date().getFullYear()}</span> Hollali Kelvin
              <span className="ml-3">exit code: <span style={{ color: 'var(--terminal-accent)' }}>0</span></span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Status bar row */}
      <div className="border-t border-[#2a2a2a] px-4 py-1 flex items-center justify-between text-[10px] font-mono">
        <div className="flex items-center gap-4">
          <span style={{ color: 'var(--terminal-accent)' }}>hollali@portfolio</span>
          <span className="text-[#555]">|</span>
          <span className="text-[#666]">{pathname}</span>
        </div>
        <div className="flex items-center gap-4 text-[#555]">
          <span>next.js 16</span>
          <span className="text-[#555]">|</span>
          <span>react 19</span>
          <span className="text-[#555]">|</span>
          <span style={{ color: 'var(--terminal-accent)' }}>{time}</span>
        </div>
      </div>
    </motion.footer>
  );
}