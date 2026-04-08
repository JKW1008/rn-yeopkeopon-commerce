import { Theme } from "@/src/constants/theme";
import { PRODUCT_CATEGORIES } from "@/src/data/dummyProductData";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type SortOption = "New" | "Price: Low to High" | "Price: High to Low" | "Rating";

interface ProductHeaderProps {
  count: number;
  onViewChange: () => void;
  viewMode: "grid" | "list" | "large";
  activeChips?: string[];
  onChipRemove?: (chip: string) => void;
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  activeFilter: string;
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
  onViewChange,
  viewMode,
  activeChips = [],
  onChipRemove,
  sortOption,
  onSortChange,
  activeFilter,
  onFilterChange,
}: ProductHeaderProps) {
  const [showSortModal, setShowSortModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const getViewIcon = () => {
    switch (viewMode) {
      case "grid": return "grid-outline";
      case "list": return "list-outline";
      case "large": return "square-outline";
      default: return "grid-outline";
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.countText}>{`${count} APPAREL`}</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.sortPill}
            onPress={() => setShowSortModal(true)}
          >
            <Text style={styles.sortText}>{sortOption.split(":")[0]}</Text>
            <Ionicons name="chevron-down" size={14} color={Theme.colors.grey[500]} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={onViewChange}>
            <Ionicons name={getViewIcon()} size={24} color={Theme.colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.iconButton, styles.filterButton]}
            onPress={() => setShowFilterModal(true)}
          >
            <Ionicons name="filter-outline" size={24} color="#DD8560" />
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
                  <Ionicons name="checkmark" size={16} color={Theme.colors.primary} />
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
          <View style={styles.filterSheet} onStartShouldSetResponder={() => true}>
            <View style={styles.filterHandle} />
            <Text style={styles.filterTitle}>{`FILTER BY CATEGORY`}</Text>
            <View style={styles.filterGrid}>
              {PRODUCT_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.filterChip,
                    activeFilter === cat && styles.filterChipActive,
                  ]}
                  onPress={() => {
                    onFilterChange(cat);
                    setShowFilterModal(false);
                  }}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      activeFilter === cat && styles.filterChipTextActive,
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
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 15,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 50,
  },
  countText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 16,
    color: Theme.colors.primary,
    letterSpacing: 1,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sortPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  sortText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 14,
    color: Theme.colors.primary,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F9F9F9",
    justifyContent: "center",
    alignItems: "center",
  },
  filterButton: {
    backgroundColor: "#FCF6F3",
  },
  filterButtonActive: {
    backgroundColor: "#F5E6DD",
    borderWidth: 1,
    borderColor: "#DD8560",
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
    borderColor: "#F0F0F0",
    gap: 6,
  },
  chipText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 14,
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
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 12,
    minWidth: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 8,
  },
  sortModalTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 12,
    color: Theme.colors.grey[400],
    letterSpacing: 2,
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
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
    fontSize: 14,
    color: Theme.colors.secondary,
  },
  sortOptionActive: {
    color: Theme.colors.primary,
    fontWeight: "600",
  },
  filterOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  filterSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
  },
  filterHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 20,
  },
  filterTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 18,
    letterSpacing: 2,
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
    borderColor: "#E0E0E0",
  },
  filterChipActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  filterChipText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 14,
    color: Theme.colors.secondary,
  },
  filterChipTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
});
