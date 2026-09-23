import Link from "next/link";
import { FaArrowLeft, FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden min-h-[70vh] flex items-center justify-center py-16 md:py-24">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute inset-0 hero-grid opacity-60" />
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto px-4">
        <div className="terminal-card p-0 overflow-hidden">
          <div className="terminal-titlebar">
            <div className="flex gap-1.5">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
            </div>
            <span className="text-xs text-[#666] ml-2">~/404</span>
            <span className="ml-auto text-xs text-[#555]">bash</span>
          </div>

          <div className="p-6 md:p-8">
            <p className="text-xs mb-4 font-mono" style={{ color: "var(--terminal-accent)" }}>
              hollali@portfolio ~ % cat 404.md
            </p>

            <div
              className="text-6xl md:text-7xl font-bold font-mono mb-4"
              style={{ color: "#ff4444", textShadow: "0 0 24px rgba(255, 68, 68, 0.35)" }}
            >
              404
            </div>

            <h1 className="text-base md:text-lg font-mono text-[#e0e0e0] mb-3">
              error: page not found
            </h1>

            <p className="text-xs md:text-sm text-[#999] leading-relaxed mb-8">
              The page you&apos;re looking for doesn&apos;t exist, was moved, or was
              never compiled. Try navigating back to a known directory.
            </p>

            <p className="text-xs font-mono mb-8" style={{ color: "var(--terminal-accent)" }}>
              $ find / --name &quot;{`the requested page`}&quot; <span className="cursor-blink">▍</span>
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="/" className="terminal-btn terminal-btn-accent text-xs px-3 py-1.5 cursor-pointer">
                <FaHome className="h-3 w-3 mr-1.5" aria-hidden="true" /> ./go_home
              </Link>
              <Link href="/projects" className="terminal-btn text-xs px-3 py-1.5 cursor-pointer">
                <FaArrowLeft className="h-3 w-3 mr-1.5" aria-hidden="true" /> $ cd ../projects
              </Link>
              <Link href="/contact" className="terminal-btn text-xs px-3 py-1.5 cursor-pointer">
                $ ./report_issue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}