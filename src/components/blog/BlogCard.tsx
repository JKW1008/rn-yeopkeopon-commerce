import { Theme } from "@/src/constants/theme";
import { BlogPost } from "@/src/api/types";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";

interface BlogCardProps {
  post: BlogPost;
  viewMode?: "large" | "small";
}

function getRelativeDate(dateString: string) {
  const postDate = new Date(dateString);
  const today = new Date();

  const diffTime = today.getTime() - postDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "1 day ago";
  if (diffDays < 30) return `${diffDays} days ago`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12)
    return `${diffMonths} ${diffMonths === 1 ? "month" : "months"} ago`;

  const diffYears = Math.floor(diffDays / 365);
  return `${diffYears} ${diffYears === 1 ? "year" : "years"} ago`;
}

const BlogCard = React.memo(function BlogCard({ post, viewMode = "large" }: BlogCardProps) {
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  const handlePress = () => {
    router.push(`/blog/${post.id}`);
  };

  const renderTags = (limit: number) => (
    <View style={styles.tagsWrapper}>
      {post.tags.slice(0, limit).map((tag, index) => (
        <View key={index} style={styles.tagBadge}>
          <Text style={styles.tagText}>{`${tag}`}</Text>
        </View>
      ))}
    </View>
  );

  const BookmarkButton = () => (
    <TouchableOpacity
      style={styles.bookmarkButton}
      onPress={(e) => {
        e.stopPropagation();
        setIsSaved(!isSaved);
      }}
      activeOpacity={0.7}
    >
      <View style={styles.bookmarkBlur}>
        <Ionicons
          name={isSaved ? "bookmark" : "bookmark-outline"}
          size={20}
          color={isSaved ? Theme.colors.primary : "#fff"}
        />
      </View>
    </TouchableOpacity>
  );

  if (viewMode === "small") {
    return (
      <TouchableOpacity
        style={styles.smallContainer}
        onPress={handlePress}
        activeOpacity={0.9}
      >
        <View style={styles.smallImageWrapper}>
          <Image source={{ uri: post.imageUrl }} style={styles.image} />
          <BookmarkButton />
        </View>
        <View style={styles.smallContent}>
          <Text style={styles.smallTitle} numberOfLines={2}>{`${post.title}`}</Text>
          <Text style={styles.smallDesc} numberOfLines={3}>{`${post.description}`}</Text>
          <View style={styles.smallMeta}>
            <Text style={styles.dateText}>{`${getRelativeDate(post.updatedAt)}`}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.9}
    >
      <View style={styles.imageWrapper}>
        <Image source={{ uri: post.imageUrl }} style={styles.image} />
        <BookmarkButton />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={styles.gradient}
        >
          <Text style={styles.title} numberOfLines={2}>{`${post.title}`}</Text>
        </LinearGradient>
      </View>

      <View style={styles.metaContainer}>
        {renderTags(post.tags.join("").length > 15 ? 2 : 3)}
        <Text style={styles.dateText}>{`${getRelativeDate(post.updatedAt)}`}</Text>
      </View>
    </TouchableOpacity>
  );
});

export default BlogCard;

const styles = StyleSheet.create({
  container: {
    marginBottom: 35,
    paddingHorizontal: 20,
  },
  imageWrapper: {
    width: "100%",
    height: 220,
    overflow: "hidden",
    backgroundColor: Theme.colors.grey[100],
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  bookmarkButton: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
  },
  bookmarkBlur: {
    padding: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "60%",
    justifyContent: "flex-end",
    padding: 20,
  },
  title: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
    color: "#fff",
    lineHeight: 28,
    letterSpacing: 0.5,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  tagsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tagBadge: {
    borderWidth: 1,
    borderColor: Theme.colors.grey[300],
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 12,
    color: Theme.colors.secondary,
    letterSpacing: 0.5,
  },
  dateText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 12,
    color: Theme.colors.grey[400],
  },
  smallContainer: {
    flexDirection: "row",
    marginBottom: 25,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  smallImageWrapper: {
    width: 120,
    height: 160,
    overflow: "hidden",
    backgroundColor: Theme.colors.grey[100],
    position: "relative",
  },
  smallContent: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  smallTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 16,
    color: Theme.colors.primary,
    marginBottom: 6,
    lineHeight: 20,
  },
  smallDesc: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 13,
    color: Theme.colors.grey[500],
    marginBottom: 10,
    lineHeight: 18,
  },
  smallMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
