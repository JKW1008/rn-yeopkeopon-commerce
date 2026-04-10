import { useState, useEffect } from "react";
import { productService } from "../api/services/productService";
import { orderService } from "../api/services/orderService";
import { Product } from "../api/types";
import { useCartStore } from "../store/useCartStore";
import { Alert } from "react-native";

export const useProductDetail = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  
  const items = useCartStore((state) => state.items);
  const openCart = useCartStore((state) => state.openCart);
  const fetchCart = useCartStore((state) => state.fetchCart);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setIsLoading(true);
      try {
        const data = await productService.getProductById(id);
        setProduct(data);
        
        if (data.options.sizes.length > 0) setSelectedSize(data.options.sizes[0]);
        if (data.options.colors.length > 0) setSelectedColor(data.options.colors[0].name);
      } catch {
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;

    const existingItem = items.find(
      (item) =>
        item.productId === product.id &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
    );

    const performAdd = async (quantity: number) => {
      try {
        await orderService.upsertCartItem({
          productId: product.id,
          quantity: quantity,
          selectedSize,
          selectedColor,
        });

        await fetchCart(); // 전역 스토어 갱신
        
        Alert.alert(
          "SUCCESS",
          "Item added to your shopping bag.",
          [
            {
              text: "CONTINUE SHOPPING",
              style: "cancel",
            },
            {
              text: "VIEW CART",
              onPress: () => openCart(),
            },
          ]
        );
      } catch {
        Alert.alert("Error", "Failed to update bag");
      }
    };

    if (existingItem) {
      Alert.alert(
        "ALREADY IN BAG",
        "This item is already in your shopping bag. Do you want to add one more?",
        [
          { text: "CANCEL", style: "cancel" },
          { 
            text: "ADD MORE", 
            onPress: () => performAdd(existingItem.quantity + 1) 
          },
        ]
      );
    } else {
      await performAdd(1);
    }
  };

  return {
    product,
    isLoading,
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    handleAddToCart,
  };
};
