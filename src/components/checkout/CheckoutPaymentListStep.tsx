import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInLeft, FadeInRight, FadeOutLeft, FadeOutRight } from 'react-native-reanimated';
import { Ionicons, Feather } from "@expo/vector-icons";
import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { PaymentMethod } from "@/src/api/types";

interface CheckoutPaymentListStepProps {
  paymentMethods: PaymentMethod[];
  selectedPaymentId: string;
  direction: 'forward' | 'backward';
  onSelectPayment: (id: string) => void;
  onAddNewCard: () => void;
}

const CheckoutPaymentListStep: React.FC<CheckoutPaymentListStepProps> = ({
  paymentMethods,
  selectedPaymentId,
  direction,
  onSelectPayment,
  onAddNewCard,
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
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 20 }]}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.pageTitle}>PAYMENT METHOD</Text>
            <Image
              source={Images.home.titleUnderline}
              style={styles.underline}
              resizeMode="contain"
            />
          </View>

          <View style={styles.paymentListContainer}>
            {paymentMethods.map((pm) => (
              <TouchableOpacity
                key={pm.id}
                style={[
                  styles.paymentCard,
                  selectedPaymentId === pm.id && styles.paymentCardSelected,
                ]}
                onPress={() => onSelectPayment(pm.id)}
              >
                <View style={styles.paymentHeader}>
                  <Ionicons
                    name={
                      selectedPaymentId === pm.id
                        ? "radio-button-on"
                        : "radio-button-off"
                    }
                    size={20}
                    color={selectedPaymentId === pm.id ? Theme.colors.accent : Theme.colors.grey[500]}
                  />
                  <Text style={styles.paymentName}>{pm.brand}</Text>
                </View>
                <View style={styles.paymentMain}>
                  <Text style={styles.paymentText}>•••• {pm.lastFour}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.addPaymentInnerContainer}>
            <TouchableOpacity
              style={styles.addPaymentBtn}
              onPress={onAddNewCard}
            >
              <Text style={styles.addPaymentText}>Add payment method</Text>
              <Feather name="plus" size={18} color={Theme.colors.grey[500]} />
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
    marginBottom: 30,
    alignItems: 'center',
  },
  pageTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
    letterSpacing: Theme.typography.letterSpacing.extraWide,
    textAlign: "center",
    color: Theme.colors.primary,
    textTransform: "uppercase",
  },
  underline: {
    width: 150,
    height: 15,
    alignSelf: "center",
  },
  paymentListContainer: {
    gap: 15,
  },
  paymentCard: {
    padding: 20,
    borderWidth: 1,
    borderColor: Theme.colors.grey[100],
    borderRadius: 8,
    backgroundColor: Theme.colors.white,
  },
  paymentCardSelected: {
    borderColor: Theme.colors.accent,
    backgroundColor: Theme.colors.grey[50],
  },
  paymentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  paymentName: {
    marginLeft: 12,
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.primary,
  },
  paymentMain: {
    paddingLeft: 32,
  },
  paymentText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.grey[500],
  },
  addPaymentInnerContainer: {
    paddingVertical: 10,
    marginTop: 10,
  },
  addPaymentBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: Theme.colors.grey[50],
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Theme.colors.grey[100],
    gap: 8,
  },
  addPaymentText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.secondary,
    letterSpacing: Theme.typography.letterSpacing.wide,
  },
});

export default CheckoutPaymentListStep;
