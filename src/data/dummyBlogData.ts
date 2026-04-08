export interface BlogPost {
  id: string;
  title: string;
  category: string;
  tags: string[];
  updatedAt: string;
  imageUrl: string;
}

export const BLOG_CATEGORIES = ["Fashion", "Lifestyle", "Beauty", "Trends"];

export const DUMMY_BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "2024 Spring/Summer Fashion Trends: The Minimalist Movement",
    category: "Fashion",
    tags: ["#Fashion", "#Minimalism", "#2024SS"],
    updatedAt: "2024.04.08",
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "blog-2",
    title: "The Art of Layering: How to Style Your Essentials",
    category: "Style",
    tags: ["#StyleTips", "#Layering", "#Essential"],
    updatedAt: "2024.04.07",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "blog-3",
    title: "Top 5 Sustainable Brands You Need to Know This Year",
    category: "Lifestyle",
    tags: ["#Sustainability", "#EcoFriendly", "#Fashion"],
    updatedAt: "2024.04.05",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "blog-4",
    title: "Skincare Secrets for a Radiant Glow All Season Long",
    category: "Beauty",
    tags: ["#Beauty", "#Skincare", "#Glow"],
    updatedAt: "2024.04.02",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "blog-5",
    title: "Urban Streetwear: Why Oversized is Here to Stay",
    category: "Trends",
    tags: ["#Streetwear", "#Oversized", "#Trends"],
    updatedAt: "2024.03.30",
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop",
  },
];
