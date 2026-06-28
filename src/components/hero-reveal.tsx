"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LeafMark } from "./logo";

const SPOTLIGHT_R = 260;
const BG_IMAGE_1 = "/images/hero.jpg";
const BG_IMAGE_2 = "/images/hero-reveal.jpg";

function RevealLayer({
  image,
  cursorX,
  cursorY,
}: {
  image: string;
  cursorX: number;
  cursorY: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mask, setMask] = useState<string>("");

  // Size the canvas to the viewport on mount + resize.
  useEffect(() => {
    const resize = () => {
      const c = canvasRef.current;
      if (!c) return;
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Repaint the soft circular gradient mask each time the cursor moves.
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, c.width, c.height);
    const g = ctx.createRadialGradient(
      cursorX,
      cursorY,
      0,
      cursorX,
      cursorY,
      SPOTLIGHT_R,
    );
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.4, "rgba(255,255,255,1)");
    g.addColorStop(0.6, "rgba(255,255,255,0.75)");
    g.addColorStop(0.75, "rgba(255,255,255,0.4)");
    g.addColorStop(0.88, "rgba(255,255,255,0.12)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
    ctx.fill();
    setMask(c.toDataURL());
  }, [cursorX, cursorY]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ display: "none" }}
      />
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{
          backgroundImage: `url('${image}')`,
          maskImage: mask ? `url(${mask})` : undefined,
          WebkitMaskImage: mask ? `url(${mask})` : undefined,
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      />
    </>
  );
}

export function HeroReveal() {
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number>(0);
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const loop = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden h-screen bg-black"
      style={{ height: "100dvh" }}
    >
      {/* 1 — base image (slow Ken Burns zoom-out) */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
        style={{ backgroundImage: `url('${BG_IMAGE_1}')` }}
      />

      {/* readability vignette over the base only */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/55 via-black/20 to-black/70 pointer-events-none" />

      {/* 2 — cursor spotlight reveal layer */}
      <RevealLayer
        image={BG_IMAGE_2}
        cursorX={cursorPos.x}
        cursorY={cursorPos.y}
      />

      {/* soft glow ring trailing the cursor */}
      <div
        className="absolute z-40 pointer-events-none rounded-full hidden md:block"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          width: SPOTLIGHT_R * 2,
          height: SPOTLIGHT_R * 2,
          transform: "translate(-50%, -50%)",
          boxShadow: "0 0 60px 8px rgba(201,164,92,0.18) inset",
          border: "1px solid rgba(232,212,160,0.12)",
        }}
      />

      {/* 3 — heading */}
      <div className="absolute top-[16%] left-0 right-0 z-50 flex flex-col items-center text-center px-5 pointer-events-none">
        <LeafMark className="w-12 h-12 text-champagne mb-5 hero-anim hero-fade" />
        <p
          className="text-champagne/80 tracking-luxury uppercase text-[11px] mb-4 hero-anim hero-fade"
          style={{ animationDelay: "0.15s" }}
        >
          Maison de Parfums
        </p>
        <h1 className="text-white leading-[0.95] drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]">
          <span
            className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal text-gold-gradient"
            style={{ letterSpacing: "-0.05em", animationDelay: "0.25s" }}
          >
            L&apos;essence de
          </span>
          <span
            className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
            style={{ letterSpacing: "-0.06em", animationDelay: "0.42s" }}
          >
            la beauté
          </span>
        </h1>
        <p
          className="mt-6 font-playfair italic text-lg sm:text-2xl text-cream/85 tracking-wide-lux hero-anim hero-fade"
          style={{ animationDelay: "0.6s" }}
        >
          NOUR ÉSSENCE
        </p>
      </div>

      {/* 4 — bottom-left paragraph */}
      <div
        className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[280px] z-50 hero-anim hero-fade"
        style={{ animationDelay: "0.7s" }}
      >
        <p className="text-sm text-white/80 leading-relaxed">
          Every fragrance is a chapter of memory — composed from rare florals,
          warm amber and precious oud, distilled into a 30% concentrated extract.
        </p>
      </div>

      {/* 5 — bottom-right block */}
      <div
        className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[280px] z-50 flex flex-col items-start gap-4 sm:gap-5 hero-anim hero-fade"
        style={{ animationDelay: "0.85s" }}
      >
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
          Move your cursor to reveal the golden essence. Explore how the world&apos;s
          most iconic accords are reimagined into timeless signatures.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/catalog"
            className="btn-gold text-sm font-semibold px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 uppercase tracking-wide-lux"
          >
            Discover Collection
          </Link>
          <Link
            href="/catalog?collection=luxury"
            className="btn-outline-gold text-sm px-6 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 uppercase tracking-wide-lux"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 text-champagne/60 animate-bounce text-2xl pointer-events-none">
        ⌄
      </div>
    </section>
  );
}
