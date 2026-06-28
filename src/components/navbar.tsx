"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./logo";
import { useStore } from "./store-context";
import { CartDrawer } from "./cart-drawer";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/catalog", label: "Collection" },
  { href: "/catalog?collection=luxury", label: "Luxury" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/compare", label: "Compare" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount, wishlist } = useStore();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reset menu on route change
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-strong py-3 shadow-lg shadow-black/40"
            : "bg-transparent py-5"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 flex items-center justify-between">
          <Link href="/" aria-label="NOUR ÉSSENCE home">
            <BrandLogo compact={scrolled} />
          </Link>

          <nav className="hidden lg:flex items-center gap-9">
            {LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm tracking-wide-lux uppercase text-cream/80 hover:text-champagne transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-champagne transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/wishlist"
              className="relative text-cream/80 hover:text-champagne transition-colors"
              aria-label="Wishlist"
            >
              <HeartIcon />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-champagne text-noir text-[10px] font-semibold rounded-full w-4 h-4 grid place-items-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-cream/80 hover:text-champagne transition-colors"
              aria-label="Open cart"
            >
              <BagIcon />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-champagne text-noir text-[10px] font-semibold rounded-full w-4 h-4 grid place-items-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden text-champagne"
              aria-label="Menu"
            >
              <MenuIcon open={menuOpen} />
            </button>
          </div>
        </div>

        {/* mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ${
            menuOpen ? "max-h-96 mt-4" : "max-h-0"
          }`}
        >
          <nav className="flex flex-col gap-1 px-5 pb-2">
            {LINKS.concat([{ href: "/admin", label: "Admin" }]).map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="py-3 border-b border-gold/10 text-sm tracking-wide-lux uppercase text-cream/80 hover:text-champagne"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

function HeartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 21s-7.5-4.8-10-9.5C.5 8 2.5 4.5 6 4.5c2 0 3.3 1 4 2.2.7-1.2 2-2.2 4-2.2 3.5 0 5.5 3.5 4 7-2.5 4.7-10 9.5-10 9.5Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 8h12l-1 12H7L6 8Z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}
function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      {open ? (
        <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
      ) : (
        <>
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}
