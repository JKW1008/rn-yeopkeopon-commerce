// Supabase DB 테이블과 1:1 매핑되는 타입 정의
// snake_case = DB 컬럼명

export interface DbProduct {
  id: string;
  name: string;
  brand: string;
  description: string | null;
  price: number;
  category: string;
  images: string[];       // images[0]이 대표 이미지
  sizes: string[];
  colors: DbColor[];
  rating: number;
  review_count: number;
  created_at: string;
}

export interface DbColor {
  id: string;
  hex: string;
  name: string;
}

export interface DbBanner {
  id: string;
  image_url: string;
  title: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

export interface DbBrand {
  id: string;
  name: string;
  logo_url: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface DbCollection {
  id: string;
  title: string;
  season_name: string | null;
  month_name: string | null;
  season_number: string | null;
  image_url: string;
  video_url: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface DbSnsPost {
  id: string;
  username: string;
  image_url: string;
  post_url: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface DbTrendingTag {
  id: string;
  tag: string;
  sort_order: number;
  is_active: boolean;
}

export interface DbPopularSearch {
  id: string;
  term: string;
  view_count: number;
  sort_order: number;
  is_active: boolean;
}

export interface DbBlogPost {
  id: string;
  title: string;
  description: string | null;
  category: string;
  tags: string[];
  image_url: string | null;
  updated_at: string;
  created_at: string;
  // JOIN 시 포함
  blog_sections?: DbBlogSection[];
}

export interface DbBlogSection {
  id: string;
  blog_post_id: string;
  type: "text" | "image";
  value: string | null;
  images: string[];
  sort_order: number;
}

export interface DbAddress {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  is_default: boolean;
  created_at: string;
}

export interface DbPaymentMethod {
  id: string;
  user_id: string;
  brand: string;
  number: string;
  expiry: string | null;
  is_default: boolean;
  created_at: string;
}

export interface DbCartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  selected_size: string | null;
  selected_color: string | null;
  created_at: string;
  // JOIN 시 포함
  product?: DbProduct;
}

export interface DbWishlist {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
}

export interface DbSearchHistory {
  id: string;
  user_id: string;
  term: string;
  searched_at: string;
}

export interface DbOrder {
  id: string;
  user_id: string;
  total_amount: number;
  shipping_method: "pickup" | "delivery";
  shipping_cost: number;
  status: "created" | "confirmed" | "shipped" | "delivered" | "cancelled";
  shipping_address: DbAddress | null;
  created_at: string;
  // JOIN 시 포함
  order_items?: DbOrderItem[];
}

export interface DbOrderItem {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_brand: string | null;
  unit_price: number;
  quantity: number;
  selected_size: string | null;
  selected_color: string | null;
  image_url: string | null;
}
