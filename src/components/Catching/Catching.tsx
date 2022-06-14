import { Text, View, Image } from "react-native";
import React from "react";
import Animated, {
  SlideInDown,
  SlideInUp,
  withTiming,
  withDecay,
  withDelay,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import MessageBox from "../MessageBox/MessageBox";
import CatchingLogic from "./CatchingLogic";
import { styles } from "./CatchingStyle";

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
