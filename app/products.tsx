import { DUMMY_PRODUCTS } from "@/src/data/dummyProductData";
import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import AppHeader from "@/src/components/ui/AppHeader";
import AppFooter from "@/src/components/ui/AppFooter";
import ProductHeader from "@/src/components/products/ProductHeader";
import ProductCard from "@/src/components/products/ProductCard";

export default function ProductsScreen() {
  const { category, subCategory } = useLocalSearchParams<{
    category?: string;
    subCategory?: string;
  }>();

  const [viewMode, setViewMode] = useState<"grid" | "list" | "large">("grid");

  const activeChips: string[] = [];
  if (category) activeChips.push(category);
  if (subCategory) activeChips.push(subCategory);

  const toggleViewMode = () => {
    if (viewMode === "grid") setViewMode("list");
    else if (viewMode === "list") setViewMode("large");
    else setViewMode("grid");
  };

  const renderItem = ({ item }: { item: typeof DUMMY_PRODUCTS[0] }) => (
    <ProductCard product={item} variant={viewMode} />
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <AppHeader showBack={true} />
      <FlatList
        key={viewMode === "grid" ? "grid-view" : "other-view"}
        data={DUMMY_PRODUCTS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={viewMode === "grid" ? 2 : 1}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={viewMode === "grid" ? styles.columnWrapper : null}
        ListHeaderComponent={
          <ProductHeader
            count={DUMMY_PRODUCTS.length}
            viewMode={viewMode}
            onViewChange={toggleViewMode}
            activeChips={activeChips}
          />
        }
        ListFooterComponent={<AppFooter />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});

