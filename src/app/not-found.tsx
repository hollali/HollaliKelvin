import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="terminal-card max-w-lg w-full text-center">
        <div className="text-xs text-[#ff4444] mb-4 font-mono">
          <span className="text-[#ff4444]">✗</span> command not found
        </div>
        <h1 className="text-2xl font-mono text-[#e0e0e0] mb-2">404</h1>
        <p className="text-xs text-[#666] mb-6 font-mono">
          The page you&apos;re looking for does not exist.
          <br />
          <span className="text-[#555]">Maybe you mistyped the path?</span>
        </p>
        <div className="text-xs text-[#666] mb-6 font-mono">
          <span style={{ color: 'var(--terminal-accent)' }}>$</span> ls -la /pages/
          <br />
          <span className="text-[#555]">drwxr-xr-x  hollali  hollali  home</span>
          <br />
          <span className="text-[#555]">drwxr-xr-x  hollali  hollali  about</span>
          <br />
          <span className="text-[#555]">drwxr-xr-x  hollali  hollali  projects</span>
          <br />
          <span className="text-[#555]">drwxr-xr-x  hollali  hollali  blogs</span>
          <br />
          <span className="text-[#555]">drwxr-xr-x  hollali  hollali  contact</span>
          <br />
          <span style={{ color: 'var(--terminal-accent)' }}>$</span> cd <span className="animate-pulse">_</span>
        </div>
        <Link href="/" className="terminal-btn text-xs">
          $ cd /
        </Link>
      </div>
    </div>
  )
}
