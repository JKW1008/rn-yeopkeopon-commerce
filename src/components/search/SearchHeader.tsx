import { Theme } from "@/src/constants/theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SearchInput from "./SearchInput";

interface SearchHeaderProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: (query: string) => void;
  onClear: () => void;
}

export default function SearchHeader({
  query,
  setQuery,
  onSearch,
  onClear,
}: SearchHeaderProps) {
  const router = useRouter();
  const { from } = useLocalSearchParams<{ from?: string }>();

  const handleCancel = () => {
    if (from === "products") {
      router.replace("/products");
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.searchHeader}>
      <View style={styles.searchInputContainer}>
        <SearchInput
          value={query}
          onChangeText={setQuery}
          onSubmit={() => onSearch(query)}
          onClear={onClear}
          containerStyle={styles.searchInputCustom}
        />
      </View>
      <TouchableOpacity
        onPress={handleCancel}
        style={styles.cancelButton}
      >
        <Text style={styles.cancelText}>CANCEL</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  searchInputContainer: {
    flex: 1,
  },
  searchInputCustom: {
    paddingRight: 0,
  },
  cancelButton: {
    paddingRight: 20,
    paddingLeft: 10,
  },
  cancelText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.primary,
    letterSpacing: Theme.typography.letterSpacing.wide,
  },
});
