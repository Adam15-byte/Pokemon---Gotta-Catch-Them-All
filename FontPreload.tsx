import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  useFonts,
  PressStart2P_400Regular,
} from "@expo-google-fonts/press-start-2p";
import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { FONTS } from "./assets/consts/consts";
import { allPokemon } from "./assets/consts/data/allPokemon";

const FontPreload = () => {
  const [appIsReady, setAppIsReady] = useState<boolean>(false);
  const [pokemon, setPokemon] = useState({});
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
  const generateRandomInRange = (min: number, max: number) => {
    const difference = max - min;
    let random = Math.random();
    random = Math.floor(random * difference);
    random += min;
    return random;
  };
  const getRandomPokemonLink = () => {
    const randomNumber = generateRandomInRange(1, 151);
    console.log(allPokemon.results[randomNumber].url);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        Open up App.tsx to start working on your app!
      </Text>
      <TouchableOpacity style={styles.button} onPress={getRandomPokemonLink}>
        <Text>Get random pokemon</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FontPreload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    ...FONTS.h4,
  },
  button: {
    width: "50%",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "red",
    marginTop: 10,
  },
});
