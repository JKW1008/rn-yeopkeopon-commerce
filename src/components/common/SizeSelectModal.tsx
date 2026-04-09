import { Theme } from "@/src/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SizeSelectModalProps {
  visible: boolean;
  sizes: string[];
  selectedSize: string | null;
  label?: string;
  onSelect: (size: string | null) => void;
  onClose: () => void;
}

export default function SizeSelectModal({
  visible,
  sizes,
  selectedSize,
  label = "Size",
  onSelect,
  onClose,
}: SizeSelectModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.bottomSheet}>
          <View style={styles.bottomSheetHeader}>
            <Text style={styles.bottomSheetTitle}>
              SELECT {label.toUpperCase()}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={Theme.colors.primary} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.bottomSheetContent}>
            <View style={styles.sizeGrid}>
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size && styles.sizeButtonActive,
                  ]}
                  onPress={() => {
                    onSelect(size);
                    onClose();
                  }}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize === size && styles.sizeTextActive,
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheet: {
    width: "100%",
    backgroundColor: Theme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingBottom: 40,
    marginTop: "auto",
    maxHeight: "70%",
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    letterSpacing: Theme.typography.letterSpacing.wider,
    color: Theme.colors.primary,
  },
  bottomSheetContent: {
    paddingHorizontal: 20,
  },
  sizeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  sizeButton: {
    width: "22.5%",
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.md,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  sizeButtonActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  sizeText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.primary,
  },
  sizeTextActive: {
    color: Theme.colors.white,
  },
});
