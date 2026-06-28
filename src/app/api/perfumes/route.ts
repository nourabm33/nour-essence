import { db } from "@/db";
import { perfumes } from "@/db/schema";
import { asc } from "drizzle-orm";
import { buildCatalog } from "@/db/catalog";
import type { SizeOption } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!db) {
    const catalog = buildCatalog().map((p, i) => ({ ...p, id: i + 1, imageUrl: "", createdAt: new Date() }));
    return Response.json(catalog);
  }
  const rows = await db.select().from(perfumes).orderBy(asc(perfumes.code));
  return Response.json(rows);
}

export async function POST(req: Request) {
  if (!db) {
    return Response.json({ error: "Database not configured" }, { status: 503 });
  }
  try {
    const body = await req.json();
    if (!body.code || !body.name || !body.brand) {
      return Response.json(
        { error: "code, name and brand are required" },
        { status: 400 },
      );
    }
    const sizes: SizeOption[] = Array.isArray(body.sizes) ? body.sizes : [];
    const [row] = await db
      .insert(perfumes)
      .values({
        code: String(body.code).trim(),
        name: String(body.name).trim(),
        brand: String(body.brand).trim(),
        gender: body.gender ?? "unisex",
        collection: body.collection ?? "classic",
        category: body.category ?? "Mixte",
        imageUrl: body.imageUrl ?? "",
        description: body.description ?? "",
        notes: body.notes ?? "",
        sizes,
        featured: Boolean(body.featured),
        stock: Number.isFinite(body.stock) ? Number(body.stock) : 50,
      })
      .returning();
    return Response.json(row, { status: 201 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to create perfume";
    return Response.json({ error: msg }, { status: 500 });
  }
}
