import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BlogCard from "@/src/components/blog/BlogCard";
import CategoryFilter from "@/src/components/blog/CategoryFilter";
import LayoutSwitcher from "@/src/components/blog/LayoutSwitcher";
import TitleUnderline from "@/src/components/common/TitleUnderline";
import AppFooter from "@/src/components/ui/AppFooter";
import AppHeader from "@/src/components/ui/AppHeader";
import { Theme } from "@/src/constants/theme";
import { BLOG_CATEGORIES } from "@/src/data/dummyBlogData";
import { useBlogPostFiltering } from "@/src/hooks/useBlogPostFiltering";
import { Ionicons } from "@expo/vector-icons";

export default function BlogScreen() {
  const [viewMode, setViewMode] = useState<"large" | "small">("large");
  const {
    activeCategory,
    displayedPosts,
    hasMore,
    handleSelectCategory,
    handleLoadMore,
  } = useBlogPostFiltering();

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FlatList
        data={displayedPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BlogCard post={item} viewMode={viewMode} />}
        ListHeaderComponent={
          <>
            <AppHeader />
            <View style={styles.titleSection}>
              <Text style={styles.titleText}>BLOG</Text>
              <TitleUnderline />
            </View>
            <View style={styles.filterBar}>
              <LayoutSwitcher
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
              <View style={styles.filterWrapper}>
                <CategoryFilter
                  categories={BLOG_CATEGORIES}
                  activeCategory={activeCategory}
                  onSelectCategory={handleSelectCategory}
                />
              </View>
            </View>
          </>
        }
        ListFooterComponent={
          <>
            {hasMore && (
              <TouchableOpacity
                style={styles.loadMoreButton}
                onPress={handleLoadMore}
                activeOpacity={0.7}
              >
                <Text style={styles.loadMoreText}>{`LOAD MORE`}</Text>
                <Ionicons
                  name="add-outline"
                  size={24}
                  color={Theme.colors.secondary}
                />
              </TouchableOpacity>
            )}
            <AppFooter />
          </>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  titleSection: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 15,
  },
  titleText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h2,
    color: Theme.colors.primary,
    letterSpacing: Theme.typography.letterSpacing.extraWide,
    fontWeight: "600",
  },
  filterBar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  filterWrapper: {
    flex: 1,
  },
  loadMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: Theme.colors.grey[300],
    alignSelf: "center",
    marginTop: 30,
    marginBottom: 20,
    gap: 10,
  },
  loadMoreText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.primary,
    letterSpacing: Theme.typography.letterSpacing.wide,
    fontWeight: "600",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 0,
  },
});
