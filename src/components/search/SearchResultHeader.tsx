import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SearchResultHeaderProps {
  query: string;
}

export default function SearchResultHeader({ query }: SearchResultHeaderProps) {
  const router = useRouter();

  if (!query) return null;

  return (
    <View style={styles.searchBreadcrumb}>
      <Text style={styles.breadcrumbText}>{query}</Text>
      <View style={styles.breadcrumbActions}>
        <TouchableOpacity
          onPress={() => router.replace("/products")}
          style={styles.closeButtonCircle}
        >
          <Feather name="x" size={16} color={Theme.colors.secondary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({ pathname: "/search", params: { from: "products" } })}>
          <Image
            source={Images.header.search}
            style={styles.breadcrumbSearchIcon}
            tintColor={Theme.colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBreadcrumb: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 5,
    paddingBottom: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: Theme.colors.secondary,
  },
  breadcrumbText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.secondary,
    letterSpacing: Theme.typography.letterSpacing.wider,
    textTransform: "capitalize",
    flex: 1,
  },
  breadcrumbActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  closeButtonCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Theme.colors.grey[50],
    justifyContent: "center",
    alignItems: "center",
  },
  breadcrumbSearchIcon: {
    width: 20,
    height: 20,
  },
});
