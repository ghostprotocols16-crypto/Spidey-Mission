import { motion } from "framer-motion";

export function Skyline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 400"
      preserveAspectRatio="xMidYMax slice"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="oklch(0.32 0.06 45)" />
          <stop offset="1" stopColor="oklch(0.14 0.02 40)" />
        </linearGradient>
        <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="0.8" fill="oklch(0.955 0.028 82 / 0.1)" />
        </pattern>
      </defs>
      <rect width="1440" height="400" fill="url(#sky)" />
      <circle cx="1150" cy="90" r="55" fill="oklch(0.88 0.08 75 / 0.65)" />
      <rect width="1440" height="400" fill="url(#dots)" />
      {/* buildings */}
      <g fill="oklch(0.1 0.015 40)" stroke="oklch(0.52 0.17 27 / 0.4)" strokeWidth="1">
        {Array.from({ length: 22 }).map((_, i) => {
          const w = 40 + ((i * 37) % 55);
          const h = 120 + ((i * 71) % 220);
          const x = i * 68;
          return <rect key={i} x={x} y={400 - h} width={w} height={h} />;
        })}
      </g>
      {/* windows */}
      <g fill="oklch(0.88 0.15 75 / 0.55)">
        {Array.from({ length: 180 }).map((_, i) => {
          const x = (i * 47) % 1440;
          const y = 180 + ((i * 29) % 200);
          return <rect key={i} x={x} y={y} width="3" height="4" />;
        })}
      </g>
      {/* small swinger */}
      <motion.g
        initial={{ x: -200 }}
        animate={{ x: 1600 }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <line x1="80" y1="0" x2="80" y2="60" stroke="oklch(0.955 0.028 82 / 0.5)" strokeWidth="1" />
        <circle cx="80" cy="70" r="6" fill="oklch(0.52 0.17 27)" stroke="oklch(0.14 0.02 40)" strokeWidth="1" />
      </motion.g>
    </svg>
  );
}
