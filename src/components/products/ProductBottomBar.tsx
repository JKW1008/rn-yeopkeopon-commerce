import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Theme } from '@/src/constants/theme';
import { Ionicons } from "@expo/vector-icons";

interface ProductBottomBarProps {
  onAddToBasket: () => void;
  onToggleLike: () => void;
  isLiked: boolean;
}

const ProductBottomBar: React.FC<ProductBottomBarProps> = ({
  onAddToBasket,
  onToggleLike,
  isLiked,
}) => {
  return (
    <View style={styles.bottomBar}>
      <View style={styles.bottomBarContent}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={onAddToBasket}
        >
          <Ionicons name="add" size={24} color={Theme.colors.white} />
          <Text style={styles.addToCartText}>ADD TO BASKET</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onToggleLike}
          style={styles.detailHeartButton}
        >
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={24}
            color={isLiked ? Theme.colors.accent : Theme.colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    width: "100%",
    backgroundColor: Theme.colors.white,
    paddingBottom: 24,
    marginTop: 20,
  },
  bottomBarContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.primary,
    height: 56,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    gap: 12,
  },
  detailHeartButton: {
    width: 56,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 30,
  },
  addToCartText: {
    color: Theme.colors.white,
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: "600",
    letterSpacing: Theme.typography.letterSpacing.wide,
  },
});

export default ProductBottomBar;
