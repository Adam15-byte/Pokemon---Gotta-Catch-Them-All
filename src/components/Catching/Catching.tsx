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
  withDecay,
  withDelay,
  withSequence,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import MessageBox from "../MessageBox/MessageBox";
import { catchingVisibilityToFalse } from "../../features/CatchingVisibility";

const Catching = () => {
  const [isPokeballOpen, setIsPokeBallOpen] = useState(false);
  const pokeballRotation = useSharedValue(0);
  const shakePokeball = () => {
    pokeballRotation.value = withDelay(
      2200,
      withSequence(
        withTiming(45),
        withTiming(-45),
        withTiming(45),
        withTiming(-45),
        withTiming(0)
      )
    );
  };
  const openPokeball = () => {
    setTimeout(() => {
      setIsPokeBallOpen((prevState) => true);
    }, 1000);
  };
  const closePokeball = () => {
    setTimeout(() => {
      setIsPokeBallOpen((prevState) => false);
    }, 1800);
  };
  const translateXpokemon = useSharedValue(0);
  const scalePokemon = useSharedValue(1);
  const trapPokemonInPokeball = () => {
    translateXpokemon.value = withDelay(1200, withTiming(60));
    scalePokemon.value = withDelay(1200, withTiming(0));
  };
  const trappingPokemonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateXpokemon.value },
        { scale: scalePokemon.value },
      ],
    };
  });
  const pokemon = useSelector((state: RootState) => state.pokemon);
  const visibility = useSelector(
    (state: RootState) => state.CatchingVisibility.visible
  );
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const [gestureEnabled, setGestureEnabled] = useState(true);
  const disableGestures = () => {
    setGestureEnabled((prevState) => false);
  };
  const enableGestures = () => {
    setGestureEnabled((prevState) => true);
  };
  const generateRandomInRange = (min: number, max: number) => {
    const difference = max - min;
    let random = Math.random();
    random = Math.floor(random * difference);
    random += min;
    return random;
  };
  const [messageDisplay, setMessageDisplay] = useState("");
  const changeMessageDisplayed = (text: string) => {
    setMessageDisplay((prevState) => text);
  };
  const rollIfCaught = () => {
    const roll = generateRandomInRange(1, 10);
    if (roll > 5) {
      changeMessageDisplayed(`${pokemon.name} caught!`);
    } else {
      changeMessageDisplayed(`${pokemon.name} escaped...`);
    }
  };
  const moveToCatchingPosition = () => {
    translateY.value = withTiming(-456, { duration: 1000 });
    translateX.value = withTiming(117.5, { duration: 1000 });
    openPokeball();
    closePokeball();
    trapPokemonInPokeball();
    shakePokeball();
    setTimeout(() => {
      rollIfCaught();
    }, 3500);
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
          if (translateY.value <= -100) {
            runOnJS(disableGestures)();
            runOnJS(moveToCatchingPosition)();
          }
        }
      },
      onFinish: () => {},
    });
  const dispatch = useDispatch();
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
        { rotateZ: `${pokeballRotation.value}deg` },
      ],
    };
  });

  const resetPokeballAndPokemon = () => {
    translateX.value = 0;
    translateY.value = 0;
    translateXpokemon.value = 0;
    scalePokemon.value = 1;
    changeMessageDisplayed("");
    enableGestures();
  };
  ////
  // No idea why these value for opacity and transferY work. Needs investigation.
  ////
  const separatorOpacity = useAnimatedStyle(() => {
    let opacity = interpolate(translateY.value, [180, 80, -250], [1, 0, 1]);
    return { opacity };
  });
  return (
    <>
      {visibility === true && (
        <View style={styles.container}>
          <Animated.View
            entering={SlideInDown.delay(600).duration(500)}
            style={[styles.pokemonContainer, trappingPokemonStyle]}
          >
            <Image
              source={{ uri: pokemon.image }}
              style={styles.pokemonImage}
              resizeMode="contain"
            />
          </Animated.View>
          {messageDisplay === "" ? null : (
            <MessageBox
              Message={messageDisplay}
              onPress={resetPokeballAndPokemon}
            />
          )}
          <Animated.View style={[styles.separatorContainer, separatorOpacity]}>
            <Image
              source={require("../../../assets/images/Separator.png")}
              resizeMode="contain"
              style={styles.separatorImage}
            />
          </Animated.View>
          <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View
              entering={SlideInUp.delay(600).duration(500)}
              style={[styles.pokeballContainer, pokeballMovementStyle]}
            >
              {isPokeballOpen ? (
                <Image
                  source={require("../../../assets/images/OpenPokeball.png")}
                  style={styles.pokeballStyle}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={require("../../../assets/images/ClosedPokeball.png")}
                  style={styles.pokeballStyle}
                  resizeMode="contain"
                />
              )}
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
  separatorContainer: {
    position: "absolute",
    bottom: 375,
  },
  separatorImage: {
    width: SIZES.SCREEN_WIDTH,
    height: 50,
  },
});
