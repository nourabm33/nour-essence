"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/components/store-context";
import { ProductImage } from "@/components/product-image";
import { formatPrice } from "@/lib/types";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, updateQty, removeFromCart } = useStore();
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [orderId, setOrderId] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await new Promise((r) => setTimeout(r, 800));
      setOrderId(Date.now());
      setStatus("done");
      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to place order");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="pt-40 pb-32 mx-auto max-w-xl px-5 text-center">
        <p className="text-6xl mb-6 text-champagne">✦</p>
        <h1 className="font-serif text-4xl text-gold-gradient">
          Thank You for Your Order
        </h1>
        <p className="text-cream/60 mt-4">
          Your order <span className="text-champagne">#{orderId}</span> has been
          received. Our maison will contact you shortly to confirm delivery.
        </p>
        <Link
          href="/catalog"
          className="inline-block mt-8 btn-gold px-8 py-3 rounded-full uppercase tracking-wide-lux text-sm font-semibold"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 mx-auto max-w-6xl px-5">
      <div className="text-center mb-12">
        <p className="text-champagne/80 tracking-luxury uppercase text-xs mb-3">
          Final Step
        </p>
        <h1 className="font-serif text-5xl text-gold-gradient">Checkout</h1>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-serif text-3xl text-cream/60">Your cart is empty</p>
          <Link
            href="/catalog"
            className="inline-block mt-8 btn-gold px-8 py-3 rounded-full uppercase tracking-wide-lux text-sm font-semibold"
          >
            Browse Collection
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-10">
          {/* order summary */}
          <div className="glass rounded-2xl p-6 h-fit">
            <h2 className="font-serif text-2xl text-champagne mb-5">
              Order Summary
            </h2>
            <div className="space-y-4">
              {cart.map((l) => (
                <div key={l.code + l.size} className="flex gap-4 items-center">
                  <div className="w-14 h-18 shrink-0 rounded-lg bg-gradient-to-b from-[#fbf6ec] to-[#e9ddc7] overflow-hidden p-1">
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
                    <p className="font-serif text-lg text-cream truncate">
                      {l.name}
                    </p>
                    <p className="text-xs text-champagne/70 uppercase tracking-wide-lux">
                      {l.brand} · {l.size}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQty(l.code, l.size, l.qty - 1)}
                        className="text-champagne px-1"
                      >
                        −
                      </button>
                      <span className="text-sm">{l.qty}</span>
                      <button
                        onClick={() => updateQty(l.code, l.size, l.qty + 1)}
                        className="text-champagne px-1"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeFromCart(l.code, l.size)}
                        className="ml-2 text-xs text-cream/40 hover:text-red-400"
                      >
                        remove
                      </button>
                    </div>
                  </div>
                  <span className="text-champagne">
                    {formatPrice(l.price * l.qty)}
                  </span>
                </div>
              ))}
            </div>
            <div className="gold-line h-px w-full my-5 opacity-40" />
            <div className="flex justify-between items-center">
              <span className="text-cream/60 uppercase tracking-wide-lux text-sm">
                Total
              </span>
              <span className="font-serif text-3xl text-gold-gradient">
                {formatPrice(cartTotal)}
              </span>
            </div>
          </div>

          {/* form */}
          <form onSubmit={submit} className="glass rounded-2xl p-6 space-y-4">
            <h2 className="font-serif text-2xl text-champagne mb-2">
              Delivery Details
            </h2>
            <Field
              label="Full Name"
              value={form.customerName}
              onChange={(v) => setForm({ ...form, customerName: v })}
              required
            />
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              required
            />
            <Field
              label="Phone"
              value={form.phone}
              onChange={(v) => setForm({ ...form, phone: v })}
            />
            <div>
              <label className="block text-[10px] uppercase tracking-wide-lux text-cream/45 mb-1.5">
                Address
              </label>
              <textarea
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={3}
                className="w-full bg-black/30 border border-gold/25 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-champagne"
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-gold w-full py-3.5 rounded-full uppercase tracking-wide-lux text-sm font-semibold disabled:opacity-60"
            >
              {status === "loading"
                ? "Placing Order…"
                : `Place Order · ${formatPrice(cartTotal)}`}
            </button>
            <p className="text-xs text-cream/40 text-center">
              Cash on delivery · Secure handling by NOUR ÉSSENCE
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-wide-lux text-cream/45 mb-1.5">
        {label} {required && <span className="text-champagne">*</span>}
      </label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/30 border border-gold/25 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-champagne"
      />
    </div>
  );
}
