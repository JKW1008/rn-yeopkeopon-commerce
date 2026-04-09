import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProductInfoProps {
  brand: string;
  name: string;
  price: number;
  onShare: () => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  brand,
  name,
  price,
  onShare,
}) => {
  return (
    <View style={styles.infoSection}>
      <View style={styles.brandRow}>
        <Text style={styles.brandText}>{brand}</Text>
        <TouchableOpacity onPress={onShare}>
          <Image
            source={Images.productDetail.export}
            style={styles.shareIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.nameText}>{name}</Text>

      <Text style={styles.priceText}>{`$${price}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoSection: {
    padding: 16,
    paddingHorizontal: 24,
  },
  brandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  brandText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
    color: Theme.colors.primary,
    letterSpacing: Theme.typography.letterSpacing.extraWide,
    textTransform: "uppercase",
  },
  shareIcon: {
    width: 16,
    height: 16,
    tintColor: Theme.colors.primary,
  },
  nameText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
    color: Theme.colors.secondary,
    lineHeight: 28,
    marginBottom: 8,
  },
  priceText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
    color: Theme.colors.accent,
  },
});

export default ProductInfo;
