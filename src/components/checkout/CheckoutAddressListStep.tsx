import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { Address } from "@/src/api/types";
import { Feather, Ionicons } from "@expo/vector-icons";
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

interface CheckoutAddressListStepProps {
  addresses: Address[];
  selectedAddressId: string;
  direction: "forward" | "backward";
  onSelectAddress: (id: string) => void;
  onEditAddress: (id: string) => void;
  onAddNewAddress: () => void;
}

const CheckoutAddressListStep: React.FC<CheckoutAddressListStepProps> = ({
  addresses,
  selectedAddressId,
  direction,
  onSelectAddress,
  onEditAddress,
  onAddNewAddress,
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
            <Text style={styles.pageTitle}>SHIPPING ADDRESS</Text>
            <Image
              source={Images.home.titleUnderline}
              style={styles.underline}
              resizeMode="contain"
            />
          </View>

          <View style={styles.addressListContainer}>
            {addresses.map((addr) => (
              <TouchableOpacity
                key={addr.id}
                style={[
                  styles.addressCard,
                  selectedAddressId === addr.id && styles.addressCardSelected,
                ]}
                onPress={() => onSelectAddress(addr.id)}
              >
                <View style={styles.addressHeader}>
                  <Ionicons
                    name={
                      selectedAddressId === addr.id
                        ? "radio-button-on"
                        : "radio-button-off"
                    }
                    size={20}
                    color={
                      selectedAddressId === addr.id
                        ? Theme.colors.accent
                        : Theme.colors.grey[500]
                    }
                  />
                  <Text style={styles.addressName}>
                    {addr.firstName} {addr.lastName}
                  </Text>
                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      onEditAddress(addr.id);
                    }}
                  >
                    <Feather
                      name="edit-3"
                      size={18}
                      color={Theme.colors.grey[500]}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.addressMain}>
                  <Text style={styles.addressText}>{addr.street}</Text>
                  <Text style={styles.addressText}>
                    {addr.city}, {addr.state} {addr.zipCode}
                  </Text>
                  <Text style={styles.addressText}>{addr.phone}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.addAddressInnerContainer}>
            <TouchableOpacity
              style={styles.addAddressBtn}
              onPress={onAddNewAddress}
            >
              <Text style={styles.addAddressText}>Add shipping address</Text>
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
  addressListContainer: {
    gap: 15,
  },
  addressCard: {
    padding: 20,
    borderWidth: 1,
    borderColor: Theme.colors.grey[100],
    borderRadius: 8,
    backgroundColor: Theme.colors.white,
  },
  addressCardSelected: {
    borderColor: Theme.colors.accent,
    backgroundColor: Theme.colors.grey[50],
  },
  addressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  addressName: {
    flex: 1,
    marginLeft: 12,
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.primary,
  },
  addressMain: {
    paddingLeft: 32,
  },
  addressText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.grey[500],
    lineHeight: Theme.typography.lineHeight.base,
    marginBottom: 2,
  },
  addAddressInnerContainer: {
    paddingVertical: 10,
    marginTop: 10,
  },
  addAddressBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: Theme.colors.grey[50],
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Theme.colors.grey[100],
    gap: 8,
  },
  addAddressText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.secondary,
    letterSpacing: Theme.typography.letterSpacing.wide,
  },
});

export default CheckoutAddressListStep;
