export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  rating: number;
  reviewCount: number;
  sizes: string[];
  imageUrl: string;
  description: string;
}

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: "p1",
    brand: "21WN",
    name: "Mohair-blend cardigan",
    price: 120,
    rating: 4.8,
    reviewCount: 120,
    sizes: ["S", "M", "L"],
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    description: "A luxury mohair-blend cardigan with a relaxed fit and premium texture.",
  },
  {
    id: "p2",
    brand: "Loro Piana",
    name: "Cashmere overcoat",
    price: 240,
    rating: 4.9,
    reviewCount: 85,
    sizes: ["M", "L"],
    imageUrl: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800&auto=format&fit=crop",
    description: "Classic cashmere overcoat for an elegant and timeless silhouette.",
  },
  {
    id: "p3",
    brand: "Oblong",
    name: "Leather mini bag",
    price: 95,
    rating: 4.7,
    reviewCount: 204,
    sizes: ["O/S"],
    imageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop",
    description: "Premium leather mini bag with a unique oblong structure.",
  },
  {
    id: "p4",
    brand: "OpenFashion",
    name: "Linen blend dress",
    price: 180,
    rating: 4.8,
    reviewCount: 45,
    sizes: ["S", "M"],
    imageUrl: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=800&auto=format&fit=crop",
    description: "Lightweight linen blend dress perfect for summer editorial looks.",
  },
  {
    id: "p5",
    brand: "OpenFashion",
    name: "Recycle Boucle Knit",
    price: 135,
    rating: 4.5,
    reviewCount: 67,
    sizes: ["S", "M", "L"],
    imageUrl: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
    description: "Sustainable boucle knit made from high-quality recycled materials.",
  },
  {
    id: "p6",
    brand: "IAMSHOP",
    name: "Classic wool blazer",
    price: 210,
    rating: 4.8,
    reviewCount: 32,
    sizes: ["M", "L"],
    imageUrl: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?q=80&w=800&auto=format&fit=crop",
    description: "Tailored wool blazer with a modern classic cut.",
  },
  {
    id: "p7",
    brand: "21WN",
    name: "Pleated silk skirt",
    price: 145,
    rating: 4.4,
    reviewCount: 18,
    sizes: ["S", "M"],
    imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800&auto=format&fit=crop",
    description: "Fluid pleated silk skirt that moves beautifully with every step.",
  },
  {
    id: "p8",
    brand: "Loro Piana",
    name: "Summer walk shoes",
    price: 350,
    rating: 4.9,
    reviewCount: 150,
    sizes: ["S", "M", "L"],
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop",
    description: "Iconic summer walk shoes for unparalleled comfort and style.",
  },
  {
    id: "p9",
    brand: "Oblong",
    name: "Structured tote bag",
    price: 155,
    rating: 4.6,
    reviewCount: 89,
    sizes: ["O/S"],
    imageUrl: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
    description: "A spacious structured tote bag for your daily essentials.",
  },
  {
    id: "p10",
    brand: "OpenFashion",
    name: "Oversized trench coat",
    price: 280,
    rating: 4.8,
    reviewCount: 41,
    sizes: ["S", "M", "L"],
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
    description: "Modern oversized trench coat with high-quality hardware.",
  },
];
