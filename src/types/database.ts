export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  options: {
    sizes: string[];
    colors: string[];
  };
  created_at: string;
}

export interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  selected_option: {
    size?: string;
    color?: string;
  };
  user_id?: string;
  created_at?: string;
  product?: Product;
}

export interface Order {
  id: string;
  total_amount: number;
  status: "created" | "completed";
  items: CartItem[];
  user_id?: string;
  created_at?: string;
}
