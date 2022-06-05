import { StyleSheet, Text, View } from "react-native";
import {
  useFonts,
  PressStart2P_400Regular,
} from "@expo-google-fonts/press-start-2p";
import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { FONTS } from "./assets/consts/consts";

const FontPreload = () => {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          PressStart2P_400Regular,
        });
        setAppIsReady(true);
      } catch (e) {
        console.log(e);
      }
    }
    prepare();
  }, []);
  const onLayoutRootView = useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        Open up App.tsx to start working on your app!
      </Text>
    </View>
  );
};

export default FontPreload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    ...FONTS.h4,
  },
});
