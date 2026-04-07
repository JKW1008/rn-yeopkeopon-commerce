import { Images } from "@/src/constants/theme/images";
import { Image, StyleSheet, View } from "react-native";

export default function BrandLogoSection() {
  const BRANDS = [
    Images.home.brand.prada,
    Images.home.brand.burberry,
    Images.home.brand.boss,
    Images.home.brand.cartier,
    Images.home.brand.gucci,
    Images.home.brand.tiffanyCo,
  ];
  return (
    <View style={styles.container}>
      <Image
        source={Images.home.titleUnderline}
        style={styles.underline}
        resizeMode="contain"
      />
      <View style={styles.logosContainer}>
        {BRANDS.map((logo, index) => (
          <View key={index} style={styles.logosWrapper}>
            <Image
              source={logo}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        ))}
      </View>
      <Image
        source={Images.home.titleUnderline}
        style={styles.underline}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 30,
    marginBottom: 10,
  },
  underline: {
    width: 150,
    height: 15,
    alignSelf: "center",
  },
  logosContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  logosWrapper: {
    width: "33.3%",
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
});
