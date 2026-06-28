import { db } from "@/db";
import { perfumes } from "@/db/schema";
import { eq, asc } from "drizzle-orm";
import { buildCatalog } from "@/db/catalog";
import type { PerfumeDTO, SizeOption } from "./types";

function toDTO(row: typeof perfumes.$inferSelect): PerfumeDTO {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    brand: row.brand,
    gender: row.gender,
    collection: row.collection,
    category: row.category,
    imageUrl: row.imageUrl ?? "",
    description: row.description,
    notes: row.notes,
    sizes: (row.sizes ?? []) as SizeOption[],
    featured: row.featured,
    stock: row.stock,
  };
}

function catalogToDTO(): PerfumeDTO[] {
  return buildCatalog().map((p, i) => ({
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
    sizes: (p.sizes ?? []) as SizeOption[],
    featured: p.featured ?? false,
    stock: p.stock ?? 50,
  }));
}

export async function getAllPerfumes(): Promise<PerfumeDTO[]> {
  if (!db) return catalogToDTO();
  const rows = await db.select().from(perfumes).orderBy(asc(perfumes.code));
  return rows.map(toDTO);
}

export async function getPerfumeByCode(
  code: string,
): Promise<PerfumeDTO | null> {
  if (!db) {
    return catalogToDTO().find((p) => p.code === code) ?? null;
  }
  const rows = await db
    .select()
    .from(perfumes)
    .where(eq(perfumes.code, code))
    .limit(1);
  return rows[0] ? toDTO(rows[0]) : null;
}

export async function getFeatured(): Promise<PerfumeDTO[]> {
  if (!db) return catalogToDTO().filter((p) => p.featured);
  const rows = await db
    .select()
    .from(perfumes)
    .where(eq(perfumes.featured, true))
    .orderBy(asc(perfumes.code));
  return rows.map(toDTO);
}

export async function getRelated(
  perfume: PerfumeDTO,
  limit = 4,
): Promise<PerfumeDTO[]> {
  if (!db) {
    return catalogToDTO()
      .filter((p) => p.gender === perfume.gender && p.code !== perfume.code)
      .slice(0, limit);
  }
  const rows = await db
    .select()
    .from(perfumes)
    .where(eq(perfumes.gender, perfume.gender))
    .orderBy(asc(perfumes.code));
  return rows
    .map(toDTO)
    .filter((p) => p.code !== perfume.code)
    .slice(0, limit);
}
