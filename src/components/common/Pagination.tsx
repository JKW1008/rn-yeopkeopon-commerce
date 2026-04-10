import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "@/src/constants/theme";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const half = 2;
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(start + 4, totalPages);

    if (end === totalPages) {
      start = Math.max(end - 4, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
  };

  const pages = getVisiblePages();

  return (
    <View style={styles.paginationContainer}>
      {currentPage > 1 && (
        <TouchableOpacity
          style={styles.pageArrow}
          onPress={() => onPageChange(Math.max(1, currentPage - 1))}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={Theme.colors.primary}
          />
        </TouchableOpacity>
      )}

      <View style={styles.pageNumbers}>
        {pages.map((p) => (
          <TouchableOpacity
            key={p}
            style={[
              styles.pageButton,
              currentPage === p && styles.activePageButton,
            ]}
            onPress={() => onPageChange(p)}
          >
            <Text
              style={[
                styles.pageText,
                currentPage === p && styles.activePageText,
              ]}
            >
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {currentPage < totalPages && (
        <TouchableOpacity
          style={styles.pageArrow}
          onPress={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        >
          <Ionicons
            name="chevron-forward"
            size={20}
            color={Theme.colors.primary}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 40,
    gap: 15,
    width: "100%",
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
    backgroundColor: Theme.colors.grey[50],
    borderWidth: 1,
    borderColor: Theme.colors.grey[100],
  },
  activePageButton: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
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
    justifyContent: "center",
    alignItems: "center",
  },
});
