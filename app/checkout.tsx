import AppHeader from "@/src/components/ui/AppHeader";
import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { useCheckout } from "@/src/hooks/useCheckout";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Step Components
import CheckoutAddCardStep from "@/src/components/checkout/CheckoutAddCardStep";
import CheckoutAddressListStep from "@/src/components/checkout/CheckoutAddressListStep";
import CheckoutConfirmationStep from "@/src/components/checkout/CheckoutConfirmationStep";
import CheckoutEditAddressStep from "@/src/components/checkout/CheckoutEditAddressStep";
import CheckoutSetupStep from "@/src/components/checkout/CheckoutSetupStep";
import CheckoutSuccessStep from "@/src/components/checkout/CheckoutSuccessStep";
import CheckoutSummaryStep from "@/src/components/checkout/CheckoutSummaryStep";
import OrderSummaryStep from "@/src/components/checkout/OrderSummaryStep";
import ShippingMethodModal from "@/src/components/checkout/ShippingMethodModal";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

export default function CheckoutScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const {
    currentStep,
    changeStep,
    direction,
    isOrdering,
    orderId,
    orderedItems,
    orderedTotal,
    selectedRating,
    setSelectedRating,
    selectedShipping,
    setSelectedShipping,
    isShippingModalVisible,
    setIsShippingModalVisible,
    addresses,
    selectedAddressId,
    setSelectedAddressId,
    editingAddressId,
    setEditingAddressId,
    paymentMethods,
    selectedPaymentId,
    setSelectedPaymentId,
    card,
    setCard,
    tempAddress,
    setTempAddress,
    activeCardIndex,
    setActiveCardIndex,
    handleBack,
    handleNext,
    total,
    selectedAddress,
    selectedPayment,
    items,
    updateQuantity,
  } = useCheckout();

  const getButtonText = () => {
    switch (currentStep) {
      case "summary":
        return "CHECKOUT";
      case "checkout_setup":
        return "PLACE ORDER";
      case "confirmation":
        return "CONFIRM ORDER";
      case "edit_address":
        return editingAddressId ? "UPDATE ADDRESS" : "ADD ADDRESS";
      case "address_list":
        return "CONTINUE";
      case "add_card":
        return "ADD CARD";
      default:
        return "CONTINUE";
    }
  };

  const showFooter =
    currentStep !== "success" &&
    currentStep !== "order_summary";

  const progress = useSharedValue(0);

  const getProgress = () => {
    switch (currentStep) {
      case "summary":
        return 0.2;
      case "checkout_setup":
        return 0.4;
      case "confirmation":
        return 0.8;
      case "success":
        return 1;
      default:
        return 0.5;
    }
  };

  React.useEffect(() => {
    progress.value = withSpring(getProgress());
  }, [currentStep]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      {currentStep !== "success" &&
        currentStep !== "order_summary" && (
          <View style={{ paddingTop: insets.top }}>
            <AppHeader
              showBack={true}
              onBack={handleBack}
            />
            <View style={styles.progressBarContainer}>
              <Animated.View style={[styles.progressBar, progressStyle]} />
            </View>
          </View>
        )}

      {currentStep === "summary" && (
        <CheckoutSummaryStep
          items={items}
          total={total}
          onUpdateQuantity={updateQuantity}
          direction={direction}
          selectedShipping={selectedShipping}
          onOpenShippingModal={() => setIsShippingModalVisible(true)}
        />
      )}

      {currentStep === "checkout_setup" && (
        <CheckoutSetupStep
          selectedAddress={selectedAddress}
          selectedPayment={selectedPayment}
          onStepChange={changeStep}
          direction={direction}
        />
      )}

      {currentStep === "address_list" && (
        <CheckoutAddressListStep
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          direction={direction}
          onSelectAddress={setSelectedAddressId}
          onEditAddress={(id) => {
            setEditingAddressId(id);
            changeStep("edit_address");
          }}
          onAddNewAddress={() => {
            setEditingAddressId(null);
            changeStep("edit_address");
          }}
        />
      )}

      {currentStep === "edit_address" && (
        <CheckoutEditAddressStep
          tempAddress={tempAddress}
          direction={direction}
          onUpdateTempAddress={setTempAddress}
          onNext={handleNext}
        />
      )}

      {currentStep === "add_card" && (
        <CheckoutAddCardStep
          card={card}
          setCard={setCard}
          direction={direction}
          paymentMethods={paymentMethods}
          activeCardIndex={activeCardIndex}
          onCardChange={setActiveCardIndex}
        />
      )}

      {currentStep === "confirmation" && (
        <CheckoutConfirmationStep
          items={items}
          total={total}
          selectedAddress={selectedAddress}
          selectedPayment={selectedPayment}
          direction={direction}
          selectedShipping={selectedShipping}
        />
      )}

      {showFooter && (
        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.totalLabel}>
              {currentStep === "summary" ? "EST. TOTAL" : "TOTAL"}
            </Text>
            <Text style={styles.totalValue}>
              ${(selectedShipping === "delivery" ? total + 15 : total).toLocaleString()}
            </Text>
          </View>
          <View style={{ backgroundColor: Theme.colors.primary }}>
            <AnimatedTouchableOpacity
              onPress={handleNext}
              disabled={isOrdering}
              style={[
                styles.checkoutBtn,
                { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 },
                isOrdering && styles.disabledBtn,
              ]}
            >
              {isOrdering ? (
                <ActivityIndicator color={Theme.colors.white} />
              ) : (
                <Image
                  source={Images.header.shoppingBag}
                  style={styles.btnIcon}
                  tintColor={Theme.colors.white}
                />
              )}
              <Text style={styles.checkoutBtnText}>
                {isOrdering ? "PROCESSING..." : getButtonText()}
              </Text>
            </AnimatedTouchableOpacity>
          </View>
        </View>
      )}

      {(currentStep === "order_summary" || currentStep === "success") && (
        <View style={{ flex: 1 }}>
          <View style={{ paddingTop: insets.top, marginBottom: 5 }}>
            <AppHeader showBack={false} hideIcons={true} />
          </View>
          <OrderSummaryStep
            orderId={orderId}
            orderedItems={orderedItems}
            orderedTotal={orderedTotal}
            selectedAddress={selectedAddress}
            selectedShipping={selectedShipping}
            onBackToList={() => router.push("/products")}
          />
        </View>
      )}

      {currentStep === "success" && (
        <CheckoutSuccessStep
          orderId={orderId}
          selectedRating={selectedRating}
          onSelectRating={setSelectedRating}
          onSubmitRating={() => changeStep("order_summary")}
          onClose={() => changeStep("order_summary")}
        />
      )}

      <ShippingMethodModal
        visible={isShippingModalVisible}
        onClose={() => setIsShippingModalVisible(false)}
        selectedMethod={selectedShipping}
        onSelect={setSelectedShipping}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  progressBarContainer: {
    height: 2,
    backgroundColor: Theme.colors.grey[100],
    width: "100%",
  },
  progressBar: {
    height: "100%",
    backgroundColor: Theme.colors.accent,
  },
  footer: {
    backgroundColor: Theme.colors.white,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  totalLabel: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.primary,
    letterSpacing: Theme.typography.letterSpacing.wider,
  },
  totalValue: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h3,
    color: Theme.colors.accent,
    fontWeight: "700",
    letterSpacing: Theme.typography.letterSpacing.wider,
  },
  checkoutBtn: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  disabledBtn: {
    opacity: 0.7,
  },
  btnIcon: {
    width: 20,
    height: 20,
  },
  checkoutBtnText: {
    color: Theme.colors.white,
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: "600",
    letterSpacing: Theme.typography.letterSpacing.wider,
  },
});
