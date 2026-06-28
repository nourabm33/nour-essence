"use client";

import { useState } from "react";
import { ProductCard } from "./product-card";
import { QuickView } from "./quick-view";
import type { PerfumeDTO } from "@/lib/types";

export function ProductGrid({ perfumes }: { perfumes: PerfumeDTO[] }) {
  const [quick, setQuick] = useState<PerfumeDTO | null>(null);
  return (
    <>
      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {perfumes.map((p) => (
          <ProductCard key={p.code} p={p} onQuickView={setQuick} />
        ))}
      </div>
      <QuickView perfume={quick} onClose={() => setQuick(null)} />
    </>
  );
}
