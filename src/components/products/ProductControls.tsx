import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Theme } from '@/src/constants/theme';
import { Ionicons } from "@expo/vector-icons";

interface ColorOption {
  id: string;
  hex: string;
  name: string;
}

interface ProductControlsProps {
  isJewelry: boolean;
  isShoes: boolean;
  colors: ColorOption[];
  selectedColor: string;
  setSelectedColor: (id: string) => void;
  sizes: string[];
  selectedSize: string | null;
  setSelectedSize: (size: string | null) => void;
  sizeLabel: string;
  onOpenSizeModal: () => void;
}

const ProductControls: React.FC<ProductControlsProps> = ({
  isJewelry,
  isShoes,
  colors,
  selectedColor,
  setSelectedColor,
  sizes,
  selectedSize,
  setSelectedSize,
  sizeLabel,
  onOpenSizeModal,
}) => {
  return (
    <View style={styles.colorSizeSection}>
      {!isJewelry && (
        <View style={styles.colorSection}>
          <Text style={styles.sectionTitle}>Color</Text>
          <View style={styles.colorRow}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color.id}
                style={[
                  styles.colorCircleOuter,
                  selectedColor === color.id && styles.colorCircleActive,
                ]}
                onPress={() => setSelectedColor(color.id)}
              >
                <View
                  style={[
                    styles.colorCircleInner,
                    { backgroundColor: color.hex },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <View style={styles.sizeSection}>
        <Text style={styles.sectionTitle}>{sizeLabel}</Text>
        {isShoes ? (
          <TouchableOpacity
            style={styles.sizePickerButton}
            onPress={onOpenSizeModal}
          >
            <Text style={styles.sizePickerText}>
              {selectedSize || "Select"}
            </Text>
            <Ionicons
              name="chevron-down"
              size={16}
              color={Theme.colors.primary}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.sizeRow}>
            {sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.activeSizeButton,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={[
                    styles.sizeButtonText,
                    selectedSize === size && styles.activeSizeButtonText,
                  ]}
                >
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  colorSizeSection: {
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 30,
    marginTop: 10,
    paddingHorizontal: 24,
  },
  colorSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sectionTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.primary,
  },
  colorRow: {
    gap: 8,
    flexDirection: "row",
  },
  colorCircleOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  colorCircleActive: {
    borderColor: Theme.colors.grey[500],
  },
  colorCircleInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  sizeSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sizeRow: {
    flexDirection: "row",
    gap: 12,
  },
  sizeButton: {
    minWidth: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },
  activeSizeButton: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  sizeButtonText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.primary,
  },
  activeSizeButtonText: {
    color: Theme.colors.white,
  },
  sizePickerButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Theme.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 120,
    borderRadius: Theme.borderRadius.sm,
  },
  sizePickerText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.primary,
  },
});

export default ProductControls;
