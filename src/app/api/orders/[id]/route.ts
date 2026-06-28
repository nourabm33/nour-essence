import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!db) {
    return Response.json({ error: "Database not configured" }, { status: 503 });
  }
  try {
    const { id } = await params;
    const body = await req.json();
    const [row] = await db
      .update(orders)
      .set({ status: String(body.status ?? "pending") })
      .where(eq(orders.id, Number(id)))
      .returning();
    if (!row) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json(row);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to update order";
    return Response.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!db) {
    return Response.json({ error: "Database not configured" }, { status: 503 });
  }
  const { id } = await params;
  await db.delete(orders).where(eq(orders.id, Number(id)));
  return Response.json({ ok: true });
}
