import { supabase } from "../supabase";
import { getDeviceUserId } from "../../utils/userIdentifier";
import { CartItem } from "../types";
import { productService } from "./productService";

/**
 * 장바구니 및 주문 관련 API 서비스
 */
export const orderService = {
  /**
   * 장바구니 목록 조회 및 매핑
   */
  async getCartItems(): Promise<CartItem[]> {
    const userId = await getDeviceUserId();
    const { data, error } = await supabase
      .from("cart_items")
      .select("*, product:products(*)")
      .eq("user_id", userId);

    if (error) throw error;
    
    return data.map((item: any) => ({
      id: item.id,
      productId: item.product_id,
      quantity: item.quantity,
      selectedSize: item.selected_size,
      selectedColor: item.selected_color,
      product: productService.mapProduct(item.product)
    }));
  },

  /**
   * 장바구니 항목 추가/업데이트 (UPSERT)
   */
  async upsertCartItem(item: {
    productId: string;
    quantity: number;
    selectedSize?: string | null;
    selectedColor?: string | null;
  }) {
    const userId = await getDeviceUserId();
    const { data, error } = await supabase
      .from("cart_items")
      .upsert(
        {
          user_id: userId,
          product_id: item.productId,
          quantity: item.quantity,
          selected_size: item.selectedSize,
          selected_color: item.selectedColor,
        },
        { onConflict: "user_id, product_id, selected_size, selected_color" }
      )
      .select();

    if (error) throw error;
    return data;
  },

  /**
   * 주문 생성 및 주문 상세 기록
   */
  async createOrder(order: {
    totalAmount: number;
    addressId?: string;
    addressSnapshot?: object;
    paymentMethodId?: string;
    items: any[];
  }) {
    const userId = await getDeviceUserId();

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId,
        total_amount: order.totalAmount,
        address_id: order.addressId,
        shipping_address: order.addressSnapshot ?? null,
        payment_method_id: order.paymentMethodId,
        status: "created"
      })
      .select()
      .single();

    if (orderError) throw orderError;

    const orderItems = order.items.map(item => ({
      order_id: orderData.id,
      product_id: item.productId,
      product_name: item.name,
      unit_price: item.price,
      quantity: item.quantity,
      selected_size: item.selectedSize,
      selected_color: item.selectedColor
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
    if (itemsError) throw itemsError;

    return orderData;
  },

  async deleteCartItem(id: string) {
    const { error } = await supabase.from("cart_items").delete().eq("id", id);
    if (error) throw error;
  },

  async clearCart() {
    const userId = await getDeviceUserId();
    const { error } = await supabase.from("cart_items").delete().eq("user_id", userId);
    if (error) throw error;
  }
};
