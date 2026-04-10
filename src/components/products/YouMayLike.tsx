import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import ProductCard from "./ProductCard";
import { useRecommendedProducts } from "@/src/hooks/useRecommendedProducts";

interface YouMayLikeProps {
  currentProductId: string;
  category: string;
}

export default function YouMayLike({ currentProductId, category }: YouMayLikeProps) {
  const { products, isLoading } = useRecommendedProducts(currentProductId, category);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={Theme.colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>YOU MAY ALSO LIKE</Text>
        <Image source={Images.home.titleUnderline} style={styles.underline} resizeMode="contain" />
      </View>

      <View style={styles.grid}>
        {products.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            variant="grid"
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    backgroundColor: "#fff",
  },
  titleWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 18,
    color: Theme.colors.primary,
    letterSpacing: 4,
    textAlign: "center",
  },
  underline: {
    width: 120,
    height: 12,
    marginTop: 6,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  cardWrapper: {
    width: "48%",
    marginBottom: 10,
  },
});
