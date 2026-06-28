"use client";

import { useEffect, useState, useCallback } from "react";
import { formatPrice } from "@/lib/types";

type Size = { size: string; price: number };
type Perfume = {
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
  sizes: Size[];
  featured: boolean;
  stock: number;
};
type Order = {
  id: number;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: { name: string; size: string; qty: number; price: number }[];
  total: string;
  status: string;
  createdAt: string;
};

const EMPTY: Perfume = {
  id: 0,
  code: "",
  name: "",
  brand: "",
  gender: "unisex",
  collection: "classic",
  category: "Mixte",
  imageUrl: "",
  description: "",
  notes: "Amber · Oud · Vanilla",
  sizes: [
    { size: "15 ml", price: 11.9 },
    { size: "30 ml", price: 18.0 },
    { size: "70 ml", price: 35.0 },
  ],
  featured: false,
  stock: 50,
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restore auth from sessionStorage
    if (sessionStorage.getItem("ne_admin") === "ok") setAuthed(true);
  }, []);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      sessionStorage.setItem("ne_admin", "ok");
      setAuthed(true);
    } else {
      setAuthError("Invalid password.");
    }
  }

  if (!authed) {
    return (
      <div className="pt-40 pb-32 grid place-items-center px-5">
        <form onSubmit={login} className="glass-strong rounded-3xl p-10 w-full max-w-md text-center">
          <h1 className="font-serif text-4xl text-gold-gradient">Admin Access</h1>
          <p className="text-cream/50 text-sm mt-3 mb-7">
            Enter the maison password to manage the boutique.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full bg-black/30 border border-gold/25 rounded-full px-5 py-3 text-cream text-center focus:outline-none focus:border-champagne"
          />
          {authError && <p className="text-red-400 text-sm mt-3">{authError}</p>}
          <button className="btn-gold w-full mt-5 py-3 rounded-full uppercase tracking-wide-lux text-sm font-semibold">
            Enter
          </button>
          <p className="text-xs text-cream/30 mt-5">
            Default password: noureSSence2026
          </p>
        </form>
      </div>
    );
  }

  return <AdminDashboard />;
}

function AdminDashboard() {
  const [tab, setTab] = useState<"perfumes" | "orders">("perfumes");
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editing, setEditing] = useState<Perfume | null>(null);
  const [search, setSearch] = useState("");

  const loadPerfumes = useCallback(async () => {
    const res = await fetch("/api/perfumes");
    setPerfumes(await res.json());
  }, []);
  const loadOrders = useCallback(async () => {
    const res = await fetch("/api/orders");
    setOrders(await res.json());
  }, []);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- initial data fetch */
    loadPerfumes();
    loadOrders();
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [loadPerfumes, loadOrders]);

  async function save(p: Perfume) {
    const isNew = !perfumes.some((x) => x.code === p.code) || p.id === 0;
    const res = await fetch(
      isNew ? "/api/perfumes" : `/api/perfumes/${p.code}`,
      {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(p),
      },
    );
    if (res.ok) {
      setEditing(null);
      loadPerfumes();
    } else {
      const d = await res.json();
      alert(d.error || "Failed to save");
    }
  }

  async function remove(code: string) {
    if (!confirm(`Delete perfume ${code}?`)) return;
    await fetch(`/api/perfumes/${code}`, { method: "DELETE" });
    loadPerfumes();
  }

  async function setOrderStatus(id: number, status: string) {
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadOrders();
  }

  const filtered = perfumes.filter((p) =>
    `${p.code} ${p.name} ${p.brand}`.toLowerCase().includes(search.toLowerCase()),
  );

  const revenue = orders.reduce((s, o) => s + Number(o.total), 0);

  return (
    <div className="pt-28 pb-20 mx-auto max-w-7xl px-5">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-champagne/80 tracking-luxury uppercase text-xs mb-2">
            Maison Dashboard
          </p>
          <h1 className="font-serif text-5xl text-gold-gradient">Admin Panel</h1>
        </div>
        <button
          onClick={() => {
            sessionStorage.removeItem("ne_admin");
            location.reload();
          }}
          className="btn-outline-gold px-5 py-2 rounded-full text-xs uppercase tracking-wide-lux"
        >
          Log out
        </button>
      </div>

      {/* stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Stat label="Perfumes" value={perfumes.length} />
        <Stat label="Orders" value={orders.length} />
        <Stat
          label="Pending"
          value={orders.filter((o) => o.status === "pending").length}
        />
        <Stat label="Revenue" value={formatPrice(revenue)} />
      </div>

      {/* tabs */}
      <div className="flex gap-3 mb-6">
        {(["perfumes", "orders"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-full text-xs uppercase tracking-wide-lux border transition-all ${
              tab === t
                ? "border-champagne bg-gold/15 text-champagne"
                : "border-gold/20 text-cream/55"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "perfumes" && (
        <div>
          <div className="flex flex-wrap gap-3 mb-5">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search perfumes…"
              className="flex-1 min-w-48 bg-black/30 border border-gold/25 rounded-full px-4 py-2 text-cream focus:outline-none focus:border-champagne"
            />
            <button
              onClick={() => setEditing({ ...EMPTY })}
              className="btn-gold px-5 py-2 rounded-full text-xs uppercase tracking-wide-lux font-semibold"
            >
              + Add Perfume
            </button>
          </div>

          <div className="glass rounded-2xl overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-wide-lux text-cream/40 border-b border-gold/15">
                  <th className="text-left p-4">Photo</th>
                  <th className="text-left p-4">Code</th>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Brand</th>
                  <th className="text-left p-4">Gender</th>
                  <th className="text-left p-4">From</th>
                  <th className="text-left p-4">Stock</th>
                  <th className="text-right p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.code} className="border-b border-gold/8 hover:bg-gold/5">
                    <td className="p-4">
                      <div className="w-10 h-12 rounded bg-gradient-to-b from-[#fbf6ec] to-[#e9ddc7] overflow-hidden grid place-items-center">
                        {p.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={p.imageUrl}
                            alt={p.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-[8px] text-cream/40">—</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-champagne">{p.code}</td>
                    <td className="p-4 text-cream">{p.name}</td>
                    <td className="p-4 text-cream/60">{p.brand}</td>
                    <td className="p-4 text-cream/60 capitalize">{p.gender}</td>
                    <td className="p-4 text-cream/60">
                      {p.sizes.length
                        ? formatPrice(Math.min(...p.sizes.map((s) => s.price)))
                        : "—"}
                    </td>
                    <td className="p-4 text-cream/60">{p.stock}</td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => setEditing(p)}
                        className="text-champagne hover:underline mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => remove(p.code)}
                        className="text-red-400/80 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === "orders" && (
        <div className="space-y-4">
          {orders.length === 0 && (
            <p className="text-cream/40 text-center py-16 font-serif text-2xl">
              No orders yet.
            </p>
          )}
          {orders.map((o) => (
            <div key={o.id} className="glass rounded-2xl p-5">
              <div className="flex flex-wrap justify-between gap-3">
                <div>
                  <p className="font-serif text-xl text-cream">
                    #{o.id} · {o.customerName}
                  </p>
                  <p className="text-xs text-cream/50">
                    {o.email} {o.phone && `· ${o.phone}`}
                  </p>
                  {o.address && (
                    <p className="text-xs text-cream/40 mt-1">{o.address}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-serif text-2xl text-gold-gradient">
                    {formatPrice(Number(o.total))}
                  </p>
                  <select
                    value={o.status}
                    onChange={(e) => setOrderStatus(o.id, e.target.value)}
                    className="mt-2 bg-black/40 border border-gold/25 rounded-full px-3 py-1 text-xs text-cream focus:outline-none focus:border-champagne capitalize"
                  >
                    {["pending", "processing", "shipped", "delivered", "cancelled"].map(
                      (s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ),
                    )}
                  </select>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {o.items.map((it, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full border border-gold/20 text-cream/65"
                  >
                    {it.name} · {it.size} × {it.qty}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <PerfumeEditor
          perfume={editing}
          onClose={() => setEditing(null)}
          onSave={save}
        />
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="glass rounded-2xl p-5">
      <p className="text-[10px] uppercase tracking-wide-lux text-cream/40">
        {label}
      </p>
      <p className="font-serif text-3xl text-champagne mt-1">{value}</p>
    </div>
  );
}

function PerfumeEditor({
  perfume,
  onClose,
  onSave,
}: {
  perfume: Perfume;
  onClose: () => void;
  onSave: (p: Perfume) => void;
}) {
  const [p, setP] = useState<Perfume>(perfume);

  function setSize(i: number, key: "size" | "price", v: string) {
    const sizes = [...p.sizes];
    sizes[i] = { ...sizes[i], [key]: key === "price" ? Number(v) : v };
    setP({ ...p, sizes });
  }

  return (
    <div
      className="fixed inset-0 z-[90] grid place-items-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="glass-strong rounded-3xl w-full max-w-2xl p-7 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-serif text-3xl text-gold-gradient">
            {perfume.id ? "Edit Perfume" : "New Perfume"}
          </h2>
          <button onClick={onClose} className="text-cream/60 text-xl">
            ✕
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <In label="Code" value={p.code} onChange={(v) => setP({ ...p, code: v })} disabled={!!perfume.id} />
          <In label="Name (inspired by)" value={p.name} onChange={(v) => setP({ ...p, name: v })} />
          <In label="Original Brand" value={p.brand} onChange={(v) => setP({ ...p, brand: v })} />
          <In label="Notes (use ·)" value={p.notes} onChange={(v) => setP({ ...p, notes: v })} />
          <Sel
            label="Gender"
            value={p.gender}
            options={["women", "men", "unisex", "kids"]}
            onChange={(v) => setP({ ...p, gender: v })}
          />
          <Sel
            label="Collection"
            value={p.collection}
            options={["classic", "luxe", "luxury", "kids"]}
            onChange={(v) => setP({ ...p, collection: v })}
          />
          <In label="Category" value={p.category} onChange={(v) => setP({ ...p, category: v })} />
          <In
            label="Stock"
            value={String(p.stock)}
            onChange={(v) => setP({ ...p, stock: Number(v) || 0 })}
          />
        </div>

        <div className="mt-4 flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-[10px] uppercase tracking-wide-lux text-cream/45 mb-1.5">
              Product Image URL
            </label>
            <input
              value={p.imageUrl}
              onChange={(e) => setP({ ...p, imageUrl: e.target.value })}
              placeholder="https://…/photo.jpg"
              className="w-full bg-black/30 border border-gold/25 rounded-lg px-3 py-2.5 text-cream focus:outline-none focus:border-champagne"
            />
          </div>
          <div className="w-16 h-20 shrink-0 rounded-lg bg-gradient-to-b from-[#fbf6ec] to-[#e9ddc7] overflow-hidden grid place-items-center">
            {p.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.imageUrl}
                alt="preview"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-[9px] text-cream/40">no image</span>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-[10px] uppercase tracking-wide-lux text-cream/45 mb-1.5">
            Description
          </label>
          <textarea
            value={p.description}
            onChange={(e) => setP({ ...p, description: e.target.value })}
            rows={3}
            className="w-full bg-black/30 border border-gold/25 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-champagne"
          />
        </div>

        <div className="mt-4">
          <p className="text-[10px] uppercase tracking-wide-lux text-cream/45 mb-2">
            Sizes & Prices
          </p>
          <div className="space-y-2">
            {p.sizes.map((s, i) => (
              <div key={i} className="flex gap-2">
                <input
                  value={s.size}
                  onChange={(e) => setSize(i, "size", e.target.value)}
                  placeholder="15 ml"
                  className="flex-1 bg-black/30 border border-gold/25 rounded-lg px-3 py-2 text-cream text-sm"
                />
                <input
                  type="number"
                  step="0.01"
                  value={s.price}
                  onChange={(e) => setSize(i, "price", e.target.value)}
                  className="w-28 bg-black/30 border border-gold/25 rounded-lg px-3 py-2 text-cream text-sm"
                />
                <button
                  onClick={() =>
                    setP({ ...p, sizes: p.sizes.filter((_, j) => j !== i) })
                  }
                  className="text-red-400/70 px-2"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() =>
                setP({ ...p, sizes: [...p.sizes, { size: "", price: 0 }] })
              }
              className="text-xs text-champagne uppercase tracking-wide-lux"
            >
              + Add size
            </button>
          </div>
        </div>

        <label className="flex items-center gap-2 mt-4 text-sm text-cream/70">
          <input
            type="checkbox"
            checked={p.featured}
            onChange={(e) => setP({ ...p, featured: e.target.checked })}
          />
          Featured on homepage
        </label>

        <div className="flex gap-3 mt-7">
          <button
            onClick={() => onSave(p)}
            className="btn-gold flex-1 py-3 rounded-full uppercase tracking-wide-lux text-sm font-semibold"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="btn-outline-gold px-6 py-3 rounded-full uppercase tracking-wide-lux text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function In({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-wide-lux text-cream/45 mb-1.5">
        {label}
      </label>
      <input
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/30 border border-gold/25 rounded-lg px-3 py-2.5 text-cream focus:outline-none focus:border-champagne disabled:opacity-50"
      />
    </div>
  );
}

function Sel({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-wide-lux text-cream/45 mb-1.5">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black/40 border border-gold/25 rounded-lg px-3 py-2.5 text-cream focus:outline-none focus:border-champagne capitalize"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
