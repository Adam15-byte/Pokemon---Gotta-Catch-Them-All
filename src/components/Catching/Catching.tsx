import { Text, View, Image } from "react-native";
import React from "react";
import Animated, {
  SlideInDown,
  SlideInUp,
} from "react-native-reanimated";
import {
  PanGestureHandler,
} from "react-native-gesture-handler";
import MessageBox from "../MessageBox/MessageBox";
import CatchingLogic from "./CatchingLogic";
import { styles } from "./CatchingStyle";

const Catching = () => {
  const {
    visibility,
    isPokeballOpen,
    messageDisplay,
    pokemon,
    resetPokeballAndPokemon,
    pokeballMovementStyle,
    trappingPokemonStyle,
    separatorOpacity,
    onGestureEvent,
  } = CatchingLogic();
  return (
    <>
      {/* Only displayed when global state is set to true */}
      {visibility === true && (
        <View style={styles.container}>
          {/* Pokemon inside Animated View container to allow for animations */}
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
          {/* If there is a message to display show the box in the middle with the message */}
          {messageDisplay === "" ? null : (
            <MessageBox
              Message={messageDisplay}
              onPress={resetPokeballAndPokemon}
            />
          )}

          {/* Separator with changing opacity. Shows the line where throwing automation is initiated */}
          <Animated.View style={[styles.separatorContainer, separatorOpacity]}>
            <Image
              source={require("../../../assets/images/Separator.png")}
              resizeMode="contain"
              style={styles.separatorImage}
            />
          </Animated.View>

          {/* Pokeball inside PanGestureHandler */}
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
