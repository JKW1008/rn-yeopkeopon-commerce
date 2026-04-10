import { Theme } from "@/src/constants/theme";
import { scale, vs } from "@/src/utils/responsive";
import { Feather, Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Product } from "@/src/api/types";

const { width } = Dimensions.get("window");

interface CheckoutProductItemProps {
  item: {
    id: string;
    product: Product;
    quantity: number;
    selectedSize?: string;
    selectedColor?: string;
  };
  onUpdateQuantity: (
    id: string,
    delta: number,
    size?: string,
    color?: string,
  ) => void;
  onRemove?: (id: string, size?: string, color?: string) => void;
  onPress?: () => void;
  showRemove?: boolean;
}

const CheckoutProductItem: React.FC<CheckoutProductItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  onPress,
  showRemove = false,
}) => {
  const mainImage = item.product.images?.[0];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touchableArea}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Image source={{ uri: mainImage }} style={styles.image} />
      </TouchableOpacity>
      
      <View style={styles.itemInfo}>
        <View style={styles.itemHeader}>
          <TouchableOpacity 
            style={{ flex: 1 }} 
            onPress={onPress}
            activeOpacity={0.7}
          >
            <Text style={styles.brand}>{item.product.brand || "LAMEREI"}</Text>
          </TouchableOpacity>
          {showRemove && onRemove && (
            <TouchableOpacity
              onPress={() =>
                onRemove(item.id, item.selectedSize, item.selectedColor)
              }
              style={styles.removeBtn}
            >
              <Ionicons
                name="close-outline"
                size={20}
                color={Theme.colors.grey[400]}
              />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity 
          onPress={onPress}
          activeOpacity={0.7}
        >
          <Text style={styles.name}>{item.product.name}</Text>
        </TouchableOpacity>

        {(item.selectedSize || item.selectedColor) && (
          <Text style={styles.optionText}>
            {item.selectedSize || ""}
            {item.selectedSize && item.selectedColor ? " | " : ""}
            {item.selectedColor || ""}
          </Text>
        )}

        <View style={styles.qtyRow}>
          <TouchableOpacity
            onPress={() =>
              onUpdateQuantity(
                item.id,
                -1,
                item.selectedSize,
                item.selectedColor,
              )
            }
            style={styles.qtyBtn}
          >
            <Feather name="minus" size={14} color={Theme.colors.grey[500]} />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() =>
              onUpdateQuantity(
                item.id,
                1,
                item.selectedSize,
                item.selectedColor,
              )
            }
            style={styles.qtyBtn}
          >
            <Feather name="plus" size={14} color={Theme.colors.grey[500]} />
          </TouchableOpacity>
        </View>

        <Text style={styles.price}>
          ${(item.product.price * item.quantity).toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: vs(25),
  },
  touchableArea: {
    flex: 0,
  },
  image: {
    width: width * 0.28,
    height: width * 0.38,
    backgroundColor: Theme.colors.surface,
  },
  itemInfo: {
    flex: 1,
    paddingLeft: scale(20),
    paddingVertical: vs(5),
    justifyContent: "space-between",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  brand: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.primary,
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: Theme.typography.letterSpacing.wider,
  },
  removeBtn: {
    padding: 4,
    marginTop: -4,
    marginRight: -4,
  },
  name: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.secondary,
    marginBottom: 8,
  },
  optionText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.grey[400],
    marginBottom: 8,
    textTransform: "uppercase",
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: scale(8),
    marginBottom: vs(10),
  },
  qtyBtn: {
    width: scale(24),
    height: scale(24),
    borderRadius: scale(12),
    borderWidth: 1,
    borderColor: Theme.colors.grey[200],
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.primary,
    minWidth: scale(15),
    textAlign: "center",
  },
  price: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.accent,
    letterSpacing: Theme.typography.letterSpacing.wide,
  },
});

export default CheckoutProductItem;
