import FloatingLabelInput from "@/src/components/common/FloatingLabelInput";
import { Theme } from "@/src/constants/theme";
import { PaymentMethod } from "@/src/api/types";
import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Dimensions,
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
import TitleUnderline from "@/src/components/common/TitleUnderline";

const { width } = Dimensions.get("window");

interface CheckoutAddCardStepProps {
  paymentMethods: PaymentMethod[];
  selectedPaymentId: string;
  card: { name: string; number: string; expiry: string; cvv: string };
  activeCardIndex: number;
  direction: "forward" | "backward";
  setCard: (updates: any) => void;
  onCardChange: (index: number) => void;
  onNext?: () => void;
  buttonText?: string;
}

const CheckoutAddCardStep: React.FC<CheckoutAddCardStepProps> = ({
  paymentMethods,
  selectedPaymentId,
  card,
  activeCardIndex,
  direction,
  setCard,
  onCardChange,
  onNext,
  buttonText,
}) => {
  return (
    <Animated.View
      entering={direction === "forward" ? FadeInRight : FadeInLeft}
      exiting={direction === "forward" ? FadeOutLeft : FadeOutRight}
      style={{ flex: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>PAYMENT METHOD</Text>
          <TitleUnderline />
        </View>

        <ScrollView
          horizontal
          pagingEnabled={false}
          snapToOffsets={[...Array(paymentMethods.length + 1)].map(
            (_, i) => i * (width * 0.8 + 16),
          )}
          snapToAlignment="start"
          decelerationRate="fast"
          disableIntervalMomentum={true}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(e) => {
            const snapInterval = width * 0.8 + 16;
            const index = Math.round(
              e.nativeEvent.contentOffset.x / snapInterval,
            );
            onCardChange(index);
          }}
          contentContainerStyle={{
            paddingLeft: (width - width * 0.8) / 2,
            paddingRight: (width - width * 0.8) / 2 - 16,
          }}
          style={{ marginBottom: 10, marginHorizontal: -20 }}
        >
          {paymentMethods.map((pm, index) => (
            <View
              key={pm.id}
              style={[
                styles.cardPreviewPremium,
                {
                  width: width * 0.8,
                  marginRight: 16,
                  marginHorizontal: 0,
                },
              ]}
            >
              <View style={styles.cardPreviewHeader}>
                <View style={styles.mastercardLogoMain}>
                  <View
                    style={[
                      styles.mastercardCircle,
                      { backgroundColor: "#EB001B" },
                    ]}
                  />
                  <View
                    style={[
                      styles.mastercardCircle,
                      {
                        backgroundColor: "#F79E1B",
                        marginLeft: -15,
                        opacity: 0.9,
                      },
                    ]}
                  />
                </View>
              </View>
              <View>
                <Text style={styles.cardPreviewName}>
                  {pm.id === selectedPaymentId ? "Iris Watson" : "Name on Card"}
                </Text>
                <Text style={styles.cardPreviewNumber}>•••• •••• •••• {pm.lastFour}</Text>
                <Text style={styles.cardPreviewExpiry}>{pm.expiryDate}</Text>
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={[styles.dashedCard, { width: width * 0.8, marginRight: 16 }]}
            onPress={() => {
              Alert.alert(
                "Photo Entry",
                "Do you want to enter card information by photo?",
                [
                  { text: "No", style: "cancel" },
                  { text: "Yes", onPress: () => console.log("Camera trigger") },
                ],
              );
            }}
          >
            <View style={styles.dashedCircle}>
              <Feather name="plus" size={30} color={Theme.colors.grey[300]} />
            </View>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.diamondContainer}>
          {[...Array(paymentMethods.length + 1)].map((_, i) => (
            <View
              key={i}
              style={[
                styles.diamond,
                activeCardIndex === i && styles.diamondActive,
              ]}
            />
          ))}
        </View>

        <View style={styles.formContainer}>
          <FloatingLabelInput
            label="Name On Card"
            value={card.name}
            onChangeText={(text) => setCard({ name: text })}
          />

          <FloatingLabelInput
            label="Card Number"
            value={card.number}
            keyboardType="numeric"
            maxLength={19}
            onChangeText={(text) => {
              const formatted = text
                .replace(/\D/g, "")
                .replace(/(.{4})/g, "$1 ")
                .trim();
              setCard({ number: formatted });
            }}
          />

          <View style={styles.inputRow}>
            <View style={{ flex: 1 }}>
              <FloatingLabelInput
                label="Exp Month"
                value={card.expiry.split("/")[0] || ""}
                keyboardType="numeric"
                maxLength={2}
                onChangeText={(text) => {
                  const parts = card.expiry.split("/");
                  setCard({ expiry: `${text}/${parts[1] || ""}` });
                }}
              />
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <FloatingLabelInput
                label="Exp Date"
                value={card.expiry.split("/")[1] || ""}
                keyboardType="numeric"
                maxLength={2}
                onChangeText={(text) => {
                  const parts = card.expiry.split("/");
                  setCard({ expiry: `${parts[0] || ""}/${text}` });
                }}
              />
            </View>
          </View>

          <FloatingLabelInput
            label="CVV"
            value={card.cvv}
            keyboardType="numeric"
            maxLength={3}
            secureTextEntry
            onChangeText={(text) => setCard({ cvv: text })}
          />
        </View>
      </ScrollView>
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
  underline: {
    width: 150,
    height: 15,
    alignSelf: "center",
  },
  cardPreviewPremium: {
    height: 180,
    borderRadius: 16,
    padding: 24,
    backgroundColor: Theme.colors.secondary,
    justifyContent: "space-between",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  cardPreviewHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  mastercardLogoMain: {
    flexDirection: "row",
  },
  mastercardCircle: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  cardPreviewName: {
    color: "rgba(255,255,255,0.7)",
    fontSize: Theme.typography.fontSize.xs,
    fontFamily: Theme.typography.fontFamily.main,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: Theme.typography.letterSpacing.wide,
  },
  cardPreviewNumber: {
    color: Theme.colors.white,
    fontSize: Theme.typography.fontSize.h4,
    fontFamily: Theme.typography.fontFamily.main,
    letterSpacing: Theme.typography.letterSpacing.wider,
    marginBottom: 12,
  },
  cardPreviewExpiry: {
    color: Theme.colors.white,
    fontSize: Theme.typography.fontSize.base,
    fontFamily: Theme.typography.fontFamily.main,
  },
  dashedCard: {
    height: 180,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Theme.colors.grey[200],
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.grey[50],
  },
  dashedCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Theme.colors.grey[200],
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Theme.colors.white,
  },
  diamondContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 20,
  },
  diamond: {
    width: 8,
    height: 8,
    backgroundColor: Theme.colors.grey[200],
    transform: [{ rotate: "45deg" }],
  },
  diamondActive: {
    backgroundColor: Theme.colors.accent,
  },
  formContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  inputRow: {
    flexDirection: "row",
    gap: 15,
  },
  mainBtn: {
    backgroundColor: Theme.colors.primary,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  mainBtnText: {
    color: Theme.colors.white,
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    letterSpacing: Theme.typography.letterSpacing.wide,
  },
});

export default CheckoutAddCardStep;
