import { productService } from "../api/services/productService";
import { Product } from "../api/types";
import { useFilterStore } from "@/src/store/useFilterStore";
import { useState, useMemo, useEffect } from "react";

const CATEGORY_MAP: Record<string, string[]> = {
  Apparel: ["Outer", "Dress", "Knitwear"],
  New: [],
  Bag: ["Bag"],
  Shoes: ["Shoes"],
  Accessories: ["Accessories"],
  Beauty: [],
};

const PAGE_SIZE = 10;

interface UseProductFilteringParams {
  initialCategory?: string;
  initialSubCategory?: string;
  searchQuery?: string;
}

export function useProductFiltering({
  initialCategory,
  initialSubCategory,
  searchQuery,
}: UseProductFilteringParams = {}) {
  const {
    activeFilters,
    sortOption,
    setSortOption,
    setFilters,
    toggleFilter,
  } = useFilterStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await productService.getProducts();
        setProducts(data);
      } catch {
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (isLoading) return;

    if (searchQuery) {
      setFilters(["All"]);
      setCurrentPage(1);
      return;
    }

    const filterFromParams = initialSubCategory || initialCategory || "All";

    const hasData = products.some((p) => {
      if (filterFromParams === "All") return true;
      if (filterFromParams === "Apparel")
        return CATEGORY_MAP["Apparel"].includes(p.category);
      if (filterFromParams === "New" || filterFromParams === "Beauty")
        return true;
      return p.category === filterFromParams;
    });

    const finalFilter = hasData ? filterFromParams : "All";
    setFilters([finalFilter]);
    setCurrentPage(1);
  }, [initialCategory, initialSubCategory, searchQuery, isLoading, products]);

  const handleFilterChange = (filter: string) => {
    toggleFilter(filter);
    setCurrentPage(1);
  };

  const processedProducts = useMemo(() => {
    let result = products.filter((p) => {
      if (searchQuery && searchQuery.trim()) {
        const lowerSearch = searchQuery.toLowerCase();
        const matchesSearch =
          p.name.toLowerCase().includes(lowerSearch) ||
          p.category.toLowerCase().includes(lowerSearch) ||
          (p.description && p.description.toLowerCase().includes(lowerSearch));
        
        if (!matchesSearch) return false;
      }

      if (activeFilters.includes("All") || activeFilters.length === 0)
        return true;

      return activeFilters.some((filter) => {
        if (filter === "Apparel")
          return CATEGORY_MAP["Apparel"].includes(p.category);
        return p.category === filter;
      });
    });

    result = [...result].sort((a, b) => {
      switch (sortOption) {
        case "Price: Low to High":
          return a.price - b.price;
        case "Price: High to Low":
          return b.price - a.price;
        case "Rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return result;
  }, [products, activeFilters, sortOption, searchQuery]);

  const totalPages = Math.ceil(processedProducts.length / PAGE_SIZE);

  const displayedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return processedProducts.slice(startIndex, startIndex + PAGE_SIZE);
  }, [processedProducts, currentPage]);

  return {
    sortOption,
    setSortOption,
    activeFilters,
    handleFilterChange,
    processedProducts,
    currentPage,
    setCurrentPage,
    totalPages,
    displayedProducts,
    isLoading,
  };
}
