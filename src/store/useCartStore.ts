import { create } from "zustand";
import { DUMMY_PRODUCTS } from "../data/dummyProductData";

export interface CartItem {
  id: string;
  name: string;
  brand: string;
  subTitle?: string;
  description?: string;
  price: number;
  quantity: number;
  image: any;
  selectedSize?: string;
  selectedColor?: string;
}

interface CartState {
  isOpen: boolean;
  items: CartItem[];
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size?: string, color?: string) => void;
  updateQuantity: (id: string, delta: number, size?: string, color?: string) => void;
  getTotalPrice: () => number;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  isOpen: false,
  items: [],
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find(
        (i) => i.id === item.id && i.selectedSize === item.selectedSize && i.selectedColor === item.selectedColor
      );
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id && i.selectedSize === item.selectedSize && i.selectedColor === item.selectedColor
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),
  removeItem: (id, size, color) =>
    set((state) => ({
      items: state.items.filter((i) => !(i.id === id && i.selectedSize === size && i.selectedColor === color)),
    })),
  updateQuantity: (id, delta, size, color) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === id && i.selectedSize === size && i.selectedColor === color
          ? { ...i, quantity: Math.max(1, i.quantity + delta) }
          : i
      ),
    })),
  getTotalPrice: () => {
    return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
  clearCart: () => set({ items: [] }),
}));
