import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import React from "react";
import CheckoutProductItem from "./CheckoutProductItem";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
} from "react-native-reanimated";
import TitleUnderline from "../common/TitleUnderline";

const { width } = Dimensions.get("window");

interface CheckoutSummaryStepProps {
  items: any[];
  direction: "forward" | "backward";
  updateQuantity: (id: string, delta: number, size?: string) => void;
}

const CheckoutSummaryStep: React.FC<CheckoutSummaryStepProps> = ({
  items,
  direction,
  updateQuantity,
}) => {
  return (
    <Animated.View
      entering={direction === "forward" ? FadeInRight : FadeInLeft}
      exiting={direction === "forward" ? FadeOutLeft : FadeOutRight}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.pageTitle}>CHECKOUT</Text>
            <TitleUnderline />
          </View>
          {items.map((item) => (
            <CheckoutProductItem
              key={`${item.id}-${item.selectedSize}`}
              item={item}
              onUpdateQuantity={updateQuantity}
            />
          ))}

          <View style={styles.divider} />
          <TouchableOpacity style={styles.optionRow}>
            <View style={styles.optionLeft}>
              <Image
                source={Images.checkoutStickers.voucher}
                style={styles.checkoutSteaker}
                resizeMode="contain"
              />
              <Text style={styles.optionText}>Add promo code</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />
          <TouchableOpacity style={styles.optionRow}>
            <View style={styles.optionLeft}>
              <Image
                source={Images.checkoutStickers.delivery}
                style={styles.checkoutSteaker}
                resizeMode="contain"
              />
              <Text style={styles.optionText}>Delivery</Text>
            </View>
            <Text style={styles.optionValue}>Free</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
        </ScrollView>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 30,
    paddingHorizontal: 15,
    paddingBottom: 10,
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
  divider: {
    height: 1,
    backgroundColor: Theme.colors.border,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkoutSteaker: {
    width: 24,
    height: 24,
  },
  optionText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.primary,
  },
  optionValue: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.secondary,
  },
});

export default CheckoutSummaryStep;
