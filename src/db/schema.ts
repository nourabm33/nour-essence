import {
  pgTable,
  serial,
  text,
  boolean,
  integer,
  jsonb,
  numeric,
  timestamp,
} from "drizzle-orm/pg-core";

export type SizeOption = { size: string; price: number };

export const perfumes = pgTable("perfumes", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  name: text("name").notNull(),
  brand: text("brand").notNull(),
  gender: text("gender").notNull(), // women | men | unisex | kids
  collection: text("collection").notNull(), // classic | luxe | luxury | kids
  category: text("category").notNull(), // display label
  imageUrl: text("image_url").notNull().default(""),
  description: text("description").notNull(),
  notes: text("notes").notNull().default(""),
  sizes: jsonb("sizes").$type<SizeOption[]>().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  stock: integer("stock").notNull().default(50),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type OrderItem = {
  code: string;
  name: string;
  brand: string;
  size: string;
  price: number;
  qty: number;
};

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull().default(""),
  address: text("address").notNull().default(""),
  items: jsonb("items").$type<OrderItem[]>().notNull().default([]),
  total: numeric("total", { precision: 10, scale: 2 }).notNull().default("0"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Perfume = typeof perfumes.$inferSelect;
export type NewPerfume = typeof perfumes.$inferInsert;
export type Order = typeof orders.$inferSelect;
