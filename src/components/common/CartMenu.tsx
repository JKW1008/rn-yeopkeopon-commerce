import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { useCartStore } from "@/src/store/useCartStore";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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

  const handleRemoveConfirm = (id: string, name: string) => {
    Alert.alert(
      "REMOVE ITEM",
      `Are you sure you want to remove ${name} from your shopping bag?`,
      [
        { text: "CANCEL", style: "cancel" },
        {
          text: "REMOVE",
          onPress: () => removeItem(id),
          style: "destructive",
        },
      ],
    );
  };

  const scrollY = useSharedValue(0);
  const contentHeight = useSharedValue(1);
  const scrollViewHeight = useSharedValue(1);
  const scrollOpacity = useSharedValue(0);
  const trackHeightSV = useSharedValue(0);
  const contentMeasured = useSharedValue(false);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      scrollOpacity.value = withSequence(
        withTiming(1, { duration: 150 }),
        withDelay(1200, withTiming(0, { duration: 600 })),
      );
    },
  });

  const trackStyle = useAnimatedStyle(() => {
    const ready = trackHeightSV.value > 10 && scrollViewHeight.value > 10;
    return { opacity: ready ? scrollOpacity.value : 0 };
  });

  const indicatorStyle = useAnimatedStyle(() => {
    const tHeight = trackHeightSV.value;
    const sHeight = scrollViewHeight.value;

    if (tHeight <= 10 || sHeight <= 10 || !contentMeasured.value) {
      return { transform: [{ translateY: 0 }] };
    }

    const cHeight = contentHeight.value;
    const thumbH = tHeight * 0.8;
    const maxThumbTravel = tHeight - thumbH;
    const maxScroll = Math.max(cHeight - sHeight, 1);
    const rawY = (scrollY.value / maxScroll) * maxThumbTravel;
    const translateY = Math.max(0, Math.min(rawY, maxThumbTravel));

    return { transform: [{ translateY }] };
  });

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
            <AntDesign name="close" size={24} color={Theme.colors.primary} />
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
            onContentSizeChange={(_, h) => {
              contentHeight.value = h;
              contentMeasured.value = true;
            }}
            onLayout={(e) => {
              scrollViewHeight.value = e.nativeEvent.layout.height;
            }}
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
                <View key={item.id} style={styles.cartItemRow}>
                  <View style={styles.itemImageContainer}>
                    {item.image ? (
                      <Image source={item.image} style={styles.itemImage} />
                    ) : (
                      <View style={styles.imagePlaceholder}>
                        <Ionicons
                          name="shirt-outline"
                          size={32}
                          color={Theme.colors.grey[300]}
                        />
                      </View>
                    )}
                  </View>
                  <View style={styles.itemInfo}>
                    <View style={styles.itemHeader}>
                      <Text style={styles.itemName}>{item.name}</Text>
                      <TouchableOpacity
                        onPress={() => handleRemoveConfirm(item.id, item.name)}
                      >
                        <Ionicons
                          name="close-outline"
                          size={24}
                          color={Theme.colors.grey[400]}
                        />
                      </TouchableOpacity>
                    </View>

                    {item.description && (
                      <Text style={styles.itemDescription} numberOfLines={2}>
                        {item.description}
                      </Text>
                    )}

                    <View style={styles.quantitySection}>
                      <View style={styles.quantityControls}>
                        <TouchableOpacity
                          style={styles.circleBtn}
                          onPress={() => updateQuantity(item.id, -1)}
                        >
                          <AntDesign
                            name="minus"
                            size={14}
                            color={Theme.colors.primary}
                          />
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        <TouchableOpacity
                          style={styles.circleBtn}
                          onPress={() => updateQuantity(item.id, 1)}
                        >
                          <AntDesign
                            name="plus"
                            size={14}
                            color={Theme.colors.primary}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <Text style={styles.itemPrice}>
                      {`$${Math.floor(item.price * item.quantity).toLocaleString()}`}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </Animated.ScrollView>

          <Animated.View
            style={[styles.scrollTrack, trackStyle]}
            onLayout={(e) => {
              trackHeightSV.value = e.nativeEvent.layout.height;
            }}
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
            onPress={closeCart}
          >
            <Image
              source={Images.header.shoppingBag}
              style={styles.checkoutIcon}
              tintColor="#fff"
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
    backgroundColor: "#fff",
  },
  header: {
    justifyContent: "flex-start",
    gap: 15, // 간격 미세 조정
    paddingHorizontal: 20,
    paddingVertical: 10, // 상단으로 좀 더 밀착
  },
  headerTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h3,
    letterSpacing: 2,
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
    paddingBottom: 100, // 시각적 중앙을 위해 위로 밀어올림
    zIndex: -1,
  },
  emptyText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 28, // 더 크게 키움
    color: Theme.colors.secondary,
    textAlign: "center",
    width: "100%",
  },
  cartItemRow: {
    flexDirection: "row",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.grey[50],
  },
  itemImageContainer: {
    width: 120, // 이미지 크기 확대
    height: 150,
    backgroundColor: Theme.colors.grey[50],
    borderRadius: 4,
    overflow: "hidden",
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "flex-start",
    gap: 8, // 세로 요소간 간격
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 16,
    color: Theme.colors.primary,
    letterSpacing: 1,
    flex: 1,
    marginRight: 10,
    fontWeight: "600",
  },
  itemDescription: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 14,
    color: Theme.colors.secondary,
    lineHeight: 20,
  },
  quantitySection: {
    marginTop: 5,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10, // 간격 축소
  },
  circleBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Theme.colors.grey[200],
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 14,
    color: Theme.colors.primary,
    minWidth: 20,
    textAlign: "center",
  },
  itemPrice: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 18,
    color: Theme.colors.accent, // 주황색 적용
    fontWeight: "700",
    marginTop: 4,
  },
  checkoutContainer: {
    backgroundColor: "#fff",
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
    letterSpacing: 2,
  },
  totalAmount: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 20,
    color: Theme.colors.accent,
    fontWeight: "700",
    letterSpacing: 2,
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
    fontSize: Theme.typography.fontSize.h3,
    color: "#fff",
    letterSpacing: 1,
    fontWeight: "600",
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
    lineHeight: 24,
  },
});
