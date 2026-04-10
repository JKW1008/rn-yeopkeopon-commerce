import { contentService } from "../api/services/contentService";
import { BlogPost } from "../api/types";
import { useState, useEffect, useMemo, useCallback } from "react";

const ITEMS_PER_LOAD = 3;

export function useBlogPostFiltering() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const data = await contentService.getBlogPosts();
        setPosts(data);
      } catch {
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const allFilteredPosts = useMemo(() => {
    return activeCategory === "All" || !activeCategory
      ? posts
      : posts.filter((post) => post.category === activeCategory);
  }, [posts, activeCategory]);

  const displayedPosts = useMemo(
    () => allFilteredPosts.slice(0, visibleCount),
    [allFilteredPosts, visibleCount]
  );
  const hasMore = visibleCount < allFilteredPosts.length;

  const handleSelectCategory = useCallback((cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(ITEMS_PER_LOAD);
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
  }, []);

  return {
    activeCategory,
    displayedPosts,
    hasMore,
    isLoading,
    handleSelectCategory,
    handleLoadMore,
  };
}
