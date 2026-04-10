import { Theme } from "@/src/constants/theme";
import { scale, vs } from "@/src/utils/responsive";
import { Product } from "@/src/api/types";
import { useProductWishlist } from "@/src/hooks/useProductWishlist";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

interface ProductCardProps {
  product: Product;
  variant: "grid" | "list" | "large";
}

const ProductCard = React.memo(function ProductCard({ product, variant }: ProductCardProps) {
  const router = useRouter();
  const { isLiked, handleToggleLike } = useProductWishlist(product.id);

  const handlePress = () => {
    router.push(`/product/${product.id}`);
  };

  const mainImage = product.images?.[0];

  if (variant === "list") {
    const isApparel = ["Outer", "Dress", "Knitwear", "Apparel"].includes(product.category);
    const sizes = product.options?.sizes || [];

    return (
      <TouchableOpacity style={styles.listContainer} onPress={handlePress}>
        <View style={styles.listImageWrapper}>
          <Image source={{ uri: mainImage }} style={styles.listImage} />
          <TouchableOpacity
            style={[styles.imageHeartButton, styles.listHeartButton]}
            onPress={handleToggleLike}
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={22}
              color={Theme.colors.accent}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.listInfo}>
          <Text style={styles.listBrandText}>{product.brand || "LAMEREI"}</Text>
          <Text style={styles.listNameText} numberOfLines={1}>
            {product.name}
          </Text>

          <View style={styles.listMetaColumn}>
            <Text style={styles.priceText}>{`$${product.price.toLocaleString()}`}</Text>

            <View style={styles.listRatingRow}>
              <Ionicons name="star" size={14} color={Theme.colors.accent} />
              <Text style={styles.listRatingText}>
                {product.rating}
              </Text>
            </View>

            {isApparel && sizes.length > 0 && (
              <View style={styles.listSizesGroup}>
                <View style={styles.sizeLabelContainer}>
                  <Text style={styles.sizeLabelText}>Size</Text>
                </View>
                <View style={styles.listSizesRow}>
                  {sizes.slice(0, 3).map((size) => (
                    <View key={size} style={styles.listSizeChip}>
                      <Text style={styles.listSizeText}>{size}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  if (variant === "large") {
    return (
      <TouchableOpacity style={styles.largeContainer} onPress={handlePress}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: mainImage }} style={styles.largeImage} />
          <TouchableOpacity
            style={styles.imageHeartButton}
            onPress={handleToggleLike}
          >
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={22}
              color={Theme.colors.accent}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.largeFooter}>
          <Text style={styles.brandText}>{product.brand}</Text>
          <Text style={styles.largeNameText}>{product.name}</Text>
          <Text style={styles.priceText}>{`$${product.price.toLocaleString()}`}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.gridContainer} onPress={handlePress}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: mainImage }} style={styles.gridImage} />
        <TouchableOpacity
          style={styles.imageHeartButton}
          onPress={handleToggleLike}
        >
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={22}
            color={Theme.colors.accent}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.gridFooter}>
        <Text style={styles.brandText}>{product.brand}</Text>
        <Text style={styles.nameText} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.priceText}>{`$${product.price.toLocaleString()}`}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default ProductCard;

const styles = StyleSheet.create({
  brandText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.primary,
    letterSpacing: Theme.typography.letterSpacing.wider,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  nameText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.secondary,
    lineHeight: Theme.typography.lineHeight.base,
    marginBottom: 4,
  },
  priceText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.accent,
    letterSpacing: Theme.typography.letterSpacing.wide,
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
  },
  imageHeartButton: {
    position: "absolute",
    right: 12,
    bottom: 12,
    padding: 4,
  },
  listHeartButton: {
    right: 8,
    bottom: 8,
  },
  listNameText: {
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.grey[500],
    marginBottom: 4,
  },
  gridContainer: {
    width: "48%",
  },
  gridImage: {
    width: "100%",
    height: vs(220),
    backgroundColor: Theme.colors.grey[100],
  },
  gridFooter: {
    paddingVertical: vs(10),
  },
  listBrandText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.primary,
    textTransform: "uppercase",
    marginBottom: 4,
    letterSpacing: Theme.typography.letterSpacing.wider,
  },

  listMetaColumn: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 8,
  },
  listRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  listRatingText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.secondary,
    lineHeight: Theme.typography.lineHeight.tight18, // 텍스트 높이를 명시적으로 설정하여 중앙 정렬 보정
    textAlignVertical: "center", // 안드로이드 대응
  },
  listSizesGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sizeLabelContainer: {
    height: 20,
    justifyContent: "center",
    paddingTop: 1, // 베이스라인 미세 조정
  },
  sizeLabelText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.secondary,
    letterSpacing: Theme.typography.letterSpacing.fine,
  },
  listSizesRow: {
    flexDirection: "row",
    gap: 5,
  },
  listSizeChip: {
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Theme.colors.grey[200],
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  listSizeText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.nano,
    color: Theme.colors.grey[500],
    textTransform: "uppercase",
  },

  listContainer: {
    flexDirection: "row",
    backgroundColor: Theme.colors.white,
  },
  listImageWrapper: {
    width: width * 0.28,
    height: width * 0.38,
    position: "relative",
  },
  listImage: {
    width: "100%",
    height: "100%",
    backgroundColor: Theme.colors.surface,
  },
  listInfo: {
    flex: 1,
    paddingLeft: scale(18),
    paddingVertical: vs(12),
    justifyContent: "flex-start",
  },
  listHeaderSection: {
    height: 60,
    marginBottom: 4,
  },
  listPriceSection: {
    height: 30,
    marginBottom: 8,
    justifyContent: "center",
  },
  listFooterSection: {
    height: 60,
    justifyContent: "flex-end",
  },
  listSizeContainer: {
    height: 35,
    marginTop: 4,
  },
  ratingStars: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  listSizes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 14,
    marginBottom: 4,
  },
  ratingText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.secondary,
  },
  sizeSection: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sizeTitle: {
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.secondary,
    fontFamily: Theme.typography.fontFamily.main,
  },
  sizeRow: {
    flexDirection: "row",
    gap: 8,
  },
  sizeCircle: {
    minWidth: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Theme.colors.grey[300],
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  sizeText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.primary,
  },
  heartButton: {
    justifyContent: "center",
    paddingLeft: 10,
  },

  largeContainer: {
    width: "100%",
  },
  largeImage: {
    width: "100%",
    aspectRatio: 3 / 4,
    backgroundColor: Theme.colors.grey[100],
  },
  largeFooter: {
    paddingVertical: 15,
  },
  largeNameText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.secondary,
    marginBottom: 4,
  },
});
