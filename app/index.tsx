import BrandLogoSection from "@/src/components/home/BrandLogoSection";
import BrandStory from "@/src/components/home/BrandStory";
import Collections from "@/src/components/home/Collections";
import ForYou from "@/src/components/home/ForYou";
import HeroCarousel from "@/src/components/home/HeroCarousel";
import SnsSection from "@/src/components/home/SnsSection";
import AppHeader from "@/src/components/ui/AppHeader";
import { Colors } from "@/src/constants/theme/colors";
import { DUMMY_PRODUCTS } from "@/src/data/dummyProducts";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeProductSection from "../src/components/home/HomeProductSection";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollArea}
        showsVerticalScrollIndicator={false}
      >
        <AppHeader />
        <HeroCarousel />
        <HomeProductSection products={DUMMY_PRODUCTS} />
        <BrandLogoSection />
        <Collections />
        <ForYou />
        <BrandStory />
        <SnsSection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollArea: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
