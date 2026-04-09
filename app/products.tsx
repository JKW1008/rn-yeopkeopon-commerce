import { DUMMY_PRODUCTS } from "@/src/data/dummyProductData";
import React, { useState, useMemo, useEffect } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import AppHeader from "@/src/components/ui/AppHeader";
import AppFooter from "@/src/components/ui/AppFooter";
import ProductHeader, { SortOption } from "@/src/components/products/ProductHeader";
import ProductCard from "@/src/components/products/ProductCard";
import { Theme } from "@/src/constants/theme";
import { useViewStore } from "@/src/store/useViewStore";
import { Ionicons } from "@expo/vector-icons";

const PAGE_SIZE = 10;

const CATEGORY_MAP: Record<string, string[]> = {
  "Apparel": ["Outer", "Dress", "Knitwear"],
  "New": [], // New는 현재 모든 상품 노출
  "Bag": ["Bag"],
  "Shoes": ["Shoes"],
  "Accessories": ["Accessories"],
  "Beauty": [],
};

export default function ProductsScreen() {
  const params = useLocalSearchParams<{
    category?: string;
    subCategory?: string;
  }>();

  const { viewMode, toggleViewMode } = useViewStore();
  const [sortOption, setSortOption] = useState<SortOption>("New");
  
  const [activeFilter, setActiveFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [chips, setChips] = useState<string[]>([]);

  // 초기 파라미터 및 변경 시 상태 동기화 로직 강화
  useEffect(() => {
    const filterFromParams = params.subCategory || params.category || "All";
    
    // 해당 필터에 실제 데이터가 있는지 체크 (사용자 요청: 없으면 "All"로 처리)
    const hasData = DUMMY_PRODUCTS.some(p => {
      if (filterFromParams === "All") return true;
      if (filterFromParams === "Apparel") return CATEGORY_MAP["Apparel"].includes(p.category);
      if (filterFromParams === "New" || filterFromParams === "Beauty") return true;
      return p.category === filterFromParams;
    });

    const finalFilter = hasData ? filterFromParams : "All";

    setActiveFilter(finalFilter);
    setCurrentPage(1);
    
    const newChips: string[] = [];
    if (params.category && params.category !== "All") newChips.push(params.category);
    if (params.subCategory && params.subCategory !== "All") newChips.push(params.subCategory);
    
    // 만약 데이터가 없어서 All로 강제 전환된 경우라면 칩을 비움
    if (!hasData) {
      setChips([]);
    } else {
      setChips(newChips);
    }
  }, [params.category, params.subCategory]);

  // toggleViewMode는 이제 store에서 가져옴
  // const toggleViewMode = () => { ... };

  const handleChipRemove = (chip: string) => {
    const updatedChips = chips.filter((c) => c !== chip);
    setChips(updatedChips);
    // 칩이 하나도 없으면 무조건 "All"로 리셋
    if (updatedChips.length === 0) {
      setActiveFilter("All");
    } else {
      // 남은 칩이 있으면 마지막 칩을 필터로 설정 (단순화)
      setActiveFilter(updatedChips[updatedChips.length - 1]);
    }
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setCurrentPage(1);
    // 필터 변경 시 칩도 동기화
    if (filter === "All") {
      setChips([]);
    } else {
      setChips([filter]);
    }
  };

  const processedProducts = useMemo(() => {
    let result = DUMMY_PRODUCTS.filter((p) => {
      // All 또는 빈 값인 경우 모든 제품 반환
      if (!activeFilter || activeFilter === "All") return true;

      // Apparel 또는 New 그룹 처리
      if (activeFilter === "Apparel") {
        return CATEGORY_MAP["Apparel"].includes(p.category);
      }
      if (activeFilter === "New" || CATEGORY_MAP["New"].includes(activeFilter)) {
        return true; // New 관련 필터는 현재 모든 상품 노출
      }
      
      return p.category === activeFilter;
    });

    result = [...result].sort((a, b) => {
      switch (sortOption) {
        case "Price: Low to High": return a.price - b.price;
        case "Price: High to Low": return b.price - a.price;
        case "Rating": return b.rating - a.rating;
        default: return 0;
      }
    });

    return result;
  }, [activeFilter, sortOption]);

  const totalPages = Math.ceil(processedProducts.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const displayedProducts = processedProducts.slice(startIndex, startIndex + PAGE_SIZE);

  const renderItem = ({ item }: { item: typeof DUMMY_PRODUCTS[0] }) => (
    <ProductCard product={item} variant={viewMode} />
  );

  const Pagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity 
          style={styles.pageArrow} 
          disabled={currentPage === 1}
          onPress={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        >
          <Ionicons name="chevron-back" size={20} color={currentPage === 1 ? Theme.colors.grey[300] : "#000"} />
        </TouchableOpacity>

        <View style={styles.pageNumbers}>
          {pages.map((p) => (
            <TouchableOpacity 
              key={p} 
              style={[styles.pageButton, currentPage === p && styles.activePageButton]}
              onPress={() => setCurrentPage(p)}
            >
              <Text style={[styles.pageText, currentPage === p && styles.activePageText]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.pageArrow} 
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
        >
          <Ionicons name="chevron-forward" size={20} color={currentPage === totalPages ? Theme.colors.grey[300] : "#000"} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <AppHeader showBack={true} />
      <FlatList
        key={viewMode === "grid" ? "grid-view" : "other-view"}
        data={displayedProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={viewMode === "grid" ? 2 : 1}
        contentContainerStyle={[
          styles.listContent,
          viewMode !== "grid" && { paddingHorizontal: 20 }
        ]}
        columnWrapperStyle={viewMode === "grid" ? styles.columnWrapper : null}
        ListHeaderComponent={
          <ProductHeader
            count={processedProducts.length}
            viewMode={viewMode}
            onViewChange={toggleViewMode}
            activeChips={chips}
            onChipRemove={handleChipRemove}
            sortOption={sortOption}
            onSortChange={setSortOption}
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />
        }
        ListFooterComponent={
          <>
            <Pagination />
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
    backgroundColor: "#fff",
  },
  listContent: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  columnWrapper: {
    justifyContent: "space-between",
    paddingHorizontal: 20,
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
    backgroundColor: "#F0F0F0",
  },
  activePageButton: {
    backgroundColor: "#000",
  },
  pageText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 14,
    color: "#555",
  },
  activePageText: {
    color: "#fff",
    fontWeight: "600",
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
    fontSize: 16,
    color: Theme.colors.grey[500],
    marginBottom: 20,
  },
  resetText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 14,
    color: "#DD8560",
    textDecorationLine: "underline",
  },
});
