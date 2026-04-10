import { Theme } from "@/src/constants/theme";
import { ms, scale, vs } from "@/src/utils/responsive";
import { Images } from "@/src/constants/theme/images";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

interface Collection {
  id: string;
  name: string;
  image_url: string;
  description?: string;
}

export default function Collections() {
  const { width } = useWindowDimensions();

  const responsiveWidth = width - 100;
  const responsiveHeight = responsiveWidth / 0.9;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>COLLECTIONS</Text>
        <View style={styles.imageWrapper}>
          <Image
            source={Images.home.collections[1]}
            style={styles.firstImage}
            resizeMode="contain"
          />
          <Text style={styles.bigNumber}>{"10 "}</Text>
          <Text style={styles.monthText}>October</Text>
          <Text style={styles.overlayText}>COLLECTION</Text>
        </View>
      </View>

      <View style={styles.paddingWrapper}>
        <Image
          source={Images.home.collections[2]}
          style={[{ width: responsiveWidth, height: responsiveHeight }]}
          resizeMode="cover"
        />
        <Text style={styles.seasonText}>Autumn</Text>
        <Text style={styles.seasonOverlay}>COLLECTION</Text>
      </View>



      <View style={styles.videoSection}>
        <Image
          source={Images.home.collections.video}
          style={styles.videoImage}
          resizeMode="cover"
        />
        <View style={styles.playButton}>
          <Text style={styles.playIcon}>▶</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: vs(10),
    marginBottom: vs(50),
    width: "100%",
  },
  titleContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: vs(20),
    marginBottom: 0,
  },
  titleText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h3,
    letterSpacing: Theme.typography.letterSpacing.luxury,
    color: Theme.colors.primary,
    textTransform: "uppercase",
  },
  imageWrapper: {
    width: "100%",
    alignItems: "center",
    position: "relative",
  },
  firstImage: {
    width: "100%",
    aspectRatio: 0.6,
    marginTop: -vs(180),
  },
  bigNumber: {
    position: "absolute",
    ...Platform.select({
      ios: {
        right: scale(8),
        paddingRight: scale(20),
      },
      android: {
        right: -scale(25),
        paddingRight: scale(40),
      },
    }),
    bottom: "36%",
    fontSize: ms(180, 0.3),
    fontFamily: Theme.typography.fontFamily.boldHero,
    color: "rgba(0, 0, 0, 0.4)",
    letterSpacing: -scale(25),
    includeFontPadding: false,
  },
  monthText: {
    position: "absolute",
    right: scale(10),
    bottom: "58%",
    fontSize: ms(48, 0.3),
    fontFamily: Theme.typography.fontFamily.boldHero,
    color: "#FFFFFF",
  },
  overlayText: {
    position: "absolute",
    right: scale(20),
    bottom: "58%",
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    letterSpacing: Theme.typography.letterSpacing.extraWide,
    color: "#FFFFFF",
  },
  paddingWrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: vs(50),
    paddingBottom: vs(50),
    marginTop: -vs(220),
  },
  seasonText: {
    position: "absolute",
    right: scale(90),
    bottom: "84%",
    fontSize: ms(48, 0.3),
    fontFamily: Theme.typography.fontFamily.boldHero,
    color: "rgba(0, 0, 0, 0.5)",
    letterSpacing: -4,
  },
  seasonOverlay: {
    position: "absolute",
    right: scale(90),
    bottom: "82%",
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    letterSpacing: Theme.typography.letterSpacing.extraWide,
    color: "rgba(0, 0, 0, 0.7)",
  },
  videoSection: {
    width: "100%",
    height: vs(200),
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  videoImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  playButton: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    color: "#FFFFFF",
    fontSize: ms(28),
    marginLeft: scale(5),
  },
});
