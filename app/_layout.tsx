import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, StyleSheet } from "react-native";
import ToggleMenu from "@/src/components/common/ToggleMenu";
import CartMenu from "@/src/components/common/CartMenu";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "TenorSans-Regular": require("../assets/fonts/TenorSans-Regular.ttf"),
    "BodoniModa-Italic": require("../assets/fonts/BodoniModa-Italic-VariableFont_opsz,wght.ttf"),
    "BodoniModa-VariableFont": require("../assets/fonts/BodoniModa-VariableFont_opsz,wght.ttf"),
    "BodoniModa_9pt-BoldItalic": require("../assets/fonts/BodoniModa_9pt-BoldItalic.ttf.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
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
