import { Theme } from "@/src/constants/theme";
import { Product } from "@/src/data/dummyProductData";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProductCard from "../products/ProductCard";
import CategoryTabs from "./CategoryTabs";
import { useRouter } from "expo-router";

export default function HomeProductSection({
  products,
}: {
  products: Product[];
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");

  const displayProducts = products
    .filter((p) => activeTab === "All" || p.category === activeTab)
    .slice(0, 4);

  return (
    <View style={styles.container}>
      <View style={styles.tabWrapper}>
        <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </View>
      <View style={styles.grid}>
        {displayProducts.map((item) => (
          <ProductCard
            key={item.id}
            product={item}
            variant="grid"
          />
        ))}
      </View>
      <TouchableOpacity
        style={styles.moreButton}
        activeOpacity={0.6}
        onPress={() => router.push("/products")}
      >
        <Text style={styles.moreText}>Explore More</Text>
        <Feather name="arrow-right" size={16} color={Theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  tabWrapper: {
    paddingHorizontal: 30,
    alignItems: "center",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10,
  },
  cardWrapper: {
    width: "48%",
    marginBottom: 16,
  },
  moreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingVertical: 10,
    gap: 4,
  },
  moreText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.primary,
    letterSpacing: Theme.typography.letterSpacing.wide,
  },
});
