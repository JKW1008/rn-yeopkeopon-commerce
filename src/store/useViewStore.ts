import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type ViewMode = "grid" | "list" | "large";

interface ViewState {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
}

export const useViewStore = create<ViewState>()(
  persist(
    (set, get) => ({
      viewMode: "grid",
      setViewMode: (mode) => set({ viewMode: mode }),
      toggleViewMode: () => {
        const current = get().viewMode;
        if (current === "grid") set({ viewMode: "list" });
        else if (current === "list") set({ viewMode: "large" });
        else set({ viewMode: "grid" });
      },
    }),
    {
      name: "view-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
