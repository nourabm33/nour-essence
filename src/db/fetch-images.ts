import "dotenv/config";
import { db } from "./index";
import { perfumes } from "./schema";
import { eq } from "drizzle-orm";

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36";

function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function getVqd(query: string): Promise<string | null> {
  const res = await fetch(
    `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=images&ia=images`,
    { headers: { "User-Agent": UA } },
  );
  const html = await res.text();
  const m =
    html.match(/vqd="([0-9-]+)"/) ||
    html.match(/vqd=([0-9-]+)&/) ||
    html.match(/vqd=([0-9-]+)/);
  return m ? m[1] : null;
}

type DDGResult = { image: string; width: number; height: number };

async function searchImage(query: string): Promise<string | null> {
  const vqd = await getVqd(query);
  if (!vqd) return null;
  await sleep(400);
  const url = `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(
    query,
  )}&vqd=${vqd}&f=,,,&p=1`;
  const res = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Referer: "https://duckduckgo.com/",
      Accept: "application/json, text/javascript, */*; q=0.01",
    },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { results?: DDGResult[] };
  const results = data.results ?? [];
  // Prefer a reasonably large, https jpg/png/webp image.
  const good =
    results.find(
      (r) =>
        /^https:\/\//.test(r.image) &&
        /\.(jpg|jpeg|png|webp)(\?|$)/i.test(r.image) &&
        r.width >= 300,
    ) ||
    results.find((r) => /^https:\/\//.test(r.image)) ||
    null;
  return good ? good.image : null;
}

async function main() {
  if (!db) {
    console.error("DATABASE_URL is required for fetching images.");
    process.exit(1);
  }

  const onlyMissing = process.argv.includes("--missing");
  const rows = await db.select().from(perfumes);
  console.log(`Fetching images for ${rows.length} perfumes...`);
  let ok = 0;
  let fail = 0;

  for (const p of rows) {
    if (onlyMissing && p.imageUrl) continue;
    const query =
      p.gender === "kids"
        ? `kids perfume bottle`
        : `${p.name} ${p.brand} perfume bottle`;
    try {
      const img = await searchImage(query);
      if (img) {
        await db
          .update(perfumes)
          .set({ imageUrl: img })
          .where(eq(perfumes.id, p.id));
        ok++;
        console.log(`✓ ${p.code} ${p.name} → ${img.slice(0, 70)}`);
      } else {
        fail++;
        console.log(`✗ ${p.code} ${p.name} — no image`);
      }
    } catch (e) {
      fail++;
      console.log(`✗ ${p.code} ${p.name} — error ${(e as Error).message}`);
    }
    await sleep(700 + Math.random() * 500);
  }

  console.log(`\nDone. Success: ${ok}, Failed: ${fail}`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
