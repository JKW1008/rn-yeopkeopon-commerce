import { DUMMY_BLOG_POSTS } from "@/src/data/dummyBlogData";
import { useState } from "react";

const ITEMS_PER_LOAD = 3;

export function useBlogPostFiltering() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const allFilteredPosts =
    activeCategory === "All" || !activeCategory
      ? DUMMY_BLOG_POSTS
      : DUMMY_BLOG_POSTS.filter((post) => post.category === activeCategory);

  const displayedPosts = allFilteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < allFilteredPosts.length;

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(ITEMS_PER_LOAD);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
  };

  return {
    activeCategory,
    displayedPosts,
    hasMore,
    handleSelectCategory,
    handleLoadMore,
  };
}
