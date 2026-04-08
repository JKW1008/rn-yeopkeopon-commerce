import { Theme } from "@/src/constants/theme";
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
        style={{ width: 150, height: 15 }}
        resizeMode="contain"
      />

      <View style={styles.contactContainer}>
        <Text style={styles.contactText}>support@openui.design</Text>
        <Text style={styles.contactText}>+60 825 876</Text>
        <Text style={styles.contactText}>08:00 - 22:00 - Everyday</Text>
      </View>

      <Image
        source={Images.home.titleUnderline}
        style={{ width: 150, height: 15 }}
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
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 40,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
    marginBottom: 20,
  },
  iconButton: {
    padding: 8,
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
    marginVertical: 20,
    gap: 12,
  },
  contactText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 18,
    color: Theme.colors.primary,
    textAlign: "center",
  },
  linksContainer: {
    flexDirection: "row",
    gap: 50,
    marginVertical: 40,
  },
  linkText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 16,
    color: Theme.colors.primary,
  },
  copyrightContainer: {
    backgroundColor: Theme.colors.grey[100] || "#f8f8f8",
    width: "100%",
    alignItems: "center",
    paddingVertical: 15,
  },
  copyrightText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: 13,
    color: Theme.colors.grey[500] || "#888888",
  },
});
