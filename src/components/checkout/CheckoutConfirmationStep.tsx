import { Theme } from "@/src/constants/theme";
import { Address, PaymentMethod, CartItem } from "@/src/api/types";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Animated, {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
} from "react-native-reanimated";
import TitleUnderline from "@/src/components/common/TitleUnderline";
import CheckoutProductItem from "@/src/components/checkout/CheckoutProductItem";

import { useRouter } from "expo-router";

interface CheckoutConfirmationStepProps {
  items: CartItem[];
  selectedAddress: Address;
  selectedPayment: PaymentMethod;
  selectedShipping: string;
  direction: "forward" | "backward";
  onUpdateQuantity: (id: string, delta: number, size?: string, color?: string) => void;
}

const CheckoutConfirmationStep: React.FC<CheckoutConfirmationStepProps> = ({
  items,
  selectedAddress,
  selectedPayment,
  selectedShipping,
  direction,
  onUpdateQuantity,
}) => {
  const router = useRouter();

  const handleProductPress = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <Animated.View
      entering={direction === "forward" ? FadeInRight : FadeInLeft}
      exiting={direction === "forward" ? FadeOutLeft : FadeOutRight}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 20 }]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.pageTitle}>CHECKOUT</Text>
            <TitleUnderline />
          </View>

          <View style={[styles.confirmationSummary, { marginTop: -20 }]}>
            <View style={styles.setupBox}>
              <View style={styles.setupInfo}>
                <Text style={styles.setupName}>
                  {selectedAddress.firstName} {selectedAddress.lastName}
                </Text>
                <Text style={styles.setupText}>{selectedAddress.street}</Text>
                <Text style={styles.setupText}>
                  {selectedAddress.city}, {selectedAddress.state}{" "}
                  {selectedAddress.zipCode}
                </Text>
              </View>
            </View>

            <View style={styles.setupBox}>
              <View style={styles.setupInfo}>
                <View style={styles.paymentRow}>
                  <View style={styles.mastercardDotsSmall}>
                    <View
                      style={[
                        styles.cardDotSmall,
                        { backgroundColor: "#EB001B" },
                      ]}
                    />
                    <View
                      style={[
                        styles.cardDotSmall,
                        {
                          backgroundColor: "#F79E1B",
                          marginLeft: -8,
                          opacity: 0.8,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.paymentValue}>
                    {selectedPayment.brand} ending ••••{selectedPayment.lastFour}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.setupBox}>
              <View style={styles.setupInfo}>
                <Text style={styles.setupName}>
                  {selectedShipping === "pickup"
                    ? "Pickup at store"
                    : "Standard Delivery"}
                </Text>
                <Text style={styles.setupText}>
                  {selectedShipping === "pickup"
                    ? "FREE • Usually 1-2 days"
                    : "$15.00 • 3-5 business days"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.confirmationItems}>
            {items.map((item) => (
              <CheckoutProductItem
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onPress={() => handleProductPress(item.productId)}
              />
            ))}
          </View>
        </ScrollView>
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
  },
  titleUnderlineWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  line: {
    width: 60,
    height: 1,
    backgroundColor: Theme.colors.grey[200],
  },
  diamond: {
    width: 8,
    height: 8,
    borderWidth: 1,
    borderColor: Theme.colors.grey[200],
    transform: [{ rotate: "45deg" }],
  },
  confirmationSummary: {
    marginBottom: 20,
  },
  setupBox: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.grey[100],
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  setupInfo: {
    paddingLeft: 20,
    flex: 1,
  },
  setupName: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.primary,
    marginBottom: 4,
  },
  setupText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.grey[500],
    lineHeight: Theme.typography.lineHeight.base,
  },
  paymentRow: {
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
  paymentValue: {
    marginLeft: 12,
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.primary,
  },
  confirmationItems: {
    gap: 20,
    marginTop: 20,
  },
});

export default CheckoutConfirmationStep;
