"use client";

import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <motion.div
        className="text-xs text-[#666] mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <span style={{ color: 'var(--terminal-accent)' }}>~</span> $ ./contact
        <hr className="terminal-separator my-2" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="terminal-card mb-4">
            <div className="text-sm text-[#e0e0e0] mb-3 font-mono">
              # Contact Information
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs">
                <FaEnvelope className="h-4 w-4" style={{ color: 'var(--terminal-accent)' }} />
                <div>
                  <div className="text-[#666] text-[10px] uppercase">Email</div>
                  <a
                    href="mailto:dheztinykartel@gmail.com"
                    style={{ transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--terminal-accent)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  >
                    dheztinykartel@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <FaPhone className="h-4 w-4" style={{ color: 'var(--terminal-accent)' }} />
                <div>
                  <div className="text-[#666] text-[10px] uppercase">Phone</div>
                  <a
                    href="tel:+233050306932"
                    style={{ transition: 'color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.color = 'var(--terminal-accent)'}
                    onMouseLeave={(e) => e.currentTarget.style.color = ''}
                  >
                    0505306932
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <FaMapMarkerAlt className="h-4 w-4" style={{ color: 'var(--terminal-accent)' }} />
                <div>
                  <div className="text-[#666] text-[10px] uppercase">Location</div>
                  <span>Accra, Ghana</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-xs text-[#666] italic">
            # I&apos;m always open to discussing new projects,
            creative ideas, or opportunities.
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="terminal-card">
            <div className="text-xs mb-4" style={{ color: 'var(--terminal-accent)' }}>$ mail --send</div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] text-[#666] uppercase mb-1 block">Name</label>
                <div className="relative">
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-xs"
                    style={{ color: 'var(--terminal-accent)' }}
                  >
                    $
                  </span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="terminal-input pl-5 text-xs"
                    placeholder="enter your name..."
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-[#666] uppercase mb-1 block">Email</label>
                <div className="relative">
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-xs"
                    style={{ color: 'var(--terminal-accent)' }}
                  >
                    $
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="terminal-input pl-5 text-xs"
                    placeholder="enter your email..."
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-[#666] uppercase mb-1 block">Message</label>
                <div className="relative">
                  <span
                    className="absolute left-0 top-2 text-xs"
                    style={{ color: 'var(--terminal-accent)' }}
                  >
                    $
                  </span>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="terminal-input pl-5 text-xs resize-none"
                    placeholder="enter your message..."
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="terminal-btn text-xs w-full"
              >
                {status === "loading" ? "sending..." : "[Send Message]"}
              </button>
              {status === "success" && (
                <p className="text-xs text-center" style={{ color: 'var(--terminal-accent)' }}>
                  # Message sent successfully!
                </p>
              )}
              {status === "error" && (
                <p className="text-[#ff4444] text-xs text-center">
                  # Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
