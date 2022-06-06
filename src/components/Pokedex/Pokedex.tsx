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
import { FONTS } from "../../../assets/consts/consts";

const Pokedex = () => {
  const { getRandomPokemonLink, getRandomPokemon, pokemon, saveRandomPokemon } =
    PokedexLogic();
  return (
    <View style={styles.container}>
      {/* <View style={styles.outsideContainer}>
        <Image
          source={require("../../../assets/images/PokedexOutside.png")}
          resizeMode="contain"
          style={styles.outsidePokedex}
        />
      </View> */}
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
      <View style={styles.infoCardContainer}>
        {pokemon.id && (
          <>
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{pokemon.name}</Text>
            </View>
            <View style={styles.infoCardTop}>
              <View style={styles.pokemonImageContainer}>
                <Image
                  source={{ uri: pokemon.image }}
                  style={styles.pokemonIcon}
                />
              </View>
              <View style={styles.typesContainer}>
                <Text style={styles.typeHeader}>
                  {pokemon.types.length <= 1 ? "type:" : "types:"}
                </Text>
                <Text style={styles.typeName}>
                  {pokemon.types[0].type.name}
                </Text>
                <Text style={styles.typeName}>
                  {pokemon.types.length > 1 && pokemon.types[1].type.name}
                </Text>
              </View>
            </View>
            <View style={styles.infoCardBottom}>
              <View style={styles.statsHeaderContainer}>
                <Text style={styles.stats}>Stats</Text>
              </View>
              <View style={styles.statsInfoContainer}>
                <View style={styles.leftColumn}>
                  <Text style={styles.stats}>
                    Hp: {pokemon.stats[0].base_stat}
                  </Text>
                  <Text style={styles.stats}>
                    Defense: {pokemon.stats[2].base_stat}
                  </Text>
                </View>
                <View style={styles.rightColumn}>
                  <Text style={styles.stats}>
                    Attack: {pokemon.stats[1].base_stat}
                  </Text>
                  <Text style={styles.stats}>
                    Speed: {pokemon.stats[5].base_stat}
                  </Text>
                </View>
              </View>
            </View>
          </>
        )}
      </View>
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
  nameContainer: {
    flex: 0.15,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  infoCardTop: {
    flex: 0.45,
    width: "100%",
    flexDirection: "row",
    marginTop: 5,
  },
  infoCardBottom: {
    flex: 0.4,
    width: "100%",
  },
  pokemonImageContainer: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  nameText: {
    ...FONTS.h2,
  },
  pokemonIcon: {
    width: "100%",
    aspectRatio: 1,
  },
  typesContainer: {
    width: "50%",
    height: "70%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  typeHeader: {
    ...FONTS.h3,
    marginTop: 15,
    marginBottom: 10,
  },
  typeName: {
    ...FONTS.h3,
    marginTop: 5,
  },
  statsHeaderContainer: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  stats: {
    ...FONTS.h4,
  },
  statsInfoContainer: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    paddingBottom: 10,
  },
  leftColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  rightColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
});
