'use client'

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-3xl mx-auto py-20 px-4 text-center">
      <div className="terminal-card p-8">
        <div className="text-xs text-[#666] mb-4 font-mono">
          <span style={{ color: 'var(--terminal-accent)' }}>$</span> ./render --page
        </div>
        <div className="text-lg font-mono" style={{ color: 'var(--terminal-accent)' }}>
          !!! SEGFAULT !!!
        </div>
        <p className="text-xs text-[#666] mt-3 mb-6 font-mono">
          Something went wrong while rendering this page.
        </p>
        <hr className="terminal-separator mb-6" />
        <div className="flex justify-center gap-3">
          <button
            onClick={reset}
            className="terminal-btn text-xs"
          >
            $ ./retry
          </button>
          <a href="/" className="terminal-btn text-xs">
            $ cd ~
          </a>
        </div>
        <div className="text-[10px] text-[#555] mt-4 font-mono">
          signal 11 (SIGSEGV)
        </div>
      </div>
    </div>
  )
}
