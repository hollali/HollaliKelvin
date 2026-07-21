"use client";
import Link from "next/link";
import { useTheme, type TerminalMode } from "../context/ThemeContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/blogs", label: "blogs" },
  { href: "/resume", label: "resume" },
  { href: "/contact", label: "contact" },
];

const modeDots: Record<TerminalMode, string> = {
  green: "#00ff41",
  amber: "#ffb000",
  blue: "#00bfff",
  purple: "#bf7fff",
  red: "#ff4444",
};

export default function Navbar() {
  const { mode, toggleMode, setMode } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <nav className="terminal-window border-x-0 border-t-0" aria-label="Main navigation">
      <div className="terminal-titlebar">
        <div className="flex gap-1.5">
          <div className="terminal-dot terminal-dot-red" />
          <div className="terminal-dot terminal-dot-yellow" />
          <div className="terminal-dot terminal-dot-green" />
        </div>
        <span className="text-xs text-[#666] ml-2 max-sm:hidden">
          hollali@portfolio:~$
        </span>
        <div className="ml-auto flex items-center gap-4 text-xs">
          <div className="hidden sm:flex items-center gap-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:opacity-80 transition-opacity"
                style={{ color: 'var(--terminal-accent)' }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1.5" role="radiogroup" aria-label="Theme color">
            {(Object.entries(modeDots) as [TerminalMode, string][]).map(([key, color]) => (
              <button
                key={key}
                onClick={() => setMode(key)}
                className="w-2.5 h-2.5 rounded-full border border-[#2a2a2a] transition-all"
                style={{
                  backgroundColor: key === mode ? color : "transparent",
                  transform: key === mode ? "scale(1.3)" : "scale(1)",
                }}
                title={`${key} mode`}
                role="radio"
                aria-checked={key === mode}
                aria-label={`${key} theme`}
              />
            ))}
          </div>

          <button
            onClick={toggleMode}
            className="hover:opacity-80 transition-opacity"
            title="Cycle mode"
            style={{ color: 'var(--terminal-accent)' }}
            aria-label={`Current theme: ${mode}. Click to cycle.`}
          >
            [{mode}]
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden hover:opacity-80 transition-opacity"
            style={{ color: 'var(--terminal-accent)' }}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            [{open ? "close" : "menu"}]
          </button>
        </div>
      </div>
      <div className="hidden sm:flex justify-end px-4 py-1 border-b border-[#2a2a2a]">
        <kbd className="text-[10px] text-[#555] font-mono">
          ^K to search
        </kbd>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="sm:hidden border-b border-[#2a2a2a] p-2 space-y-1 overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="menu"
          >
            {menuItems.map((item) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={item.href}
                  className="block px-2 py-1 text-sm hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--terminal-accent)' }}
                  onClick={() => setOpen(false)}
                  role="menuitem"
                >
                  $ cd {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
