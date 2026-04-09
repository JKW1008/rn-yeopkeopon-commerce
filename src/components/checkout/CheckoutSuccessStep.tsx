import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { AntDesign } from "@expo/vector-icons";
import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  FadeIn
} from 'react-native-reanimated';

const { width } = Dimensions.get("window");

interface CheckoutSuccessStepProps {
  orderId: string;
  selectedRating: number | null;
  onSelectRating: (rating: number) => void;
  onSubmitRating: () => void;
  onClose: () => void;
}

const CheckoutSuccessStep: React.FC<CheckoutSuccessStepProps> = ({
  orderId,
  selectedRating,
  onSelectRating,
  onSubmitRating,
  onClose,
}) => {
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(1);
    opacity.value = withTiming(1, { duration: 300 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View 
      entering={FadeIn}
      style={styles.overlay}
    >
      <Animated.View style={[styles.successCard, animatedStyle]}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={onClose}
        >
          <AntDesign name="close" size={24} color={Theme.colors.primary} />
        </TouchableOpacity>

        <Text style={styles.successTitle}>PAYMENT SUCCESS</Text>

        <View style={styles.successImageWrapper}>
          <Image 
            source={Images.checkoutStickers.success} 
            style={styles.successMainImage}
            resizeMode="contain" 
          />
        </View>

        <Text style={styles.successMsg}>Your purchase was successful!</Text>
        <Text style={styles.paymentId}>Payment ID: #{orderId}</Text>

        <Image
          source={Images.home.titleUnderline}
          style={styles.underlineImage}
        />

        <Text style={styles.rateTitle}>Rate your purchase</Text>

        <View style={styles.ratingIcons}>
          <TouchableOpacity 
            style={styles.ratingBtn}
            onPress={() => onSelectRating(0)}
          >
            <Image 
              source={Images.checkoutStickers.disappointed} 
              style={[styles.ratingImage, { tintColor: selectedRating === 0 ? Theme.colors.accent : Theme.colors.secondary }]} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.ratingBtn}
            onPress={() => onSelectRating(1)}
          >
            <Image 
              source={Images.checkoutStickers.happy} 
              style={[styles.ratingImage, { tintColor: selectedRating === 1 ? Theme.colors.accent : Theme.colors.secondary }]} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.ratingBtn}
            onPress={() => onSelectRating(2)}
          >
            <Image 
              source={Images.checkoutStickers.love} 
              style={[styles.ratingImage, { tintColor: selectedRating === 2 ? Theme.colors.accent : Theme.colors.secondary }]} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.successButtons}>
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={onSubmitRating}
          >
            <Text style={styles.submitText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    paddingHorizontal: 20,
  },
  successCard: {
    width: "100%",
    backgroundColor: Theme.colors.white,
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  closeBtn: {
    alignSelf: "flex-end",
    padding: 5,
    marginBottom: 10,
  },
  successTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
    color: Theme.colors.primary,
    letterSpacing: Theme.typography.letterSpacing.extraWide,
    marginBottom: 30,
  },
  successImageWrapper: {
    width: 120,
    height: 120,
    marginBottom: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  successMainImage: {
    width: "100%",
    height: "100%",
  },
  successMsg: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.primary,
    textAlign: "center",
    marginBottom: 6,
  },
  paymentId: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.base,
    color: Theme.colors.grey[500],
    marginBottom: 20,
  },
  underlineImage: {
    width: 120,
    height: 10,
    marginBottom: 30,
    tintColor: Theme.colors.border,
  },
  rateTitle: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.primary,
    marginBottom: 20,
    letterSpacing: Theme.typography.letterSpacing.wide,
  },
  ratingIcons: {
    flexDirection: "row",
    gap: 25,
    marginBottom: 40,
  },
  ratingBtn: {
    width: 45,
    height: 45,
  },
  ratingImage: {
    width: "100%",
    height: "100%",
  },
  successButtons: {
    width: "100%",
  },
  submitBtn: {
    width: "100%",
    height: 56,
    backgroundColor: Theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  submitText: {
    color: Theme.colors.white,
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    fontWeight: "600",
    letterSpacing: Theme.typography.letterSpacing.wider,
  },
});

export default CheckoutSuccessStep;
