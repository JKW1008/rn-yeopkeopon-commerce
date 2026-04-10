import { Theme } from "@/src/constants/theme";
import { scale, vs } from "@/src/utils/responsive";
import { Images } from "@/src/constants/theme/images";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AppFooter() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons
            name="logo-twitter"
            size={24}
            color={Theme.colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons
            name="logo-instagram"
            size={24}
            color={Theme.colors.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons
            name="logo-youtube"
            size={24}
            color={Theme.colors.primary}
          />
        </TouchableOpacity>
      </View>

      <Image
        source={Images.home.titleUnderline}
        style={{ width: scale(150), height: vs(15) }}
        resizeMode="contain"
      />

      <View style={styles.contactContainer}>
        <Text style={styles.contactText}>support@openui.design</Text>
        <Text style={styles.contactText}>+60 825 876</Text>
        <Text style={styles.contactText}>08:00 - 22:00 - Everyday</Text>
      </View>

      <Image
        source={Images.home.titleUnderline}
        style={{ width: scale(150), height: vs(15) }}
        resizeMode="contain"
      />

      <View style={styles.linksContainer}>
        <TouchableOpacity>
          <Text style={styles.linkText}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.linkText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/blog")}>
          <Text style={styles.linkText}>Blog</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.copyrightContainer}>
        <Text style={styles.copyrightText}>
          Copyright© OpenUI All Rights Reserved.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.white,
    alignItems: "center",
    paddingTop: vs(40),
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: scale(40),
    marginBottom: vs(20),
  },
  iconButton: {
    padding: scale(8),
  },
  dividerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "40%",
    justifyContent: "center",
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Theme.colors.grey[300],
  },
  diamond: {
    marginHorizontal: 10,
    transform: [{ rotate: "45deg" }],
  },
  contactContainer: {
    alignItems: "center",
    marginVertical: vs(20),
    gap: vs(12),
  },
  contactText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
    color: Theme.colors.primary,
    textAlign: "center",
  },
  linksContainer: {
    flexDirection: "row",
    gap: scale(50),
    marginVertical: vs(40),
  },
  linkText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.primary,
  },
  copyrightContainer: {
    backgroundColor: Theme.colors.grey[100],
    width: "100%",
    alignItems: "center",
    paddingVertical: vs(15),
  },
  copyrightText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.sm,
    color: Theme.colors.grey[500],
  },
});
