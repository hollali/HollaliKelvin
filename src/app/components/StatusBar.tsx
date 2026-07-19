'use client'

import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function StatusBar() {
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
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#2a2a2a] bg-[#141414] px-4 py-1 flex items-center justify-between text-[10px] font-mono">
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
  )
}
