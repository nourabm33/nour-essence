import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getPerfumeByCode, getRelated } from "@/lib/queries";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductGrid } from "@/components/product-grid";
import { ProductImage } from "@/components/product-image";
import { LeafMark } from "@/components/logo";
import { COLLECTION_LABELS, GENDER_LABELS } from "@/lib/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const p = await getPerfumeByCode(code);
  if (!p) return { title: "Not found — NOUR ÉSSENCE" };
  return {
    title: `${p.name} (${p.code}) — NOUR ÉSSENCE`,
    description: p.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const perfume = await getPerfumeByCode(code);
  if (!perfume) notFound();
  const related = await getRelated(perfume);

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-5">
        <nav className="text-xs text-cream/40 tracking-wide-lux uppercase mb-8">
          <Link href="/" className="hover:text-champagne">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/catalog" className="hover:text-champagne">Collection</Link>
          <span className="mx-2">/</span>
          <span className="text-champagne">{perfume.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* image */}
          <div className="glass rounded-3xl bg-gradient-to-b from-[#fbf6ec] to-[#e9ddc7] grid place-items-center p-10 relative overflow-hidden">
            <LeafMark className="absolute -left-10 -bottom-10 w-56 h-56 text-gold/15" />
            <ProductImage
              code={perfume.code}
              imageUrl={perfume.imageUrl}
              name={perfume.name}
              showCode
              className="h-[26rem] w-full relative"
              imgClassName="h-[26rem] w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
              artClassName="h-[26rem] w-auto"
            />
            {perfume.collection === "luxury" && (
              <span className="absolute top-5 right-5 text-[10px] tracking-wide-lux uppercase bg-gradient-to-r from-champagne to-gold-deep text-noir px-3 py-1.5 rounded-full font-semibold">
                Luxury Collection
              </span>
            )}
          </div>

          {/* info */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] tracking-wide-lux uppercase bg-black/40 border border-gold/30 text-champagne px-3 py-1 rounded-full">
                Code {perfume.code}
              </span>
              <span className="text-[10px] tracking-wide-lux uppercase text-cream/50">
                {GENDER_LABELS[perfume.gender]} ·{" "}
                {COLLECTION_LABELS[perfume.collection]}
              </span>
            </div>

            <h1 className="font-serif text-5xl text-gold-gradient leading-tight">
              {perfume.name}
            </h1>
            <p className="mt-3 text-cream/70">
              Inspired by{" "}
              <span className="text-champagne font-medium">{perfume.name}</span>{" "}
              — {perfume.brand}
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              {perfume.notes.split("·").map((n) => (
                <span
                  key={n}
                  className="text-xs px-3 py-1 rounded-full border border-gold/25 text-cream/65"
                >
                  {n.trim()}
                </span>
              ))}
            </div>

            <p className="mt-6 text-cream/65 leading-relaxed">
              {perfume.description}
            </p>

            <div className="gold-line h-px w-full my-8 opacity-40" />

            <ProductPurchase perfume={perfume} />
          </div>
        </div>

        {/* similar original perfume */}
        <section className="mt-20 glass rounded-3xl p-8 md:p-12 grid md:grid-cols-3 gap-8 items-center">
          <div className="grid place-items-center">
            <div className="w-44 h-56 rounded-2xl bg-gradient-to-b from-[#fbf6ec] to-[#e9ddc7] border border-gold/20 grid place-items-center p-4 overflow-hidden">
              <ProductImage
                code={perfume.code + "ORIG"}
                imageUrl={perfume.imageUrl}
                name={perfume.name}
                className="h-full w-full"
                imgClassName="h-full w-full"
                artClassName="h-40 w-auto"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="text-champagne/80 tracking-luxury uppercase text-xs mb-3">
              The Original Inspiration
            </p>
            <h2 className="font-serif text-3xl text-cream">
              {perfume.name}{" "}
              <span className="text-champagne text-2xl">· {perfume.brand}</span>
            </h2>
            <p className="mt-4 text-cream/60 leading-relaxed">
              Our {perfume.code} is a faithful homage to {perfume.name} by{" "}
              {perfume.brand}, reinterpreted as a 30% concentrated extract.
              Experience the same iconic character with the longevity and depth
              of a true parfum — at a fraction of the price.
            </p>
            <span className="inline-block mt-5 text-[10px] uppercase tracking-wide-lux text-cream/45">
              House: {perfume.brand}
            </span>
          </div>
        </section>

        {/* related */}
        {related.length > 0 && (
          <section className="mt-20">
            <div className="text-center mb-12">
              <p className="text-champagne/80 tracking-luxury uppercase text-xs mb-3">
                You May Also Love
              </p>
              <h2 className="font-serif text-4xl text-gold-gradient">
                Similar Fragrances
              </h2>
            </div>
            <ProductGrid perfumes={related} />
          </section>
        )}
      </div>
    </div>
  );
}
