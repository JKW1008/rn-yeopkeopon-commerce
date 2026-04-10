import { create } from "zustand";
import { orderService } from "../api/services/orderService";
import { CartItem } from "../api/types";

interface CartState {
  isOpen: boolean;
  items: CartItem[];
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  fetchCart: () => Promise<void>;
  addItem: (item: Omit<CartItem, "id" | "product">) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  updateQuantity: (id: string, delta: number) => Promise<void>;
  getTotalPrice: () => number;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  isOpen: false,
  items: [],
  isLoading: false,
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  fetchCart: async () => {
    set({ isLoading: true });
    try {
      const formattedItems = await orderService.getCartItems();
      set({ items: formattedItems });
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },

  addItem: async (item) => {
    set({ isLoading: true });
    try {
      await orderService.upsertCartItem({
        productId: item.productId,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      });
      await get().fetchCart();
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },

  removeItem: async (id) => {
    try {
      await orderService.deleteCartItem(id);
      set((state) => ({
        items: state.items.filter((i) => i.id !== id),
      }));
    } catch (error) {
    }
  },

  updateQuantity: async (id, delta) => {
    const item = get().items.find((i) => i.id === id);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + delta);

    set((state) => ({
      items: state.items.map((i) =>
        i.id === id ? { ...i, quantity: newQuantity } : i
      ),
    }));

    try {
      await orderService.upsertCartItem({
        productId: item.productId,
        quantity: newQuantity,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      });
    } catch {
      set((state) => ({
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: item.quantity } : i
        ),
      }));
    }
  },

  getTotalPrice: () => {
    return get().items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  },

  clearCart: async () => {
    try {
      await orderService.clearCart();
      set({ items: [] });
    } catch (error) {
    }
  },
}));
