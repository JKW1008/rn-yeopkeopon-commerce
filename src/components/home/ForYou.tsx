import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { DUMMY_PRODUCTS } from "@/src/data/dummyProductData";
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

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.75;

export default function ForYou() {
  const carouselData = DUMMY_PRODUCTS.slice(4, 9);
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
          style={{ width: 150, height: 15 }}
          resizeMode="contain"
        />
      </View>

      <FlatList
        data={carouselData}
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
        {carouselData.map((_, index) => (
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
    marginTop: 10,
    marginBottom: 50,
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  titleText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h3,
    letterSpacing: Theme.typography.letterSpacing.extraWide,
    color: Theme.colors.primary,
  },
  carouselContainer: {
    marginTop: 8,
    paddingHorizontal: 16,
    gap: 16,
  },
  cardWrapper: {
    width: CARD_WIDTH,
  },
  indicatorContainer: {
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
    backgroundColor: Theme.colors.secondary,
  },
  diamondInactive: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Theme.colors.secondary,
  },
});
