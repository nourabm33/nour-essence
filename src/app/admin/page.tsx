"use client";

import { useEffect, useState, useCallback } from "react";
import { buildCatalog } from "@/db/catalog";
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

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- restore auth from sessionStorage
    if (sessionStorage.getItem("ne_admin") === "ok") setAuthed(true);
  }, []);

  function login(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    const expected = "noureSSence2026";
    if (password === expected) {
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
  const [tab, setTab] = useState<"perfumes">("perfumes");
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [search, setSearch] = useState("");

  const loadPerfumes = useCallback(() => {
    const catalog = buildCatalog();
    const mapped: Perfume[] = catalog.map((p, i) => ({
      id: i + 1,
      code: p.code,
      name: p.name,
      brand: p.brand,
      gender: p.gender,
      collection: p.collection,
      category: p.category,
      imageUrl: "",
      description: p.description ?? "",
      notes: p.notes ?? "",
      sizes: (p.sizes ?? []) as Size[],
      featured: p.featured ?? false,
      stock: p.stock ?? 50,
    }));
    setPerfumes(mapped);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- initial data load
    loadPerfumes();
  }, [loadPerfumes]);

  const filtered = perfumes.filter((p) =>
    `${p.code} ${p.name} ${p.brand}`.toLowerCase().includes(search.toLowerCase()),
  );

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
        <Stat label="Collections" value="4" />
        <Stat label="Featured" value={perfumes.filter((p) => p.featured).length} />
        <Stat label="Brands" value={new Set(perfumes.map((p) => p.brand)).size} />
      </div>

      {/* tabs */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setTab("perfumes")}
          className="px-5 py-2 rounded-full text-xs uppercase tracking-wide-lux border transition-all border-champagne bg-gold/15 text-champagne"
        >
          perfumes
        </button>
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
          </div>

          <div className="glass rounded-2xl overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-wide-lux text-cream/40 border-b border-gold/15">
                  <th className="text-left p-4">Code</th>
                  <th className="text-left p-4">Name</th>
                  <th className="text-left p-4">Brand</th>
                  <th className="text-left p-4">Gender</th>
                  <th className="text-left p-4">Collection</th>
                  <th className="text-left p-4">From</th>
                  <th className="text-left p-4">Stock</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.code} className="border-b border-gold/8 hover:bg-gold/5">
                    <td className="p-4 text-champagne">{p.code}</td>
                    <td className="p-4 text-cream">{p.name}</td>
                    <td className="p-4 text-cream/60">{p.brand}</td>
                    <td className="p-4 text-cream/60 capitalize">{p.gender}</td>
                    <td className="p-4 text-cream/60 capitalize">{p.collection}</td>
                    <td className="p-4 text-cream/60">
                      {p.sizes.length
                        ? formatPrice(Math.min(...p.sizes.map((s) => s.price)))
                        : "—"}
                    </td>
                    <td className="p-4 text-cream/60">{p.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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
