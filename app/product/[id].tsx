import SizeSelectModal from "@/src/components/common/SizeSelectModal";
import ProductAccordionDetails from "@/src/components/products/ProductAccordionDetails";
import ProductBottomBar from "@/src/components/products/ProductBottomBar";
import ProductControls from "@/src/components/products/ProductControls";
import ProductImageCarousel from "@/src/components/products/ProductImageCarousel";
import ProductInfo from "@/src/components/products/ProductInfo";
import ShareProductModal from "@/src/components/products/ShareProductModal";
import YouMayLike from "@/src/components/products/YouMayLike";
import AppFooter from "@/src/components/ui/AppFooter";
import AppHeader from "@/src/components/ui/AppHeader";
import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { DUMMY_PRODUCTS } from "@/src/data/dummyProductData";
import { useAddToCart } from "@/src/hooks/useAddToCart";
import { useProductWishlist } from "@/src/hooks/useProductWishlist";
import { useLocalSearchParams } from "expo-router";
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

const MOCK_COLORS = [
  { id: "c1", hex: "#000000", name: "Black" },
  { id: "c2", hex: "#777777", name: "Grey" },
  { id: "c3", hex: "#C4C4C4", name: "Light Grey" },
];

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
    content:
      "Cash on Delivery is available for all domestic orders. Please check with your carrier for details.",
  },
  {
    id: "2",
    icon: Images.productDetail.refresh,
    title: "Return Policy",
    content:
      "Returns accepted within 30 days. Exchange available for all items.",
  },
];

export default function ProductDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = DUMMY_PRODUCTS.find((p) => p.id === id);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(MOCK_COLORS[0].id);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [openShippingSection, setOpenShippingSection] = useState<string | null>(
    null,
  );

  const { isLiked, handleToggleLike } = useProductWishlist(product?.id ?? "");
  const { handleAddToBasket } = useAddToCart(
    product,
    selectedSize,
    MOCK_COLORS.find((c) => c.id === selectedColor)?.name || null,
    () => setShowSizeModal(true),
  );

  const isJewelry = product
    ? ["Ring", "Necklace"].includes(product.category)
    : false;
  const isShoes = product ? product.category === "Shoes" : false;
  const sizeLabel = "Size";

  if (!product) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <AppHeader showBack={true} />
        <View style={styles.center}>
          <Text>Product not found.</Text>
        </View>
      </View>
    );
  }

  const productImages = [product.imageUrl, product.imageUrl, product.imageUrl];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollOffset / IMAGE_WIDTH);
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <View
        style={{ paddingTop: insets.top, backgroundColor: Theme.colors.white }}
      >
        <AppHeader showBack={true} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ProductImageCarousel
          images={productImages}
          activeIndex={activeIndex}
          onScroll={handleScroll}
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
          colors={MOCK_COLORS}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
          sizes={product.sizes}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          sizeLabel={sizeLabel}
          onOpenSizeModal={() => setShowSizeModal(true)}
        />

        <ProductBottomBar
          onAddToBasket={handleAddToBasket}
          onToggleLike={handleToggleLike}
          isLiked={isLiked}
        />

        <ProductAccordionDetails
          description={product.description}
          imageUrl={product.imageUrl}
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
        sizes={product.sizes}
        selectedSize={selectedSize}
        label={sizeLabel}
        onSelect={setSelectedSize}
        onClose={() => setShowSizeModal(false)}
      />

      <ShareProductModal
        visible={showShareModal}
        productId={product.id}
        onClose={() => setShowShareModal(false)}
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
