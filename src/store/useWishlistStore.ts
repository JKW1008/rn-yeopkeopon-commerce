import { create } from "zustand";
import { wishlistService } from "../api/services/wishlistService";

interface WishlistState {
  wishlistIds: string[];
  isLoading: boolean;
  fetchWishlist: () => Promise<void>;
  toggleLike: (productId: string) => Promise<void>;
  isLiked: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlistIds: [],
  isLoading: false,

  /**
   * 서버에서 찜 목록(상품 ID 배열)을 불러옵니다.
   */
  fetchWishlist: async () => {
    set({ isLoading: true });
    try {
      const ids = await wishlistService.getWishlistIds();
      set({ wishlistIds: ids });
    } catch {
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * 찜 상태를 토글하고 DB에 반영합니다.
   */
  toggleLike: async (productId) => {
    const currentIds = get().wishlistIds;
    const isCurrentlyLiked = currentIds.includes(productId);

    if (isCurrentlyLiked) {
      set({ wishlistIds: currentIds.filter((id) => id !== productId) });
    } else {
      set({ wishlistIds: [...currentIds, productId] });
    }

    try {
      if (isCurrentlyLiked) {
        await wishlistService.removeFromWishlist(productId);
      } else {
        await wishlistService.addToWishlist(productId);
      }
    } catch {
      set({ wishlistIds: currentIds });
    }
  },

  isLiked: (productId) => get().wishlistIds.includes(productId),
}));
