import React from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import AppHeader from "@/src/components/ui/AppHeader";
import AppFooter from "@/src/components/ui/AppFooter";
import ProductHeader from "@/src/components/products/ProductHeader";
import ProductCard from "@/src/components/products/ProductCard";
import { Theme } from "@/src/constants/theme";
import { useViewStore } from "@/src/store/useViewStore";
import { useProductFiltering } from "@/src/hooks/useProductFiltering";
import { Product } from "@/src/data/dummyProductData";
import Pagination from "@/src/components/common/Pagination";
import SearchResultHeader from "@/src/components/search/SearchResultHeader";

export default function ProductsScreen() {
  const params = useLocalSearchParams<{
    category?: string;
    subCategory?: string;
    search?: string;
  }>();

  const { viewMode, toggleViewMode } = useViewStore();
  const {
    sortOption,
    setSortOption,
    activeFilters,
    handleFilterChange,
    processedProducts,
    currentPage,
    setCurrentPage,
    totalPages,
    displayedProducts,
  } = useProductFiltering({
    initialCategory: params.category,
    initialSubCategory: params.subCategory,
    searchQuery: params.search,
  });

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} variant={viewMode} />
  );

  const ItemSeparator = () => <View style={{ height: 20 }} />;

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <AppHeader />
      
      <SearchResultHeader query={params.search} />

      <FlatList
        key={viewMode === "grid" ? "grid-view" : "other-view"}
        data={displayedProducts}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(item) => item.id}
        numColumns={viewMode === "grid" ? 2 : 1}
        contentContainerStyle={[
          styles.listContent,
          { paddingHorizontal: 20, paddingBottom: 60 }
        ]}
        columnWrapperStyle={viewMode === "grid" ? styles.columnWrapper : null}
        ListHeaderComponent={
          <ProductHeader
            count={processedProducts.length}
            searchQuery={params.search}
            title={params.category || params.subCategory}
            viewMode={viewMode}
            onViewChange={toggleViewMode}
            activeChips={activeFilters.filter(f => f !== "All")}
            onChipRemove={handleFilterChange}
            sortOption={sortOption}
            onSortChange={setSortOption}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />
        }
        ListFooterComponent={
          <>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
            <AppFooter />
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found.</Text>
            <TouchableOpacity onPress={() => handleFilterChange("All")}>
              <Text style={styles.resetText}>Show All Products</Text>
            </TouchableOpacity>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  listContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 40,
    gap: 15,
  },
  pageNumbers: {
    flexDirection: "row",
    gap: 8,
  },
  pageButton: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.grey[100],
  },
  activePageButton: {
    backgroundColor: Theme.colors.primary,
  },
  pageText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.secondary,
  },
  activePageText: {
    color: Theme.colors.white,
  },
  pageArrow: {
    padding: 10,
  },
  emptyContainer: {
    padding: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.grey[500],
    marginBottom: 20,
  },
  resetText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.accent,
    textDecorationLine: "underline",
  },
});
