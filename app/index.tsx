import BrandLogoSection from "@/src/components/home/BrandLogoSection";
import BrandStory from "@/src/components/home/BrandStory";
import Collections from "@/src/components/home/Collections";
import ForYou from "@/src/components/home/ForYou";
import HeroCarousel from "@/src/components/home/HeroCarousel";
import SnsSection from "@/src/components/home/SnsSection";
import AppFooter from "@/src/components/ui/AppFooter";
import AppHeader from "@/src/components/ui/AppHeader";
import { Theme } from "@/src/constants/theme";
import { DUMMY_PRODUCTS } from "@/src/data/dummyProductData";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HomeProductSection from "../src/components/home/HomeProductSection";

export default function HomeScreen() {

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
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
        <AppFooter />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.white,
  },
  scrollArea: {
    flex: 1,
  },
  title: {
    fontSize: Theme.typography.fontSize.h2_md,
    fontWeight: "700",
    color: Theme.colors.primary,
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: Theme.typography.letterSpacing.wider,
  },
  subtitle: {
    fontSize: Theme.typography.fontSize.lg,
    color: Theme.colors.grey[500],
    textAlign: "center",
  },
});
