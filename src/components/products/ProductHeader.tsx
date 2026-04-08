import { Theme } from "@/src/constants/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ProductHeaderProps {
  count: number;
  onViewChange: () => void;
  viewMode: "grid" | "list" | "large";
}

export default function ProductHeader({ count, onViewChange, viewMode }: ProductHeaderProps) {
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
          <TouchableOpacity style={styles.sortPill}>
            <Text style={styles.sortText}>{`New`}</Text>
            <Ionicons name="chevron-down" size={14} color={Theme.colors.grey[500]} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.iconButton} onPress={onViewChange}>
            <Ionicons name={getViewIcon()} size={24} color={Theme.colors.primary} />
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.iconButton, styles.filterButton]}>
            <Ionicons name="filter-outline" size={24} color="#DD8560" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.chipsContainer}
      >
        <TouchableOpacity style={styles.chip}>
          <Text style={styles.chipText}>{`Women`}</Text>
          <Ionicons name="close" size={16} color={Theme.colors.grey[500]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.chip}>
          <Text style={styles.chipText}>{`All apparel`}</Text>
          <Ionicons name="close" size={16} color={Theme.colors.grey[500]} />
        </TouchableOpacity>
      </ScrollView>
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
});
