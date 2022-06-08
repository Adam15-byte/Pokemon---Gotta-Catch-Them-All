import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { RootState } from "../../features/store";
import { SIZES } from "../../../assets/consts/consts";
import { useSelector, useDispatch } from "react-redux";
import Animated, { SlideInDown, SlideInUp } from "react-native-reanimated";

const Catching = () => {
  const pokemon = useSelector((state: RootState) => state.pokemon);
  const visibility = useSelector(
    (state: RootState) => state.CatchingVisibility.visible
  );
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
          <Animated.View
            entering={SlideInUp.delay(600).duration(500)}
            style={styles.pokeballContainer}
          >
            <Image
              source={require("../../../assets/images/ClosedPokeball.png")}
              style={styles.pokeballStyle}
              resizeMode="contain"
            />
          </Animated.View>
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
    width: 200,
    height: 200,
  },
});
