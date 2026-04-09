import YouMayLike from "@/src/components/products/YouMayLike";
import AppFooter from "@/src/components/ui/AppFooter";
import AppHeader from "@/src/components/ui/AppHeader";
import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { DUMMY_PRODUCTS } from "@/src/data/dummyProductData";
import { useWishlistStore } from "@/src/store/useWishlistStore";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Clipboard,
  Dimensions,
  FlatList,
  Image,
  LayoutAnimation,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const IMAGE_WIDTH = width - 40;
const CAROUSEL_HEIGHT = 480;

const MOCK_COLORS = [
  { id: "c1", hex: "#000000", name: "Black" },
  { id: "c2", hex: "#777777", name: "Grey" },
  { id: "c3", hex: "#C4C4C4", name: "Light Grey" },
];

export default function ProductDetailScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = DUMMY_PRODUCTS.find((p) => p.id === id);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(MOCK_COLORS[0].id);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [openShippingSection, setOpenShippingSection] = useState<string | null>(
    null,
  );

  const { toggleLike, wishlistIds } = useWishlistStore();
  const isLiked = product ? wishlistIds.includes(product.id) : false;

  const isJewelry = product
    ? ["Ring", "Necklace"].includes(product.category)
    : false;
  const isShoes = product ? product.category === "Shoes" : false;
  const sizeLabel = "Size";

  const handleToggleLike = () => {
    if (product) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      toggleLike(product.id);
    }
  };

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

  const copyToClipboard = () => {
    Clipboard.setString(`https://openui.design/product/${product.id}`);
    setShowShareModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingTop: insets.top, backgroundColor: "#fff" }}>
        <AppHeader showBack={true} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.carouselSection}>
          <FlatList
            data={productImages}
            horizontal
            pagingEnabled={false}
            snapToInterval={IMAGE_WIDTH + 10}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
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
            {productImages.map((_, index) => (
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

        <View style={styles.infoSection}>
          <View style={styles.brandRow}>
            <Text style={styles.brandText}>{product.brand}</Text>
            <TouchableOpacity onPress={() => setShowShareModal(true)}>
              <Image
                source={Images.productDetail.export}
                style={styles.shareIcon}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.nameText}>{product.name}</Text>

          <Text style={styles.priceText}>{`$${product.price}`}</Text>

          <View style={styles.colorSizeSection}>
            {!isJewelry && (
              <View style={styles.colorSection}>
                <Text style={styles.sectionTitle}>Color</Text>
                <View style={styles.colorRow}>
                  {MOCK_COLORS.map((color) => (
                    <TouchableOpacity
                      key={color.id}
                      style={[
                        styles.colorCircleOuter,
                        selectedColor === color.id && styles.colorCircleActive,
                      ]}
                      onPress={() => setSelectedColor(color.id)}
                    >
                      <View
                        style={[
                          styles.colorCircleInner,
                          { backgroundColor: color.hex },
                        ]}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            <View style={styles.sizeSection}>
              <Text style={styles.sectionTitle}>{sizeLabel}</Text>
              {isShoes ? (
                <TouchableOpacity
                  style={styles.sizePickerButton}
                  onPress={() => setShowSizeModal(true)}
                >
                  <Text style={styles.sizePickerText}>
                    {selectedSize || "Select"}
                  </Text>
                  <Ionicons
                    name="chevron-down"
                    size={16}
                    color={Theme.colors.primary}
                  />
                </TouchableOpacity>
              ) : (
                <View style={styles.sizeRow}>
                  {product.sizes.map((size) => (
                    <TouchableOpacity
                      key={size}
                      style={[
                        styles.sizeButton,
                        selectedSize === size && styles.activeSizeButton,
                      ]}
                      onPress={() => setSelectedSize(size)}
                    >
                      <Text
                        style={[
                          styles.sizeButtonText,
                          selectedSize === size && styles.activeSizeButtonText,
                        ]}
                      >
                        {size}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.addToCartButton}>
            <Ionicons name="add" size={24} color="#fff" />
            <Text style={styles.addToCartText}>ADD TO BASKET</Text>
            <TouchableOpacity
              onPress={handleToggleLike}
              style={{ marginLeft: "auto", padding: 4 }}
            >
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>

        <View style={styles.detailsSection}>
          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>MATERIALS</Text>
            <Text style={styles.detailText}>{product.description}</Text>
          </View>

          <View style={styles.detailItem}>
            <TouchableOpacity
              style={styles.shippingAccordionHeader}
              onPress={() => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );
                setIsGalleryOpen(!isGalleryOpen);
              }}
            >
              <View style={styles.headerLeft}>
                <Text style={styles.detailTitle}>GALLERY</Text>
              </View>
              <Ionicons
                name={isGalleryOpen ? "chevron-up" : "chevron-down"}
                size={20}
                color={Theme.colors.grey[500]}
              />
            </TouchableOpacity>
            {isGalleryOpen && (
              <View style={styles.galleryContent}>
                <Image
                  source={{ uri: product?.imageUrl }}
                  style={styles.galleryImage}
                />
                <Image
                  source={{ uri: product?.imageUrl }}
                  style={styles.galleryImage}
                />
              </View>
            )}
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>CARE</Text>
            <Text style={styles.detailText}>
              To keep your jackets and coats clean, you only need to freshen
              them up and go over them with a cloth or a clothes brush. If you
              need to dry clean a garment, look for a dry cleaner that uses
              technologies that are respectful of the environment.
            </Text>

            <View style={styles.careInstructionList}>
              <View style={styles.careInstructionRow}>
                <Image
                  source={Images.productDetail.bleach}
                  style={styles.careIcon}
                />
                <Text style={styles.detailText}>Do not bleach</Text>
              </View>
              <View style={styles.careInstructionRow}>
                <Image
                  source={Images.productDetail.dry}
                  style={styles.careIcon}
                />
                <Text style={styles.detailText}>Dry clean only</Text>
              </View>
              <View style={styles.careInstructionRow}>
                <Image
                  source={Images.productDetail.iron}
                  style={styles.careIcon}
                />
                <Text style={styles.detailText}>
                  Iron at maximum 110ºC/230ºF
                </Text>
              </View>
              <View style={styles.careInstructionRow}>
                <Image
                  source={Images.productDetail.wash}
                  style={styles.careIcon}
                />
                <Text style={styles.detailText}>Machine wash cold</Text>
              </View>
            </View>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailTitle}>SHIPPING & RETURNS</Text>

            <View style={styles.shippingAccordionContainer}>
              {[
                {
                  id: "0",
                  icon: Images.productDetail.shipping,
                  title: "Free Flat Rate Shipping",
                  content:
                    "Estimated to be delivered on\n09/11/2021 - 12/11/2021.",
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
              ].map((item) => (
                <View key={item.id} style={styles.shippingAccordionItem}>
                  <TouchableOpacity
                    style={styles.shippingAccordionHeader}
                    onPress={() => {
                      LayoutAnimation.configureNext(
                        LayoutAnimation.Presets.easeInEaseOut,
                      );
                      setOpenShippingSection(
                        openShippingSection === item.id ? null : item.id,
                      );
                    }}
                  >
                    <View style={styles.headerLeft}>
                      <Image source={item.icon} style={styles.careIcon} />
                      <Text style={styles.accordionTitleText}>
                        {item.title}
                      </Text>
                    </View>
                    <Ionicons
                      name={
                        openShippingSection === item.id
                          ? "chevron-up"
                          : "chevron-down"
                      }
                      size={20}
                      color={Theme.colors.grey[500]}
                    />
                  </TouchableOpacity>
                  {openShippingSection === item.id && (
                    <View style={styles.shippingAccordionContent}>
                      <Text style={styles.detailText}>{item.content}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>

        <YouMayLike currentProductId={product.id} category={product.category} />
        <AppFooter />
      </ScrollView>

      <Modal
        visible={showSizeModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowSizeModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowSizeModal(false)}
        >
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHeader}>
              <Text style={styles.bottomSheetTitle}>
                SELECT {sizeLabel.toUpperCase()}
              </Text>
              <TouchableOpacity onPress={() => setShowSizeModal(false)}>
                <Ionicons name="close" size={24} color={Theme.colors.primary} />
              </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.bottomSheetContent}>
              <View style={styles.sizeGrid}>
                {product.sizes.map((size) => (
                  <TouchableOpacity
                    key={size}
                    style={[
                      styles.bottomSheetSizeButton,
                      selectedSize === size && styles.bottomSheetSizeActive,
                    ]}
                    onPress={() => {
                      setSelectedSize(size);
                      setShowSizeModal(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.bottomSheetSizeText,
                        selectedSize === size &&
                          styles.bottomSheetSizeActiveText,
                      ]}
                    >
                      {size}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        visible={showShareModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowShareModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowShareModal(false)}
        >
          <View style={styles.shareSheet}>
            <Text style={styles.shareTitle}>SHARE THIS PRODUCT</Text>
            <View style={styles.shareGrid}>
              <TouchableOpacity style={styles.shareOption}>
                <Image source={Images.footer.twitter} style={styles.snsIcon} />
                <Text style={styles.snsText}>Twitter</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareOption}>
                <Image
                  source={Images.footer.instagram}
                  style={styles.snsIcon}
                />
                <Text style={styles.snsText}>Instagram</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareOption}>
                <Image source={Images.footer.youtube} style={styles.snsIcon} />
                <Text style={styles.snsText}>YouTube</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={copyToClipboard}
            >
              <Feather name="link" size={20} color={Theme.colors.primary} />
              <Text style={styles.copyButtonText}>Copy Link</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
  },
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
    tintColor: "#FFFFFF",
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
  infoSection: {
    padding: 16,
    paddingHorizontal: 24,
  },
  brandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  brandText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
    color: Theme.colors.primary,
    letterSpacing: 4,
  },
  shareIcon: {
    width: 16,
    height: 16,
    tintColor: Theme.colors.primary,
  },
  nameText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
    color: Theme.colors.secondary,
    lineHeight: 28,
    marginBottom: 8,
  },
  priceText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
    color: "#DD8560",
  },
  sectionTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.primary,
  },
  colorSizeSection: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 30,
    marginTop: 10,
  },
  colorSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  colorRow: {
    gap: 8,
    flexDirection: "row",
  },
  colorCircleOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  colorCircleActive: {
    borderColor: Theme.colors.grey[500],
  },
  colorCircleInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  sizeSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sizeRow: {
    flexDirection: "row",
    gap: 12,
  },
  sizeButton: {
    minWidth: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  activeSizeButton: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  sizeButtonText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.primary,
  },
  activeSizeButtonText: {
    color: "#fff",
  },
  detailsSection: {
    padding: 24,
    paddingTop: 30,
    gap: 50,
  },
  detailItem: {
    gap: 20,
  },
  detailTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    letterSpacing: 2,
  },
  shippingAccordionContainer: {
    marginTop: 0,
  },
  shippingAccordionItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#F4F4F4",
  },
  shippingAccordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  accordionTitleText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 14,
    color: Theme.colors.primary,
  },
  shippingAccordionContent: {
    paddingBottom: 16,
    paddingLeft: 34, // Align with title text (Icon 22 + Gap 12)
  },
  careInstructionList: {
    gap: 16,
    marginTop: 8,
  },
  careInstructionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  careIcon: {
    width: 22,
    height: 22,
    tintColor: Theme.colors.primary,
  },
  detailText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.grey[500],
    lineHeight: 22,
  },
  bottomBar: {
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 20,
    paddingBottom: 10,
  },
  addToCartButton: {
    backgroundColor: Theme.colors.primary,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 30,
    gap: 12,
  },
  addToCartText: {
    color: "#fff",
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  shareSheet: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
  },
  shareTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 16,
    letterSpacing: 2,
    marginBottom: 24,
  },
  shareGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  shareOption: {
    alignItems: "center",
    gap: 8,
  },
  snsIcon: {
    width: 40,
    height: 40,
  },
  snsText: {
    fontSize: 12,
    color: Theme.colors.grey[500],
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    width: "100%",
    justifyContent: "center",
  },
  copyButtonText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 14,
    color: Theme.colors.primary,
  },
  sizePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 120,
    borderRadius: 4,
  },
  sizePickerText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 14,
    color: Theme.colors.primary,
  },
  galleryContent: {
    paddingVertical: 16,
    gap: 12,
  },
  galleryImage: {
    width: "100%",
    height: 400,
    backgroundColor: "#F8f8f8",
  },
  bottomSheet: {
    width: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    marginTop: "auto",
    maxHeight: "70%",
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 16,
    letterSpacing: 2,
    color: Theme.colors.primary,
  },
  bottomSheetContent: {
    paddingHorizontal: 20,
  },
  sizeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  bottomSheetSizeButton: {
    width: "22.5%",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  bottomSheetSizeActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  bottomSheetSizeText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 14,
    color: Theme.colors.primary,
  },
  bottomSheetSizeActiveText: {
    color: "#fff",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
