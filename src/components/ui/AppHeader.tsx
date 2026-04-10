import { Theme } from "@/src/constants/theme";
import { scale, vs } from "@/src/utils/responsive";
import { Images } from "@/src/constants/theme/images";
import { useCartStore } from "@/src/store/useCartStore";
import { useMenuStore } from "@/src/store/useMenuStore";
import { Entypo } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface AppHeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  hideIcons?: boolean;
}

export default function AppHeader({
  showBack,
  onBack,
  hideIcons = false,
}: AppHeaderProps) {
  const router = useRouter();
  const openMenu = useMenuStore((state) => state.openMenu);
  const openCart = useCartStore((state) => state.openCart);

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.sideArea}>
        {!hideIcons &&
          (showBack ? (
            <TouchableOpacity onPress={handleBack}>
              <Entypo
                name="chevron-thin-left"
                size={24}
                color={Theme.colors.primary}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={openMenu}>
              <Image
                source={Images.header.menu}
                style={styles.headerIcons}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
      </View>
      <TouchableOpacity onPress={() => router.push("/")}>
        <Image
          source={Images.header.logo}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View style={[styles.sideArea, { justifyContent: "flex-end" }]}>
        {!hideIcons && (
          <View style={styles.rightActions}>
            <TouchableOpacity onPress={() => router.push({ pathname: "/search", params: { from: "home" } })}>
              <Image
                source={Images.header.search}
                style={styles.headerIcons}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={openCart}>
              <Image
                source={Images.header.shoppingBag}
                style={styles.headerIcons}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: vs(60),
    backgroundColor: Theme.colors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(20),
  },
  sideArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: scale(100),
    height: vs(40),
  },
  headerIcons: {
    width: scale(24),
    height: scale(24),
  },
  rightActions: {
    flexDirection: "row",
    gap: scale(16),
  },
});
