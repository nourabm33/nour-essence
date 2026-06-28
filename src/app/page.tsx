import Link from "next/link";
import { getFeatured, getAllPerfumes } from "@/lib/queries";
import { ProductGrid } from "@/components/product-grid";
import { LeafMark } from "@/components/logo";
import { HeroReveal } from "@/components/hero-reveal";


export default async function Home() {
  const [featured, all] = await Promise.all([getFeatured(), getAllPerfumes()]);
  const brands = Array.from(new Set(all.map((p) => p.brand))).slice(0, 14);

  return (
    <>
      {/* HERO — cursor spotlight reveal */}
      <HeroReveal />

      {/* MARQUEE BRANDS */}
      <section className="border-y border-gold/15 py-6 overflow-hidden bg-black/40">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 px-5 text-cream/40 text-xs tracking-luxury uppercase">
          {brands.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-5 py-24">
        <SectionHeading
          eyebrow="Curated Selection"
          title="Signature Fragrances"
          subtitle="A refined edit of our most coveted scents, inspired by the world's iconic perfume houses."
        />
        <ProductGrid perfumes={featured} />
      </section>

      {/* COLLECTIONS */}
      <section className="mx-auto max-w-7xl px-5 pb-24">
        <SectionHeading
          eyebrow="Explore"
          title="Our Collections"
          subtitle="Three universes of fragrance, one obsession with quality."
        />
        <div className="grid gap-6 md:grid-cols-3">
          <CollectionCard
            href="/catalog?collection=classic"
            title="Signature"
            desc="Iconic inspirations crafted with 30% concentrated extract."
            tone="from-[#2a2114] to-[#0e0b07]"
          />
          <CollectionCard
            href="/catalog?collection=luxe"
            title="Luxe"
            desc="Elevated compositions inspired by niche & designer houses."
            tone="from-[#3a2a16] to-[#0e0b07]"
          />
          <CollectionCard
            href="/catalog?collection=luxury"
            title="Luxury Collection"
            desc="Rare olfactory masterpieces — Tom Ford, Xerjoff, MFK & more."
            tone="from-[#46341c] to-[#0e0b07]"
          />
        </div>
      </section>

      {/* ABOUT / ATMOSPHERE */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 py-24 grid md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-gold/20">
            <div
              className="absolute inset-0 bg-cover bg-center animate-kenburns"
              style={{ backgroundImage: "url('/images/atmosphere.jpg')" }}
            />
          </div>
          <div>
            <p className="text-champagne/80 tracking-luxury uppercase text-xs mb-4">
              The Maison
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-gold-gradient leading-tight">
              The Art of Fine Fragrance
            </h2>
            <p className="mt-6 text-cream/65 leading-relaxed">
              At NOUR ÉSSENCE, we believe luxury lies in the detail. Each fragrance
              is a concentrated extract at 30%, composed to capture the soul of the
              world&apos;s most beloved scents — from the warmth of amber to the
              brightness of citrus and the depth of precious oud.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                "30% concentrated parfum extract",
                "Refillable formats — 15ml, 30ml & 70ml",
                "Inspired by 120+ iconic fragrances",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3 text-cream/75">
                  <span className="text-champagne">✦</span>
                  {t}
                </li>
              ))}
            </ul>
            <Link
              href="/catalog"
              className="inline-block mt-9 btn-outline-gold px-8 py-3 rounded-full uppercase tracking-wide-lux text-sm"
            >
              Browse the Collection
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-14">
      <p className="text-champagne/80 tracking-luxury uppercase text-xs mb-3">
        {eyebrow}
      </p>
      <h2 className="font-serif text-4xl md:text-5xl text-gold-gradient">
        {title}
      </h2>
      <div className="gold-line h-px w-24 mx-auto my-5" />
      <p className="text-cream/60">{subtitle}</p>
    </div>
  );
}

function CollectionCard({
  href,
  title,
  desc,
  tone,
}: {
  href: string;
  title: string;
  desc: string;
  tone: string;
}) {
  return (
    <Link
      href={href}
      className={`group card-hover glass rounded-2xl p-8 bg-gradient-to-b ${tone} relative overflow-hidden block`}
    >
      <LeafMark className="absolute -right-6 -top-6 w-32 h-32 text-gold/10 group-hover:text-gold/20 transition-colors" />
      <h3 className="font-serif text-3xl text-champagne relative">{title}</h3>
      <p className="mt-3 text-cream/60 text-sm relative">{desc}</p>
      <span className="mt-6 inline-block text-[10px] uppercase tracking-wide-lux text-champagne border-b border-gold/40 pb-0.5 relative">
        Explore →
      </span>
    </Link>
  );
}
