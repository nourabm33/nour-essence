const PALETTES: { liquid: [string, string]; glass: string; cap: string }[] = [
  { liquid: ["#e9c46a", "#a8823c"], glass: "#f3e6c4", cap: "#1a140a" },
  { liquid: ["#caa0d8", "#6d3f86"], glass: "#efe1f2", cap: "#2a1530" },
  { liquid: ["#86b6c9", "#2f6d86"], glass: "#dceef3", cap: "#10242c" },
  { liquid: ["#d98c6a", "#9c4422"], glass: "#f4ddd0", cap: "#2c150a" },
  { liquid: ["#e7c98f", "#c9a45c"], glass: "#f7f1e6", cap: "#15110b" },
  { liquid: ["#c97a8a", "#86304a"], glass: "#f2dbe1", cap: "#2c1018" },
  { liquid: ["#9ab07a", "#4d6630"], glass: "#e6efd9", cap: "#1a240c" },
  { liquid: ["#1f1b16", "#0c0a07"], glass: "#cbbf9f", cap: "#c9a45c" },
];

function hashCode(code: string): number {
  let h = 0;
  for (let i = 0; i < code.length; i++) h = (h * 31 + code.charCodeAt(i)) >>> 0;
  return h;
}

export function BottleArt({
  code,
  className = "",
  showCode = false,
}: {
  code: string;
  className?: string;
  showCode?: boolean;
}) {
  const p = PALETTES[hashCode(code) % PALETTES.length];
  const gid = `g-${code}`;
  const sid = `s-${code}`;
  return (
    <svg
      viewBox="0 0 120 160"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Perfume ${code}`}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.liquid[0]} />
          <stop offset="100%" stopColor={p.liquid[1]} />
        </linearGradient>
        <linearGradient id={sid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* cap */}
      <rect x="49" y="10" width="22" height="20" rx="3" fill={p.cap} />
      <rect x="52" y="28" width="16" height="8" fill={p.cap} opacity="0.85" />
      {/* neck */}
      <rect x="54" y="34" width="12" height="10" fill={p.glass} opacity="0.6" />
      {/* body */}
      <rect
        x="30"
        y="44"
        width="60"
        height="100"
        rx="10"
        fill={p.glass}
        opacity="0.35"
      />
      <rect
        x="30"
        y="44"
        width="60"
        height="100"
        rx="10"
        fill="none"
        stroke="#c9a45c"
        strokeWidth="1.2"
        opacity="0.7"
      />
      {/* liquid */}
      <rect x="35" y="70" width="50" height="69" rx="7" fill={`url(#${gid})`} />
      {/* shine */}
      <rect x="30" y="44" width="60" height="100" rx="10" fill={`url(#${sid})`} />
      <rect x="38" y="52" width="8" height="84" rx="4" fill="#ffffff" opacity="0.25" />
      {/* label */}
      <rect
        x="44"
        y="92"
        width="32"
        height="26"
        rx="2"
        fill="#0c0a07"
        opacity="0.55"
      />
      <text
        x="60"
        y="103"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="7"
        letterSpacing="1"
        fill="#e8d4a0"
      >
        NOUR
      </text>
      {showCode && (
        <text
          x="60"
          y="113"
          textAnchor="middle"
          fontFamily="Georgia, serif"
          fontSize="6"
          letterSpacing="1.5"
          fill="#e8d4a0"
          opacity="0.85"
        >
          {code}
        </text>
      )}
    </svg>
  );
}
