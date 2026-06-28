"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useStore } from "./store-context";
import { ProductImage } from "./product-image";
import { formatPrice, type PerfumeDTO } from "@/lib/types";

export function QuickView({
  perfume,
  onClose,
}: {
  perfume: PerfumeDTO | null;
  onClose: () => void;
}) {
  const { addToCart } = useStore();
  const [sizeIdx, setSizeIdx] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- reset when perfume changes */
    setSizeIdx(0);
    setAdded(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [perfume]);

  if (!perfume) return null;
  const size = perfume.sizes[sizeIdx];

  return (
    <div
      className="fixed inset-0 z-[80] grid place-items-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="glass-strong rounded-3xl w-full max-w-3xl overflow-hidden grid md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-b from-[#fbf6ec] to-[#efe4cf] grid place-items-center p-8">
          <ProductImage
            code={perfume.code}
            imageUrl={perfume.imageUrl}
            name={perfume.name}
            showCode
            className="h-56 w-full"
            imgClassName="h-56 w-full"
            artClassName="h-56 w-auto"
          />
        </div>
        <div className="p-7 flex flex-col">
          <button
            onClick={onClose}
            className="self-end text-cream/60 hover:text-champagne text-xl -mt-2"
            aria-label="Close"
          >
            ✕
          </button>
          <p className="text-[10px] tracking-wide-lux uppercase text-champagne/70">
            {perfume.code} · {perfume.brand}
          </p>
          <h3 className="font-serif text-3xl text-gold-gradient mt-1">
            {perfume.name}
          </h3>
          <p className="text-sm text-cream/60 mt-3 leading-relaxed line-clamp-4">
            {perfume.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            {perfume.sizes.map((s, i) => (
              <button
                key={s.size}
                onClick={() => setSizeIdx(i)}
                className={`px-3 py-2 rounded-lg text-sm border transition-all ${
                  i === sizeIdx
                    ? "border-champagne bg-gold/15 text-champagne"
                    : "border-gold/25 text-cream/60 hover:border-gold/60"
                }`}
              >
                {s.size} · {formatPrice(s.price)}
              </button>
            ))}
          </div>

          <div className="mt-auto pt-6 flex gap-3">
            <button
              onClick={() => {
                addToCart({
                  code: perfume.code,
                  name: perfume.name,
                  brand: perfume.brand,
                  size: size.size,
                  price: size.price,
                  qty: 1,
                  imageUrl: perfume.imageUrl,
                });
                setAdded(true);
                setTimeout(() => setAdded(false), 1500);
              }}
              className="btn-gold flex-1 py-3 rounded-full uppercase tracking-wide-lux text-xs font-semibold"
            >
              {added ? "✓ Added" : "Add to Cart"}
            </button>
            <Link
              href={`/product/${perfume.code}`}
              className="btn-outline-gold py-3 px-5 rounded-full uppercase tracking-wide-lux text-xs grid place-items-center"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
