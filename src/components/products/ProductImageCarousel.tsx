import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const IMAGE_WIDTH = width - 40;
const CAROUSEL_HEIGHT = 480;

interface ProductImageCarouselProps {
  images: string[];
  activeIndex: number;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export default function ProductImageCarousel({
  images,
  activeIndex,
  onScroll,
}: ProductImageCarouselProps) {
  return (
    <View style={styles.carouselSection}>
      <FlatList
        data={images}
        horizontal
        pagingEnabled={false}
        snapToInterval={IMAGE_WIDTH + 10}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.carouselContainer}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item }}
              style={styles.mainImage}
              resizeMode="cover"
            />
            <TouchableOpacity style={styles.zoomButton}>
              <Image
                source={Images.productDetail.resize}
                style={styles.zoomIcon}
              />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(_, index) => `img-${index}`}
      />

      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.diamondIndicator,
              activeIndex === index && styles.activeDiamondIndicator,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselSection: {
    paddingTop: 10,
    marginBottom: 10,
  },
  carouselContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  imageContainer: {
    width: IMAGE_WIDTH,
    height: CAROUSEL_HEIGHT,
    aspectRatio: 0.8,
    position: "relative",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  zoomButton: {
    position: "absolute",
    right: 15,
    bottom: 15,
    width: 36,
    height: 36,
    backgroundColor: "rgba(0, 0, 0,0.3)",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  zoomIcon: {
    width: 24,
    height: 24,
    tintColor: Theme.colors.white,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  diamondIndicator: {
    width: 6,
    height: 6,
    borderWidth: 1,
    borderColor: Theme.colors.grey[300],
    transform: [{ rotate: "45deg" }],
  },
  activeDiamondIndicator: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
});
