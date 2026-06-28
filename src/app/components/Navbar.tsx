"use client";
import Link from "next/link";
import { useTheme, type TerminalMode } from "../context/ThemeContext";
import { useState } from "react";

const menuItems = [
  { href: "/", label: "home" },
  { href: "/about", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/blogs", label: "blogs" },
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
    <nav className="terminal-window border-x-0 border-t-0">
      <div className="terminal-titlebar">
        <div className="flex gap-1.5">
          <div className="terminal-dot terminal-dot-red" />
          <div className="terminal-dot terminal-dot-yellow" />
          <div className="terminal-dot terminal-dot-green" />
        </div>
        <span className="text-xs text-[#666] ml-2">
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

          <div className="hidden sm:flex items-center gap-1.5">
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
              />
            ))}
          </div>

          <button
            onClick={toggleMode}
            className="hover:opacity-80 transition-opacity"
            title="Cycle mode"
            style={{ color: 'var(--terminal-accent)' }}
          >
            [{mode}]
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="sm:hidden hover:opacity-80 transition-opacity"
            style={{ color: 'var(--terminal-accent)' }}
          >
            [{open ? "close" : "menu"}]
          </button>
        </div>
      </div>
      {open && (
        <div className="sm:hidden border-b border-[#2a2a2a] p-2 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-2 py-1 text-sm hover:opacity-80 transition-opacity"
              style={{ color: 'var(--terminal-accent)' }}
              onClick={() => setOpen(false)}
            >
              $ cd {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
