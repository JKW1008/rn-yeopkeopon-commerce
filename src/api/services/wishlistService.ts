import { supabase } from "../supabase";
import { getDeviceUserId } from "../../utils/userIdentifier";

/**
 * 위시리스트(찜 목록) 관련 API 서비스
 */
export const wishlistService = {
  /**
   * 현재 사용자의 찜 목록(상품 ID 배열) 조회
   */
  async getWishlistIds(): Promise<string[]> {
    const userId = await getDeviceUserId();
    const { data, error } = await supabase
      .from("wishlists")
      .select("product_id")
      .eq("user_id", userId);

    if (error) throw error;

    return data.map((item: any) => item.product_id);
  },

  /**
   * 상품을 찜 목록에 추가
   */
  async addToWishlist(productId: string): Promise<void> {
    const userId = await getDeviceUserId();
    const { error } = await supabase
      .from("wishlists")
      .insert({
        user_id: userId,
        product_id: productId,
      });

    if (error) throw error;
  },

  async removeFromWishlist(productId: string): Promise<void> {
    const userId = await getDeviceUserId();
    const { error } = await supabase
      .from("wishlists")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", productId);

    if (error) throw error;
  }
};
