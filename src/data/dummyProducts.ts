// src/data/dummyProducts.ts
import { Product } from "@/src/types/database";

export const DUMMY_PRODUCTS: Product[] = [
  // --- APPAREL (4) ---
  {
    id: "app-1",
    name: "21WN reversible angora cardigan",
    description: "Soft and warm angora blend.",
    price: 120,
    category: "Apparel",
    images: [
      "https://images.unsplash.com/photo-1539109132314-d4a89ae332a6?q=80&w=1000",
    ],
    options: { sizes: ["S", "M"], colors: ["Cream"] },
    created_at: new Date().toISOString(),
  },
  {
    id: "app-2",
    name: "Oversized Wool Coat",
    description: "Premium wool oversized fit.",
    price: 320,
    category: "Apparel",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000",
    ],
    options: { sizes: ["M", "L"], colors: ["Camel"] },
    created_at: new Date().toISOString(),
  },
  {
    id: "app-3",
    name: "Minimalist Linen Blazer",
    description: "Clean cut linen blazer.",
    price: 210,
    category: "Apparel",
    images: [
      "https://images.unsplash.com/photo-1548126032-079a0fb9a486?q=80&w=1000",
    ],
    options: { sizes: ["S", "M"], colors: ["Grey"] },
    created_at: new Date().toISOString(),
  },
  {
    id: "app-4",
    name: "Structured Twill Jacket",
    description: "Modern silhouette jacket.",
    price: 185,
    category: "Apparel",
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1000",
    ],
    options: { sizes: ["S", "M", "L"], colors: ["Black"] },
    created_at: new Date().toISOString(),
  },

  // --- BAG (4) ---
  {
    id: "bag-1",
    name: "Oblong Leather Bag",
    description: "Minimalist leather shoulder bag.",
    price: 85,
    category: "Bag",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000",
    ],
    options: { sizes: ["Free"], colors: ["Black"] },
    created_at: new Date().toISOString(),
  },
  {
    id: "bag-2",
    name: "Classic Suede Tote",
    description: "Spacious suede everyday tote.",
    price: 110,
    category: "Bag",
    images: [
      "https://images.unsplash.com/photo-1544816153-155734a5303a?q=80&w=1000",
    ],
    options: { sizes: ["Free"], colors: ["Tan"] },
    created_at: new Date().toISOString(),
  },
  {
    id: "bag-3",
    name: "Mini Crossbody Pouch",
    description: "Compact leather crossbody.",
    price: 65,
    category: "Bag",
    images: [
      "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1000",
    ],
    options: { sizes: ["Free"], colors: ["Sage"] },
    created_at: new Date().toISOString(),
  },
  {
    id: "bag-4",
    name: "Square Handle Bag",
    description: "Geometric top handle bag.",
    price: 145,
    category: "Bag",
    images: [
      "https://images.unsplash.com/photo-1566150905458-1bf1fd113961?q=80&w=1000",
    ],
    options: { sizes: ["Free"], colors: ["Cream"] },
    created_at: new Date().toISOString(),
  },

  // --- T-SHIRT (4) ---
  {
    id: "ts-1",
    name: "Essential Heavy Cotton Tee",
    description: "High density cotton tee.",
    price: 45,
    category: "Tshirt",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000",
    ],
    options: { sizes: ["S", "M", "L"], colors: ["White"] },
    created_at: new Date().toISOString(),
  },
  {
    id: "ts-2",
    name: "Oversized Graphic Shirt",
    description: "Relaxed fit with subtle print.",
    price: 55,
    category: "Tshirt",
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1000",
    ],
    options: { sizes: ["M", "L", "XL"], colors: ["Black"] },
    created_at: new Date().toISOString(),
  },
  {
    id: "ts-3",
    name: "Mock Neck Long Sleeve",
    description: "Slim fit mock neck jersey.",
    price: 60,
    category: "Tshirt",
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1000",
    ],
    options: { sizes: ["S", "M"], colors: ["Navy"] },
    created_at: new Date().toISOString(),
  },
  {
    id: "ts-4",
    name: "Soft Touch Pocket Tee",
    description: "Premium modal blend fabric.",
    price: 48,
    category: "Tshirt",
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000",
    ],
    options: { sizes: ["S", "M", "L"], colors: ["White"] },
    created_at: new Date().toISOString(),
  },

  // --- DRESS (4) ---
  {
    id: "dr-1",
    name: "Silk Slip Midi Dress",
    description: "Elegant silk midi length.",
    price: 195,
    category: "Dress",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000",
    ],
    options: { sizes: ["S", "M"], colors: ["Champagne"] },
    created_at: new Date().toISOString(),
  },
  {
    id: "dr-2",
    name: "Pleated Maxi Dress",
    description: "Fluid movement pleated skirt.",
    price: 240,
    category: "Dress",
    images: [
      "https://images.unsplash.com/photo-1539008835271-08107c1266e7?q=80&w=1000",
    ],
    options: { sizes: ["M", "L"], colors: ["Emerald"] },
    created_at: new Date().toISOString(),
  },
  {
    id: "dr-3",
    name: "Cut-out Back Gown",
    description: "Stunning evening attire.",
    price: 310,
    category: "Dress",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=1000",
    ],
    options: { sizes: ["S", "M"], colors: ["Black"] },
    created_at: new Date().toISOString(),
  },
  {
    id: "dr-4",
    name: "Floral Wrap Dress",
    description: "Lightweight summer wrap.",
    price: 165,
    category: "Dress",
    images: [
      "https://images.unsplash.com/photo-1572804013307-a9a110dd0a48?q=80&w=1000",
    ],
    options: { sizes: ["S", "M", "L"], colors: ["Multi"] },
    created_at: new Date().toISOString(),
  },
];
