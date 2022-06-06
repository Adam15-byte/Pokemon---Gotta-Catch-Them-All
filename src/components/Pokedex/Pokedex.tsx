import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../../../assets/consts/consts";
import { PokedexLogic } from "./PokedexLogic";
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from "react-native-reanimated";
import { PanGestureHandler, PanGestureHandlerGestureEvent } from "react-native-gesture-handler";

const Pokedex = () => {
  const { getRandomPokemonLink, getRandomPokemon } = PokedexLogic();
  const translateX = useSharedValue(0)
  const onGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: () => {},
    onActive: (event) => {
      console.log(event.translationX)
      translateX.value = event.translationX
    },
    onEnd: () => {},
  })

  const animatedFlipStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}]
    }
  })
  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.outsideContainer, animatedFlipStyle]}>
          <Image
          source={require("../../../assets/images/PokedexOutside.png")}
          resizeMode="contain"
          style={styles.outsidePokedex}
        />
        </Animated.View>
      </PanGestureHandler>
      <View style={styles.flashIndicatorContainer}>
        <Image
          source={require("../../../assets/images/BlueIndicator.png")}
          resizeMode="contain"
          style={styles.flashIndicatorImage}
        />
      </View>
      <TouchableWithoutFeedback onPress={getRandomPokemon}>
        <View style={styles.greenButtonContainer}></View>
      </TouchableWithoutFeedback>

      <Image
        source={require("../../../assets/images/Pokedex.png")}
        style={styles.insidePokedex}
        resizeMode="contain"
      />
      <View style={styles.infoCardContainer}></View>
    </View>
  );
};

export default Pokedex;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  insidePokedex: {
    position: "absolute",
    width: SIZES.SCREEN_WIDTH * 0.9,
    zIndex: 2,
    top: 30,
  },
  outsideContainer: {
    position: "absolute",
    flex: 2,
    zIndex: 300,
    top: 0,
    width: SIZES.SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  outsidePokedex: {
    position: "absolute",
    width: SIZES.SCREEN_WIDTH * 0.9,
    zIndex: 300,
    top: 30,
  },
  greenButtonContainer: {
    zIndex: 10,
    position: "absolute",
    bottom: SIZES.SCREEN_HEIGHT * 0.1,
    left: SIZES.SCREEN_WIDTH * 0.3,
    width: SIZES.SCREEN_WIDTH * 0.3,
    height: SIZES.SCREEN_HEIGHT * 0.1,
    backgroundColor: COLORS.green,
  },
  flashIndicatorContainer: {
    position: "absolute",
    zIndex: 20,
    top: SIZES.SCREEN_HEIGHT * 0.11,
    right: SIZES.SCREEN_WIDTH * 0.13,
    width: 70,
    height: 70,
  },
  flashIndicatorImage: {
    zIndex: 20,
    width: 70,
    height: 70,
  },
  infoCardContainer: {
    zIndex: 1,
    position: "absolute",
    bottom: SIZES.SCREEN_HEIGHT * 0.35,
    left: SIZES.SCREEN_WIDTH * 0.18,
    width: SIZES.SCREEN_WIDTH * 0.64,
    height: SIZES.SCREEN_HEIGHT * 0.24,
    backgroundColor: COLORS.white,
  },
});
