"use client";

import Link from "next/link";
import { useStore } from "./store-context";
import { ProductImage } from "./product-image";
import { formatPrice, GENDER_LABELS, type PerfumeDTO } from "@/lib/types";

export function CompareView({ perfumes }: { perfumes: PerfumeDTO[] }) {
  const { compare, toggleCompare } = useStore();
  const items = perfumes.filter((p) => compare.includes(p.code));

  if (items.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-6xl mb-6 text-champagne">⇄</p>
        <p className="font-serif text-3xl text-cream/60">
          No fragrances to compare
        </p>
        <p className="text-cream/45 mt-3">
          Add up to 4 fragrances using the ⇄ button on any product.
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

  const rows: { label: string; render: (p: PerfumeDTO) => React.ReactNode }[] = [
    { label: "Code", render: (p) => p.code },
    { label: "Brand", render: (p) => p.brand },
    { label: "Gender", render: (p) => GENDER_LABELS[p.gender] },
    { label: "Notes", render: (p) => p.notes },
    {
      label: "Prices",
      render: (p) => (
        <div className="space-y-1">
          {p.sizes.map((s) => (
            <div key={s.size} className="text-xs">
              {s.size} —{" "}
              <span className="text-champagne">{formatPrice(s.price)}</span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] glass rounded-2xl overflow-hidden">
        <thead>
          <tr>
            <th className="p-5 text-left text-[10px] uppercase tracking-wide-lux text-cream/40 w-32" />
            {items.map((p) => (
              <th key={p.code} className="p-5 align-top">
                <div className="grid place-items-center gap-3">
                  <div className="h-28 w-24 rounded-lg bg-gradient-to-b from-[#fbf6ec] to-[#e9ddc7] overflow-hidden p-1">
                    <ProductImage
                      code={p.code}
                      imageUrl={p.imageUrl}
                      name={p.name}
                      className="h-full w-full"
                      imgClassName="h-full w-full"
                      artClassName="h-full w-auto"
                    />
                  </div>
                  <Link
                    href={`/product/${p.code}`}
                    className="font-serif text-xl text-champagne hover:underline"
                  >
                    {p.name}
                  </Link>
                  <button
                    onClick={() => toggleCompare(p.code)}
                    className="text-[10px] uppercase tracking-wide-lux text-red-400/70 hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-t border-gold/12">
              <td className="p-5 text-[10px] uppercase tracking-wide-lux text-cream/40 align-top">
                {r.label}
              </td>
              {items.map((p) => (
                <td key={p.code} className="p-5 text-cream/75 text-sm align-top text-center">
                  {r.render(p)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
