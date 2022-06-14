import { Text, View, Image } from "react-native";
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
import { addNewPokemonToCollection } from "../../features/PokemonCollection";

const CatchingLogic = () => {
  const dispatch = useDispatch();
  ////
  // Global state that determines if the catching screen should be visible
  ////
  const visibility = useSelector(
    (state: RootState) => state.CatchingVisibility.visible
  );
  // get random number used to roll if the pokemon was caught
  const generateRandomInRange = (min: number, max: number) => {
    const difference = max - min;
    let random = Math.random();
    random = Math.floor(random * difference);
    random += min;
    return random;
  };
  ////
  // After the throw, the gestures are disabled
  ////
  const [gestureEnabled, setGestureEnabled] = useState(true);
  const disableGestures = () => {
    setGestureEnabled((prevState) => false);
  };
  const enableGestures = () => {
    setGestureEnabled((prevState) => true);
  };
  ////
  // State to determine if pokeball is open or now
  ////
  const [isPokeballOpen, setIsPokeBallOpen] = useState(false);
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
  ////
  // Value for pokeball rotation and animation
  ////
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

  ////
  // Displayed pokemon and values used for "trapping animaton"
  // with delay the pokemon is scaled down and moved right
  ////
  const pokemon = useSelector((state: RootState) => state.pokemon);
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

  ////
  // After reaching -100 on translateY the pokeball is automatically moved to fixed spot and the catching sequence is fired
  ////
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
  ////
  // Values for PanGestureHandler used for moving the pokeball around
  ////
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number; y: number }
  >({
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

  ////
  // Message to display the result of catching attempt
  ////
  const [messageDisplay, setMessageDisplay] = useState<string>("");
  const changeMessageDisplayed = (text: string) => {
    setMessageDisplay((prevState) => text);
  };
  ////
  // Function to determine the result of attempt
  ////
  const rollIfCaught = () => {
    const roll = generateRandomInRange(1, 10);
    if (roll > 5) {
      changeMessageDisplayed(`${pokemon.name} caught!`);
      // if succesful adds the pokemon to pokemonCollection array
      dispatch(addNewPokemonToCollection(pokemon));
    } else {
      changeMessageDisplayed(`${pokemon.name} escaped...`);
    }
  };
  ////
  // Reset everything on catching screen after attempt
  ////
  const resetPokeballAndPokemon = () => {
    translateX.value = 0;
    translateY.value = 0;
    translateXpokemon.value = 0;
    scalePokemon.value = 1;
    changeMessageDisplayed("");
    enableGestures();
  };
  ////
  // Separator line that indicates the value, where pokeball is "thrown"
  // No idea why these value for opacity and transferY work. Needs investigation.
  ////
  const separatorOpacity = useAnimatedStyle(() => {
    let opacity = interpolate(translateY.value, [180, 80, -250], [1, 0, 1]);
    return { opacity };
  });
  return {
    dispatch,
    visibility,
    isPokeballOpen,
    messageDisplay,
    changeMessageDisplayed,
    pokemon,
    resetPokeballAndPokemon,
    pokeballMovementStyle,
    trappingPokemonStyle,
    separatorOpacity,
    onGestureEvent,
  };
};

export default CatchingLogic;
