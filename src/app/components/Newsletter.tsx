"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import SectionHeading from "./SectionHeading"

type SubscribeStatus = "idle" | "loading" | "success" | "error"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<SubscribeStatus>("idle")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status === "loading" || !email) return
    setStatus("loading")
    setError("")
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || "Subscription failed")
      }
      setStatus("success")
      setEmail("")
      setTimeout(() => setStatus("idle"), 4000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Subscription failed")
      setStatus("error")
      setTimeout(() => setStatus("idle"), 4000)
    }
  }

  return (
    <section className="py-12 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <SectionHeading
          prompt="~ $ ./subscribe --newsletter"
          title="Stay in the loop"
          description="Occasional updates on projects, blog posts, and tech insights — straight to your inbox. No spam."
        />
        <motion.div
          className="terminal-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <motion.form
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            onSubmit={handleSubmit}
          >
            <div className="flex-1 relative">
              <span
                className="absolute left-0 top-1/2 -translate-y-1/2 text-xs"
                style={{ color: 'var(--terminal-accent)' }}
                aria-hidden="true"
              >
                $
              </span>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="enter your email..."
                className="terminal-input pl-5 text-xs"
                required
                disabled={status === "loading"}
                aria-invalid={status === "error"}
              />
            </div>
            <motion.button
              type="submit"
              className="terminal-btn terminal-btn-accent text-xs whitespace-nowrap cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === "loading"}
            >
              {status === "loading" ? "[Subscribing...]" : "[Subscribe]"}
            </motion.button>
          </motion.form>

          {status === "success" && (
            <p className="text-[10px] text-[var(--terminal-accent)] mt-3 font-mono">
              {">"} subscribed — welcome aboard!
            </p>
          )}
          {status === "error" && (
            <p className="text-[10px] text-red-500 mt-3 font-mono">{"!"} {error}</p>
          )}
          {status === "idle" && (
            <p className="text-[10px] text-[#555] mt-3 font-mono">
              # one email per month · unsubscribe anytime
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}