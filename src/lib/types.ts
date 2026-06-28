export type SizeOption = { size: string; price: number };

export type PerfumeDTO = {
  id: number;
  code: string;
  name: string;
  brand: string;
  gender: string;
  collection: string;
  category: string;
  imageUrl: string;
  description: string;
  notes: string;
  sizes: SizeOption[];
  featured: boolean;
  stock: number;
};

export type CartLine = {
  code: string;
  name: string;
  brand: string;
  size: string;
  price: number;
  qty: number;
  imageUrl?: string;
};

export const COLLECTION_LABELS: Record<string, string> = {
  classic: "Signature Collection",
  luxe: "Luxe Collection",
  luxury: "Luxury Collection",
  kids: "Enfants Collection",
};

export const GENDER_LABELS: Record<string, string> = {
  women: "Women",
  men: "Men",
  unisex: "Unisex",
  kids: "Kids",
};

export function formatPrice(n: number): string {
  return "€" + n.toFixed(2).replace(".", ",");
}

export function priceFrom(sizes: SizeOption[]): number {
  if (!sizes || sizes.length === 0) return 0;
  return Math.min(...sizes.map((s) => s.price));
}
