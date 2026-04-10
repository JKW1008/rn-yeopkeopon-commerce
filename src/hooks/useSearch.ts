import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { contentService } from "../api/services/contentService";

const RECENT_SEARCH_KEY = "recent_searches";
const MAX_RECENT_COUNT = 3;

export function useSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularTerms, setPopularTerms] = useState<Array<{ id: string; term: string; view_count: number }>>([]);
  const [isSearched, setIsSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadRecent = async () => {
      try {
        const stored = await AsyncStorage.getItem(RECENT_SEARCH_KEY);
        if (stored) {
          setRecentSearches(JSON.parse(stored));
        }
      } catch {
      }
    };
    loadRecent();
  }, []);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const terms = await contentService.getPopularSearches();
        setPopularTerms(terms);
      } catch {
      }
    };
    fetchPopular();
  }, []);

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
    } catch {
    }
  };

  const removeRecentSearch = async (term: string) => {
    const updated = recentSearches.filter((s) => s !== term);
    setRecentSearches(updated);
    try {
      await AsyncStorage.setItem(RECENT_SEARCH_KEY, JSON.stringify(updated));
    } catch {
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
    popularTerms,
  };
}
