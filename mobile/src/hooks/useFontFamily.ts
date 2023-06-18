import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
export default function useFontFamily() {
  //Font yüklemeleri
  const [fontsLoaded] = useFonts({
    "family-black": require("../../assets/fonts/Montserrat-Black.ttf"),
    "family-bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
    "family-light": require("../../assets/fonts/Montserrat-Light.ttf"),
    "family-medium": require("../../assets/fonts/Montserrat-Medium.ttf"),
    "family-regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
    "family-semiBold": require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  //Yükleme tamamlanmazsa girişteki loading ekranında kullanıcı bekler
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  return { onLayoutRootView, fontsLoaded };
}