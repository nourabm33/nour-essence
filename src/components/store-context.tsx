"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { CartLine } from "@/lib/types";

type StoreContextType = {
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
  addToCart: (line: CartLine) => void;
  removeFromCart: (code: string, size: string) => void;
  updateQty: (code: string, size: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (code: string) => void;
  toggleCompare: (code: string) => void;
  cartCount: number;
  cartTotal: number;
};

const StoreContext = createContext<StoreContextType | null>(null);

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- hydrate from localStorage */
    setCart(load<CartLine[]>("ne_cart", []));
    setWishlist(load<string[]>("ne_wishlist", []));
    setCompare(load<string[]>("ne_compare", []));
    setReady(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem("ne_cart", JSON.stringify(cart));
  }, [cart, ready]);
  useEffect(() => {
    if (ready) window.localStorage.setItem("ne_wishlist", JSON.stringify(wishlist));
  }, [wishlist, ready]);
  useEffect(() => {
    if (ready) window.localStorage.setItem("ne_compare", JSON.stringify(compare));
  }, [compare, ready]);

  const addToCart = useCallback((line: CartLine) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (l) => l.code === line.code && l.size === line.size,
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + line.qty };
        return next;
      }
      return [...prev, line];
    });
  }, []);

  const removeFromCart = useCallback((code: string, size: string) => {
    setCart((prev) => prev.filter((l) => !(l.code === code && l.size === size)));
  }, []);

  const updateQty = useCallback((code: string, size: string, qty: number) => {
    setCart((prev) =>
      prev.map((l) =>
        l.code === code && l.size === size ? { ...l, qty: Math.max(1, qty) } : l,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((code: string) => {
    setWishlist((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code],
    );
  }, []);

  const toggleCompare = useCallback((code: string) => {
    setCompare((prev) => {
      if (prev.includes(code)) return prev.filter((c) => c !== code);
      if (prev.length >= 4) return [...prev.slice(1), code];
      return [...prev, code];
    });
  }, []);

  const cartCount = cart.reduce((s, l) => s + l.qty, 0);
  const cartTotal = cart.reduce((s, l) => s + l.qty * l.price, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        compare,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        toggleWishlist,
        toggleCompare,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within CartProvider");
  return ctx;
}
