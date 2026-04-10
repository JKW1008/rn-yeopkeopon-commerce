import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { Address } from "@/src/hooks/useCheckout";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface OrderSummaryStepProps {
  orderId: string;
  orderedItems: any[];
  orderedTotal: number;
  selectedAddress: Address;
  selectedShipping: string;
  onBackToList: () => void;
}

import { useRouter } from "expo-router";

const OrderSummaryStep: React.FC<OrderSummaryStepProps> = ({
  orderId,
  orderedItems,
  orderedTotal,
  selectedAddress,
  selectedShipping,
  onBackToList,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleProductPress = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <Animated.View entering={FadeInRight} style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 20 }]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.pageTitle}>ORDER SUMMARY</Text>
            <Image
              source={Images.home.titleUnderline}
              style={styles.underline}
              resizeMode="contain"
            />
          </View>

          <View style={styles.summarySection}>
            <Text style={styles.summaryH4Title}>ORDER ID</Text>
            <Text style={styles.orderIdValue}>#{orderId}</Text>

            <View style={styles.dividerSummary} />

            <Text style={styles.summaryH4Title}>SHIPPING INFO</Text>
            <Text style={styles.summaryText}>
              {selectedAddress
                ? `${selectedAddress.firstName} ${selectedAddress.lastName}`
                : "Iris Watson"}
            </Text>
            <Text style={styles.summaryTextSmall}>
              {selectedAddress?.street}
            </Text>
            <Text style={styles.summaryTextSmall}>
              {selectedAddress?.city}, {selectedAddress?.state}{" "}
              {selectedAddress?.zipCode}
            </Text>

            <View style={styles.dividerSummary} />

            <Text style={styles.summaryH4Title}>PAYMENT METHOD</Text>
            <View style={styles.paymentRowSmall}>
              <View style={styles.mastercardDotsSmall}>
                <View
                  style={[styles.cardDotSmall, { backgroundColor: "#EB001B" }]}
                />
                <View
                  style={[
                    styles.cardDotSmall,
                    { backgroundColor: "#F79E1B", marginLeft: -11 },
                  ]}
                />
              </View>
              <Text style={styles.paymentValueSmall}>
                Master Card ending in ••••89
              </Text>
            </View>

            <View style={styles.dividerSummary} />

            <Text style={styles.summaryH4Title}>ITEMS</Text>
            {orderedItems.map((item) => (
              <TouchableOpacity
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                style={[
                  styles.summaryItem,
                  { paddingHorizontal: 0, marginBottom: 25 },
                ]}
                onPress={() => handleProductPress(item.id)}
                activeOpacity={0.7}
              >
                <Image 
                  source={typeof item.image === 'string' ? { uri: item.image } : item.image} 
                  style={styles.summaryImage} 
                />
                <View style={styles.itemInfo}>
                  <Text style={styles.confirmItemBrand}>
                    {item.brand || item.subTitle || "21WN"}
                  </Text>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <View
                    style={[styles.qtyRow, { borderWidth: 0, paddingLeft: 0 }]}
                  >
                    <Text style={[styles.qtyText, { marginLeft: 0 }]}>
                      {`Qty: ${item.quantity || 1}`}
                      {item.selectedSize ? ` / Size: ${item.selectedSize}` : ""}
                      {item.selectedColor
                        ? ` / Color: ${item.selectedColor}`
                        : ""}
                    </Text>
                  </View>
                  <Text style={styles.itemPrice}>
                    ${((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={styles.footerFixed}>
          <View style={styles.totalRow}>
            <Text style={styles.estLabel}>TOTAL</Text>
            <Text style={styles.totalPriceText}>
              ${orderedTotal.toLocaleString()}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.homeBtnFull,
              { paddingBottom: Math.max(insets.bottom, 20), paddingTop: 20 },
            ]}
            onPress={onBackToList}
          >
            <Text style={styles.homeBtnTextFull}>BACK TO LIST</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 30,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  titleContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  pageTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
    letterSpacing: Theme.typography.letterSpacing.extraWide,
    textAlign: "center",
    color: Theme.colors.primary,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  underline: {
    width: 150,
    height: 15,
  },
  summarySection: {
    paddingHorizontal: 10,
  },
  summaryH4Title: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.primary,
    marginBottom: 8,
  },
  orderIdValue: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.accent,
  },
  dividerSummary: {
    height: 1,
    backgroundColor: Theme.colors.grey[100],
    marginVertical: 15,
  },
  summaryText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.primary,
    marginBottom: 4,
  },
  summaryTextSmall: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.grey[500],
    lineHeight: Theme.typography.lineHeight.tight18,
  },
  paymentRowSmall: {
    flexDirection: "row",
    alignItems: "center",
  },
  mastercardDotsSmall: {
    flexDirection: "row",
  },
  cardDotSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  paymentValueSmall: {
    marginLeft: 12,
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.primary,
  },
  summaryItem: {
    flexDirection: "row",
  },
  summaryImage: {
    width: 80,
    height: 100,
    backgroundColor: Theme.colors.grey[50],
  },
  itemInfo: {
    flex: 1,
    paddingLeft: 15,
    gap: 4,
  },
  confirmItemBrand: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.primary,
  },
  itemName: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.secondary,
  },
  qtyRow: {
    flexDirection: "row",
    marginVertical: 4,
  },
  qtyText: {
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.grey[500],
  },
  itemPrice: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.accent,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  estLabel: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.primary,
    letterSpacing: Theme.typography.letterSpacing.semiWide,
    textTransform: "uppercase",
  },
  totalPriceText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
    color: Theme.colors.accent,
    letterSpacing: Theme.typography.letterSpacing.wider,
  },
  footerFixed: {
    backgroundColor: Theme.colors.white,
  },
  homeBtnFull: {
    backgroundColor: Theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  homeBtnTextFull: {
    color: Theme.colors.white,
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
    letterSpacing: Theme.typography.letterSpacing.wider,
  },
});

export default OrderSummaryStep;
