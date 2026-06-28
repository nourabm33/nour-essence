export function LeafMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M50 22c-10 8-16 18-16 30 0 9 4 16 16 24 12-8 16-15 16-24 0-12-6-22-16-30Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M50 28v44" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M50 40c-5-3-9-3-13-2M50 40c5-3 9-3 13-2M50 52c-5-3-9-3-13-2M50 52c5-3 9-3 13-2M50 64c-4-2-7-2-10-1M50 64c4-2 7-2 10-1"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BrandLogo({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <span className="flex items-center gap-3 select-none">
      <LeafMark className="w-8 h-8 text-champagne shrink-0" />
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif tracking-luxury text-gold-gradient ${
            compact ? "text-xl" : "text-2xl"
          }`}
        >
          NOUR ÉSSENCE
        </span>
        {!compact && (
          <span className="text-[9px] tracking-wide-lux text-champagne/70 mt-1 uppercase">
            L&apos;Essence de la Beauté Naturelle
          </span>
        )}
      </span>
    </span>
  );
}
