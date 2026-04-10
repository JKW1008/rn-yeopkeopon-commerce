import { productService } from "@/src/api/services/productService";
import { Product } from "@/src/api/types";
import { Theme } from "@/src/constants/theme";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CategoryTabs from "./CategoryTabs";
import ProductCard from "../products/ProductCard";

export default function HomeProductSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All");
  const [tabProducts, setTabProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTabProducts = async () => {
      setIsLoading(true);
      try {
        const data = await productService.getProducts({
          category: activeTab === "All" ? undefined : activeTab,
          limit: 4,
        });
        setTabProducts(data);
      } catch {
      } finally {
        setIsLoading(false);
      }
    };

    fetchTabProducts();
  }, [activeTab]);

  return (
    <View style={styles.container}>
      <View style={styles.tabWrapper}>
        <CategoryTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </View>
      <View style={[styles.grid, isLoading && { opacity: 0.5 }]}>
        {isLoading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator color={Theme.colors.accent} />
          </View>
        )}
        {tabProducts.map((item) => (
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
    minHeight: 200,
  },
  loadingOverlay: {
    position: "absolute",
    top: 100,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1,
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
