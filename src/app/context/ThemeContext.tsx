"use client";

import { createContext, useContext, useEffect, useState } from "react";

const modes = ["green", "amber", "blue", "purple", "red"] as const;
export type TerminalMode = (typeof modes)[number];

const accentMap: Record<TerminalMode, string> = {
  green: "#00ff41",
  amber: "#ffb000",
  blue: "#00bfff",
  purple: "#bf7fff",
  red: "#ff4444",
};

interface ThemeContextType {
  mode: TerminalMode;
  toggleMode: () => void;
  setMode: (mode: TerminalMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<TerminalMode>("green");
  const [mounted, setMounted] = useState(false);

  const setMode = (newMode: TerminalMode) => {
    setModeState(newMode);
    localStorage.setItem("terminal-mode", newMode);
    document.documentElement.style.setProperty(
      "--terminal-accent",
      accentMap[newMode]
    );
    modes.forEach((m) =>
      document.documentElement.classList.toggle(m, m === newMode)
    );
  };

  const toggleMode = () => {
    const idx = modes.indexOf(mode);
    setMode(modes[(idx + 1) % modes.length]);
  };

  useEffect(() => {
    const saved = localStorage.getItem("terminal-mode") as TerminalMode | null;
    const initial = saved || "green";
    setModeState(initial);
    document.documentElement.style.setProperty(
      "--terminal-accent",
      accentMap[initial]
    );
    modes.forEach((m) =>
      document.documentElement.classList.toggle(m, m === initial)
    );
    document.documentElement.classList.add("dark");
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
