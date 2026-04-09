import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { DUMMY_PRODUCTS, Product } from "@/src/data/dummyProductData";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ProductCard from "./ProductCard";

interface YouMayLikeProps {
  currentProductId: string;
  category: string;
}

export default function YouMayLike({ currentProductId, category }: YouMayLikeProps) {
  const router = useRouter();

  // Filter products by category, excluding current product, take up to 4
  const recommendedProducts = DUMMY_PRODUCTS.filter(
    (p) => p.category === category && p.id !== currentProductId
  ).slice(0, 4);

  // If not enough products in same category, fill with others to make it 4
  if (recommendedProducts.length < 4) {
    const others = DUMMY_PRODUCTS.filter(
      (p) => p.id !== currentProductId && !recommendedProducts.some(rp => rp.id === p.id)
    ).slice(0, 4 - recommendedProducts.length);
    recommendedProducts.push(...others);
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>YOU MAY ALSO LIKE</Text>
        <Image source={Images.home.titleUnderline} style={styles.underline} resizeMode="contain" />
      </View>

      <View style={styles.grid}>
        {recommendedProducts.map((item) => (
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
