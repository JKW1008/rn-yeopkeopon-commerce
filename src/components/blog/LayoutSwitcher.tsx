import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@/src/constants/theme";

interface LayoutSwitcherProps {
  viewMode: "large" | "small";
  onViewModeChange: (mode: "large" | "small") => void;
}

export default function LayoutSwitcher({
  viewMode,
  onViewModeChange,
}: LayoutSwitcherProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => onViewModeChange(viewMode === "large" ? "small" : "large")}
        activeOpacity={0.7}
      >
        <Ionicons
          name={viewMode === "large" ? "reorder-four-outline" : "square-outline"}
          size={20}
          color={Theme.colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    justifyContent: "center",
  },
  toggleButton: {
    backgroundColor: Theme.colors.grey[100],
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
