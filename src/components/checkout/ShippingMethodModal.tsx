import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Theme } from "@/src/constants/theme";
import { Ionicons } from "@expo/vector-icons";

interface ShippingMethodModalProps {
  visible: boolean;
  selectedMethod: string;
  onSelect: (method: string) => void;
  onClose: () => void;
}

const ShippingMethodModal: React.FC<ShippingMethodModalProps> = ({
  visible,
  selectedMethod,
  onSelect,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>SHIPPING METHOD</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.shippingOption,
              selectedMethod === "pickup" && styles.shippingOptionActive,
            ]}
            onPress={() => onSelect("pickup")}
          >
            <View>
              <Text
                style={[
                  styles.shippingOptionTitle,
                  selectedMethod === "pickup" &&
                    styles.shippingOptionTitleActive,
                ]}
              >
                Pickup at store
              </Text>
              <Text style={styles.shippingDesc}>FREE • Usually 1-2 days</Text>
            </View>
            <Ionicons
              name={
                selectedMethod === "pickup"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={20}
              color={selectedMethod === "pickup" ? Theme.colors.accent : Theme.colors.grey[500]}
            />
          </TouchableOpacity>

          <View style={styles.shippingDivider} />

          <TouchableOpacity
            style={[
              styles.shippingOption,
              selectedMethod === "delivery" && styles.shippingOptionActive,
            ]}
            onPress={() => onSelect("delivery")}
          >
            <View>
              <Text
                style={[
                  styles.shippingOptionTitle,
                  selectedMethod === "delivery" &&
                    styles.shippingOptionTitleActive,
                ]}
              >
                Standard Delivery
              </Text>
              <Text style={styles.shippingDesc}>
                $15.00 • 3-5 business days
              </Text>
            </View>
            <Ionicons
              name={
                selectedMethod === "delivery"
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={20}
              color={selectedMethod === "delivery" ? Theme.colors.accent : Theme.colors.grey[500]}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Theme.colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  modalHeader: {
    alignItems: "center",
    paddingVertical: 15,
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: Theme.colors.grey[200],
    borderRadius: 2,
    marginBottom: 15,
  },
  modalTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.primary,
    letterSpacing: Theme.typography.letterSpacing.wide,
  },
  shippingOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  shippingOptionActive: {
    backgroundColor: Theme.colors.grey[50],
    borderRadius: 12,
  },
  shippingOptionTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.primary,
    marginBottom: 4,
  },
  shippingOptionTitleActive: {
  },
  shippingDesc: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.grey[500],
  },
  shippingDivider: {
    height: 1,
    backgroundColor: Theme.colors.grey[100],
  },
});

export default ShippingMethodModal;
