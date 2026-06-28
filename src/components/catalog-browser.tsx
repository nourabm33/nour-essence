"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "./product-card";
import { QuickView } from "./quick-view";
import type { PerfumeDTO } from "@/lib/types";

const GENDERS = [
  { key: "all", label: "All" },
  { key: "women", label: "Women" },
  { key: "men", label: "Men" },
  { key: "unisex", label: "Unisex" },
  { key: "kids", label: "Kids" },
];

const COLLECTIONS = [
  { key: "all", label: "All Collections" },
  { key: "classic", label: "Signature" },
  { key: "luxe", label: "Luxe" },
  { key: "luxury", label: "Luxury Collection" },
  { key: "kids", label: "Enfants" },
];

export function CatalogBrowser({ perfumes }: { perfumes: PerfumeDTO[] }) {
  const params = useSearchParams();
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState("all");
  const [collection, setCollection] = useState("all");
  const [sort, setSort] = useState("code");
  const [quick, setQuick] = useState<PerfumeDTO | null>(null);

  useEffect(() => {
    const g = params.get("gender");
    const c = params.get("collection");
    const q = params.get("q");
    /* eslint-disable react-hooks/set-state-in-effect -- sync from URL params */
    if (g) setGender(g);
    if (c) setCollection(c);
    if (q) setQuery(q);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [params]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = perfumes.filter((p) => {
      if (gender !== "all" && p.gender !== gender) return false;
      if (collection !== "all" && p.collection !== collection) return false;
      if (q) {
        const hay = `${p.code} ${p.name} ${p.brand}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    list = [...list].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "brand") return a.brand.localeCompare(b.brand);
      if (sort === "price")
        return (
          Math.min(...a.sizes.map((s) => s.price)) -
          Math.min(...b.sizes.map((s) => s.price))
        );
      return a.code.localeCompare(b.code);
    });
    return list;
  }, [perfumes, query, gender, collection, sort]);

  return (
    <div>
      {/* search */}
      <div className="glass rounded-2xl p-5 mb-8">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by code, perfume name or brand…"
            className="w-full bg-black/30 border border-gold/25 rounded-full px-5 py-3 pl-12 text-cream placeholder:text-cream/40 focus:outline-none focus:border-champagne transition-colors"
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-champagne/60">
            ⌕
          </span>
        </div>

        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-wide-lux text-cream/40 mr-1">
              Gender
            </span>
            {GENDERS.map((g) => (
              <Chip
                key={g.key}
                active={gender === g.key}
                onClick={() => setGender(g.key)}
              >
                {g.label}
              </Chip>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase tracking-wide-lux text-cream/40 mr-1">
              Collection
            </span>
            {COLLECTIONS.map((c) => (
              <Chip
                key={c.key}
                active={collection === c.key}
                onClick={() => setCollection(c.key)}
              >
                {c.label}
              </Chip>
            ))}
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-[10px] uppercase tracking-wide-lux text-cream/40">
              Sort
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-black/40 border border-gold/25 rounded-full px-3 py-1.5 text-sm text-cream focus:outline-none focus:border-champagne"
            >
              <option value="code">Code</option>
              <option value="name">Name</option>
              <option value="brand">Brand</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      </div>

      <p className="text-sm text-cream/50 mb-6">
        {filtered.length} fragrance{filtered.length !== 1 ? "s" : ""} found
      </p>

      {filtered.length === 0 ? (
        <p className="text-center font-serif text-2xl text-cream/40 py-20">
          No fragrances match your search.
        </p>
      ) : (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.code} p={p} onQuickView={setQuick} />
          ))}
        </div>
      )}

      <QuickView perfume={quick} onClose={() => setQuick(null)} />
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 rounded-full text-xs tracking-wide-lux uppercase border transition-all ${
        active
          ? "border-champagne bg-gold/15 text-champagne"
          : "border-gold/20 text-cream/55 hover:border-gold/50 hover:text-cream"
      }`}
    >
      {children}
    </button>
  );
}
