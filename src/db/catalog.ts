import type { NewPerfume, SizeOption } from "./schema";

// Price tiers (in EUR) ---------------------------------------------------
const T_STANDARD: SizeOption[] = [
  { size: "15 ml", price: 11.9 },
  { size: "30 ml", price: 18.0 },
  { size: "70 ml", price: 35.0 },
];
const T_LUXE_A: SizeOption[] = [
  { size: "15 ml", price: 17.9 },
  { size: "30 ml", price: 29.5 },
  { size: "70 ml", price: 57.0 },
];
const T_LUXE_B: SizeOption[] = [
  { size: "15 ml", price: 14.9 },
  { size: "30 ml", price: 25.5 },
  { size: "70 ml", price: 48.0 },
];
const T_LUXE_C: SizeOption[] = [
  { size: "15 ml", price: 13.9 },
  { size: "30 ml", price: 23.5 },
  { size: "70 ml", price: 45.0 },
];
const T_LUXURY: SizeOption[] = [
  { size: "15 ml", price: 19.9 },
  { size: "50 ml", price: 52.0 },
];
const T_LUXURY_PLUS: SizeOption[] = [
  { size: "15 ml", price: 22.9 },
  { size: "50 ml", price: 65.0 },
];
const T_KIDS: SizeOption[] = [{ size: "30 ml", price: 29.0 }];

type Row = [code: string, name: string, brand: string, sizes: SizeOption[]];

const women: Row[] = [
  ["006W", "Opium", "YSL", T_STANDARD],
  ["007W", "J'adore", "Dior", T_STANDARD],
  ["010W", "Alien", "Thierry Mugler", T_STANDARD],
  ["011W", "Light Blue", "Dolce & Gabbana", T_STANDARD],
  ["014W", "Manifesto", "YSL", T_STANDARD],
  ["019W", "Lady Million", "Paco Rabanne", T_STANDARD],
  ["023W", "Hypnotic Poison", "Dior", T_STANDARD],
  ["024W", "Chanel N°5", "Chanel", T_STANDARD],
  ["025W", "For Her", "Narciso Rodriguez", T_STANDARD],
  ["026W", "Flower", "Kenzo", T_STANDARD],
  ["027W", "Trésor", "Lancôme", T_STANDARD],
  ["028W", "Angel", "Thierry Mugler", T_STANDARD],
  ["029W", "L'Eau d'Issey", "Issey Miyake", T_STANDARD],
  ["039W", "Miss Dior Chérie", "Dior", T_STANDARD],
  ["040W", "Hypnôse", "Lancôme", T_STANDARD],
  ["042W", "La Vie Est Belle", "Lancôme", T_STANDARD],
  ["047W", "Crystal Noir", "Versace", T_STANDARD],
  ["049W", "Dolce", "Dolce & Gabbana", T_STANDARD],
  ["051W", "Coco Mademoiselle", "Chanel", T_STANDARD],
  ["053W", "Narciso", "Narciso Rodriguez", T_STANDARD],
  ["055W", "Black Opium", "YSL", T_STANDARD],
  ["056W", "Ange ou Démon", "Givenchy", T_STANDARD],
  ["057W", "Omnia Améthyste", "Bvlgari", T_STANDARD],
  ["064W", "Omnia Indian Garnet", "Bvlgari", T_STANDARD],
  ["067W", "Olympéa", "Paco Rabanne", T_STANDARD],
  ["070W", "The One", "Dolce & Gabbana", T_STANDARD],
  ["071W", "Allure", "Chanel", T_STANDARD],
  ["076W", "Acqua di Gioia", "Armani", T_STANDARD],
  ["080W", "Sì", "Armani", T_STANDARD],
  ["081W", "Classique Essence", "Jean Paul Gaultier", T_STANDARD],
  ["082W", "Signorina", "Salvatore Ferragamo", T_STANDARD],
  ["085W", "Chance", "Chanel", T_STANDARD],
  ["089W", "Mon Paris", "YSL", T_STANDARD],
  ["090W", "Poison Girl", "Dior", T_STANDARD],
  ["096W", "Gabrielle", "Chanel", T_STANDARD],
  ["097W", "Amo", "Salvatore Ferragamo", T_STANDARD],
  ["098W", "Joy", "Dior", T_STANDARD],
  ["115W", "Idôle", "Lancôme", T_STANDARD],
  ["116W", "Yes I Am", "Cacharel", T_STANDARD],
  ["119W", "Scandal", "Jean Paul Gaultier", T_STANDARD],
  ["120W", "La Petite Robe Noire", "Guerlain", T_STANDARD],
  ["121W", "L'Interdit", "Givenchy", T_STANDARD],
  ["133W", "Prada Paradoxe", "Prada", T_STANDARD],
  ["145W", "Dévotion", "Dolce & Gabbana", T_STANDARD],
  ["148W", "Goddess", "Burberry", T_STANDARD],
  ["151W", "Guilty", "Gucci", T_STANDARD],
  ["153W", "Chloé", "Chloé", T_STANDARD],
  ["154W", "Love Chloé", "Chloé", T_STANDARD],
  ["156W", "Hugo Woman", "Hugo Boss", T_STANDARD],
  ["158W", "Flora", "Gucci", T_STANDARD],
  ["159W", "Burberry Women", "Burberry", T_STANDARD],
  ["161W", "Born in Roma Intense", "Valentino", T_STANDARD],
];

const men: Row[] = [
  ["001M", "One Million", "Paco Rabanne", T_STANDARD],
  ["002M", "Acqua di Giò", "Armani", T_STANDARD],
  ["003M", "Fahrenheit", "Dior", T_STANDARD],
  ["004M", "The One", "Dolce & Gabbana", T_STANDARD],
  ["012M", "Eau Sauvage", "Dior", T_STANDARD],
  ["015M", "Roma Uomo", "Laura Biagiotti", T_STANDARD],
  ["016M", "Le Mâle", "Jean Paul Gaultier", T_STANDARD],
  ["018M", "Déclaration", "Cartier", T_STANDARD],
  ["020M", "La Nuit de l'Homme", "YSL", T_STANDARD],
  ["021M", "Light Blue", "Dolce & Gabbana", T_STANDARD],
  ["022M", "Terre d'Hermès", "Hermès", T_STANDARD],
  ["030M", "Black XS", "Paco Rabanne", T_STANDARD],
  ["032M", "Spicebomb", "Viktor & Rolf", T_STANDARD],
  ["033M", "Black Code", "Armani", T_STANDARD],
  ["037M", "Man", "Bvlgari", T_STANDARD],
  ["038M", "Bleu", "Chanel", T_STANDARD],
  ["048M", "Allure Homme", "Chanel", T_STANDARD],
  ["052M", "Pasha 150", "Cartier", T_STANDARD],
  ["061M", "Invictus", "Paco Rabanne", T_STANDARD],
  ["062M", "Intenso", "Dolce & Gabbana", T_STANDARD],
  ["069M", "Acqua di Sale", "Profumum Roma", T_STANDARD],
  ["079M", "MYSLF", "YSL", T_STANDARD],
  ["084M", "Dylan Blue", "Versace", T_STANDARD],
  ["086M", "Legend", "Mont Blanc", T_STANDARD],
  ["087M", "Wanted", "Azzaro", T_STANDARD],
  ["088M", "Man in Black", "Bvlgari", T_STANDARD],
  ["091M", "Chrome", "Azzaro", T_STANDARD],
  ["140M", "Éros", "Versace", T_STANDARD],
  ["147M", "Boss Bottled Absolu", "Hugo Boss", T_STANDARD],
  ["150M", "Hugo", "Hugo Boss", T_STANDARD],
  ["152M", "Guilty", "Gucci", T_STANDARD],
  ["157M", "The Scent", "Hugo Boss", T_STANDARD],
  ["160M", "Burberry for Men", "Burberry", T_STANDARD],
  ["162M", "Born in Roma Intense", "Valentino", T_STANDARD],
];

const unisex: Row[] = [
  ["054U", "Black Orchid", "Tom Ford", T_STANDARD],
  ["072U", "Patchouli", "Reminiscence", T_STANDARD],
  ["100U", "White Aoud", "Montale", T_STANDARD],
  ["105U", "Intense Café", "Montale", T_STANDARD],
  ["155U", "CK One", "Calvin Klein", T_STANDARD],
];

const womenLuxe: Row[] = [
  ["093W", "Aventus for Her", "Creed", T_LUXE_A],
  ["122W", "Libre", "YSL", T_LUXE_B],
  ["131W", "Good Girl", "Carolina Herrera", T_LUXE_B],
  ["132W", "My Way", "Armani", T_LUXE_C],
  ["163W", "Miutine", "Miu Miu", T_LUXE_C],
];

const menLuxe: Row[] = [
  ["068M", "Aventus", "Creed", T_LUXE_A],
  ["094M", "Sauvage", "Dior", T_LUXE_B],
  ["113M", "Sur la Route", "Louis Vuitton", T_LUXE_A],
  ["136M", "Dior Homme Intense", "Dior", T_LUXE_C],
  ["164M", "Paradigme", "Prada", T_LUXE_C],
];

const unisexLuxe: Row[] = [
  ["044U", "Silver Mountain", "Creed", T_LUXE_B],
  ["073U", "Himalaya", "Creed", T_LUXE_B],
  ["099U", "Mandarino di Amalfi", "Tom Ford", T_LUXE_C],
  ["110U", "Kirké", "Tiziana Terenzi", T_LUXE_B],
  ["114U", "Ombre Nomade", "Louis Vuitton", T_LUXE_B],
  ["135U", "Bois d'Argent", "Dior", T_LUXE_A],
  ["142U", "Ombre Leather", "Tom Ford", T_LUXE_A],
];

const womenLuxury: Row[] = [
  ["109W", "J'adore L'Or", "Dior", T_LUXURY],
  ["123W", "Good Girl Gone Bad", "Kilian", T_LUXURY],
];

const menLuxury: Row[] = [
  ["074M", "Black Afgano", "Nasomatto", T_LUXURY],
  ["075M", "X for Men", "Clive Christian", T_LUXURY],
];

const unisexLuxury: Row[] = [
  ["101U", "Velvet Amber Skin", "Dolce & Gabbana", T_LUXURY],
  ["102U", "Velvet Amber Sun", "Dolce & Gabbana", T_LUXURY],
  ["106U", "Fucking Fabulous", "Tom Ford", T_LUXURY],
  ["111U", "Lost Cherry", "Tom Ford", T_LUXURY],
  ["112U", "Néroli Portofino", "Tom Ford", T_LUXURY],
  ["117U", "Tobacco Vanille", "Tom Ford", T_LUXURY],
  ["118U", "Baccarat Rouge 540", "Maison Francis Kurkdjian", T_LUXURY],
  ["124U", "Zeta", "Morph", T_LUXURY],
  ["125U", "Sole di Positano Acqua", "Tom Ford", T_LUXURY],
  ["126U", "Soleil Blanc", "Tom Ford", T_LUXURY],
  ["127U", "Oud Wood", "Tom Ford", T_LUXURY],
  ["128U", "Vanille Fatale", "Tom Ford", T_LUXURY],
  ["129U", "Erba Pura", "Xerjoff", T_LUXURY],
  ["130U", "Megamare", "Orto Parisi", T_LUXURY_PLUS],
  ["134U", "Bitter Peach", "Tom Ford", T_LUXURY],
  ["137U", "XJ 1861 Naxos", "Xerjoff", T_LUXURY],
  ["138U", "Wood Whisper", "Ojar", T_LUXURY],
  ["139U", "Les Sables Roses", "Louis Vuitton", T_LUXURY_PLUS],
  ["141U", "Turath", "The Spirit of Dubaï", T_LUXURY_PLUS],
  ["143U", "Vanilla Powder", "Matière Première", T_LUXURY],
  ["144U", "Bianco Latte", "Giardini di Toscana", T_LUXURY],
  ["146U", "Rouge", "Pierre Balmain", T_LUXURY],
];

const kids: Row[] = [
  ["045", "Garçon", "Nour Éssence Kids", T_KIDS],
  ["058", "Fille", "Nour Éssence Kids", T_KIDS],
  ["059", "Bébé", "Nour Éssence Kids", T_KIDS],
];

// Fragrance note libraries to compose descriptions ----------------------
const NOTES: Record<string, string> = {
  women: "Floral · Fruity · Musk",
  men: "Woody · Spicy · Aromatic",
  unisex: "Amber · Oud · Vanilla",
  kids: "Soft · Fresh · Citrus",
};

function describe(name: string, brand: string, gender: string): string {
  const base: Record<string, string> = {
    women: `An elegant and feminine interpretation inspired by ${name} by ${brand}. Radiant floral facets melt into warm musk and sensual amber for an unforgettable signature.`,
    men: `A confident, magnetic fragrance inspired by ${name} by ${brand}. Spicy and woody accords are wrapped in warm leather and amber for lasting masculine presence.`,
    unisex: `A bold, modern composition inspired by ${name} by ${brand}. Precious amber, oud and creamy vanilla create a refined unisex aura that lingers beautifully.`,
    kids: `A gentle, tender fragrance created for children — soft, fresh and skin-friendly, with a delicate trail of citrus and clean musk.`,
  };
  return base[gender] ?? base.unisex;
}

function buildSet(
  rows: Row[],
  gender: string,
  collection: string,
  category: string,
): NewPerfume[] {
  return rows.map((r) => ({
    code: r[0],
    name: r[1],
    brand: r[2],
    gender,
    collection,
    category,
    sizes: r[3],
    notes: NOTES[gender] ?? NOTES.unisex,
    description: describe(r[1], r[2], gender),
    stock: 50,
    featured: false,
  }));
}

export function buildCatalog(): NewPerfume[] {
  const all: NewPerfume[] = [
    ...buildSet(women, "women", "classic", "Femme"),
    ...buildSet(men, "men", "classic", "Homme"),
    ...buildSet(unisex, "unisex", "classic", "Mixte"),
    ...buildSet(womenLuxe, "women", "luxe", "Femme Luxe"),
    ...buildSet(menLuxe, "men", "luxe", "Homme Luxe"),
    ...buildSet(unisexLuxe, "unisex", "luxe", "Mixte Luxe"),
    ...buildSet(womenLuxury, "women", "luxury", "Luxury Femme"),
    ...buildSet(menLuxury, "men", "luxury", "Luxury Homme"),
    ...buildSet(unisexLuxury, "unisex", "luxury", "Luxury Mixte"),
    ...buildSet(kids, "kids", "kids", "Enfants"),
  ];

  // Mark a curated selection as featured for the homepage.
  const featuredCodes = new Set([
    "001M",
    "094M",
    "118U",
    "055W",
    "111U",
    "042W",
    "127U",
    "002M",
    "131W",
    "117U",
    "068M",
    "051W",
  ]);
  return all.map((p) => ({ ...p, featured: featuredCodes.has(p.code) }));
}
