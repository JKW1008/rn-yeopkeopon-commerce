import { Theme } from "@/src/constants/theme";
import { Images } from "@/src/constants/theme/images";
import { useMenuStore } from "@/src/store/useMenuStore";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  LinearTransition,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TABS = ["WOMEN", "MEN", "KIDS"];

const CATEGORIES = [
  {
    id: "new",
    name: "New",
    subCategories: ["Just In", "Trending", "Lookbook"],
  },
  {
    id: "apparel",
    name: "Apparel",
    subCategories: [
      "Outer",
      "Dress",
      "Blouse/Shirt",
      "T-Shirt",
      "Knitwear",
      "Skirt",
      "Pants",
      "Denim",
      "Kids",
    ],
  },
  { id: "bag", name: "Bag", subCategories: ["Tote", "Shoulder", "Mini Bag"] },
  {
    id: "shoes",
    name: "Shoes",
    subCategories: ["Flats", "Heels", "Sneakers", "Boots"],
  },
  {
    id: "beauty",
    name: "Beauty",
    subCategories: ["Skincare", "Makeup", "Perfume"],
  },
  {
    id: "accessories",
    name: "Accessories",
    subCategories: ["Jewelry", "Hats", "Sunglasses"],
  },
];

export default function ToggleMenu() {
  const { isOpen, closeMenu } = useMenuStore();
  const [activeTab, setActiveTab] = useState("WOMEN");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  const scrollY = useSharedValue(0);
  const contentHeight = useSharedValue(1);
  const scrollViewHeight = useSharedValue(1);
  const scrollOpacity = useSharedValue(0);
  const trackHeightSV = useSharedValue(0);
  const contentMeasured = useSharedValue(false); // onContentSizeChange 실행 여부

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
      // UI 스레드에서 직접 처리 - JS 브릿지 없음
      // 스크롤 중엔 즉시 fade-in, 멈추면 1.2초 뒤 fade-out
      scrollOpacity.value = withSequence(
        withTiming(1, { duration: 150 }),
        withDelay(1200, withTiming(0, { duration: 600 })),
      );
    },
  });

  const trackStyle = useAnimatedStyle(() => {
    const ready = trackHeightSV.value > 10 && scrollViewHeight.value > 10;
    return { opacity: ready ? scrollOpacity.value : 0 };
  });

  const indicatorStyle = useAnimatedStyle(() => {
    const tHeight = trackHeightSV.value;
    const sHeight = scrollViewHeight.value;

    if (tHeight <= 10 || sHeight <= 10 || !contentMeasured.value) {
      return { transform: [{ translateY: 0 }] };
    }

    const cHeight = contentHeight.value;
    const thumbH = tHeight * 0.8;
    const maxThumbTravel = tHeight - thumbH;
    const maxScroll = Math.max(cHeight - sHeight, 1);
    const rawY = (scrollY.value / maxScroll) * maxThumbTravel;
    const translateY = Math.max(0, Math.min(rawY, maxThumbTravel));

    return { transform: [{ translateY }] };
  });

  const toggleExpand = (id: string) => {
    setExpandedCategory((prev) => (prev === id ? null : id));
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={false}
      onRequestClose={closeMenu}
    >
      <View style={[styles.fullScreenContainer, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={closeMenu} style={styles.closeButton}>
            <AntDesign name="close" size={24} color={Theme.colors.primary} />
          </TouchableOpacity>
        </View>

        {/* 탭 전체 영역 */}
        <View style={styles.tabWrapper}>
          <View style={styles.tabContainer}>
            {TABS.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={styles.tabButton}
                onPress={() => setActiveTab(tab)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === tab && styles.activeTabText,
                  ]}
                >
                  {tab}
                </Text>

                {activeTab === tab && (
                  <View style={styles.activeIndicatorContainer}>
                    <View style={styles.activeLine} />
                    <View style={styles.activeDiamond} />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.scrollWrapper}>
          <Animated.ScrollView
            style={styles.menuContainer}
            showsVerticalScrollIndicator={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
            onContentSizeChange={(_, h) => {
              contentHeight.value = h;
              contentMeasured.value = true;
            }}
            onLayout={(e) => {
              scrollViewHeight.value = e.nativeEvent.layout.height;
            }}
          >
            {CATEGORIES.map((cat) => (
              <Animated.View
                key={cat.id}
                layout={LinearTransition}
                style={styles.animatedRow}
              >
                <TouchableOpacity
                  style={styles.categoryRow}
                  onPress={() => toggleExpand(cat.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.categoryTextWrapper}>
                    <Text style={styles.categoryText}>{cat.name}</Text>
                    <Feather
                      name={
                        expandedCategory === cat.id
                          ? "chevron-up"
                          : "chevron-down"
                      }
                      size={24} // 아이콘 크기 대폭 확대 (대신 얇은 Feather 사용)
                      color={Theme.colors.grey[400]} // 훨씬 연한 회색으로 변경
                    />
                  </View>
                </TouchableOpacity>

                {expandedCategory === cat.id && (
                  <Animated.View style={styles.subCategoryContainer}>
                    {cat.subCategories.map((sub, idx) => (
                      <TouchableOpacity key={idx} style={styles.subCategoryRow}>
                        <Text style={styles.subCategoryText}>{sub}</Text>
                      </TouchableOpacity>
                    ))}
                  </Animated.View>
                )}
              </Animated.View>
            ))}

            <View style={styles.container}>
              <View style={styles.informationWrap}>
                <Image
                  source={Images.tabMenu.call}
                  style={styles.infoSticker}
                  resizeMode="contain"
                />
                <Text style={styles.infoText}>(786) 713-8616</Text>
              </View>
              <View style={styles.informationWrap}>
                <Image
                  source={Images.tabMenu.location}
                  style={styles.infoSticker}
                  resizeMode="contain"
                />
                <Text style={styles.infoText}>Store locator</Text>
              </View>
            </View>
            <Image
              source={Images.home.titleUnderline}
              style={{
                width: 150,
                height: 15,
                alignSelf: "center",
                marginTop: 30,
              }}
              resizeMode="contain"
            />
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
          </Animated.ScrollView>
          <Animated.View
            style={[styles.scrollTrack, trackStyle]}
            onLayout={(e) => {
              trackHeightSV.value = e.nativeEvent.layout.height;
            }}
          >
            <Animated.View style={[styles.scrollThumb, indicatorStyle]} />
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "flex-start",
  },
  closeButton: {
    padding: 8,
    marginLeft: -8,
  },
  tabWrapper: {
    alignSelf: "stretch",
    marginLeft: 20,
    marginRight: 30,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.grey[200],
  },
  tabContainer: {
    flexDirection: "row",
    alignSelf: "flex-start",
    gap: 40,
  },
  tabButton: {
    paddingVertical: 15,
    alignItems: "center",
    position: "relative",
  },
  tabText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.md,
    color: Theme.colors.grey[400],
    letterSpacing: 4,
  },
  activeTabText: {
    color: Theme.colors.primary,
  },
  activeIndicatorContainer: {
    position: "absolute",
    bottom: -1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  activeLine: {
    width: "100%",
    height: 1,
    backgroundColor: Theme.colors.accent,
  },
  activeDiamond: {
    position: "absolute",
    width: 6,
    height: 6,
    backgroundColor: Theme.colors.accent,
    transform: [{ rotate: "45deg" }],
  },
  scrollWrapper: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
  },
  menuContainer: {
    flex: 1,
  },
  scrollTrack: {
    width: 4,
    height: "90%",
    backgroundColor: Theme.colors.grey[200],
    borderRadius: 2,
    marginVertical: 10,
    marginRight: 15,
    overflow: "hidden",
  },
  scrollThumb: {
    width: "100%",
    height: "80%",
    backgroundColor: Theme.colors.accent,
    borderRadius: 2,
  },
  animatedRow: {
    overflow: "hidden",
  },
  categoryRow: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
  categoryTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: 10,
  },
  categoryText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
    color: Theme.colors.primary,
  },
  subCategoryContainer: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingHorizontal: 30,
  },
  subCategoryRow: {
    paddingVertical: 20,
  },
  subCategoryText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
    color: Theme.colors.primary,
    letterSpacing: 0.5,
  },
  container: {
    backgroundColor: "#ffffff2c",
    paddingTop: 30,
    width: "100%",
    flexDirection: "column",
    gap: 20,
  },
  informationWrap: {
    marginLeft: 20,
    width: "80%",
    flexDirection: "row",
    alignItems: "center",
    gap: 30,
  },
  infoSticker: {
    width: 24,
    height: 24,
    tintColor: Theme.colors.primary,
  },
  infoText: {
    fontFamily: Theme.typography.fontFamily.main,
    fontSize: Theme.typography.fontSize.h4,
  },
  socialContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },
  iconButton: {
    padding: 8,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
});
