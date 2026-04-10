import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { useAnimatedScrollbar } from "@/src/hooks/useAnimatedScrollbar";
import { useCartStore } from "@/src/store/useCartStore";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useCallback } from "react";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CheckoutProductItem from "../checkout/CheckoutProductItem";

export default function CartMenu() {
  const {
    isOpen,
    closeCart,
    items,
    updateQuantity,
    removeItem,
    getTotalPrice,
  } = useCartStore();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleRemoveConfirm = useCallback((id: string, name: string, size?: string, color?: string) => {
    const optionsText = [size, color].filter(Boolean).join(" / ");
    Alert.alert(
      "REMOVE ITEM",
      `Are you sure you want to remove ${name}${optionsText ? ` (${optionsText})` : ""} from your shopping bag?`,
      [
        { text: "CANCEL", style: "cancel" },
        {
          text: "REMOVE",
          onPress: () => removeItem(id),
          style: "destructive",
        },
      ],
    );
  }, [removeItem]);

  const {
    scrollHandler,
    trackStyle,
    indicatorStyle,
    onContentSizeChange,
    onScrollViewLayout,
    onTrackLayout,
  } = useAnimatedScrollbar();

  const handleItemPress = useCallback((id: string) => {
    closeCart();
    router.push({
      pathname: "/product/[id]",
      params: { id, from: "cart" }
    } as any);
  }, [closeCart, router]);

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={false}
      onRequestClose={closeCart}
    >
      <View style={[styles.fullScreenContainer, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={closeCart} style={styles.closeButton}>
            <Entypo
              name="chevron-thin-left"
              size={24}
              color={Theme.colors.primary}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>CART</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.scrollWrapper}>
          <Animated.ScrollView
            style={styles.menuContainer}
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            onContentSizeChange={(_, h) => onContentSizeChange(_, h)}
            onLayout={(e) => onScrollViewLayout(e.nativeEvent.layout.height)}
          >
            {items.length === 0 ? (
              <View style={styles.emptyContainer} pointerEvents="none">
                <Text
                  style={styles.emptyText}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  You have no items in your Shopping Bag.
                </Text>
              </View>
            ) : (
              items.map((item) => (
                <View
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  style={{ paddingHorizontal: 20 }}
                >
                  <CheckoutProductItem
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    showRemove={true}
                    onRemove={(id, size, color) =>
                      handleRemoveConfirm(id, item.product.name, size, color)
                    }
                    onPress={() => handleItemPress(item.productId)}
                  />
                </View>
              ))
            )}
          </Animated.ScrollView>

          <Animated.View
            style={[styles.scrollTrack, trackStyle]}
            onLayout={(e) => onTrackLayout(e.nativeEvent.layout.height)}
          >
            <Animated.View style={[styles.scrollThumb, indicatorStyle]} />
          </Animated.View>
        </View>

        <View style={styles.checkoutContainer}>
          {items.length > 0 && (
            <>
              <View style={styles.divider} />
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>SUB TOTAL</Text>
                <Text
                  style={styles.totalAmount}
                >{`$${getTotalPrice().toLocaleString()}`}</Text>
              </View>
              <View style={styles.shippingDescription}>
                <Text style={styles.shippingDescriptionText}>
                  *shipping charges, taxes and discount codes are calculated at
                  the time of accounting.
                </Text>
              </View>
            </>
          )}
          <TouchableOpacity
            style={[
              styles.buyButton,
              { paddingBottom: Math.max(insets.bottom, 20), paddingTop: 20 },
            ]}
            onPress={() => {
              closeCart();
              if (items.length === 0) {
                router.push("/products");
              } else {
                router.push({
                  pathname: "/checkout",
                  params: { from: "cart" },
                });
              }
            }}
          >
            <Image
              source={Images.header.shoppingBag}
              style={styles.checkoutIcon}
              tintColor={Theme.colors.white}
            />
            <Text style={styles.buyButtonText}>
              {items.length > 0 ? "BUY NOW" : "CONTINUE SHOPPING"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  header: {
    justifyContent: "flex-start",
    gap: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h3,
    letterSpacing: Theme.typography.letterSpacing.wider,
    color: Theme.colors.primary,
  },
  closeButton: {
    padding: 8,
    marginLeft: -8,
  },
  scrollWrapper: {
    flex: 1,
    flexDirection: "row",
  },
  menuContainer: {
    flex: 1,
  },
  scrollTrack: {
    width: 4,
    height: "90%",
    backgroundColor: Theme.colors.grey[200],
    borderRadius: 2,
    marginVertical: 10,
    marginRight: 10,
    overflow: "hidden",
  },
  scrollThumb: {
    width: "100%",
    height: "80%",
    backgroundColor: Theme.colors.accent,
    borderRadius: 2,
  },
  emptyContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    paddingBottom: 100,
    zIndex: -1,
  },
  emptyText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h2_md,
    color: Theme.colors.secondary,
    textAlign: "center",
    width: "100%",
  },
  checkoutContainer: {
    backgroundColor: Theme.colors.white,
  },
  divider: {
    height: 1,
    backgroundColor: Theme.colors.grey[400],
    width: "90%",
    alignSelf: "center",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  totalLabel: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
    color: Theme.colors.primary,
    letterSpacing: Theme.typography.letterSpacing.wider,
  },
  totalAmount: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h3,
    color: Theme.colors.accent,
    letterSpacing: Theme.typography.letterSpacing.wider,
  },
  buyButton: {
    backgroundColor: Theme.colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 10,
    marginTop: 10,
  },
  buyButtonText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
    color: Theme.colors.white,
    letterSpacing: Theme.typography.letterSpacing.wide,
  },
  checkoutIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  shippingDescription: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  shippingDescriptionText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.grey[500],
    textAlign: "left",
    lineHeight: Theme.typography.lineHeight.fixed24,
  },
});
