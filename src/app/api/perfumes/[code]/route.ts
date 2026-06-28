import { db } from "@/db";
import { perfumes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { buildCatalog } from "@/db/catalog";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  const { code } = await params;
  if (!db) {
    const item = buildCatalog().find((p) => p.code === code);
    if (!item) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ ...item, id: 0, imageUrl: "", createdAt: new Date() });
  }
  const [row] = await db
    .select()
    .from(perfumes)
    .where(eq(perfumes.code, code))
    .limit(1);
  if (!row) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(row);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  if (!db) {
    return Response.json({ error: "Database not configured" }, { status: 503 });
  }
  try {
    const { code } = await params;
    const body = await req.json();
    const update: Record<string, unknown> = {};
    for (const key of [
      "name",
      "brand",
      "gender",
      "collection",
      "category",
      "imageUrl",
      "description",
      "notes",
      "sizes",
      "featured",
      "stock",
    ]) {
      if (key in body) update[key] = body[key];
    }
    const [row] = await db
      .update(perfumes)
      .set(update)
      .where(eq(perfumes.code, code))
      .returning();
    if (!row) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json(row);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to update";
    return Response.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ code: string }> },
) {
  if (!db) {
    return Response.json({ error: "Database not configured" }, { status: 503 });
  }
  const { code } = await params;
  const [row] = await db
    .delete(perfumes)
    .where(eq(perfumes.code, code))
    .returning();
  if (!row) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ ok: true });
}
