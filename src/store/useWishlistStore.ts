import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface WishlistState {
  wishlistIds: string[];
  toggleLike: (productId: string) => void;
  isLiked: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      wishlistIds: [],
      toggleLike: (productId) =>
        set((state) => {
          const isLiked = state.wishlistIds.includes(productId);
          if (isLiked) {
            return {
              wishlistIds: state.wishlistIds.filter((id) => id !== productId),
            };
          } else {
            return { wishlistIds: [...state.wishlistIds, productId] };
          }
        }),
      isLiked: (productId) => get().wishlistIds.includes(productId),
    }),
    {
      name: "wishlist-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
