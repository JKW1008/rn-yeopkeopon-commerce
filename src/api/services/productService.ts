import { supabase } from "../supabase";
import { Product } from "../types";

/**
 * 상품 관련 API 서비스
 */
export const productService = {
  /** 
   * 상품 목록 조회 (필터 및 리밋 지원)
   */
  async getProducts(options?: { category?: string; limit?: number }): Promise<Product[]> {
    let query = supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (options?.category) {
      query = query.eq("category", options.category);
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data.map((item: any) => this.mapProduct(item));
  },

  /**
   * 개별 상품 상세 조회 및 매핑
   */
  async getProductById(id: string): Promise<Product> {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return this.mapProduct(data);
  },

  /**
   * DB Raw 데이터를 프론트엔드 Product 인터페이스로 변환
   */
  mapProduct(raw: any): Product {
    return {
      id: raw.id,
      name: raw.name,
      brand: raw.brand,
      price: raw.price,
      description: raw.description,
      category: raw.category,
      images: raw.images || [],
      options: {
        sizes: raw.sizes || [],
        colors: raw.colors || [],
      },
      rating: raw.rating,
      reviewCount: raw.review_count,
      materials: raw.materials,
      careInstructions: raw.care_instructions,
      shippingInfo: raw.shipping_info,
    };
  }
};
