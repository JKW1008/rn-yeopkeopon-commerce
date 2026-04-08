import { Theme } from "@/src/constants/theme";
import { DUMMY_BLOG_POSTS } from "@/src/data/dummyBlogData";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BlogCard from "@/src/components/blog/BlogCard";

const { width } = Dimensions.get("window");

export default function BlogDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const post = DUMMY_BLOG_POSTS.find((p) => p.id === id);

  if (!post) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{`Post not found`}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>{`Go Back`}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const relatedPosts = DUMMY_BLOG_POSTS.filter(
    (p) => p.category === post.category && p.id !== post.id
  ).slice(0, 3);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles.heroContainer}>
          <Image source={{ uri: post.imageUrl }} style={styles.heroImage} />
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.metaRow}>
            <Text style={styles.category}>{`${post.category}`}</Text>
            <Text style={styles.date}>{`${post.updatedAt}`}</Text>
          </View>

          <Text style={styles.title}>{`${post.title}`}</Text>

          <View style={styles.tagsContainer}>
            {post.tags.map((tag, index) => (
              <Text key={index} style={styles.tag}>{`${tag}`}</Text>
            ))}
          </View>

          <View style={styles.divider} />

          <Text style={styles.content}>{`${post.content}`}</Text>

          {relatedPosts.length > 0 && (
            <View style={styles.relatedSection}>
              <Text style={styles.relatedTitle}>{`RELATED POSTS`}</Text>
              {relatedPosts.map((item) => (
                <BlogCard key={item.id} post={item} viewMode="small" />
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heroContainer: {
    width: width,
    height: 450,
    position: "relative",
  },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    padding: 24,
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  category: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 14,
    color: Theme.colors.primary,
    fontWeight: "700",
    letterSpacing: 1,
  },
  date: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 13,
    color: Theme.colors.grey[400],
  },
  title: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 26,
    color: Theme.colors.primary,
    fontWeight: "700",
    lineHeight: 34,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 24,
  },
  tag: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 13,
    color: Theme.colors.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.colors.grey[100],
    marginBottom: 24,
  },
  content: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 16,
    color: Theme.colors.primary,
    lineHeight: 28,
    marginBottom: 20,
  },
  relatedSection: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.grey[100],
    paddingTop: 30,
  },
  relatedTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 18,
    color: Theme.colors.primary,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 25,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: 16,
    color: Theme.colors.grey[500],
    marginBottom: 10,
  },
  backLink: {
    color: Theme.colors.primary,
    fontWeight: "600",
  },
});
