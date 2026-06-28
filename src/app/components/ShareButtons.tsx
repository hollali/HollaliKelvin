'use client'

import { FaTwitter, FaLinkedin, FaLink, FaCheck } from 'react-icons/fa'
import { useState } from 'react'

interface ShareButtonsProps {
  title: string
  url: string
}

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareLinks = [
    {
      label: 'Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      icon: FaTwitter,
    },
    {
      label: 'LinkedIn',
      href: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      icon: FaLinkedin,
    },
  ]

  const copyLink = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="terminal-card p-3 mt-6">
      <div className="text-[10px] text-[#555] font-mono mb-2">
        <span style={{ color: 'var(--terminal-accent)' }}>$</span> ./share --post &ldquo;{title}&rdquo;
      </div>
      <div className="flex gap-2">
        {shareLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="terminal-btn text-[10px] flex items-center gap-1"
          >
            <link.icon className="h-3 w-3" />
            {link.label}
          </a>
        ))}
        <button
          onClick={copyLink}
          className="terminal-btn text-[10px] flex items-center gap-1"
        >
          {copied ? <FaCheck className="h-3 w-3" /> : <FaLink className="h-3 w-3" />}
          {copied ? 'Copied!' : 'Copy link'}
        </button>
      </div>
    </div>
  )
}
