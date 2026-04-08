import { Theme } from "@/src/constants/theme";
import { BANNER_DATA } from "@/src/data/dummyCarusel";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = width;
const ITEM_HEIGHT = width * 1.6;

export default function HeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setActiveIndex(viewableItems[0].index ?? 0);
      }
    },
  ).current;
  return (
    <View style={styles.container}>
      <FlatList
        data={BANNER_DATA}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={styles.overlay}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button} activeOpacity={0.8}>
              <Text style={styles.buttonText}>EXPLORE COLLECTION</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* 마름모 인디케이터 */}
      <View style={styles.indicatorContainer}>
        {BANNER_DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.diamond,
              activeIndex === index
                ? styles.diamondActive
                : styles.diamondInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  slide: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
  },
  title: {
    fontFamily: Theme.typography.fontFamily.boldHero,
    fontSize: 48,
    fontWeight: "bold",
    color: "rgba(0, 0, 0, 0.7)",
    textAlign: "left",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    fontStyle: "italic",
    lineHeight: 62,
    letterSpacing: -1,
    marginBottom: 24,
    textTransform: "uppercase",
  },
  button: {
    backgroundColor: "rgba(50, 50, 50, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 40,
    position: "absolute",
    alignSelf: "center",
    bottom: 60,
  },
  buttonText: {
    fontFamily: Theme.typography.fontFamily.main,
    color: "#fff",
    fontSize: Theme.typography.fontSize.md,
    letterSpacing: Theme.typography.letterSpacing.wide,
    fontWeight: "500",
  },
  indicatorContainer: {
    position: "absolute",
    bottom: 25,
    flexDirection: "row",
    alignSelf: "center",
    gap: 12,
  },
  diamond: {
    width: 8,
    height: 8,
    transform: [{ rotate: "45deg" }],
  },
  diamondActive: {
    backgroundColor: "#FFFFFF",
  },
  diamondInactive: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FFFFFF",
  },
});
