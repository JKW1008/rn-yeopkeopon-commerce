import { Theme } from "@/src/constants/theme";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <TouchableOpacity
              key={category}
              style={[styles.categoryBtn, isActive && styles.activeBtn]}
              onPress={() => onSelectCategory(category)}
            >
              <Text
                style={[styles.categoryText, isActive && styles.activeText]}
              >{`${category}`}</Text>
              {isActive && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingLeft: 12,
    paddingRight: 20,
    gap: 12,
  },
  categoryBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 25,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
    justifyContent: "center",
  },
  activeBtn: {
    backgroundColor: Theme.colors.primary,
  },
  categoryText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 14,
    color: Theme.colors.secondary,
    letterSpacing: 0.5,
  },
  activeText: {
    color: "#fff",
    fontWeight: "600",
  },
  activeDot: {
    display: "none",
  },
});
