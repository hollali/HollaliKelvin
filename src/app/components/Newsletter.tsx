"use client"
import { motion } from "framer-motion"

export default function Newsletter() {
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          className="terminal-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-xs text-[#666] mb-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            <span style={{ color: 'var(--terminal-accent)' }}>~</span> $ ./subscribe --newsletter
          </motion.div>
          <motion.h2
            className="text-sm text-[#e0e0e0] mb-2"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Subscribe to My Newsletter
          </motion.h2>
          <motion.p
            className="text-xs text-[#666] mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            Get the latest updates on projects, blog posts, and tech insights
            delivered straight to your inbox.
          </motion.p>
          <motion.form
            className="flex flex-col sm:flex-row gap-3"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
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
                placeholder="enter your email..."
                className="terminal-input pl-5 text-xs"
                required
              />
            </div>
            <motion.button
              type="submit"
              className="terminal-btn text-xs whitespace-nowrap cursor-pointer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              [Subscribe]
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
