import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Jost, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/store-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Particles } from "@/components/particles";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "NOUR ÉSSENCE — L'Essence de la Beauté Naturelle",
  description:
    "NOUR ÉSSENCE — Maison de parfums de luxe. Discover premium fragrances inspired by the world's most iconic perfume houses.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${playfair.variable}`}
    >
      <body className="bg-noir text-cream antialiased relative min-h-screen">
        <Particles />
        <CartProvider>
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
