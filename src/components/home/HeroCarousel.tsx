import { Theme } from "@/src/constants/theme";
import { ms, scale, vs } from "@/src/utils/responsive";
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

interface Banner {
  id: string;
  image_url: string;
  title: string;
}

export default function HeroCarousel({ data = [] }: { data: Banner[] }) {
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
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={{ uri: item.image_url }} style={styles.image} />

            <View style={styles.overlay}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>
                  {item.title.replace(/\\n/g, "\n")}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button} activeOpacity={0.8}>
              <Text style={styles.buttonText}>EXPLORE COLLECTION</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.indicatorContainer}>
        {data.map((_, index) => (
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
    fontSize: ms(48),
    color: "rgba(0, 0, 0, 0.7)",
    textAlign: "left",
    alignSelf: "flex-start",
    paddingHorizontal: scale(20),
    lineHeight: vs(62),
    letterSpacing: -1,
    marginBottom: vs(24),
    textTransform: "uppercase",
  },
  button: {
    backgroundColor: "rgba(50, 50, 50, 0.7)",
    paddingHorizontal: scale(24),
    paddingVertical: vs(12),
    borderRadius: scale(40),
    position: "absolute",
    alignSelf: "center",
    bottom: vs(60),
  },
  buttonText: {
    fontFamily: Theme.typography.fontFamily.main,
    color: "#fff",
    fontSize: Theme.typography.fontSize.md,
    letterSpacing: Theme.typography.letterSpacing.wide,
  },
  indicatorContainer: {
    position: "absolute",
    bottom: vs(25),
    flexDirection: "row",
    alignSelf: "center",
    gap: scale(12),
  },
  diamond: {
    width: scale(8),
    height: scale(8),
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
