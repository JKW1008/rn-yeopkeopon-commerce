import { Images } from "@/src/constants/theme/images";
import { useMenuStore } from "@/src/store/useMenuStore";
import { useCartStore } from "@/src/store/useCartStore";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function AppHeader() {
  const openMenu = useMenuStore((state) => state.openMenu);
  const openCart = useCartStore((state) => state.openCart);

  return (
    <View style={styles.container}>
      <View style={styles.sideArea}>
        <TouchableOpacity onPress={openMenu}>
          <Image
            source={Images.header.menu}
            style={styles.headerIcons}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <Image
        source={Images.header.logo}
        style={styles.logoImage}
        resizeMode="contain"
      ></Image>
      <View style={[styles.sideArea, { justifyContent: "flex-end" }]}>
        <View style={styles.rightActions}>
          <TouchableOpacity>
            <Image
              source={Images.header.search}
              style={styles.headerIcons}
              resizeMode="contain"
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity onPress={openCart}>
            <Image
              source={Images.header.shoppingBag}
              style={styles.headerIcons}
              resizeMode="contain"
            ></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  sideArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: 100,
    height: 40,
  },
  headerIcons: {
    width: 24,
    height: 24,
  },
  rightActions: {
    flexDirection: "row",
    gap: 16,
  },
});
