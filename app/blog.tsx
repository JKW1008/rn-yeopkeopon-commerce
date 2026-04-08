import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BlogCard from "@/src/components/blog/BlogCard";
import CategoryFilter from "@/src/components/blog/CategoryFilter";
import LayoutSwitcher from "@/src/components/blog/LayoutSwitcher";
import AppFooter from "@/src/components/ui/AppFooter";
import AppHeader from "@/src/components/ui/AppHeader";
import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { BLOG_CATEGORIES, DUMMY_BLOG_POSTS } from "@/src/data/dummyBlogData";
import { Ionicons } from "@expo/vector-icons";

export default function BlogScreen() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"large" | "small">("large");
  const [visibleCount, setVisibleCount] = useState(3);

  const allFilteredPosts =
    activeCategory === "All" || !activeCategory
      ? DUMMY_BLOG_POSTS
      : DUMMY_BLOG_POSTS.filter((post) => post.category === activeCategory);

  const displayedPosts = allFilteredPosts.slice(0, visibleCount);

  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(3);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

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
              <Image
                source={Images.home.titleUnderline}
                style={{ width: 150, height: 15 }}
                resizeMode="contain"
              />
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
            {visibleCount < allFilteredPosts.length && (
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
    backgroundColor: "#fff",
  },
  titleSection: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 15,
  },
  titleText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 24,
    color: Theme.colors.primary,
    letterSpacing: 4,
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
    letterSpacing: 1,
    fontWeight: "600",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 0,
  },
});
