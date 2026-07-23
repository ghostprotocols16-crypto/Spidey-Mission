export function SpideySwinger({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 260" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      {/* web line */}
      <line x1="100" y1="0" x2="100" y2="60" stroke="oklch(0.14 0.02 40)" strokeWidth="1.5" strokeDasharray="3 3" />
      {/* body */}
      <g transform="translate(60,60)">
        {/* torso */}
        <path d="M40 20 Q60 10 80 30 L75 90 Q60 105 45 105 Q30 105 25 90 L20 30 Q30 15 40 20 Z"
              fill="oklch(0.52 0.17 27)" stroke="oklch(0.14 0.02 40)" strokeWidth="2.5"/>
        {/* head */}
        <ellipse cx="50" cy="18" rx="22" ry="20" fill="oklch(0.52 0.17 27)" stroke="oklch(0.14 0.02 40)" strokeWidth="2.5"/>
        {/* eyes */}
        <path d="M35 14 Q42 6 52 12 Q54 20 44 22 Q34 20 35 14 Z" fill="oklch(0.955 0.028 82)" stroke="oklch(0.14 0.02 40)" strokeWidth="1.5"/>
        <path d="M48 14 Q60 6 68 14 Q68 22 58 22 Q47 20 48 14 Z" fill="oklch(0.955 0.028 82)" stroke="oklch(0.14 0.02 40)" strokeWidth="1.5"/>
        {/* web lines on head */}
        <path d="M28 18 L72 18 M30 26 L70 26 M40 5 L50 35 M60 5 L50 35" stroke="oklch(0.14 0.02 40)" strokeWidth="0.7" fill="none" opacity="0.7"/>
        {/* web lines torso */}
        <path d="M20 40 L80 40 M22 55 L78 55 M25 75 L75 75 M50 20 L50 100 M30 25 L70 100 M70 25 L30 100"
              stroke="oklch(0.14 0.02 40)" strokeWidth="0.6" fill="none" opacity="0.6"/>
        {/* arm up holding web */}
        <path d="M45 25 Q30 5 42 -10 L46 -12 Q48 -6 50 0 Q50 15 55 25 Z" fill="oklch(0.52 0.17 27)" stroke="oklch(0.14 0.02 40)" strokeWidth="2"/>
        {/* legs */}
        <path d="M30 95 Q10 130 15 165 L30 165 Q35 130 45 100 Z" fill="oklch(0.24 0.06 260)" stroke="oklch(0.14 0.02 40)" strokeWidth="2"/>
        <path d="M60 95 Q80 125 78 160 L65 165 Q60 130 55 100 Z" fill="oklch(0.24 0.06 260)" stroke="oklch(0.14 0.02 40)" strokeWidth="2"/>
      </g>
    </svg>
  );
}

export function SpiderIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <ellipse cx="20" cy="22" rx="8" ry="7" fill="oklch(0.14 0.02 40)"/>
      <circle cx="20" cy="14" r="5" fill="oklch(0.14 0.02 40)"/>
      <path d="M12 20 L2 12 M12 22 L2 22 M12 24 L4 32 M28 20 L38 12 M28 22 L38 22 M28 24 L36 32"
            stroke="oklch(0.14 0.02 40)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <circle cx="18" cy="13" r="1" fill="oklch(0.52 0.17 27)"/>
      <circle cx="22" cy="13" r="1" fill="oklch(0.52 0.17 27)"/>
    </svg>
  );
}

export function WebCorner({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 200 200" className={className} style={{ transform: flip ? "scaleX(-1)" : undefined }} aria-hidden>
      <g stroke="oklch(0.14 0.02 40)" strokeWidth="1.2" fill="none" opacity="0.55">
        <path d="M0 0 L200 200 M0 0 L200 100 M0 0 L100 200 M0 0 L200 60 M0 0 L60 200 M0 0 L200 30 M0 0 L30 200"/>
        <path d="M20 20 Q60 40 100 20 Q60 60 100 100 Q40 60 20 100 Q60 140 20 180"/>
        <path d="M40 40 Q80 60 120 40 Q80 80 120 120 Q60 80 40 120"/>
        <path d="M60 60 Q100 80 140 60 Q100 100 140 140"/>
      </g>
    </svg>
  );
}
