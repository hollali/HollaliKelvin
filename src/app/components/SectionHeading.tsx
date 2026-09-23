"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  prompt: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  id?: string;
}

export default function SectionHeading({
  prompt,
  title,
  description,
  action,
  id,
}: SectionHeadingProps) {
  return (
    <motion.div
      id={id}
      className="mb-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
    >
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div className="min-w-0">
          <p
            className="text-xs mb-2"
            style={{ color: "var(--terminal-accent)" }}
          >
            {prompt}
          </p>
          <h2 className="text-lg md:text-xl font-bold text-[#e0e0e0]">
            {title}
          </h2>
          {description && (
            <p className="text-xs md:text-sm text-[#999] mt-2 max-w-xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
        {action}
      </div>
      <hr className="terminal-separator mt-3" />
    </motion.div>
  );
}