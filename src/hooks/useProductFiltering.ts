import { DUMMY_PRODUCTS, Product } from "@/src/data/dummyProductData";
import { SortOption } from "@/src/components/products/ProductHeader";
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
}

export function useProductFiltering({
  initialCategory,
  initialSubCategory,
}: UseProductFilteringParams = {}) {
  const [sortOption, setSortOption] = useState<SortOption>("New");
  const [activeFilters, setActiveFilters] = useState<string[]>(["All"]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const filterFromParams = initialSubCategory || initialCategory || "All";

    const hasData = DUMMY_PRODUCTS.some((p) => {
      if (filterFromParams === "All") return true;
      if (filterFromParams === "Apparel")
        return CATEGORY_MAP["Apparel"].includes(p.category);
      if (filterFromParams === "New" || filterFromParams === "Beauty")
        return true;
      return p.category === filterFromParams;
    });

    const finalFilter = hasData ? filterFromParams : "All";
    setActiveFilters([finalFilter]);
    setCurrentPage(1);
  }, [initialCategory, initialSubCategory]);

  const handleFilterChange = (filter: string) => {
    setActiveFilters((prev) => {
      if (filter === "All") return ["All"];

      const newFilters = prev.filter((f) => f !== "All");
      if (newFilters.includes(filter)) {
        const updated = newFilters.filter((f) => f !== filter);
        return updated.length === 0 ? ["All"] : updated;
      } else {
        return [...newFilters, filter];
      }
    });
    setCurrentPage(1);
  };

  const processedProducts = useMemo(() => {
    let result = DUMMY_PRODUCTS.filter((p) => {
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
  }, [activeFilters, sortOption]);

  const totalPages = Math.ceil(processedProducts.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const displayedProducts = processedProducts.slice(
    startIndex,
    startIndex + PAGE_SIZE,
  );

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
  };
}
