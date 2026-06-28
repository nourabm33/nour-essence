"use client";

import Link from "next/link";
import { useStore } from "./store-context";
import { formatPrice } from "@/lib/types";
import { ProductImage } from "./product-image";

export function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { cart, removeFromCart, updateQty, cartTotal } = useStore();

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-400 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md glass-strong border-l border-gold/30 flex flex-col transition-transform duration-500 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gold/20">
          <h2 className="font-serif text-2xl text-gold-gradient tracking-wide-lux">
            Your Cart
          </h2>
          <button
            onClick={onClose}
            className="text-cream/70 hover:text-champagne text-2xl leading-none"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-cream/50 mt-16 font-serif text-xl">
              Your cart is empty.
            </p>
          ) : (
            cart.map((l) => (
              <div
                key={l.code + l.size}
                className="flex gap-4 glass rounded-xl p-3"
              >
                <div className="w-16 h-20 shrink-0 rounded-lg bg-gradient-to-b from-[#fbf6ec] to-[#e9ddc7] overflow-hidden p-1">
                  <ProductImage
                    code={l.code}
                    imageUrl={l.imageUrl}
                    name={l.name}
                    className="w-full h-full"
                    imgClassName="w-full h-full"
                    artClassName="h-full w-auto"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif text-lg leading-tight text-cream truncate">
                    {l.name}
                  </p>
                  <p className="text-xs text-champagne/70 uppercase tracking-wide-lux">
                    {l.brand} · {l.size}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center border border-gold/30 rounded-md">
                      <button
                        onClick={() => updateQty(l.code, l.size, l.qty - 1)}
                        className="px-2 text-champagne"
                      >
                        −
                      </button>
                      <span className="px-2 text-sm">{l.qty}</span>
                      <button
                        onClick={() => updateQty(l.code, l.size, l.qty + 1)}
                        className="px-2 text-champagne"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-champagne font-medium">
                      {formatPrice(l.price * l.qty)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(l.code, l.size)}
                  className="text-cream/40 hover:text-red-400 text-sm self-start"
                  aria-label="Remove"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 border-t border-gold/20 space-y-4">
            <div className="flex justify-between text-lg">
              <span className="text-cream/70">Total</span>
              <span className="text-gold-gradient font-serif text-2xl">
                {formatPrice(cartTotal)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className="btn-gold block text-center py-3 rounded-full uppercase tracking-wide-lux text-sm font-semibold"
            >
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
