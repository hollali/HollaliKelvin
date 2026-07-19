'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

interface HistoryEntry {
  command: string
  output: string[]
}

const COMMANDS: Record<string, (args: string) => string[]> = {
  help: () => [
    'Available commands:',
    '  help          Show this help message',
    '  about         Display information about me',
    '  skills        List my technical skills',
    '  projects      Navigate to projects page',
    '  blogs         Navigate to blogs page',
    '  contact       Navigate to contact page',
    '  resume        Navigate to resume page',
    '  home          Navigate to home page',
    '  clear         Clear the terminal',
    '  whoami        Display current user',
    '  date          Show current date and time',
    '  uname         Show system information',
    '  neofetch      Display system info',
    '  echo [text]   Echo text back',
    '  history       Show command history',
  ],
  about: () => [
    'Hollali Kelvin',
    'Software Engineer | Mobile Developer | Web Developer',
    '',
    'Passionate about building modern web applications',
    'with expertise in React, Next.js, Node.js, and more.',
  ],
  skills: () => [
    'Frontend:  React, Next.js, TypeScript, Tailwind CSS, Vue.js',
    'Backend:   Node.js, Express, Python, Django, Flask',
    'Database:  PostgreSQL, MongoDB, Redis, Firebase',
    'Tools:     Git, Docker, AWS, CI/CD',
    'Mobile:    React Native, Flutter',
  ],
  projects: () => ['Navigating to /projects...'],
  blogs: () => ['Navigating to /blogs...'],
  contact: () => ['Navigating to /contact...'],
  resume: () => ['Navigating to /resume...'],
  home: () => ['Navigating to /...'],
  clear: () => ['__CLEAR__'],
  whoami: () => ['hollali'],
  date: () => [new Date().toString()],
  uname: () => [
    'Portfolio v1.0',
    'Next.js 16.2.9',
    'React 19.0.0',
    'Geist Mono terminal',
  ],
  neofetch: () => [
    '    .--.       hollali@portfolio',
    '   |o_o |      ----------------',
    '   |:_/ |      OS:      Portfolio v1.0',
    '  //   \\ \\     Kernel:  Next.js 16.2.9',
    ' (|     | )    Shell:   React 19.0.0',
    "/'\\_   _/\\`\\    Terminal: Geist Mono",
    ' \\___)=(___/    CPU:     Full Stack Developer',
  ],
  echo: (args: string) => [args],
  history: () => [], // handled dynamically
}

export default function TerminalClient() {
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const scrollToBottom = useCallback(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [history, scrollToBottom])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    const parts = trimmed.split(' ')
    const command = parts[0].toLowerCase()
    const args = parts.slice(1).join(' ')

    if (command === 'clear') {
      setHistory([])
      setInput('')
      return
    }

    if (command === 'history') {
      const output = cmdHistory.map((c, i) => `  ${String(i + 1).padStart(4)}  ${c}`)
      setHistory((prev) => [...prev, { command: trimmed, output }])
      setInput('')
      return
    }

    const handler = COMMANDS[command]
    let output: string[]

    if (handler) {
      output = handler(args)
    } else {
      output = [`command not found: ${command}. Type 'help' for available commands.`]
    }

    // Navigation commands
    if (['projects', 'blogs', 'contact', 'resume', 'home'].includes(command)) {
      setHistory((prev) => [...prev, { command: trimmed, output }])
      setInput('')
      setTimeout(() => {
        router.push(command === 'home' ? '/' : `/${command}`)
      }, 500)
      return
    }

    setHistory((prev) => [...prev, { command: trimmed, output }])
    setCmdHistory((prev) => [...prev, trimmed])
    setHistoryIdx(-1)
    setInput('')
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand(input)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length > 0) {
        const newIdx = historyIdx < cmdHistory.length - 1 ? historyIdx + 1 : historyIdx
        setHistoryIdx(newIdx)
        setInput(cmdHistory[cmdHistory.length - 1 - newIdx] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIdx > 0) {
        const newIdx = historyIdx - 1
        setHistoryIdx(newIdx)
        setInput(cmdHistory[cmdHistory.length - 1 - newIdx] || '')
      } else {
        setHistoryIdx(-1)
        setInput('')
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault()
      setHistory([])
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div
        className="text-xs text-[#666] mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span style={{ color: 'var(--terminal-accent)' }}>~</span> $ terminal
        <hr className="terminal-separator my-2" />
      </motion.div>

      <div
        className="terminal-card font-mono text-xs cursor-text min-h-[60vh] max-h-[70vh] overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="mb-4 text-[#666]">
          <div>Welcome to the interactive terminal.</div>
          <div>Type <span style={{ color: 'var(--terminal-accent)' }}>help</span> for available commands.</div>
          <div className="text-[#555] mt-1">Press ↑/↓ for command history, Ctrl+L to clear.</div>
        </div>

        {history.map((entry, i) => (
          <div key={i} className="mb-3">
            <div className="flex items-center gap-2">
              <span style={{ color: 'var(--terminal-accent)' }}>hollali</span>
              <span className="text-[#555]">@portfolio</span>
              <span className="text-[#555]">$</span>
              <span className="text-[#e0e0e0]">{entry.command}</span>
            </div>
            {entry.output.length > 0 && (
              <div className="ml-0 mt-1">
                {entry.output.map((line, j) => (
                  <div key={j} className="text-[#666] whitespace-pre">{line}</div>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="flex items-center gap-2">
          <span style={{ color: 'var(--terminal-accent)' }}>hollali</span>
          <span className="text-[#555]">@portfolio</span>
          <span className="text-[#555]">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-xs text-[#e0e0e0] font-mono"
            autoFocus
            spellCheck={false}
            aria-label="Terminal input"
          />
          <span className="cursor-blink text-[#666]">|</span>
        </div>
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
