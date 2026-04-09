import { useWishlistStore } from "@/src/store/useWishlistStore";
import * as Haptics from "expo-haptics";

export function useProductWishlist(productId: string) {
  const { toggleLike, wishlistIds } = useWishlistStore();
  const isLiked = wishlistIds.includes(productId);

  const handleToggleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleLike(productId);
  };

  return { isLiked, handleToggleLike };
}
