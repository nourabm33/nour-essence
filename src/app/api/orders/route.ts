import { db } from "@/db";
import { orders } from "@/db/schema";
import type { OrderItem } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!db) return Response.json([]);
  const rows = await db.select().from(orders).orderBy(desc(orders.createdAt));
  return Response.json(rows);
}

export async function POST(req: Request) {
  if (!db) {
    return Response.json({ error: "Database not configured" }, { status: 503 });
  }
  try {
    const body = await req.json();
    const items: OrderItem[] = Array.isArray(body.items) ? body.items : [];
    if (!body.customerName || !body.email || items.length === 0) {
      return Response.json(
        { error: "Name, email and at least one item are required" },
        { status: 400 },
      );
    }
    const total = items.reduce((s, i) => s + i.price * i.qty, 0);
    const [row] = await db
      .insert(orders)
      .values({
        customerName: String(body.customerName).trim(),
        email: String(body.email).trim(),
        phone: body.phone ?? "",
        address: body.address ?? "",
        items,
        total: total.toFixed(2),
        status: "pending",
      })
      .returning();
    return Response.json(row, { status: 201 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to place order";
    return Response.json({ error: msg }, { status: 500 });
  }
}
