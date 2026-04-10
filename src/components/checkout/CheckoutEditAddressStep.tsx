import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, { FadeInLeft, FadeInRight, FadeOutLeft, FadeOutRight } from 'react-native-reanimated';
import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import FloatingLabelInput from "@/src/components/common/FloatingLabelInput";
import { Address } from "@/src/api/types";

interface CheckoutEditAddressStepProps {
  tempAddress: Address;
  direction: 'forward' | 'backward';
  onUpdateTempAddress: (updates: Partial<Address>) => void;
  onNext: () => void;
}

const CheckoutEditAddressStep: React.FC<CheckoutEditAddressStepProps> = ({
  tempAddress,
  direction,
  onUpdateTempAddress,
  onNext,
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
          <Text style={styles.pageTitle}>EDIT ADDRESS</Text>
          <Image
            source={Images.home.titleUnderline}
            style={styles.underline}
            resizeMode="contain"
          />
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputRow}>
            <View style={{ flex: 1 }}>
              <FloatingLabelInput
                label="First name"
                value={tempAddress?.firstName || ""}
                onChangeText={(text) =>
                  onUpdateTempAddress && onUpdateTempAddress({ firstName: text })
                }
              />
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <FloatingLabelInput
                label="Last name"
                value={tempAddress?.lastName || ""}
                onChangeText={(text) =>
                  onUpdateTempAddress && onUpdateTempAddress({ lastName: text })
                }
              />
            </View>
          </View>

          <FloatingLabelInput
            label="Address"
            value={tempAddress?.street || ""}
            onChangeText={(text) =>
              onUpdateTempAddress && onUpdateTempAddress({ street: text })
            }
          />

          <FloatingLabelInput
            label="City"
            value={tempAddress?.city || ""}
            onChangeText={(text) =>
              onUpdateTempAddress && onUpdateTempAddress({ city: text })
            }
          />

          <View style={styles.inputRow}>
            <View style={{ flex: 1 }}>
              <FloatingLabelInput
                label="State"
                value={tempAddress?.state || ""}
                onChangeText={(text) =>
                  onUpdateTempAddress && onUpdateTempAddress({ state: text })
                }
              />
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <FloatingLabelInput
                label="ZIP code"
                value={tempAddress?.zipCode || ""}
                keyboardType="numeric"
                maxLength={5}
                onChangeText={(text) => {
                  const cleaned = text.replace(/[^0-9]/g, "");
                  onUpdateTempAddress && onUpdateTempAddress({ zipCode: cleaned });
                }}
              />
            </View>
          </View>

          <FloatingLabelInput
            label="Phone number"
            value={tempAddress?.phone || ""}
            keyboardType="phone-pad"
            onChangeText={(text) => {
              const cleaned = text.replace(/[^0-9+\-() ]/g, "");
              onUpdateTempAddress && onUpdateTempAddress({ phone: cleaned });
            }}
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
  formContainer: {
    paddingHorizontal: 20,
    gap: 10,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 0,
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

export default CheckoutEditAddressStep;
