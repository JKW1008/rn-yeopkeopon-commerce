import SizeSelectModal from "@/src/components/common/SizeSelectModal";
import ProductAccordionDetails from "@/src/components/products/ProductAccordionDetails";
import ProductBottomBar from "@/src/components/products/ProductBottomBar";
import ProductControls from "@/src/components/products/ProductControls";
import ProductImageCarousel from "@/src/components/products/ProductImageCarousel";
import ProductFullscreenViewer from "@/src/components/products/ProductFullscreenViewer";
import ProductInfo from "@/src/components/products/ProductInfo";
import ShareProductModal from "@/src/components/products/ShareProductModal";
import YouMayLike from "@/src/components/products/YouMayLike";
import AppFooter from "@/src/components/ui/AppFooter";
import AppHeader from "@/src/components/ui/AppHeader";
import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { useProductDetail } from "@/src/hooks/useProductDetail";
import { useProductWishlist } from "@/src/hooks/useProductWishlist";
import { useCartStore } from "@/src/store/useCartStore";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  UIManager,
  View,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const IMAGE_WIDTH = width - 40;

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SHIPPING_ITEMS = [
  {
    id: "0",
    icon: Images.productDetail.shipping,
    title: "Free Flat Rate Shipping",
    content: "Estimated to be delivered on\n09/11/2021 - 12/11/2021.",
  },
  {
    id: "1",
    icon: Images.productDetail.tag,
    title: "COD Policy",
    content: "Cash on Delivery is available for all domestic orders.",
  },
  {
    id: "2",
    icon: Images.productDetail.refresh,
    title: "Return Policy",
    content: "Returns accepted within 30 days.",
  },
];

export default function ProductDetailScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id, from } = useLocalSearchParams<{ id: string; from?: string }>();
  const openCart = useCartStore((state) => state.openCart);

  const {
    product,
    isLoading,
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    handleAddToCart,
  } = useProductDetail(id as string);

  const [activeIndex, setActiveIndex] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [openShippingSection, setOpenShippingSection] = useState<string | null>(null);

  const { isLiked, handleToggleLike } = useProductWishlist(id as string);

  const handleBack = () => {
    router.back();
    if (from === "cart") {
      openCart();
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / IMAGE_WIDTH);
    setActiveIndex(index);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <AppHeader showBack={true} onBack={handleBack} />
        <View style={styles.center}>
          <Text>Product not found.</Text>
        </View>
      </View>
    );
  }

  const isJewelry = ["Ring", "Necklace", "Jewelry"].includes(product.category);
  const isShoes = product.category === "Shoes";

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top, backgroundColor: Theme.colors.white }}>
        <AppHeader showBack={true} onBack={handleBack} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <ProductImageCarousel
          images={product.images}
          activeIndex={activeIndex}
          onScroll={handleScroll}
          onResize={() => setIsFullscreen(true)}
        />

        <ProductInfo
          brand={product.brand}
          name={product.name}
          price={product.price}
          onShare={() => setShowShareModal(true)}
        />

        <ProductControls
          isJewelry={isJewelry}
          isShoes={isShoes}
          colors={product.options.colors.map((c, i) => ({ id: `c${i}`, ...c }))}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          sizes={product.options.sizes}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          sizeLabel="Size"
          onOpenSizeModal={() => setShowSizeModal(true)}
        />

        <ProductBottomBar
          onAddToBasket={handleAddToCart}
          onToggleLike={handleToggleLike}
          isLiked={isLiked}
        />

        <ProductAccordionDetails
          description={product.description}
          imageUrl={product.images[0]}
          isGalleryOpen={isGalleryOpen}
          setIsGalleryOpen={setIsGalleryOpen}
          openShippingSection={openShippingSection}
          setOpenShippingSection={setOpenShippingSection}
          shippingItems={SHIPPING_ITEMS}
        />

        <YouMayLike currentProductId={product.id} category={product.category} />
        <AppFooter />
      </ScrollView>

      <SizeSelectModal
        visible={showSizeModal}
        sizes={product.options.sizes}
        selectedSize={selectedSize}
        label="Size"
        onSelect={setSelectedSize}
        onClose={() => setShowSizeModal(false)}
      />

      <ShareProductModal
        visible={showShareModal}
        productId={product.id}
        onClose={() => setShowShareModal(false)}
      />

      <ProductFullscreenViewer
        visible={isFullscreen}
        images={product.images}
        onClose={() => setIsFullscreen(false)}
      />
    </View>
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
