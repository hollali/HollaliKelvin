"use client";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const iconLinks = [
  { href: "https://github.com/hollali", icon: FaGithub, label: "GitHub" },
  { href: "https://twitter.com/h_ollali", icon: FaTwitter, label: "Twitter" },
  { href: "https://www.linkedin.com/in/hollali-kelvin-18600b225/", icon: FaLinkedin, label: "LinkedIn" },
]

export default function Footer() {
  return (
    <motion.footer
      className="border-t border-[#2a2a2a]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
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
            --- EOF ---
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}
