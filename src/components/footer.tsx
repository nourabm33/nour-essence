import Link from "next/link";
import { BrandLogo } from "./logo";

export function Footer() {
  return (
    <footer className="relative z-10 mt-24 border-t border-gold/20 bg-gradient-to-b from-transparent to-black/60">
      <div className="mx-auto max-w-7xl px-5 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <BrandLogo />
          <p className="mt-5 max-w-sm text-cream/60 leading-relaxed text-sm">
            A maison of refined fragrances inspired by the world&apos;s most iconic
            perfume houses. Concentrated extracts at 30%, crafted for those who
            seek timeless elegance.
          </p>
        </div>
        <div>
          <h4 className="font-serif text-lg text-champagne mb-4 tracking-wide-lux">
            Explore
          </h4>
          <ul className="space-y-2 text-sm text-cream/60">
            <li><Link href="/catalog" className="hover:text-champagne">Collection</Link></li>
            <li><Link href="/catalog?gender=women" className="hover:text-champagne">Women</Link></li>
            <li><Link href="/catalog?gender=men" className="hover:text-champagne">Men</Link></li>
            <li><Link href="/catalog?gender=unisex" className="hover:text-champagne">Unisex</Link></li>
            <li><Link href="/catalog?collection=luxury" className="hover:text-champagne">Luxury Collection</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif text-lg text-champagne mb-4 tracking-wide-lux">
            Maison
          </h4>
          <ul className="space-y-2 text-sm text-cream/60">
            <li><Link href="/wishlist" className="hover:text-champagne">Wishlist</Link></li>
            <li><Link href="/compare" className="hover:text-champagne">Compare</Link></li>
            <li><Link href="/checkout" className="hover:text-champagne">Checkout</Link></li>
            <li><Link href="/admin" className="hover:text-champagne">Admin Panel</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gold/10 py-6 text-center text-xs text-cream/40 tracking-wide-lux">
        © {new Date().getFullYear()} NOUR ÉSSENCE · L&apos;Essence de la Beauté Naturelle
      </div>
    </footer>
  );
}
