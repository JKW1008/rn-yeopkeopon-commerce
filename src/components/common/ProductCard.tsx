import { Theme } from "@/src/constants/theme/index";
import { Product } from "@/src/types/database";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProductCardProps {
  product: Product;
  onPress: (id: string) => void;
}

export default function ProductCard({ product, onPress }: ProductCardProps) {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => onPress(product.id)}
      activeOpacity={0.7}
    >
      <Image
        source={{
          uri:
            product.images && product.images.length > 0
              ? product.images[0]
              : "https://via.placeholder.com/300x400",
        }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.productName} numberOfLines={2}>
          {product.name ? product.name : "21WN reversible angora cardigan"}
        </Text>
        <Text style={styles.price}>${product.price?.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 4,
    backgroundColor: Theme.colors.grey[100],
  },
  infoContainer: {
    paddingTop: 6,
    alignItems: "center",
  },
  productName: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.primary,
    textAlign: "center",
    marginBottom: 6,
  },
  price: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.accent,
  },
});
