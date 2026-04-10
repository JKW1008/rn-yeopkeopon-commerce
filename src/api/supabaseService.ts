import { supabase } from "./supabase";
import { getDeviceUserId } from "../utils/userIdentifier";

/**
 * Supabase 통합 데이터 서비스
 */
export const supabaseService = {
  // [1] 상품 관련
  async getProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async getProductById(id: string) {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  // [2] 홈 콘텐츠 관련
  async getBanners() {
    const { data, error } = await supabase.from("banners").select("*").order("created_at");
    if (error) throw error;
    return data;
  },

  async getBrands() {
    const { data, error } = await supabase.from("brands").select("*");
    if (error) throw error;
    return data;
  },

  async getCollections() {
    const { data, error } = await supabase.from("collections").select("*");
    if (error) throw error;
    return data;
  },

  async getSnsPosts() {
    const { data, error } = await supabase.from("sns_posts").select("*");
    if (error) throw error;
    return data;
  },

  async getTrendingTags() {
    const { data, error } = await supabase.from("trending_tags").select("*");
    if (error) throw error;
    return data;
  },

  // [3] 블로그 관련
  async getBlogPosts() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async getBlogPostDetail(id: string) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        sections:blog_sections(*)
      `)
      .eq("id", id)
      .single();
    
    if (error) throw error;
    if (data.sections) {
      data.sections.sort((a: any, b: any) => a.sort_order - b.sort_order);
    }
    return data;
  },

  // [4] 유저 활동 관련 (UUID 기반)
  async getCartItems() {
    const userId = await getDeviceUserId();
    const { data, error } = await supabase
      .from("cart_items")
      .select(`
        *,
        product:products(*)
      `)
      .eq("user_id", userId);
    if (error) throw error;
    return data;
  },

  async upsertCartItem(item: {
    product_id: string;
    quantity: number;
    selected_size?: string | null;
    selected_color?: string | null;
  }) {
    const userId = await getDeviceUserId();
    const { data, error } = await supabase
      .from("cart_items")
      .upsert(
        {
          user_id: userId,
          product_id: item.product_id,
          quantity: item.quantity,
          selected_size: item.selected_size,
          selected_color: item.selected_color,
        },
        { onConflict: "user_id, product_id, selected_size, selected_color" }
      )
      .select();
    if (error) throw error;
    return data;
  },

  async deleteCartItem(id: string) {
    const { error } = await supabase.from("cart_items").delete().eq("id", id);
    if (error) throw error;
  },

  async clearCart() {
    const userId = await getDeviceUserId();
    const { error } = await supabase.from("cart_items").delete().eq("user_id", userId);
    if (error) throw error;
  },

  // [5] 주문 관련
  async createOrder(order: {
    total_amount: number;
    address_id?: string;
    payment_method_id?: string;
    items: any[];
  }) {
    const userId = await getDeviceUserId();
    
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        total_amount: order.total_amount,
        address_id: order.address_id,
        payment_method_id: order.payment_method_id,
        status: "created"
      })
      .select()
      .single();

    if (orderError) throw orderError;

    const orderItems = order.items.map(item => ({
      order_id: orderData.id,
      product_id: item.product_id,
      product_name: item.product_name,
      unit_price: item.unit_price,
      quantity: item.quantity,
      selected_size: item.selected_size,
      selected_color: item.selected_color
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
    if (itemsError) throw itemsError;

    return orderData;
  },

  // [6] 검색 및 배송 정보 등
  async getPopularSearches() {
    const { data, error } = await supabase
      .from("popular_searches")
      .select("*")
      .order("view_count", { ascending: false });
    if (error) throw error;
    return data;
  },

  async getAddresses() {
    const userId = await getDeviceUserId();
    const { data, error } = await supabase.from("addresses").select("*").eq("user_id", userId);
    if (error) throw error;
    return data;
  },

  async getPaymentMethods() {
    const userId = await getDeviceUserId();
    const { data, error } = await supabase.from("payment_methods").select("*").eq("user_id", userId);
    if (error) throw error;
    return data;
  }
};
