import { Theme } from "@/src/constants/theme";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface RecentSearchesProps {
  searches: string[];
  onSelect: (term: string) => void;
  onRemove: (term: string) => void;
}

export default function RecentSearches({
  searches,
  onSelect,
  onRemove,
}: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent search</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipContainer}
      >
        {searches.map((term, index) => (
          <View key={index} style={styles.chip}>
            <TouchableOpacity onPress={() => onSelect(term)}>
              <Text style={styles.chipText}>{term}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onRemove(term)}
              style={styles.removeButton}
            >
              <AntDesign
                name="close"
                size={14}
                color={Theme.colors.grey[400]}
              />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.secondary,
    marginBottom: 15,
  },
  chipContainer: {
    gap: 10,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.grey[50], // Very light background as in reference
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  chipText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.secondary,
  },
  removeButton: {
    marginLeft: 4,
  },
});
