"use client";

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

const dots = Array.from({ length: 26 }).map((_, i) => {
  const r1 = seededRandom(i * 17 + 1);
  const r2 = seededRandom(i * 31 + 2);
  const r3 = seededRandom(i * 47 + 3);
  const r4 = seededRandom(i * 61 + 4);
  const r5 = seededRandom(i * 79 + 5);
  const size = 2 + r1 * 5;
  return {
    id: i,
    left: r2 * 100,
    size,
    duration: 14 + r3 * 20,
    delay: r4 * 18,
    opacity: 0.25 + r5 * 0.55,
  };
});

export function Particles() {

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.id}
          className="absolute bottom-[-10px] rounded-full"
          style={{
            left: `${d.left}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            background:
              "radial-gradient(circle, rgba(232,212,160,0.95), rgba(201,164,92,0.25))",
            boxShadow: "0 0 8px rgba(201,164,92,0.6)",
            opacity: d.opacity,
            animation: `floatParticle ${d.duration}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
