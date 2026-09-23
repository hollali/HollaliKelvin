interface AmbientBackgroundProps {
  className?: string;
}

export default function AmbientBackground({ className = "" }: AmbientBackgroundProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 hero-grid" />
      <div
        className="absolute -top-32 right-1/4 h-[380px] w-[380px] rounded-full blur-[64px]"
        style={{
          background: "color-mix(in srgb, var(--terminal-accent) 12%, transparent)",
        }}
      />
      <div
        className="absolute top-1/3 -left-24 h-[320px] w-[320px] rounded-full blur-[64px]"
        style={{
          background: "color-mix(in srgb, var(--terminal-accent) 8%, transparent)",
        }}
      />
    </div>
  );
}