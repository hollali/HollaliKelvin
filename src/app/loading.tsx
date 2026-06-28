export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-xs text-[#666] mb-8">
        <span style={{ color: 'var(--terminal-accent)' }}>~</span> $ loading<span className="terminal-loading" />
        <hr className="terminal-separator my-2" />
      </div>
      <div className="terminal-card">
        <div className="text-xs text-[#666] font-mono">
          <span style={{ color: 'var(--terminal-accent)' }}>$</span> fetching data
          <span className="terminal-loading" />
        </div>
      </div>
    </div>
  )
}
