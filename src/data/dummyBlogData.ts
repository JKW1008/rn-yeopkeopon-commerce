export interface BlogSection {
  type: "text" | "image";
  value: string;
  images?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  sections: BlogSection[];
  category: string;
  tags: string[];
  updatedAt: string;
  imageUrl: string;
}

export const BLOG_CATEGORIES = ["All", "Fashion", "Lifestyle", "Beauty", "Trends"];

export const DUMMY_BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "2021 STYLE GUIDE: THE BIGGEST FALL TRENDS",
    description: "Mixing high and low-end pieces is the best way to get the most bang for your buck while elevating your wardrobe.",
    sections: [
      {
        type: "text",
        value: "You guys know how much I love mixing high and low-end - it's the best way to get the most bang for your buck while still elevating your wardrobe. The same goes for handbags! And honestly they are probably the best pieces to mix and match. I truly think the key to completing a look is with a great bag and I found so many this year that I wanted to share a round-up of my most worn handbags.",
      },
      {
        type: "image",
        value: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
        images: [
          "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1200&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1566150905458-1bf1fd113961?q=80&w=1200&auto=format&fit=crop",
        ],
      },
      {
        type: "text",
        value: "I found this Saint Laurent canvas handbag this summer and immediately fell in love. The neutral fabrics are so beautiful and I like how this handbag can also carry into fall. The mini Fendi bucket bag with the sheer fabric is so fun and such a statement bag. Also this DeMellier off white bag is so cute to carry to a dinner with you or going out, it's small but not too small to fit your phone and keys still.",
      },
    ],
    category: "Fashion",
    tags: ["#Fashion", "#Tips"],
    updatedAt: "3 Days ago",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "blog-2",
    title: "The Art of Layering: How to Style Your Essentials",
    description: "Master the skill of combining textures and proportions. Perfect for transitions between seasons while maintaining a high-end look.",
    sections: [
      { type: "text", value: "Layering is the cornerstone of a sophisticated wardrobe, especially during transitional weather. The secret lies in balancing proportions and textures." },
      { type: "image", value: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop" },
      { type: "text", value: "Start with a lightweight base layer, such as a fine-gauge knit or a crisp cotton shirt. Add a signature outerwear piece to anchor the look." }
    ],
    category: "Fashion",
    tags: ["#StyleTips", "#Layering", "#Essential"],
    updatedAt: "2024.04.07",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "blog-3",
    title: "Top 5 Sustainable Brands You Need to Know This Year",
    description: "Ethical fashion is more than a trend. We explore the top brands that combine luxury quality with environmental responsibility.",
    sections: [
      { type: "text", value: "Sustainability has moved from the fringes of fashion to its very core. Today's luxury consumers are demanding transparency." },
      { type: "image", value: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop" },
      { type: "text", value: "From regenerative agriculture initiatives to innovative recycled textiles, these pioneers are proving that high fashion can be a force for good." }
    ],
    category: "Lifestyle",
    tags: ["#Sustainability", "#EcoFriendly", "#Fashion"],
    updatedAt: "2024.04.05",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "blog-4",
    title: "Skincare Secrets for a Radiant Glow All Season Long",
    description: "Achieve the ultimate glow with our curated guide to seasonal skincare routines. Expert tips for healthy, luminous skin.",
    sections: [
      { type: "text", value: "Achieving radiant skin requires a holistic approach that adapts to the changing seasons." },
      { type: "image", value: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1200&auto=format&fit=crop" },
      { type: "text", value: "A double-cleansing routine at night followed by a vitamin C serum can dramatically brighten the complexion." }
    ],
    category: "Beauty",
    tags: ["#Beauty", "#Skincare", "#Glow"],
    updatedAt: "2024.04.02",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "blog-5",
    title: "Urban Streetwear: Why Oversized is Here to Stay",
    description: "The evolution of comfort and style. Explore the latest in urban streetwear and how to pull off the oversized silhouette with confidence.",
    sections: [
      { type: "text", value: "The oversized silhouette has dominated urban streetwear for years. What started as a subcultural movement has been embraced by high-fashion houses." },
      { type: "image", value: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop" },
      { type: "text", value: "The key to mastering this look is intentionality. Pair voluminous trousers with a more fitted top." }
    ],
    category: "Trends",
    tags: ["#Streetwear", "#Oversized", "#Trends"],
    updatedAt: "2024.03.30",
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "blog-6",
    title: "The Ultimate Guide to Vintage Denim Hunting",
    description: "Finding the perfect pair of vintage jeans is an art. Learn where to look and how to identify authentic denim treasures.",
    sections: [
      { type: "text", value: "There is nothing quite like the feel of perfectly aged denim. Hunting for vintage Levi's requires patience." },
      { type: "image", value: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1200&auto=format&fit=crop" },
      { type: "text", value: "Identify authentic vintage pieces by reading labels and understanding construction details." }
    ],
    category: "Fashion",
    tags: ["#Vintage", "#Denim", "#Sustainable"],
    updatedAt: "2024.03.25",
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "blog-7",
    title: "Minimalist Workspace: Elevate Your Creative Flow",
    description: "Your environment shapes your work. Discover how a minimalist desk setup can clear your mind and boost your productivity.",
    sections: [
      { type: "text", value: "A cluttered desk often leads to a cluttered mind. Creating a minimalist workspace is about more than just aesthetics." },
      { type: "image", value: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop" },
      { type: "text", value: "Invest in high-quality, tactile tools that bring joy to your process." }
    ],
    category: "Lifestyle",
    tags: ["#Minimalism", "#Workspace", "#Creative"],
    updatedAt: "2024.03.20",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "blog-8",
    title: "Hydration 101: The Secret to Naturally Glowing Skin",
    description: "Beauty starts from within. We break down the science of hydration and why it's the foundation of any skincare routine.",
    sections: [
      { type: "text", value: "True skin health is built from the inside out. Cellular hydration is key to a radiant glow." },
      { type: "image", value: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop" },
      { type: "text", value: "Learn about electrolyte balance and water-rich foods." }
    ],
    category: "Beauty",
    tags: ["#Health", "#Beauty", "#Hydration"],
    updatedAt: "2024.03.15",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "blog-9",
    title: "Athleisure: The Perfect Blend of Comfort and Class",
    description: "From the gym to the coffee shop. How to master the high-low mix for a sophisticated yet comfortable daily look.",
    sections: [
      { type: "text", value: "Athleisure has redefined what it means to be well-dressed. It's the intersection of performance and luxury." },
      { type: "image", value: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop" },
      { type: "text", value: "Master this look by pairing technical leggings with a structured blazer." }
    ],
    category: "Fashion",
    tags: ["#Athleisure", "#Comfort", "#Style"],
    updatedAt: "2024.03.10",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
  },
];
