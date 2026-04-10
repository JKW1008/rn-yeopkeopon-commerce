import { useCartStore } from "@/src/store/useCartStore";
import { Product } from "@/src/api/types";
import * as Haptics from "expo-haptics";
import { Alert } from "react-native";

export function useAddToCart(
  product: Product | undefined,
  selectedSize: string | null,
  selectedColor: string | null,
  onShowSizeModal: () => void,
) {
  const { addItem, openCart, items } = useCartStore();

  const handleAddToBasket = () => {
    if (!product) return;

    if (!selectedSize) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      Alert.alert("Option Required", "Please select a size first.", [
        { text: "Choose Size", onPress: onShowSizeModal },
      ]);
      return;
    }

    const isDuplicate = items.some(
      (item) => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor,
    );

    const executeAdd = () => {
      addItem({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        quantity: 1,
        image: { uri: product.imageUrl },
        selectedSize: selectedSize || "O/S",
        selectedColor: selectedColor || undefined,
        subTitle: product.brand,
      });

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      Alert.alert(
        "Added to Basket",
        "Would you like to check your basket or continue shopping?",
        [
          { text: "Continue Shopping", style: "cancel" },
          { text: "Go to Basket", onPress: () => openCart() },
        ],
      );
    };

    if (isDuplicate) {
      Alert.alert(
        "Already in Basket",
        "This item with same size is already in your basket. Add another one?",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Add More", onPress: executeAdd },
        ],
      );
    } else {
      executeAdd();
    }
  };

  return { handleAddToBasket };
}
