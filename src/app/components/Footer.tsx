"use client";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a]">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div className="text-[#666]">
            <span className="text-[#555]">~</span> $
            <span className="text-[#e0e0e0]"> Hollali </span>
            <span className="text-[#555]">
              &copy; {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://github.com/hollali"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#666", transition: "color 0.2s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--terminal-accent)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
            >
              <FaGithub className="h-4 w-4" />
            </a>
            <a
              href="https://twitter.com/h_ollali"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#666", transition: "color 0.2s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--terminal-accent)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
            >
              <FaTwitter className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/hollali-kelvin-18600b225/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#666", transition: "color 0.2s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--terminal-accent)")
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
            >
              <FaLinkedin className="h-4 w-4" />
            </a>
          </div>
          <div className="text-[#555]">--- EOF ---</div>
        </div>
      </div>
    </footer>
  );
}
