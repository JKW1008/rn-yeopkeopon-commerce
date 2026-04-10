import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { SnsPost } from "@/src/api/types";

const PROFILES_FALLBACK = [
  { id: "1", image_url: Images.home.profile.mia1, username: "@mia" },
  { id: "2", image_url: Images.home.profile.jihyn1, username: "@_jihyn" },
  { id: "3", image_url: Images.home.profile.mia2, username: "@mia" },
  { id: "4", image_url: Images.home.profile.jihyn2, username: "@_jihyn" },
];

export default function SnsSection({ data = [] }: { data: SnsPost[] }) {
  const { width } = useWindowDimensions();
  const ITEM_SIZE = (width - 50) / 2;

  const displayPosts = data.length > 0 ? data : PROFILES_FALLBACK;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>FOLLOW US</Text>
        <Image
          source={Images.home.stickers.lineInstagram}
          style={styles.instaIcon}
          resizeMode="contain"
        />
      </View>
      <View style={styles.profileGrid}>
        {displayPosts.map((profile) => (
          <View
            key={profile.id}
            style={[styles.profileItem, { width: ITEM_SIZE, marginBottom: 16 }]}
          >
            <Image
              source={typeof profile.image_url === "string" ? { uri: profile.image_url } : profile.image_url}
              style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
              resizeMode="cover"
            />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={styles.gradientOverlay}
            />
            <Text style={styles.profileText}>{profile.username}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff2c",
    paddingTop: 30,
    width: "100%",
  },
  titleContainer: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  titleText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h3,
    color: Theme.colors.primary,
    letterSpacing: Theme.typography.letterSpacing.luxury,
    marginBottom: 8,
  },
  instaIcon: {
    width: 24,
    height: 24,
  },
  profileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  profileItem: {
    position: "relative",
  },
  gradientOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },
  profileText: {
    position: "absolute",
    bottom: 10,
    left: 5,
    color: "#fff",
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.lg,
    letterSpacing: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: "hidden",
  },
});
