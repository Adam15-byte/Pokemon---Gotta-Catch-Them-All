import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {
  useFonts,
  PressStart2P_400Regular,
} from "@expo-google-fonts/press-start-2p";
import React, { useState, useEffect, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { FONTS } from "./assets/consts/consts";
import FontPreload from "./FontPreload";

export default function App() {
  return <FontPreload />;
}

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
