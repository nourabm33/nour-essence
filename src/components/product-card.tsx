"use client";

import Link from "next/link";
import { useStore } from "./store-context";
import { ProductImage } from "./product-image";
import { formatPrice, priceFrom, type PerfumeDTO } from "@/lib/types";

export function ProductCard({
  p,
  onQuickView,
}: {
  p: PerfumeDTO;
  onQuickView?: (p: PerfumeDTO) => void;
}) {
  const { wishlist, toggleWishlist, compare, toggleCompare } = useStore();
  const wished = wishlist.includes(p.code);
  const inCompare = compare.includes(p.code);

  return (
    <div className="group glass card-hover rounded-2xl overflow-hidden flex flex-col">
      <div className="relative">
        <Link
          href={`/product/${p.code}`}
          className="block aspect-[4/5] bg-gradient-to-b from-[#fbf6ec] to-[#efe4cf] grid place-items-center p-4 overflow-hidden"
        >
          <ProductImage
            code={p.code}
            imageUrl={p.imageUrl}
            name={p.name}
            className="h-full w-full"
            imgClassName="h-full w-full drop-shadow-[0_10px_25px_rgba(0,0,0,0.18)] transition-transform duration-500 group-hover:scale-110"
            artClassName="h-full w-auto transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        <span className="absolute top-3 left-3 text-[10px] tracking-wide-lux uppercase bg-black/50 border border-gold/30 text-champagne px-2.5 py-1 rounded-full">
          {p.code}
        </span>

        {p.collection === "luxury" && (
          <span className="absolute top-3 right-3 text-[9px] tracking-wide-lux uppercase bg-gradient-to-r from-champagne to-gold-deep text-noir px-2 py-1 rounded-full font-semibold">
            Luxury
          </span>
        )}

        {/* hover actions */}
        <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 p-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
          {onQuickView && (
            <button
              onClick={() => onQuickView(p)}
              className="glass-strong rounded-full px-3 py-2 text-[10px] uppercase tracking-wide-lux text-champagne hover:text-cream"
            >
              Quick View
            </button>
          )}
          <button
            onClick={() => toggleWishlist(p.code)}
            className={`glass-strong rounded-full w-9 h-9 grid place-items-center transition-colors ${
              wished ? "text-red-400" : "text-champagne hover:text-cream"
            }`}
            aria-label="Wishlist"
          >
            {wished ? "♥" : "♡"}
          </button>
          <button
            onClick={() => toggleCompare(p.code)}
            className={`glass-strong rounded-full w-9 h-9 grid place-items-center text-sm transition-colors ${
              inCompare ? "text-champagne" : "text-cream/70 hover:text-champagne"
            }`}
            aria-label="Compare"
            title="Add to compare"
          >
            ⇄
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-[10px] tracking-wide-lux uppercase text-champagne/70">
          {p.brand}
        </p>
        <Link href={`/product/${p.code}`}>
          <h3 className="font-serif text-xl leading-tight text-cream mt-0.5 hover:text-champagne transition-colors">
            {p.name}
          </h3>
        </Link>
        <p className="text-xs text-cream/40 mt-1">{p.notes}</p>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-xs text-cream/50">
            from{" "}
            <span className="text-champagne text-base font-medium">
              {formatPrice(priceFrom(p.sizes))}
            </span>
          </span>
          <Link
            href={`/product/${p.code}`}
            className="text-[10px] uppercase tracking-wide-lux text-champagne border-b border-gold/40 hover:border-champagne pb-0.5"
          >
            Discover
          </Link>
        </div>
      </div>
    </div>
  );
}
