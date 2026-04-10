import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { Address, PaymentMethod } from "@/src/api/types";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
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

interface CheckoutSetupStepProps {
  selectedAddress: Address;
  selectedPayment: PaymentMethod;
  selectedShipping: string;
  direction: "forward" | "backward";
  onChangeStep: (step: any) => void;
  onOpenShippingModal: () => void;
}

const CheckoutSetupStep: React.FC<CheckoutSetupStepProps> = ({
  selectedAddress,
  selectedPayment,
  selectedShipping,
  direction,
  onChangeStep = () => {},
  onOpenShippingModal,
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
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 10 }]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.pageTitle}>CHECKOUT</Text>
            <Image
              source={Images.home.titleUnderline}
              style={styles.underline}
              resizeMode="contain"
            />
          </View>

          <View style={styles.setupSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>SHIPPING ADDRESS</Text>
            </View>
            <TouchableOpacity
              style={styles.setupBox}
              onPress={() => onChangeStep && onChangeStep("address_list")}
            >
              <View style={styles.setupInfo}>
                <Text style={styles.setupName}>
                  {selectedAddress?.firstName} {selectedAddress?.lastName}
                </Text>
                <Text style={styles.setupText}>{selectedAddress?.street}</Text>
                <Text style={styles.setupText}>
                  {selectedAddress?.city}, {selectedAddress?.state}{" "}
                  {selectedAddress?.zipCode}
                </Text>
              </View>
              <Feather
                name="chevron-right"
                size={20}
                color={Theme.colors.grey[400]}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.setupSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>
            </View>
            <TouchableOpacity
              style={styles.setupBox}
              onPress={() => onChangeStep && onChangeStep("add_card")}
            >
              <View style={styles.setupInfo}>
                <Text style={styles.setupName}>{selectedPayment?.brand}</Text>
                <Text style={styles.setupText}>
                  Ending in {selectedPayment?.lastFour}
                </Text>
              </View>
              <Feather
                name="chevron-right"
                size={20}
                color={Theme.colors.grey[400]}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.setupSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>SHIPPING METHOD</Text>
            </View>
            <TouchableOpacity
              style={styles.setupBox}
              onPress={onOpenShippingModal}
            >
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
              <Feather
                name="chevron-right"
                size={20}
                color={Theme.colors.grey[400]}
              />
            </TouchableOpacity>
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
    color: Theme.colors.primary,
    textTransform: "uppercase",
  },
  underline: {
    width: 150,
    height: 15,
  },
  setupSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.grey[500],
    letterSpacing: Theme.typography.letterSpacing.wide,
    textTransform: "uppercase",
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
});

export default CheckoutSetupStep;
