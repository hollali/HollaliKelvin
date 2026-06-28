export default function Newsletter() {
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="terminal-card">
          <div className="text-xs text-[#666] mb-3">
            <span style={{ color: 'var(--terminal-accent)' }}>~</span> $ ./subscribe --newsletter
          </div>
          <h2 className="text-sm text-[#e0e0e0] mb-2">
            Subscribe to My Newsletter
          </h2>
          <p className="text-xs text-[#666] mb-4">
            Get the latest updates on projects, blog posts, and tech insights
            delivered straight to your inbox.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <span
                className="absolute left-0 top-1/2 -translate-y-1/2 text-xs"
                style={{ color: 'var(--terminal-accent)' }}
              >
                $
              </span>
              <input
                type="email"
                placeholder="enter your email..."
                className="terminal-input pl-5 text-xs"
                required
              />
            </div>
            <button
              type="submit"
              className="terminal-btn text-xs whitespace-nowrap"
            >
              [Subscribe]
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
