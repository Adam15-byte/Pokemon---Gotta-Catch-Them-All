import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { RootState } from "../../features/store";
import { SIZES } from "../../../assets/consts/consts";
import { useSelector, useDispatch } from "react-redux";
import Animated, {
  Extrapolate,
  interpolate,
  SlideInDown,
  SlideInUp,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  runOnJS,
  withTiming,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

const Catching = () => {
  const pokemon = useSelector((state: RootState) => state.pokemon);
  const visibility = useSelector(
    (state: RootState) => state.CatchingVisibility.visible
  );
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const [gestureEnabled, setGestureEnabled] = useState(true);
  const disableGestures = () => {
    console.log("something fired");
    setGestureEnabled((prevState) => false);
  };
  const moveToCatchingPosition = () => {
    console.log("something fired");
    translateY.value = withTiming(-456);
    translateX.value = withTiming(117.5);
  };

  const onGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (_, context) => {
        context.x = translateX.value;
        context.y = translateY.value;
      },
      onActive: (event, context) => {
        if (gestureEnabled === true) {
          translateX.value = event.translationX + context.x;
          translateY.value = event.translationY + context.y;
          console.log("Y: ", event.translationY);
          if (translateY.value <= -100) {
            runOnJS(disableGestures)();
            runOnJS(moveToCatchingPosition)();
          }
        }
      },
      onFinish: () => {},
    });
  const pokeballMovementStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateY.value,
      [SIZES.SCREEN_HEIGHT * 0.2, 0, -SIZES.SCREEN_HEIGHT],
      [1.2, 1, 0],
      Extrapolate.CLAMP
    );
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale },
      ],
    };
  });
  return (
    <>
      {visibility === true && (
        <View style={styles.container}>
          <Animated.View
            entering={SlideInDown.delay(600).duration(500)}
            style={styles.pokemonContainer}
          >
            <Image
              source={{ uri: pokemon.image }}
              style={styles.pokemonImage}
              resizeMode="contain"
            />
          </Animated.View>
          <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View
              entering={SlideInUp.delay(600).duration(500)}
              style={[styles.pokeballContainer, pokeballMovementStyle]}
            >
              <Image
                source={require("../../../assets/images/ClosedPokeball.png")}
                style={styles.pokeballStyle}
                resizeMode="contain"
              />
            </Animated.View>
          </PanGestureHandler>
        </View>
      )}
    </>
  );
};

export default Catching;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    height: SIZES.SCREEN_HEIGHT,
    width: SIZES.SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  pokemonContainer: {
    marginTop: 100,
  },
  pokemonImage: {
    width: 200,
    height: 200,
  },
  pokeballContainer: {
    marginTop: "auto",
    marginBottom: 150,
  },
  pokeballStyle: {
    width: 150,
    height: 150,
  },
});
