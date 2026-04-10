import { Theme } from "@/src/constants/theme";
import { scale, vs } from "@/src/utils/responsive";
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
const IMAGE_WIDTH = width - scale(40);

interface ProductImageCarouselProps {
  images: string[];
  activeIndex: number;
  onScroll: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  onResize?: () => void;
}

export default function ProductImageCarousel({
  images,
  activeIndex,
  onScroll,
  onResize,
}: ProductImageCarouselProps) {
  return (
    <View style={styles.carouselSection}>
      <FlatList
        data={images}
        horizontal
        pagingEnabled={false}
        snapToInterval={IMAGE_WIDTH + scale(10)}
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
            <TouchableOpacity style={styles.zoomButton} onPress={onResize}>
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
    paddingTop: vs(10),
    marginBottom: vs(10),
  },
  carouselContainer: {
    paddingHorizontal: scale(20),
    gap: scale(10),
  },
  imageContainer: {
    width: IMAGE_WIDTH,
    aspectRatio: 0.8,
    position: "relative",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  zoomButton: {
    position: "absolute",
    right: scale(15),
    bottom: vs(15),
    width: scale(36),
    height: scale(36),
    backgroundColor: "rgba(0, 0, 0,0.3)",
    borderRadius: scale(18),
    justifyContent: "center",
    alignItems: "center",
  },
  zoomIcon: {
    width: scale(24),
    height: scale(24),
    tintColor: Theme.colors.white,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: vs(10),
    gap: scale(10),
  },
  diamondIndicator: {
    width: scale(6),
    height: scale(6),
    borderWidth: 1,
    borderColor: Theme.colors.grey[300],
    transform: [{ rotate: "45deg" }],
  },
  activeDiamondIndicator: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
});
