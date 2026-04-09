import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CATEGORIES = ["All", "Outer", "Dress", "Knitwear", "Bag", "Shoes"];

interface CategoryTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function CategoryTabs({
  activeTab,
  onTabChange,
}: CategoryTabsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>NEW ARRIVAL</Text>
        <Image
          source={Images.home.titleUnderline}
          style={{ width: 150, height: 15 }}
          resizeMode="contain"
        />
      </View>
      <View style={styles.tabContainer}>
        {CATEGORIES.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              onPress={() => onTabChange(tab)}
              style={styles.tabItem}
              activeOpacity={0.6}
            >
              <Text style={[styles.tabText, isActive && styles.activTabText]}>
                {tab}
              </Text>
              {isActive && <View style={styles.activeDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 10,
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
    letterSpacing: Theme.typography.letterSpacing.extraWide,
    color: Theme.colors.primary,
  },
  tabContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  tabItem: {
    alignItems: "center",
  },
  tabText: {
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.grey[400],
    fontFamily: Theme.typography.fontFamily.main,
    textAlign: "center",
  },
  activTabText: {
    color: Theme.colors.primary,
  },
  activeDot: {
    marginTop: 6,
    width: 4,
    height: 4,
    backgroundColor: Theme.colors.accent,
    transform: [{ rotate: "45deg" }],
  },
});
