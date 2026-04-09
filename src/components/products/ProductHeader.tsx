import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { PRODUCT_CATEGORIES } from "@/src/data/dummyProductData";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export type SortOption =
  | "New"
  | "Price: Low to High"
  | "Price: High to Low"
  | "Rating";

interface ProductHeaderProps {
  count: number;
  title?: string;
  searchQuery?: string;
  onViewChange: () => void;
  viewMode: "grid" | "list" | "large";
  activeChips?: string[];
  onChipRemove?: (chip: string) => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  activeFilters: string[];
  onFilterChange: (filter: string) => void;
}

const SORT_OPTIONS: SortOption[] = [
  "New",
  "Price: Low to High",
  "Price: High to Low",
  "Rating",
];

export default function ProductHeader({
  count,
  title,
  searchQuery,
  onViewChange,
  viewMode,
  activeChips = [],
  onChipRemove,
  sortOption,
  onSortChange,
  activeFilters,
  onFilterChange,
}: ProductHeaderProps) {
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const headerTitle = searchQuery || title || "APPAREL";

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.countText}>
          {count} {headerTitle.toUpperCase()}
        </Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.sortPill}
            onPress={() => setShowSortModal(true)}
          >
            <Text style={styles.sortText}>{sortOption.split(":")[0]}</Text>
            <Ionicons
              name="chevron-down"
              size={14}
              color={Theme.colors.grey[500]}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={onViewChange}>
            <Image
              source={
                viewMode === "grid"
                  ? Images.productList.gridView
                  : viewMode === "list"
                    ? Images.productList.listView
                    : Images.productList.galleryView
              }
              style={styles.actionIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton, styles.filterButton]}
            onPress={() => setShowFilterModal(true)}
          >
            <View style={styles.filterIconCircle}>
              <Image
                source={Images.productList.filter}
                style={[
                  styles.actionIconSmall,
                  {
                    tintColor: activeFilters.some((f) => f !== "All")
                      ? Theme.colors.accent
                      : Theme.colors.accent, // Matching image color
                  },
                ]}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {activeChips.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsContainer}
        >
          {activeChips.map((chip, index) => (
            <TouchableOpacity
              key={index}
              style={styles.chip}
              onPress={() => onChipRemove?.(chip)}
            >
              <Text style={styles.chipText}>{chip}</Text>
              <Ionicons name="close" size={16} color={Theme.colors.grey[500]} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Sort Modal */}
      <Modal
        visible={showSortModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSortModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSortModal(false)}
        >
          <View style={styles.sortModal}>
            <Text style={styles.sortModalTitle}>{`SORT BY`}</Text>
            {SORT_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.sortOption}
                onPress={() => {
                  onSortChange(option);
                  setShowSortModal(false);
                }}
              >
                <Text
                  style={[
                    styles.sortOptionText,
                    sortOption === option && styles.sortOptionActive,
                  ]}
                >
                  {option}
                </Text>
                {sortOption === option && (
                  <Ionicons
                    name="checkmark"
                    size={16}
                    color={Theme.colors.primary}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Filter Bottom Sheet */}
      <Modal
        visible={showFilterModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <TouchableOpacity
          style={styles.filterOverlay}
          activeOpacity={1}
          onPress={() => setShowFilterModal(false)}
        >
          <View
            style={styles.filterSheet}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.filterHandle} />
            <Text style={styles.filterTitle}>{`FILTER BY CATEGORY`}</Text>
            <View style={styles.filterGrid}>
              {PRODUCT_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.filterChip,
                    activeFilters.includes(cat) && styles.filterChipActive,
                  ]}
                  onPress={() => {
                    onFilterChange(cat);
                  }}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      activeFilters.includes(cat) &&
                        styles.filterChipTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.white,
    paddingTop: 10,
    paddingBottom: 10,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    height: 50,
  },
  countText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.primary,
    letterSpacing: Theme.typography.letterSpacing.wide,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sortPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.surface,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  filterIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  actionIconSmall: {
    width: 22,
    height: 22,
  },
  sortText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.secondary,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  filterButton: {
    backgroundColor: Theme.colors.surface,
  },
  actionIcon: {
    width: 22,
    height: 22,
  },
  filterButtonActive: {
    backgroundColor: "#F5E6DD",
    borderWidth: 1,
    borderColor: Theme.colors.accent,
  },
  chipsContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    gap: 12,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Theme.colors.grey[100],
    gap: 6,
  },
  chipText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: 120,
    paddingRight: 20,
  },
  sortModal: {
    backgroundColor: Theme.colors.white,
    borderRadius: 12,
    paddingVertical: 12,
    minWidth: 200,
    shadowColor: Theme.colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  sortModalTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.grey[400],
    letterSpacing: Theme.typography.letterSpacing.wider,
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.grey[100],
    marginBottom: 4,
  },
  sortOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  sortOptionText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.secondary,
  },
  sortOptionActive: {
    color: Theme.colors.primary,
  },
  filterOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  filterSheet: {
    backgroundColor: Theme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
  },
  filterHandle: {
    width: 40,
    height: 4,
    backgroundColor: Theme.colors.border,
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  filterTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h3,
    letterSpacing: Theme.typography.letterSpacing.wider,
    color: Theme.colors.primary,
    marginBottom: 20,
  },
  filterGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  filterChip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  filterChipActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  filterChipText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.secondary,
  },
  filterChipTextActive: {
    color: Theme.colors.white,
  },
});
