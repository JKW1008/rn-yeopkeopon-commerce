import { Theme } from "@/src/constants/theme";
import { scale, vs } from "@/src/utils/responsive";
import { Images } from "@/src/constants/theme/images";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import ProductCard from "../products/ProductCard";

import { Product } from "@/src/api/types";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.72;

export default function ForYou({ data = [] }: { data: Product[] }) {
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
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>JUST FOR YOU</Text>
        <Image
          source={Images.home.titleUnderline}
          style={{ width: scale(150), height: vs(15) }}
          resizeMode="contain"
        />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProductCard product={item} variant="large" />
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
    backgroundColor: "#fff",
    marginTop: vs(10),
    marginBottom: vs(50),
  },
  titleContainer: {
    alignItems: "center",
    marginTop: vs(20),
    marginBottom: vs(20),
  },
  titleText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h3,
    letterSpacing: Theme.typography.letterSpacing.extraWide,
    color: Theme.colors.primary,
  },
  carouselContainer: {
    marginTop: vs(8),
    paddingHorizontal: scale(16),
    gap: scale(16),
  },
  cardWrapper: {
    width: CARD_WIDTH,
  },
  indicatorContainer: {
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
    backgroundColor: Theme.colors.secondary,
  },
  diamondInactive: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Theme.colors.secondary,
  },
});
