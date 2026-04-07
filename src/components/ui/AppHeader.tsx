import { Images } from "@/src/constants/theme/images";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function AppHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.sideArea}>
        <TouchableOpacity>
          <Image
            source={Images.menu}
            style={styles.headerIcons}
            resizeMode="contain"
          ></Image>
        </TouchableOpacity>
      </View>
      <Image
        source={Images.logo}
        style={styles.logoImage}
        resizeMode="contain"
      ></Image>
      <View style={[styles.sideArea, { justifyContent: "flex-end" }]}>
        <View style={styles.rightActions}>
          <TouchableOpacity>
            <Image
              source={Images.search}
              style={styles.headerIcons}
              resizeMode="contain"
            ></Image>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={Images.shoppingBag}
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
