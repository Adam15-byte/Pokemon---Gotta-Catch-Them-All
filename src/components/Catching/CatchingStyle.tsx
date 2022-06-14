import { StyleSheet } from "react-native";
import { SIZES } from "../../../assets/consts/consts";

export const styles = StyleSheet.create({
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
