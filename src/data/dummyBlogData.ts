export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
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
    description: "Discover why less is more in the upcoming season. From neutral palettes to clean silhouettes, minimalist fashion is taking the lead.",
    content: "The spring/summer 2024 season marks a definitive return to minimalism. Designers are moving away from the chaotic maximalism of recent years, focusing instead on high-quality fabrics, precise tailoring, and a palette of sophisticated neutrals. This movement isn't just about simplicity; it's about intentionality. Key pieces include oversized linen blazers, silk slip dresses, and the perfectly cut white tee. Investing in these timeless essentials allows for a versatile wardrobe that transcends seasonal shifts.",
    category: "Fashion",
    tags: ["#Fashion", "#Minimalism", "#2024SS"],
    updatedAt: "2024.04.08",
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "blog-2",
    title: "The Art of Layering: How to Style Your Essentials",
    description: "Master the skill of combining textures and proportions. Perfect for transitions between seasons while maintaining a high-end look.",
    content: "Layering is the cornerstone of a sophisticated wardrobe, especially during transitional weather. The secret lies in balancing proportions and textures. Start with a lightweight base layer, such as a fine-gauge knit or a crisp cotton shirt. Add a middle layer for warmth and texture—think cashmere cardigans or structured vests. Finally, anchor the look with a signature outerwear piece like a trench coat or a leather jacket. Don't be afraid to experiment with differing lengths to create visual interest and depth.",
    category: "Style",
    tags: ["#StyleTips", "#Layering", "#Essential"],
    updatedAt: "2024.04.07",
    imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "blog-3",
    title: "Top 5 Sustainable Brands You Need to Know This Year",
    description: "Ethical fashion is more than a trend. We explore the top brands that combine luxury quality with environmental responsibility.",
    content: "Sustainability has moved from the fringes of fashion to its very core. Today's luxury consumers are demanding transparency and ethical practices without compromising on style. In this feature, we highlight five brands that are leading the charge. From regenerative agriculture initiatives to innovative recycled textiles, these pioneers are proving that high fashion can be a force for good. We look at their production methods, labor practices, and the long-term impact on the planet.",
    category: "Lifestyle",
    tags: ["#Sustainability", "#EcoFriendly", "#Fashion"],
    updatedAt: "2024.04.05",
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "blog-4",
    title: "Skincare Secrets for a Radiant Glow All Season Long",
    description: "Achieve the ultimate glow with our curated guide to seasonal skincare routines. Expert tips for healthy, luminous skin.",
    content: "Achieving radiant skin requires a holistic approach that adapts to the changing seasons. As we move into the warmer months, the focus shifts to lightweight hydration and robust protection. A double-cleansing routine at night followed by a vitamin C serum can dramatically brighten the complexion. Don't underestimate the power of a high-quality SPF; it is the single most important step in preventing premature aging. We also explore the importance of gut health and its direct correlation to the clarity and glow of your skin.",
    category: "Beauty",
    tags: ["#Beauty", "#Skincare", "#Glow"],
    updatedAt: "2024.04.02",
    imageUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc4033c8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "blog-5",
    title: "Urban Streetwear: Why Oversized is Here to Stay",
    description: "The evolution of comfort and style. Explore the latest in urban streetwear and how to pull off the oversized silhouette with confidence.",
    content: "The oversized silhouette has dominated urban streetwear for years, and its influence shows no signs of waning. What started as a subcultural movement has been embraced by high-fashion houses, blending comfort with a defiant aesthetic. The key to mastering this look is intentionality—it should look designed, not just too large. Pair voluminous trousers with a more fitted top, or go for an entirely oversized look anchored by structured accessories and statement footwear. It's about proportion, silhouette, and the confidence to own the space around you.",
    category: "Trends",
    tags: ["#Streetwear", "#Oversized", "#Trends"],
    updatedAt: "2024.03.30",
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "blog-6",
    title: "The Ultimate Guide to Vintage Denim Hunting",
    description: "Finding the perfect pair of vintage jeans is an art. Learn where to look and how to identify authentic denim treasures.",
    content: "There is nothing quite like the feel of perfectly aged denim. Hunting for vintage Levi's or rare designer pieces requires patience and a keen eye. In this guide, we reveal the top flea markets and online archives where true gems can still be found. We teach you how to read vintage labels, identify high-yield washes, and understand the construction details that set authentic vintage pieces apart. It's a journey into the history of workwear and its enduring place in the modern fashion landscape.",
    category: "Fashion",
    tags: ["#Vintage", "#Denim", "#Sustainable"],
    updatedAt: "2024.03.25",
    imageUrl: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "blog-7",
    title: "Minimalist Workspace: Elevate Your Creative Flow",
    description: "Your environment shapes your work. Discover how a minimalist desk setup can clear your mind and boost your productivity.",
    content: "A cluttered desk often leads to a cluttered mind. Creating a minimalist workspace is about more than just aesthetics; it's about optimizing your environment for focus and creativity. Start by removing everything that doesn't serve a clear purpose. Invest in a few high-quality, tactile tools that bring joy to your work process. We explore the psychological benefits of clean surfaces, the role of natural light, and how limited distractions can lead to a deeper state of 'flow'. Your desk is a canvas for your creative energy.",
    category: "Lifestyle",
    tags: ["#Minimalism", "#Workspace", "#Creative"],
    updatedAt: "2024.03.20",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "blog-8",
    title: "Hydration 101: The Secret to Naturally Glowing Skin",
    description: "Beauty starts from within. We break down the science of hydration and why it's the foundation of any skincare routine.",
    content: "True skin health is built from the inside out. While topical treatments are essential, the hydration levels of your body's cells are what truly dictate that elusive 'inner glow'. We delve into the science of cellular hydration, moving beyond the simple 'eight glasses a day' advice. Learn about electrolyte balance, the role of water-rich foods, and how proper hydration can plump skin cells and reduce the appearance of fine lines. It is the cheapest and most effective beauty treatment available, and we show you how to master it.",
    category: "Beauty",
    tags: ["#Health", "#Beauty", "#Hydration"],
    updatedAt: "2024.03.15",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "blog-9",
    title: "Athleisure: The Perfect Blend of Comfort and Class",
    description: "From the gym to the coffee shop. How to master the high-low mix for a sophisticated yet comfortable daily look.",
    content: "Athleisure has redefined what it means to be well-dressed in the modern era. It's the intersection of performance technology and luxury fashion. Mastering this look requires a careful balance—it's not just about wearing gym clothes everywhere. It's about pairing technical leggings with a structured blazer, or expensive sneakers with tailored trousers. We explore how to curate an athleisure wardrobe that looks expensive, intentional, and perfectly suited for a dynamic, fast-paced urban lifestyle.",
    category: "Fashion",
    tags: ["#Athleisure", "#Comfort", "#Style"],
    updatedAt: "2024.03.10",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
  },
];
