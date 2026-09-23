"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, background: "var(--color-terminal-bg, #0a0a0a)", color: "#e0e0e0", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
            background:
              "var(--terminal-accent, #22c55e) url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22><path d=%22M40 0H0V40H40V0ZM20 20%22 fill=%22transparent%22 stroke=%22rgba(255,255,255,0.03)%22/></svg>')",
          }}
        >
          <div
            style={{
              maxWidth: 520,
              width: "100%",
              border: "1px solid var(--color-terminal-border, #2a2a2a)",
              borderRadius: 8,
              background: "var(--color-terminal-bg, #0a0a0a)",
              padding: 24,
            }}
          >
            <div style={{ fontSize: 48, fontWeight: 700, color: "#ff4444", marginBottom: 12 }}>
              !
            </div>
            <h1 style={{ fontSize: 16, margin: "0 0 8px" }}>fatal error: something crashed</h1>
            <p style={{ fontSize: 13, color: "#999", lineHeight: 1.6, marginBottom: 20 }}>
              An unexpected error occurred. The system will attempt a reboot.
            </p>
            {error.digest && (
              <p style={{ fontSize: 11, color: "#555", marginBottom: 16, overflowWrap: "anywhere" }}>
                fault_code: {error.digest}
              </p>
            )}
            <button
              onClick={reset}
              style={{
                background: "transparent",
                border: "1px solid var(--terminal-accent, #22c55e)",
                color: "var(--terminal-accent, #22c55e)",
                padding: "8px 16px",
                fontSize: 13,
                fontFamily: "inherit",
                cursor: "pointer",
                borderRadius: 4,
              }}
            >
              $ ./reboot_system
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}