import { supabase } from "../supabase";

/**
 * 마케팅 및 브랜드 콘텐츠 관련 API 서비스
 */
export const contentService = {
  async getBanners() {
    const { data, error } = await supabase.from("banners").select("*").order("created_at");
    if (error) throw error;
    return data; // 단순 구조는 그대로 반환 가능 (이미 카멜케이스거나 심플할 경우)
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

  async getPopularSearches() {
    const { data, error } = await supabase
      .from("popular_searches")
      .select("*")
      .order("view_count", { ascending: false });
    if (error) throw error;
    return data;
  },

  async getBlogPosts() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      description: item.description ?? "",
      category: item.category,
      tags: item.tags ?? [],
      updatedAt: item.updated_at,
      imageUrl: item.image_url ?? "",
    }));
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
  }
};
