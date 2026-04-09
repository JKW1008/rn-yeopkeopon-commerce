import { Theme } from "@/src/constants/theme";
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

const { width } = Dimensions.get("window");

interface CheckoutProductItemProps {
  item: {
    id: string;
    name: string;
    image: any;
    price: number;
    quantity: number;
    brand?: string;
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
  showRemove?: boolean;
}

const CheckoutProductItem: React.FC<CheckoutProductItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  showRemove = false,
}) => {
  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.itemInfo}>
        <View style={styles.itemHeader}>
          <Text style={styles.brand}>{item.brand || "LAMEREI"}</Text>
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
        <Text style={styles.name}>{item.name}</Text>

        {(item.selectedSize || item.selectedColor) && (
          <Text style={styles.optionText}>
            {item.selectedSize ? `SIZE: ${item.selectedSize}` : ""}
            {item.selectedSize && item.selectedColor ? " / " : ""}
            {item.selectedColor ? `COLOR: ${item.selectedColor}` : ""}
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
          ${(item.price * item.quantity).toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 25,
  },
  image: {
    width: width * 0.3,
    height: width * 0.4,
    backgroundColor: Theme.colors.surface,
  },
  itemInfo: {
    flex: 1,
    paddingLeft: 20,
    paddingVertical: 5,
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
    fontWeight: "400",
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
    gap: 8,
    marginBottom: 10,
  },
  qtyBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Theme.colors.grey[200],
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.primary,
    minWidth: 15,
    textAlign: "center",
  },
  price: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.accent,
    fontWeight: "600",
    letterSpacing: Theme.typography.letterSpacing.wide,
  },
});

export default CheckoutProductItem;
