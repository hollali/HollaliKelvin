"use client";

import { useState } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaPaperPlane,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AmbientBackground from "../components/AmbientBackground";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const socials = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/hollali" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/hollali-kelvin-18600b225/" },
  { icon: FaTwitter, label: "Twitter", href: "https://twitter.com/h_ollali" },
];

const contactInfo = [
  { icon: FaEnvelope, label: "Email", value: "dheztinykartel@gmail.com", href: "mailto:dheztinykartel@gmail.com" },
  { icon: FaPhone, label: "Phone", value: "0505306932", href: "tel:+233050306932" },
  { icon: FaMapMarkerAlt, label: "Location", value: "Accra, Ghana" },
];

const formFields = [
  { name: "name" as const, label: "Name", type: "text", placeholder: "enter your name...", required: true },
  { name: "email" as const, label: "Email", type: "email", placeholder: "enter your email...", required: true },
  { name: "subject" as const, label: "Subject", type: "text", placeholder: "enter subject...", required: false },
  { name: "message" as const, label: "Message", type: "textarea", placeholder: "enter your message...", required: true },
] as const;

export default function ContactClient() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [statusError, setStatusError] = useState("");
  const [focusField, setFocusField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, company: honeypot }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      setStatusError(err instanceof Error ? err.message : "");
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
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
    <div className="pb-20">
      {/* Header */}
      <section className="relative overflow-hidden pt-14 pb-8 md:pt-20 md:pb-10">
        <AmbientBackground />
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 terminal-btn text-xs px-3 py-1.5 mb-5">
              <span className="relative flex h-2 w-2">
                <motion.span
                  className="absolute inset-0 -m-1 rounded-full border"
                  style={{ borderColor: "var(--terminal-accent)" }}
                  animate={{ scale: [0.5, 1.6], opacity: [0.8, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ background: "var(--terminal-accent)" }}
                />
              </span>
              <span className="text-[#e0e0e0]">
                available for freelance & full-time roles
              </span>
            </span>
            <p className="text-xs md:text-sm mb-3" style={{ color: "var(--terminal-accent)" }}>
              hollali@portfolio ~ % cd contact/ && ./mail
            </p>
            <h1 className="text-2xl md:text-4xl font-bold text-[#e0e0e0] mb-3">
              Get in touch
            </h1>
            <p className="text-sm md:text-base text-[#999] leading-relaxed max-w-2xl">
              Have a project in mind, a role to fill, or just want to say hi?
              Send a message and I&apos;ll get back to you as soon as possible.
            </p>
            <hr className="terminal-separator" />
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        {/* Info panel */}
        <aside className="space-y-4 lg:sticky lg:top-6">
          <motion.div
            className="terminal-card py-5!"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full rounded-full"
                  style={{ background: "var(--terminal-accent)" }}
                />
                <span
                  className="relative inline-flex h-2 w-2 rounded-full"
                  style={{ background: "var(--terminal-accent)" }}
                />
              </span>
              <span className="text-xs text-[#e0e0e0]">system_online</span>
              <span className="text-xs text-[#22c55e] ml-auto">[OK]</span>
            </div>
            <dl className="space-y-2 text-xs">
              <div className="flex justify-between">
                <dt className="text-[#666]">uptime</dt>
                <dd className="text-[#e0e0e0]">24/7</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#666]">availability</dt>
                <dd style={{ color: "var(--terminal-accent)" }}>open</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#666]">response time</dt>
                <dd className="text-[#e0e0e0]">&lt; 24 hours</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[#666]">timezone</dt>
                <dd className="text-[#e0e0e0]">GMT+0 (Accra)</dd>
              </div>
            </dl>
          </motion.div>

          <motion.div
            className="terminal-card py-5!"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
          >
            <div className="text-[10px] uppercase tracking-wider text-[#666] mb-3">
              contact_info/
            </div>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 h-7 w-7 flex items-center justify-center border border-[#2a2a2a] shrink-0"
                    style={{ color: "var(--terminal-accent)" }}
                  >
                    <item.icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] text-[#666] uppercase tracking-wider">
                      {item.label}
                    </div>
                    {"href" in item && item.href ? (
                      <a
                        href={item.href}
                        className="text-xs text-[#e0e0e0] hover:text-[var(--terminal-accent)] transition-colors break-all"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-xs text-[#e0e0e0]">{item.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="terminal-card py-4!"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
          >
            <div className="text-[10px] uppercase tracking-wider text-[#666] mb-3">
              connect/
            </div>
            <div className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="terminal-btn text-xs flex items-center gap-2 px-3 py-2 cursor-pointer
                    hover:text-[var(--terminal-accent)] hover:border-[var(--terminal-accent)] transition-colors"
                >
                  <s.icon className="h-3.5 w-3.5" aria-hidden="true" />
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        </aside>

        {/* Form */}
        <motion.div
          className="terminal-card"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-6">
            <span style={{ color: "var(--terminal-accent)" }} className="text-xs">$</span>
            <span className="text-xs text-[#666]">mail --send --to hollali</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {formFields.slice(0, 2).map((field) => (
                <div key={field.name}>
                  <label className="text-[10px] text-[#666] uppercase mb-1.5 block tracking-wider">
                    {field.label}
                    {field!.required && <span className="text-[#444]"> (optional)</span>}
                  </label>
                  <div className="relative">
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 text-xs pointer-events-none transition-colors"
                      style={{ color: focusField === field.name ? "var(--terminal-accent)" : "#666" }}
                    >
                      $
                    </span>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required={field.required}
                      className="terminal-input pl-5 text-xs"
                      placeholder={field.placeholder}
                      onFocus={() => setFocusField(field.name)}
                      onBlur={() => setFocusField(null)}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label className="text-[10px] text-[#666] uppercase mb-1.5 block tracking-wider">
                Subject <span className="text-[#444]">(optional)</span>
              </label>
              <div className="relative">
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-xs pointer-events-none transition-colors"
                  style={{ color: focusField === "subject" ? "var(--terminal-accent)" : "#666" }}
                >
                  $
                </span>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="terminal-input pl-5 text-xs"
                  placeholder="enter subject..."
                  onFocus={() => setFocusField("subject")}
                  onBlur={() => setFocusField(null)}
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-[#666] uppercase mb-1.5 block tracking-wider">
                Message
              </label>
              <div className="relative">
                <span
                  className="absolute left-0 top-2.5 text-xs pointer-events-none transition-colors"
                  style={{ color: focusField === "message" ? "var(--terminal-accent)" : "#666" }}
                >
                  $
                </span>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="terminal-input pl-5 text-xs resize-none"
                  placeholder="enter your message..."
                  onFocus={() => setFocusField("message")}
                  onBlur={() => setFocusField(null)}
                />
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={status === "loading"}
              className="terminal-btn terminal-btn-accent text-xs w-full cursor-pointer flex items-center justify-center gap-2 py-3"
              whileHover={status === "idle" ? { scale: 1.01 } : {}}
              whileTap={status === "idle" ? { scale: 0.99 } : {}}
            >
              {status === "loading" ? (
                <>
                  sending<span className="terminal-loading" />
                </>
              ) : status === "success" ? (
                <>
                  <FaCheck className="h-3 w-3" aria-hidden="true" /> message sent
                </>
              ) : status === "error" ? (
                <>
                  <FaTimes className="h-3 w-3" aria-hidden="true" /> failed to send
                </>
              ) : (
                <>
                  <FaPaperPlane className="h-3 w-3" aria-hidden="true" /> [send message]
                </>
              )}
            </motion.button>

            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  className="text-xs text-center p-2 rounded font-mono"
                  style={{ color: "var(--terminal-accent)", background: "color-mix(in srgb, var(--terminal-accent) 5%, transparent)" }}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  # message sent successfully! I&apos;ll get back to you soon.
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  className="text-xs text-center p-2 rounded font-mono"
                  style={{ color: "#ff4444", background: "rgba(255, 68, 68, 0.05)" }}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                >
                  # {statusError || "failed to send message. please try again."}
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </motion.div>
      </div>
    </div>
  );
}