import { Theme } from "@/src/constants/theme";
import { BlogPost } from "@/src/data/dummyBlogData";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface BlogCardProps {
  post: BlogPost;
}

function getRelativeDate(dateString: string) {
  const [year, month, day] = dateString.split(".").map(Number);
  const postDate = new Date(year, month - 1, day);
  const today = new Date(2026, 3, 8);

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

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={{ uri: post.imageUrl }} style={styles.image} />
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.9)"]}
          style={styles.gradient}
        >
          <Text style={styles.title} numberOfLines={2}>{`${post.title}`}</Text>
        </LinearGradient>
      </View>

      <View style={styles.metaContainer}>
        <View style={styles.tagsWrapper}>
          {post.tags
            .slice(0, post.tags.join("").length > 15 ? 2 : 3)
            .map((tag, index) => (
              <View key={index} style={styles.tagBadge}>
                <Text style={styles.tagText}>{`${tag}`}</Text>
              </View>
            ))}
        </View>
        <Text
          style={styles.dateText}
        >{`${getRelativeDate(post.updatedAt)}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 35,
    paddingHorizontal: 20,
  },
  imageWrapper: {
    width: "100%",
    height: 220,
    // borderRadius: 12,
    overflow: "hidden",
    backgroundColor: Theme.colors.grey[100],
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
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
    fontWeight: "600",
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
    flex: 1,
    marginRight: 15,
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
    fontSize: 13,
    color: Theme.colors.secondary,
    letterSpacing: 0.5,
  },
  ellipsis: {
    color: Theme.colors.grey[400],
    fontSize: 16,
    marginLeft: -4,
  },
  dateText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 13,
    color: Theme.colors.grey[400],
  },
});
