import { Theme } from "@/src/constants/theme";
import { Product } from "@/src/data/dummyProductData";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProductCardProps {
  product: Product;
  variant: "grid" | "list" | "large";
}

export default function ProductCard({ product, variant }: ProductCardProps) {
  if (variant === "list") {
    return (
      <TouchableOpacity style={styles.listContainer}>
        <Image source={{ uri: product.imageUrl }} style={styles.listImage} />
        <View style={styles.listInfo}>
          <Text style={styles.brandText}>{product.brand}</Text>
          <Text style={styles.nameText}>{product.name}</Text>
          <Text style={styles.priceText}>{`$${product.price}`}</Text>
          
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color="#DD8560" />
            <Text style={styles.ratingText}>{`${product.rating} Ratings`}</Text>
          </View>

          <View style={styles.sizeSection}>
            <Text style={styles.sizeTitle}>{`Size`}</Text>
            <View style={styles.sizeRow}>
              {["S", "M", "L"].map((size) => (
                <View key={size} style={styles.sizeCircle}>
                  <Text style={styles.sizeText}>{size}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.heartButton}>
          <Ionicons name="heart-outline" size={24} color="#DD8560" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  if (variant === "large") {
    return (
      <TouchableOpacity style={styles.largeContainer}>
        <Image source={{ uri: product.imageUrl }} style={styles.largeImage} />
        <View style={styles.largeFooter}>
          <Text style={styles.brandText}>{product.brand}</Text>
          <View style={styles.largeNamePrice}>
            <Text style={styles.largeNameText}>{product.name}</Text>
            <Text style={styles.priceText}>{`$${product.price}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  // Default Grid View
  return (
    <TouchableOpacity style={styles.gridContainer}>
      <Image source={{ uri: product.imageUrl }} style={styles.gridImage} />
      <View style={styles.gridFooter}>
        <Text style={styles.brandText}>{product.brand}</Text>
        <Text style={styles.nameText} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.priceText}>{`$${product.price}`}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // Common Styles
  brandText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    marginBottom: 4,
  },
  nameText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 14,
    color: Theme.colors.secondary,
    lineHeight: 20,
    marginBottom: 4,
  },
  priceText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 16,
    color: "#DD8560",
    fontWeight: "700",
  },

  // Grid Styles
  gridContainer: {
    width: "48%",
    marginBottom: 20,
  },
  gridImage: {
    width: "100%",
    height: 220,
    backgroundColor: "#f5f5f5",
  },
  gridFooter: {
    paddingVertical: 10,
  },

  // List Styles
  listContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  listImage: {
    width: "35%",
    height: 160,
    backgroundColor: "#f5f5f5",
  },
  listInfo: {
    flex: 1,
    paddingLeft: 16,
    paddingVertical: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginVertical: 4,
  },
  ratingText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 12,
    color: Theme.colors.grey[500],
  },
  sizeSection: {
    marginTop: 8,
  },
  sizeTitle: {
    fontSize: 12,
    color: Theme.colors.grey[400],
    marginBottom: 6,
  },
  sizeRow: {
    flexDirection: "row",
    gap: 8,
  },
  sizeCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
  },
  sizeText: {
    fontSize: 12,
    color: Theme.colors.primary,
  },
  heartButton: {
    justifyContent: "center",
    paddingLeft: 10,
  },

  // Large Styles
  largeContainer: {
    width: "100%",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  largeImage: {
    width: "100%",
    height: 450,
    backgroundColor: "#f5f5f5",
  },
  largeFooter: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  largeNamePrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  largeNameText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 16,
    color: Theme.colors.secondary,
    flex: 1,
    marginRight: 10,
  },
});
