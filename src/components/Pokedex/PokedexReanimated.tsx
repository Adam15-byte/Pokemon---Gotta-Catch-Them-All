import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { PokedexLogic } from "./PokedexLogic";
import { SIZES } from "../../../assets/consts/consts";

const PokedexReanimated = () => {
  const translateX = useSharedValue(0);
  const {
    getRandomPokemon,
    searchingStatus,
    searchingRefreshed,
    refreshedToTrue,
    refreshedToFalse,
  } = PokedexLogic();
  const onGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (_, context) => {
        context.x = translateX.value;
      },
      onActive: (event, context) => {
        if (searchingStatus !== "searching") {
          translateX.value = Math.min(
            Math.max(event.translationX + context.x, 0),
            SIZES.SCREEN_WIDTH / 1.3
          );
        }
      },
      onEnd: (event) => {
        ////
        // When swipe is large enough finish swipe automatically to largest value of swipe.
        ////
        if (event.translationX > 240) {
          translateX.value = withTiming(SIZES.SCREEN_WIDTH / 1.3);
          //Switch refresh to true
          runOnJS(refreshedToTrue)();
        }
        ////
        // When swipe is smaller than 240 get outside automatically to 0.
        ////
        if (event.translationX <= 240) {
          translateX.value = withTiming(0);
          //Fire only when searching is refreshed to prevent firing with "little swipes" that don't show the pokemon fully.
          if (searchingRefreshed === true) {
            //Fire with delay to make sure that it renders after backside is fully swiped(closed)
            runOnJS(setTimeout)(refreshedToFalse, 1000);
            runOnJS(setTimeout)(getRandomPokemon, 500);
          }
        }
      },
    });

  ////
  // Animated style for backside to allow for swiping
  ////
  const animatedFlipStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      translateX.value,
      [0, SIZES.SCREEN_WIDTH],
      [0, 3]
    );
    return {
      transform: [
        { perspective: 150 },
        { translateX: translateX.value },
        { rotateY: `${rotateY}deg` },
      ],
    };
  });
  return {
    translateX,
    onGestureEvent,
    animatedFlipStyle,
  };
};

export default PokedexReanimated;
