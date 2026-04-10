// 상품 관련 타입
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  options: {
    sizes: string[];
    colors: Array<{ name: string; hex: string }>;
  };
  rating: number;
  reviewCount: number;
  materials?: string;
  careInstructions?: any;
  shippingInfo?: any;
}

// 장바구니 관련 타입
export interface CartItem {
  id: string; // 장바구니 내 고유 ID (uuid)
  productId: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

// 주소 및 결제 수단
export interface Address {
  id: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  brand: string;
  lastFour: string;
  expiryDate: string;
}

// 블로그 관련 타입
export interface BlogSection {
  type: "text" | "image";
  value: string;
  images?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  sections: BlogSection[];
  category: string;
  tags: string[];
  updatedAt: string;
  imageUrl: string;
}
