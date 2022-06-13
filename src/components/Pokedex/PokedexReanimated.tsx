import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  catchingVisibilityToTrue,
  catchingVisibilityToFalse,
} from "../../features/CatchingVisibility";
import { RootState } from "../../features/store";

const PokedexReanimated = () => {
  const dispatch = useDispatch();
  const translateX = useSharedValue(0);
  const {
    getRandomPokemon,
    searchingStatus,
    searchingRefreshed,
    refreshedToTrue,
    refreshedToFalse,
  } = PokedexLogic();
  const catchingVisibility = useSelector(
    (state: RootState) => state.CatchingVisibility.visible
  );
  const onGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (_, context) => {
        context.x = translateX.value;
      },
      onActive: (event, context) => {
        if (searchingStatus !== "searching" && catchingVisibility !== true) {
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
        if (event.translationX > 220 && catchingVisibility !== true) {
          translateX.value = withTiming(SIZES.SCREEN_WIDTH / 1.3);
          //Switch refresh to true
          runOnJS(refreshedToTrue)();
        }
        ////
        // When swipe is smaller than 220 get backside automatically to 0.
        ////
        if (event.translationX <= 220 && catchingVisibility !== true) {
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

  ////
  // Vertical transformation to allow for catching module
  ////
  const translateY = useSharedValue(0);
  const movePokedexDown = useCallback(() => {
    translateY.value = withTiming(SIZES.SCREEN_HEIGHT * 0.85, {
      duration: 700,
    });
  }, [translateY.value]);
  const movePokedexUp = () => {
    translateY.value = withTiming(0, {
      duration: 700,
    });
  };

  const pokedexVerticalAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return {
    translateX,
    onGestureEvent,
    animatedFlipStyle,
    pokedexVerticalAnimation,
    movePokedexDown,
    movePokedexUp,
  };
};

export default PokedexReanimated;
