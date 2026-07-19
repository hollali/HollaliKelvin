"use client";

import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

export default function ContactClient() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [focusField, setFocusField] = useState<string | null>(null);

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
              {[
                { icon: FaEnvelope, label: "Email", value: "dheztinykartel@gmail.com", href: "mailto:dheztinykartel@gmail.com" },
                { icon: FaPhone, label: "Phone", value: "0505306932", href: "tel:+233050306932" },
                { icon: FaMapMarkerAlt, label: "Location", value: "Accra, Ghana" },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-center gap-3 text-xs"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <item.icon className="h-4 w-4" style={{ color: 'var(--terminal-accent)' }} />
                  </motion.div>
                  <div>
                    <div className="text-[#666] text-[10px] uppercase">{item.label}</div>
                    {"href" in item && item.href ? (
                      <a
                        href={item.href}
                        style={{ transition: 'color 0.2s' }}
                        onMouseEnter={(e) => e.currentTarget.style.color = 'var(--terminal-accent)'}
                        onMouseLeave={(e) => e.currentTarget.style.color = ''}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span>{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            className="text-xs text-[#666] italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            # I&apos;m always open to discussing new projects,
            creative ideas, or opportunities.
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="terminal-card">
            <motion.div
              className="text-xs mb-4"
              style={{ color: 'var(--terminal-accent)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              $ mail --send
            </motion.div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {(["name", "email", "message"] as const).map((field, i) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <label className="text-[10px] text-[#666] uppercase mb-1 block">
                    {field === "message" ? "Message" : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <div className="relative">
                    <span
                      className="absolute left-0 text-xs pointer-events-none"
                      style={{
                        color: focusField === field ? 'var(--terminal-accent)' : '#666',
                        top: field === "message" ? "8px" : "50%",
                        transform: field === "message" ? "none" : "translateY(-50%)",
                        transition: "color 0.2s",
                      }}
                    >
                      $
                    </span>
                    {field === "message" ? (
                      <textarea
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="terminal-input pl-5 text-xs resize-none"
                        placeholder={`enter your ${field}...`}
                        onFocus={() => setFocusField(field)}
                        onBlur={() => setFocusField(null)}
                      />
                    ) : (
                      <input
                        type={field === "email" ? "email" : "text"}
                        id={field}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required
                        className="terminal-input pl-5 text-xs"
                        placeholder={`enter your ${field}...`}
                        onFocus={() => setFocusField(field)}
                        onBlur={() => setFocusField(null)}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
              <motion.button
                type="submit"
                disabled={status === "loading"}
                className="terminal-btn text-xs w-full cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {status === "loading" ? (
                  <span className="flex items-center justify-center gap-1">
                    sending<span className="terminal-loading" />
                  </span>
                ) : "[Send Message]"}
              </motion.button>
              <AnimatePresence>
                {status === "success" && (
                  <motion.p
                    className="text-xs text-center"
                    style={{ color: 'var(--terminal-accent)' }}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    # Message sent successfully!
                  </motion.p>
                )}
                {status === "error" && (
                  <motion.p
                    className="text-[#ff4444] text-xs text-center"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    # Failed to send message. Please try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
