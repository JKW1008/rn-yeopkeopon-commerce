import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import { useCartStore } from "@/src/store/useCartStore";
import { useWishlistStore } from "@/src/store/useWishlistStore";
import ToggleMenu from "@/src/components/common/ToggleMenu";
import CartMenu from "@/src/components/common/CartMenu";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "TenorSans-Regular": require("../assets/fonts/TenorSans-Regular.ttf"),
    "BodoniModa-Italic": require("../assets/fonts/BodoniModa-Italic.ttf"),
    "BodoniModa-Regular": require("../assets/fonts/BodoniModa-VariableFont.ttf"),
    "BodoniModa-Bold": require("../assets/fonts/BodoniModa-BoldItalic.ttf"),
  });

  const fetchCart = useCartStore((state) => state.fetchCart);
  const fetchWishlist = useWishlistStore((state) => state.fetchWishlist);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      fetchCart(); // 앱 시작 시 장바구니 데이터 동기화
      fetchWishlist(); // 앱 시작 시 찜 목록 데이터 동기화
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <ThemeProvider value={DefaultTheme}>
        <View style={styles.root}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
          <StatusBar style="auto" />
          <ToggleMenu />
          <CartMenu />
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
