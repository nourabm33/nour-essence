"use client";

import { useState } from "react";
import { useStore } from "./store-context";
import { formatPrice, type PerfumeDTO } from "@/lib/types";

export function ProductPurchase({ perfume }: { perfume: PerfumeDTO }) {
  const { addToCart, wishlist, toggleWishlist, compare, toggleCompare } =
    useStore();
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const size = perfume.sizes[sizeIdx];
  const wished = wishlist.includes(perfume.code);
  const inCompare = compare.includes(perfume.code);

  return (
    <div>
      {/* price table */}
      <div className="glass rounded-2xl overflow-hidden mb-6">
        <div className="grid grid-cols-2 px-5 py-3 border-b border-gold/15 text-[10px] uppercase tracking-wide-lux text-cream/45">
          <span>Size</span>
          <span className="text-right">Price</span>
        </div>
        {perfume.sizes.map((s, i) => (
          <button
            key={s.size}
            onClick={() => setSizeIdx(i)}
            className={`w-full grid grid-cols-2 px-5 py-3 text-left transition-colors ${
              i === sizeIdx ? "bg-gold/12" : "hover:bg-gold/5"
            }`}
          >
            <span
              className={`flex items-center gap-2 ${
                i === sizeIdx ? "text-champagne" : "text-cream/80"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  i === sizeIdx ? "bg-champagne" : "bg-gold/30"
                }`}
              />
              {s.size}
            </span>
            <span
              className={`text-right font-medium ${
                i === sizeIdx ? "text-champagne" : "text-cream/70"
              }`}
            >
              {formatPrice(s.price)}
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center border border-gold/30 rounded-full">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-4 py-2 text-champagne text-lg"
          >
            −
          </button>
          <span className="px-3 min-w-8 text-center">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-4 py-2 text-champagne text-lg"
          >
            +
          </button>
        </div>
        <div className="text-cream/60 text-sm">
          Total{" "}
          <span className="text-champagne text-lg font-medium">
            {formatPrice(size.price * qty)}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => {
            addToCart({
              code: perfume.code,
              name: perfume.name,
              brand: perfume.brand,
              size: size.size,
              price: size.price,
              qty,
              imageUrl: perfume.imageUrl,
            });
            setAdded(true);
            setTimeout(() => setAdded(false), 1600);
          }}
          className="btn-gold flex-1 py-3.5 rounded-full uppercase tracking-wide-lux text-sm font-semibold"
        >
          {added ? "✓ Added to Cart" : "Add to Cart"}
        </button>
        <button
          onClick={() => toggleWishlist(perfume.code)}
          className={`btn-outline-gold py-3.5 px-5 rounded-full text-lg ${
            wished ? "text-red-400" : ""
          }`}
          aria-label="Wishlist"
        >
          {wished ? "♥" : "♡"}
        </button>
        <button
          onClick={() => toggleCompare(perfume.code)}
          className={`btn-outline-gold py-3.5 px-5 rounded-full text-lg ${
            inCompare ? "text-champagne" : ""
          }`}
          aria-label="Compare"
          title="Add to compare"
        >
          ⇄
        </button>
      </div>

      <p className="mt-5 text-xs text-cream/45 flex items-center gap-2">
        <span className="text-champagne">✦</span>
        {perfume.stock > 0
          ? `In stock — ships within 48h`
          : "Currently out of stock"}
      </p>
    </div>
  );
}
