import { getAllPerfumes } from "@/lib/queries";
import { CompareView } from "@/components/compare-view";


export default async function ComparePage() {
  const perfumes = await getAllPerfumes();
  return (
    <div className="pt-32 pb-20 mx-auto max-w-7xl px-5">
      <div className="text-center mb-12">
        <p className="text-champagne/80 tracking-luxury uppercase text-xs mb-3">
          Side by Side
        </p>
        <h1 className="font-serif text-5xl md:text-6xl text-gold-gradient">
          Compare Fragrances
        </h1>
        <div className="gold-line h-px w-24 mx-auto my-5" />
      </div>
      <CompareView perfumes={perfumes} />
    </div>
  );
}
