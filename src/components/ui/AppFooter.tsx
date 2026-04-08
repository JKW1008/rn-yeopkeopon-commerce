import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

export default function AppFooter() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={Images.footer.twitter}
            style={styles.socialIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={Images.footer.instagram}
            style={styles.socialIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={Images.footer.youtube}
            style={styles.socialIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <Image
        source={Images.home.titleUnderline}
        style={styles.underline}
        resizeMode="contain"
      />

      <View style={styles.contactContainer}>
        <Text style={styles.contactText}>support@openui.design</Text>
        <Text style={styles.contactText}>+60 825 876</Text>
        <Text style={styles.contactText}>08:00 - 22:00 - Everyday</Text>
      </View>
      <Image
        source={Images.home.titleUnderline}
        style={styles.underline}
        resizeMode="contain"
      />

      {/* 3. 메뉴 링크 섹션 */}
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

      {/* 4. 카피라이트 꼬리말 섹션 */}
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
    gap: 30,
    marginBottom: 20,
  },
  iconButton: {
    padding: 8,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  underline: {
    width: 150,
    height: 15,
    alignSelf: "center",
  },
  contactContainer: {
    alignItems: "center",
    marginTop: 20,
    gap: 8,
    marginBottom: 20,
  },
  contactText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.secondary,
    letterSpacing: 0.5,
  },

  linksContainer: {
    flexDirection: "row",
    gap: 60,
    marginVertical: 30,
  },
  linkText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.primary,
  },
  copyrightContainer: {
    backgroundColor: Theme.colors.grey[100] || "#f8f8f8",
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
  },
  copyrightText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.xs,
    color: Theme.colors.grey[500] || "#888888",
    letterSpacing: 0.5,
  },
});
