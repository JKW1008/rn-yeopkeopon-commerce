import { create } from "zustand";

export type SortOption = "New" | "Price: Low to High" | "Price: High to Low" | "Rating";

interface FilterState {
  activeFilters: string[];
  sortOption: SortOption;
  setFilters: (filters: string[]) => void;
  setSortOption: (option: SortOption) => void;
  toggleFilter: (filter: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  activeFilters: ["All"],
  sortOption: "New",
  setFilters: (filters) => set({ activeFilters: filters }),
  setSortOption: (option) => set({ sortOption: option }),
  toggleFilter: (filter) => set((state) => {
    if (filter === "All") return { activeFilters: ["All"] };
    
    const newFilters = state.activeFilters.filter((f) => f !== "All");
    if (newFilters.includes(filter)) {
      const updated = newFilters.filter((f) => f !== filter);
      return { activeFilters: updated.length === 0 ? ["All"] : updated };
    } else {
      return { activeFilters: [...newFilters, filter] };
    }
  }),
  resetFilters: () => set({ activeFilters: ["All"], sortOption: "New" }),
}));
