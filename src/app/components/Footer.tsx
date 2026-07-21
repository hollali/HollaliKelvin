"use client";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const iconLinks = [
  { href: "https://github.com/hollali", icon: FaGithub, label: "GitHub" },
  { href: "https://twitter.com/h_ollali", icon: FaTwitter, label: "Twitter" },
  { href: "https://www.linkedin.com/in/hollali-kelvin-18600b225/", icon: FaLinkedin, label: "LinkedIn" },
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
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-xs">
          <motion.div
            className="text-[#666]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <span className="text-[#555]">~</span> $
            <span className="text-[#e0e0e0]"> Hollali </span>
            <span className="text-[#555]">
              &copy; {new Date().getFullYear()}
            </span>
          </motion.div>
          <motion.div
            className="flex space-x-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {iconLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#666" }}
                whileHover={{ color: "var(--terminal-accent)", scale: 1.2 }}
                transition={{ type: "spring", stiffness: 300 }}
                aria-label={link.label}
              >
                <link.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </motion.div>
          <motion.div
            className="text-[#555]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            exit code: <span style={{ color: 'var(--terminal-accent)' }}>0</span>
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