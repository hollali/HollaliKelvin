"use client";

import { useState, useEffect } from "react";
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

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

const socials = [
  { icon: FaGithub, label: "GitHub", href: "#" },
  { icon: FaLinkedin, label: "LinkedIn", href: "#" },
  { icon: FaTwitter, label: "Twitter", href: "#" },
  { icon: FaEnvelope, label: "Email", href: "mailto:dheztinykartel@gmail.com" },
];

const contactInfo = [
  { icon: FaEnvelope, label: "Email", value: "dheztinykartel@gmail.com", href: "mailto:dheztinykartel@gmail.com" },
  { icon: FaPhone, label: "Phone", value: "0505306932", href: "tel:+233050306932" },
  { icon: FaMapMarkerAlt, label: "Location", value: "Accra, Ghana" },
];

const formFields = [
  { name: "name" as const, label: "Name", type: "text", placeholder: "enter your name..." },
  { name: "email" as const, label: "Email", type: "email", placeholder: "enter your email..." },
  { name: "subject" as const, label: "Subject", type: "text", placeholder: "enter subject...", optional: true },
  { name: "message" as const, label: "Message", type: "textarea", placeholder: "enter your message..." },
] as const;

const PROMPT = "~ $ cd contact/";
const TYPING_SPEED = 40;

function TypingPrompt() {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(PROMPT.slice(0, i));
      if (i >= PROMPT.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, TYPING_SPEED);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-xs text-[#666] mb-8">
      <span style={{ color: "var(--terminal-accent)" }}>{displayed.slice(0, 2)}</span>
      <span>{displayed.slice(2)}</span>
      {!done && <span className="cursor-blink" style={{ color: "var(--terminal-accent)" }}>_</span>}
      <hr className="terminal-separator my-2" />
    </div>
  );
}

export default function ContactClient() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
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
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
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
    <div className="max-w-3xl mx-auto py-12 px-4">
      <TypingPrompt />

      {/* Social links */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {socials.map((s, i) => (
          <motion.a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={s.label}
            className="terminal-card flex items-center gap-2 px-4 py-2.5 text-xs cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + i * 0.08 }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <motion.span
              whileHover={{ rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <s.icon className="h-4 w-4" style={{ color: "var(--terminal-accent)" }} />
            </motion.span>
            <span className="text-[#e0e0e0]">{s.label}</span>
          </motion.a>
        ))}
      </motion.div>

      {/* Contact info cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10">
        {contactInfo.map((item, i) => (
          <motion.div
            key={item.label}
            className="terminal-card text-center py-4"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + i * 0.1 }}
            whileHover={{ y: -3 }}
          >
            <motion.div
              className="flex justify-center mb-2"
              whileHover={{ scale: 1.2, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <item.icon className="h-5 w-5" style={{ color: "var(--terminal-accent)" }} />
            </motion.div>
            <div className="text-[10px] text-[#666] uppercase mb-1 tracking-wider">
              {item.label}
            </div>
            {"href" in item && item.href ? (
              <a
                href={item.href}
                className="text-xs text-[#e0e0e0] hover:text-[var(--terminal-accent)] transition-colors"
              >
                {item.value}
              </a>
            ) : (
              <span className="text-xs text-[#e0e0e0]">{item.value}</span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Form */}
      <motion.div
        className="terminal-card"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <div className="flex items-center gap-2 mb-5">
          <span style={{ color: "var(--terminal-accent)" }} className="text-xs">$</span>
          <span className="text-xs text-[#666]">mail --send</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {formFields.slice(0, 2).map((field, i) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 + i * 0.08 }}
              >
                <label className="text-[10px] text-[#666] uppercase mb-1.5 block tracking-wider">
                  {field.label}
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
                    required
                    className="terminal-input pl-5 text-xs"
                    placeholder={field.placeholder}
                    onFocus={() => setFocusField(field.name)}
                    onBlur={() => setFocusField(null)}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.46 }}
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.54 }}
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.62 }}
          >
            <motion.button
              type="submit"
              disabled={status === "loading"}
              className="terminal-btn text-xs w-full cursor-pointer flex items-center justify-center gap-2"
              whileHover={status === "idle" ? { scale: 1.02 } : {}}
              whileTap={status === "idle" ? { scale: 0.98 } : {}}
            >
              {status === "loading" ? (
                <>
                  sending<span className="terminal-loading" />
                </>
              ) : status === "success" ? (
                <>
                  <FaCheck className="h-3 w-3" /> message sent
                </>
              ) : status === "error" ? (
                <>
                  <FaTimes className="h-3 w-3" /> failed to send
                </>
              ) : (
                <>
                  <FaPaperPlane className="h-3 w-3" /> [send message]
                </>
              )}
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {status === "success" && (
              <motion.div
                className="text-xs text-center p-2 rounded"
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
                className="text-xs text-center p-2 rounded"
                style={{ color: "#ff4444", background: "rgba(255, 68, 68, 0.05)" }}
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
              >
                # failed to send message. please try again.
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>

      {/* Availability badge */}
      <motion.div
        className="flex items-center justify-center gap-2 mt-8 text-xs text-[#666]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <motion.span
          className="inline-block w-2 h-2 rounded-full"
          style={{ background: "var(--terminal-accent)" }}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <span>available for freelance</span>
      </motion.div>
    </div>
  );
}
