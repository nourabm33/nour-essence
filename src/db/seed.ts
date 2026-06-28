import "dotenv/config";
import { db } from "./index";
import { perfumes } from "./schema";
import { buildCatalog } from "./catalog";
import { sql } from "drizzle-orm";

async function main() {
  if (!db) {
    console.error("DATABASE_URL is required for seeding.");
    process.exit(1);
  }

  const catalog = buildCatalog();
  console.log(`Seeding ${catalog.length} perfumes...`);

  for (const p of catalog) {
    await db
      .insert(perfumes)
      .values(p)
      .onConflictDoUpdate({
        target: perfumes.code,
        set: {
          name: p.name,
          brand: p.brand,
          gender: p.gender,
          collection: p.collection,
          category: p.category,
          description: p.description,
          notes: p.notes,
          sizes: p.sizes,
          featured: p.featured,
        },
      });
  }

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(perfumes);
  console.log(`Done. Total perfumes in DB: ${count}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
