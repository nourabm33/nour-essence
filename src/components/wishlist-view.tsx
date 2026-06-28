"use client";

import Link from "next/link";
import { useStore } from "./store-context";
import { ProductGrid } from "./product-grid";
import type { PerfumeDTO } from "@/lib/types";

export function WishlistView({ perfumes }: { perfumes: PerfumeDTO[] }) {
  const { wishlist } = useStore();
  const items = perfumes.filter((p) => wishlist.includes(p.code));

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-6xl mb-6">♡</p>
        <p className="font-serif text-3xl text-cream/60">
          Your wishlist is empty
        </p>
        <p className="text-cream/45 mt-3">
          Save your favourite fragrances and find them here.
        </p>
        <Link
          href="/catalog"
          className="inline-block mt-8 btn-gold px-8 py-3 rounded-full uppercase tracking-wide-lux text-sm font-semibold"
        >
          Browse Collection
        </Link>
      </div>
    );
  }

  return <ProductGrid perfumes={items} />;
}
