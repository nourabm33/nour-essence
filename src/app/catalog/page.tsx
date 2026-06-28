import { Suspense } from "react";
import { getAllPerfumes } from "@/lib/queries";
import { CatalogBrowser } from "@/components/catalog-browser";


export default async function CatalogPage() {
  const perfumes = await getAllPerfumes();
  return (
    <div className="pt-32 pb-20 mx-auto max-w-7xl px-5">
      <div className="text-center mb-12">
        <p className="text-champagne/80 tracking-luxury uppercase text-xs mb-3">
          The Collection
        </p>
        <h1 className="font-serif text-5xl md:text-6xl text-gold-gradient">
          Discover Every Essence
        </h1>
        <div className="gold-line h-px w-24 mx-auto my-5" />
        <p className="text-cream/60 max-w-xl mx-auto">
          Browse {perfumes.length} fragrances by code, name or brand. Filter by
          gender and collection to find your signature scent.
        </p>
      </div>
      <Suspense
        fallback={
          <div className="text-center text-cream/40 py-20 font-serif text-2xl">
            Loading collection…
          </div>
        }
      >
        <CatalogBrowser perfumes={perfumes} />
      </Suspense>
    </div>
  );
}
