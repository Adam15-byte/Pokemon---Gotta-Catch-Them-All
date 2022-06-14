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
import { addNewPokemonToCollection } from "../../features/PokemonCollection";
import CatchingLogic from "./CatchingLogic";

const Catching = () => {
  const {
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
  } = CatchingLogic();
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
