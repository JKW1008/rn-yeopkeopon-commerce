import { Theme } from "@/src/constants/theme";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PopularSearchTermsProps {
  terms: string[];
  onSelect: (term: string) => void;
}

export default function PopularSearchTerms({
  terms,
  onSelect,
}: PopularSearchTermsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Popular search terms</Text>
      <View style={styles.list}>
        {terms.map((term, index) => (
          <TouchableOpacity
            key={index}
            style={styles.termButton}
            onPress={() => onSelect(term)}
          >
            <Text style={styles.termText}>{term}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  list: {
    gap: 15,
  },
  termButton: {
    paddingVertical: 5,
  },
  termText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
    color: Theme.colors.primary,
    letterSpacing: Theme.typography.letterSpacing.normal,
  },
});
