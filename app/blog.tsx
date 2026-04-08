import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Theme } from "@/src/constants/theme";
import CategoryFilter from "@/src/components/blog/CategoryFilter";
import BlogCard from "@/src/components/blog/BlogCard";
import { BLOG_CATEGORIES, DUMMY_BLOG_POSTS } from "@/src/data/dummyBlogData";
import AppFooter from "@/src/components/ui/AppFooter";
import AppHeader from "@/src/components/ui/AppHeader";
import CartMenu from "@/src/components/common/CartMenu";

export default function BlogScreen() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredPosts = activeCategory 
    ? DUMMY_BLOG_POSTS.filter(post => post.category === activeCategory)
    : DUMMY_BLOG_POSTS;

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <FlatList
        data={filteredPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BlogCard post={item} />}
        ListHeaderComponent={
          <>
            <AppHeader />
            <View style={styles.titleSection}>
              <Text style={styles.titleText}>{`BLOG`}</Text>
            </View>
            <CategoryFilter
              categories={BLOG_CATEGORIES}
              activeCategory={activeCategory}
              onSelectCategory={(cat) => setActiveCategory(activeCategory === cat ? null : cat)}
            />
          </>
        }
        ListFooterComponent={<AppFooter />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      />
      <CartMenu />
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
  scrollContent: {
    flexGrow: 1,
  },
});
