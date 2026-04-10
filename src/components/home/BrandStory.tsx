import { Theme } from "@/src/constants/theme";
import { ms, scale, vs } from "@/src/utils/responsive";
import { Images } from "@/src/constants/theme/images";
import { Image, StyleSheet, Text, View } from "react-native";

const HASHTAGS = [
  "#2021",
  "#spring",
  "#collection",
  "#fall",
  "#dress",
  "#autumncollection",
  "#openfashion",
];

const FEATURES = [
  {
    id: 1,
    image: Images.home.stickers[1],
    text: "Fast shipping. Free on\norders over $25.",
  },
  {
    id: 2,
    image: Images.home.stickers[2],
    text: "Sustainable process\nfrom start to finish.",
  },
  {
    id: 3,
    image: Images.home.stickers[3],
    text: "Unique designs\nand high-quality materials.",
  },
  {
    id: 4,
    image: Images.home.stickers[4],
    text: "Fast shipping.\nFree on orders over $25.",
  },
];

export default function BrandStory() {
  return (
    <View style={styles.container}>
      <View style={styles.trendingContainer}>
        <Text style={styles.trendingTitle}>@TRENDING</Text>
        <View style={styles.hashtagGrid}>
          {HASHTAGS.map((tag, index) => (
            <View key={index} style={styles.hashtagBadge}>
              <Text style={styles.hashtagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.storyContainer}>
        <Image
          source={Images.header.logo}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.storyText}>
          Making a luxurious lifestyle accessible{"\n"}for a generous group of
          women is our{"\n"}daily drive.
        </Text>
        <View style={styles.dividerWrapper}>
          <Image
            source={Images.home.titleUnderline}
            style={{ width: scale(120), height: vs(15) }}
            resizeMode="contain"
          />
        </View>

        <View style={styles.featuresGrid}>
          {FEATURES.map((feature) => (
            <View key={feature.id} style={styles.featureItem}>
              <Image
                source={feature.image}
                style={styles.featureIcon}
                resizeMode="contain"
              />
              <Text style={styles.featureText}>{feature.text}</Text>
            </View>
          ))}
        </View>
        <View style={styles.penLineContainer}>
          <Image
            source={Images.home.stickers.penLine}
            style={styles.penLine}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: vs(30),
    alignItems: "center",
  },
  trendingContainer: {
    alignItems: "center",
    marginBottom: vs(40),
    paddingHorizontal: scale(20),
  },
  trendingTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h3,
    color: Theme.colors.primary,
    letterSpacing: Theme.typography.letterSpacing.luxury,
    marginBottom: vs(24),
  },
  hashtagGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: scale(10),
  },
  hashtagBadge: {
    backgroundColor: Theme.colors.grey[50] || "#f8f8f8",
    paddingVertical: vs(10),
    paddingHorizontal: scale(12),
    borderRadius: scale(30),
  },
  hashtagText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.secondary,
  },
  storyContainer: {
    alignItems: "center",
    backgroundColor: Theme.colors.grey[100] || "#f3f3f3",
    paddingTop: vs(30),
    paddingHorizontal: scale(10),
    width: "100%",
  },
  logo: {
    width: scale(140),
    height: vs(40),
    marginBottom: vs(20),
    tintColor: Theme.colors.primary,
  },
  storyText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.secondary,
    textAlign: "center",
    lineHeight: vs(24),
    marginBottom: vs(10),
  },
  dividerWrapper: {
    alignItems: "center",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
    rowGap: 10,
  },
  featureItem: {
    width: "50%",
    alignItems: "center",
  },
  featureIcon: {
    width: scale(60),
    height: scale(60),
    marginBottom: vs(6),
    tintColor: Theme.colors.primary,
  },
  featureText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.secondary,
    textAlign: "center",
    lineHeight: vs(18),
  },
  penLineContainer: {
    backgroundColor: Theme.colors.grey[100],
    paddingTop: vs(10),
    alignItems: "center",
  },
  penLine: {
    width: scale(80),
    tintColor: Theme.colors.primary,
  },
});
