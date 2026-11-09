/** Small drawn accents. Purely decorative, so hidden from screen readers. */

type MarkProps = { className?: string };

const line = {
  "aria-hidden": true,
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function ArrowLeft({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 46 24" strokeWidth={2.2} className={className} {...line}>
      <path d="M44 12H3" />
      <path d="M12 3.500 3 12l9 8.500" />
    </svg>
  );
}

export function ArrowRight({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 46 24" strokeWidth={2.2} className={className} {...line}>
      <path d="M2 12h41" />
      <path d="M34 3.500 43 12l-9 8.500" />
    </svg>
  );
}

/** Curves down and to the left, toward the framed photo. */
export function ArrowToPhoto({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 52 62" strokeWidth={2} className={className} {...line}>
      <path d="M48 4C50 26 34 46 6 54" />
      <path d="M16 43 6 54l15 3" />
    </svg>
  );
}

export function ArrowUp({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 40 52" strokeWidth={2} className={className} {...line}>
      <path d="M32 49C14 44 8 26 19 5" />
      <path d="M9 14 19 5l9 11" />
    </svg>
  );
}

export function PencilCircle({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 200 100"
      preserveAspectRatio="none"
      className={className}
      {...line}
    >
      <path
        vectorEffect="non-scaling-stroke"
        strokeWidth={2.4}
        d="M120 8C70 1 17 12 7 44c-9 29 38 50 98 49 52-1 92-20 88-48C189 17 136 3 68 13"
      />
    </svg>
  );
}

export function Mug({ className }: MarkProps) {
  return (
    <svg viewBox="0 0 120 124" aria-hidden className={className}>
      <g
        fill="none"
        stroke="#23291f"
        strokeOpacity="0.55"
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path className="steam" d="M44 36c-9-8 9-15 0-27" />
        <path className="steam steam-2" d="M68 38c-9-8 9-15 0-27" />
      </g>
      <path
        d="M90 66h8a14 14 0 0 1 0 30h-8"
        fill="none"
        stroke="#e2d6bb"
        strokeWidth="9"
      />
      <path
        d="M24 50h68v54a16 16 0 0 1-16 16H40a16 16 0 0 1-16-16z"
        fill="#f4ecda"
      />
      <path d="M24 50h12v70h-1c-6 0-11-7-11-16z" fill="#e4d8bd" />
      <ellipse cx="58" cy="50" rx="34" ry="6.500" fill="#fbf5e6" />
      <ellipse cx="58" cy="50.500" rx="29" ry="4.500" fill="#b98852" />
    </svg>
  );
}
