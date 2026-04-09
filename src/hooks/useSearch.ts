import { useState, useEffect, useMemo } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DUMMY_PRODUCTS, Product } from "@/src/data/dummyProductData";
import { useRouter } from "expo-router";

const RECENT_SEARCH_KEY = "recent_searches";
const MAX_RECENT_COUNT = 3;

export const POPULAR_SEARCH_TERMS = [
  "Trend",
  "Dress",
  "Bag",
  "Tshirt",
  "Beauty",
  "Accessories",
];

export function useSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearched, setIsSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 10;

  // Load recent searches on mount
  useEffect(() => {
    const loadRecent = async () => {
      try {
        const stored = await AsyncStorage.getItem(RECENT_SEARCH_KEY);
        if (stored) {
          setRecentSearches(JSON.parse(stored));
        }
      } catch (e) {
        console.error("Failed to load recent searches", e);
      }
    };
    loadRecent();
  }, []);

  // Save recent searches
  const addRecentSearch = async (term: string) => {
    if (!term.trim()) return;

    const termToStore = term.trim();
    const updated = [
      termToStore,
      ...recentSearches.filter((s) => s !== termToStore),
    ].slice(0, MAX_RECENT_COUNT);

    setRecentSearches(updated);
    try {
      await AsyncStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save recent search", e);
    }
  };

  const removeRecentSearch = async (term: string) => {
    const updated = recentSearches.filter((s) => s !== term);
    setRecentSearches(updated);
    try {
      await AsyncStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to remove recent search", e);
    }
  };

  const clearQuery = () => {
    setQuery("");
    setIsSearched(false);
    setCurrentPage(1);
  };

  const handleSearch = (term: string) => {
    if (!term.trim()) return;
    addRecentSearch(term);
    router.push({
      pathname: "/products",
      params: { search: term.trim() },
    });
  };

  return {
    query,
    setQuery,
    recentSearches,
    isSearched,
    setIsSearched,
    handleSearch,
    addRecentSearch,
    removeRecentSearch,
    clearQuery,
    popularTerms: POPULAR_SEARCH_TERMS,
  };
}
