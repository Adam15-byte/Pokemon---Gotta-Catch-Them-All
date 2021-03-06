import { StyleSheet, View, TouchableOpacity } from "react-native";
import { PressStart2P_400Regular } from "@expo-google-fonts/press-start-2p";
import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { FONTS, SIZES } from "./assets/consts/consts";
import Pokedex from "./src/components/Pokedex/Pokedex";
import Catching from "./src/components/Catching/Catching";

const FontPreload: React.FC = () => {
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
    <View style={styles.pokedexContainer}>
      {/* Inside of the catching component is only displayed when global state inside "features" is set to true */}
      <Catching />
      {/* Pokedex is always on display, only moved down when catching component is displayed */}
      <Pokedex />
    </View>
  );
};

export default FontPreload;

const styles = StyleSheet.create({
  pokedexContainer: {
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
  },
});
