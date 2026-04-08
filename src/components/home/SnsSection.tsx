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

const PROFILES = [
  { id: 1, image: Images.home.profile.mia1, text: "@mia" },
  { id: 2, image: Images.home.profile.jihyn1, text: "@_jihyn" },
  { id: 3, image: Images.home.profile.mia2, text: "@mia" },
  { id: 4, image: Images.home.profile.jihyn2, text: "@_jihyn" },
];

export default function SnsSection() {
  const { width } = useWindowDimensions();
  const ITEM_SIZE = (width - 50) / 2;

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
        {PROFILES.map((profile) => (
          <View
            key={profile.id}
            style={[styles.profileItem, { width: ITEM_SIZE, marginBottom: 16 }]}
          >
            <Image
              source={profile.image}
              style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
              resizeMode="cover"
            />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={styles.gradientOverlay}
            />
            <Text style={styles.profileText}>{profile.text}</Text>
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
