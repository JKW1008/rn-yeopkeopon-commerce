import { create } from "zustand";
import { DUMMY_PRODUCTS } from "../data/dummyProductData";

export interface CartItem {
  id: string;
  name: string;
  subTitle?: string;
  description?: string;
  price: number;
  quantity: number;
  image: any;
}

interface CartState {
  isOpen: boolean;
  items: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  isOpen: false,
  items: DUMMY_PRODUCTS.slice(0, 4).map((p) => ({
    id: p.id,
    name: p.name,
    subTitle: `${p.brand} / ${p.sizes[0] || "O/S"}`,
    description: p.description,
    price: p.price,
    quantity: 1,
    image: { uri: p.imageUrl },
  })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),
  updateQuantity: (id, delta) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i
        ),
    })),
  getTotalPrice: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
}));
