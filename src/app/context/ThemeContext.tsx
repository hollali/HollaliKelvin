"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type TerminalMode = "green" | "amber";

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
      newMode === "amber" ? "#ffb000" : "#00ff41"
    );
    document.documentElement.classList.toggle("amber", newMode === "amber");
    document.documentElement.classList.toggle("green", newMode === "green");
  };

  const toggleMode = () => {
    setMode(mode === "green" ? "amber" : "green");
  };

  useEffect(() => {
    const saved = localStorage.getItem("terminal-mode") as TerminalMode | null;
    const initial = saved || "green";
    setModeState(initial);
    document.documentElement.style.setProperty(
      "--terminal-accent",
      initial === "amber" ? "#ffb000" : "#00ff41"
    );
    document.documentElement.classList.toggle("amber", initial === "amber");
    document.documentElement.classList.toggle("green", initial === "green");
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
