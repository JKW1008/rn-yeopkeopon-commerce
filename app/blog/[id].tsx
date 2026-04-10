import { Theme } from "@/src/constants/theme";
import { supabaseService } from "@/src/api/supabaseService";
import { DbBlogPost } from "@/src/types/database";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "@/src/components/ui/AppHeader";
import AppFooter from "@/src/components/ui/AppFooter";

const { width } = Dimensions.get("window");

export default function BlogDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [post, setPost] = useState<DbBlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const blogId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    if (!blogId) return;
    supabaseService.getBlogPostDetail(blogId)
      .then(setPost)
      .catch(() => setError("Post not found"))
      .finally(() => setLoading(false));
  }, [blogId]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    setActiveImageIndex(Math.round(index));
  };

  const renderRichText = useCallback((text: string) => {
    const highlights = ["Saint Laurent canvas handbag", "Fendi bucket bag", "DeMellier off white bag"];
    let parts: (string | React.ReactElement)[] = [text];

    highlights.forEach(highlight => {
      let nextParts: (string | React.ReactElement)[] = [];
      parts.forEach(part => {
        if (typeof part === "string") {
          const splitPart = part.split(highlight);
          for (let i = 0; i < splitPart.length; i++) {
            nextParts.push(splitPart[i]);
            if (i < splitPart.length - 1) {
              nextParts.push(<Text key={`${highlight}-${i}`} style={styles.highlight}>{highlight}</Text>);
            }
          }
        } else {
          nextParts.push(part);
        }
      });
      parts = nextParts;
    });

    return parts;
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </SafeAreaView>
    );
  }

  if (error || !post) {
    return (
      <SafeAreaView style={styles.errorContainer}>
        <Text style={styles.errorText}>{error ?? "Post not found"}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>{`Go Back`}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const sections = post.blog_sections ?? [];

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <AppHeader showBack={true} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.articleBody}>
          <Image source={{ uri: post.image_url ?? undefined }} style={styles.mainImage} />

          <View style={styles.contentSection}>
            <Text style={styles.title}>{post.title.toUpperCase()}</Text>

            {sections.map((section, index) => {
              if (section.type === "image") {
                if (section.images && section.images.length > 1) {
                  return (
                    <View key={`carousel-${index}`} style={styles.carouselContainer}>
                      <FlatList
                        data={section.images}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleScroll}
                        keyExtractor={(_, i) => `img-${i}`}
                        renderItem={({ item }) => (
                          <Image source={{ uri: item }} style={styles.carouselItem} />
                        )}
                      />
                      <View style={styles.pagination}>
                        {section.images.map((_, i) => (
                          <View
                            key={i}
                            style={[
                              styles.dot,
                              activeImageIndex === i && styles.activeDot
                            ]}
                          />
                        ))}
                      </View>
                    </View>
                  );
                }
                return (
                  <Image
                    key={`img-${index}`}
                    source={{ uri: section.value ?? undefined }}
                    style={styles.sectionImage}
                  />
                );
              }
              return (
                <Text key={`txt-${index}`} style={styles.sectionText}>
                  {renderRichText(section.value ?? "")}
                </Text>
              );
            })}

            <View style={styles.articleFooter}>
              <Text style={styles.postedBy}>{`Posted by OpenFashion | ${post.updated_at}`}</Text>
              <View style={styles.footerTags}>
                {post.tags.map((tag, index) => (
                  <View key={index} style={styles.tagPill}>
                    <Text style={styles.footerTag}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
        <AppFooter />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  scrollContent: {
    flexGrow: 1,
  },
  articleBody: {
    paddingBottom: 20,
  },
  mainImage: {
    width: width,
    height: 450,
    resizeMode: "cover",
  },
  contentSection: {
    padding: 20,
  },
  title: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
    color: Theme.colors.primary,
    lineHeight: Theme.typography.lineHeight.fixed28,
    marginBottom: 24,
    letterSpacing: Theme.typography.letterSpacing.wide,
  },
  sectionText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.primary,
    lineHeight: Theme.typography.lineHeight.fixed26,
    marginBottom: 30,
  },
  highlight: {
    color: "#DD8560",
  },
  sectionImage: {
    width: width - 40,
    height: 480,
    marginBottom: 20,
    resizeMode: "cover",
  },
  carouselContainer: {
    marginBottom: 30,
  },
  carouselItem: {
    width: width - 40,
    height: 480,
    resizeMode: "cover",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderWidth: 1,
    borderColor: "#888",
    transform: [{ rotate: "45deg" }],
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#888",
  },
  articleFooter: {
    marginTop: 20,
    marginBottom: 10,
  },
  postedBy: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.primary,
    marginBottom: 16,
  },
  footerTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  tagPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    backgroundColor: "#fff",
  },
  footerTag: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.secondary,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.grey[500],
    marginBottom: 10,
  },
  backLink: {
    color: Theme.colors.primary,
  },
});
