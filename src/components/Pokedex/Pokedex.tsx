import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { COLORS, FONTS, SIZES } from "../../../assets/consts/consts";
import { PokedexLogic } from "./PokedexLogic";
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

const Pokedex = () => {
  const {
    getRandomPokemonLink,
    getRandomPokemon,
    pokemon,
    searchingStatus,
    searchingRefreshed,
    refreshedToTrue,
    refreshedToFalse,
  } = PokedexLogic();
  const translateX = useSharedValue(0);
  const onGestureEvent =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onStart: (_, context) => {
        context.x = translateX.value;
      },
      onActive: (event, context) => {
        if (searchingStatus !== "searching") {
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
        if (event.translationX > 240) {
          translateX.value = withTiming(SIZES.SCREEN_WIDTH / 1.3);
          //Switch refresh to true
          runOnJS(refreshedToTrue)();
        }
        ////
        // When swipe is smaller than 240 get outside automatically to 0.
        ////
        if (event.translationX <= 240) {
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
  return (
    <View style={styles.container}>
      {/* Outside "cover" of the pokedex. PanGesture to read user swipes and move it. */}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.outsideContainer, animatedFlipStyle]}>
          <Image
            source={require("../../../assets/images/PokedexOutside1.png")}
            resizeMode="contain"
            style={styles.outsidePokedex}
          />
        </Animated.View>
      </PanGestureHandler>

      {/* Flash indicator in top-right corner. Change of color comes from changing
      images and is determined by current searching status. */}
      <View style={styles.flashIndicatorContainer}>
        {/* On opening of the app, the indicator is blue */}
        {searchingStatus === "" && (
          <Image
            source={require("../../../assets/images/BlueIndicator.png")}
            resizeMode="contain"
            style={styles.flashIndicatorImage}
          />
        )}
        {/* When searching for pokemon display red indicator */}
        {searchingStatus === "searching" && (
          <Image
            source={require("../../../assets/images/RedIndicator.png")}
            resizeMode="contain"
            style={styles.flashIndicatorImage}
          />
        )}
        {/* When pokemon gets found display green indicator */}
        {searchingStatus === "found" && (
          <Image
            source={require("../../../assets/images/GreenIndicator.png")}
            resizeMode="contain"
            style={styles.flashIndicatorImage}
          />
        )}

        {/* Indicator with tranparent background, to ensure the image does not pop in & out */}
        <Image
          source={require("../../../assets/images/TransparentIndicator.png")}
          style={styles.transparentIndicator}
          resizeMode="contain"
        />
      </View>

      {/* Info Tab that displays text with current searching condition */}
      <View style={styles.infoTabContainer}>
        <Text style={styles.infoTabText}>
          {searchingStatus === ""
            ? "Open Pokedex to begin"
            : searchingStatus === "searching"
            ? "Searching..."
            : searchingStatus === "found" && searchingRefreshed === false
            ? "Found!"
            : "New Pokemon!"}
        </Text>
        <Image
          source={require("../../../assets/images/InfoBar.png")}
          resizeMode="contain"
          style={styles.infoBar}
        />
      </View>

      {/* Green button inside pokedex used for switching to catching mode */}
      <TouchableWithoutFeedback onPress={getRandomPokemon}>
        <View style={styles.greenButtonContainer}></View>
      </TouchableWithoutFeedback>

      {/* Actuall Inside image of Pokedex */}
      <Image
        source={require("../../../assets/images/Pokedex1.png")}
        style={styles.insidePokedex}
        resizeMode="contain"
      />

      {/* White Card inside pokedex that displays all the data */}
      <View style={styles.infoCardContainer}>
        {/* Info screen shown on initial opening of pokedex */}
        {pokemon.id === null && (
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome!</Text>
            <Text style={styles.welcomeTextSmaller}>
              Currently you have 0 pokemon. Catch all 151 pokemon.
            </Text>
            <Text style={styles.welcomeTextSmaller}>
              Close Pokedex to look for new pokemon.
            </Text>
          </View>
        )}

        {/* Display of data about found pokemon */}
        {pokemon.id !== null && (
          <>
            <View style={styles.nameContainer}>
              <Text style={styles.nameText}>{pokemon.name}</Text>
            </View>
            <View style={styles.iconTypesContainer}>
              <View style={styles.iconContainer}>
                <Image
                  source={{ uri: pokemon.image }}
                  style={styles.pokemonImage}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.typesContainer}>
                <Text style={styles.typeText}>
                  {pokemon.types.length <= 1 ? "Type:" : "Types:"}
                </Text>
                <Text style={styles.typeText}>
                  {pokemon.types[0].type.name}
                </Text>
                <Text style={styles.typeText}>
                  {pokemon.types.length > 1 ? pokemon.types[1].type.name : null}
                </Text>
              </View>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statsHeaderContainer}>
                <Text style={styles.statsText}>Stats:</Text>
              </View>
              <View style={styles.flexDisplayRow}>
                <View style={styles.statColumn}>
                  <Text style={styles.statsText}>
                    hp: {pokemon.stats[0].base_stat}
                  </Text>
                  <Text style={styles.statsText}>
                    defense: {pokemon.stats[2].base_stat}
                  </Text>
                </View>
                <View style={styles.statColumn}>
                  <Text style={styles.statsText}>
                    attack: {pokemon.stats[1].base_stat}
                  </Text>
                  <Text style={styles.statsText}>
                    speed: {pokemon.stats[5].base_stat}
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
  transparentIndicator: {
    zIndex: 19,
    width: 70,
    height: 70,
    position: "absolute",
  },
  infoTabContainer: {
    position: "absolute",
    zIndex: 20,
    top: SIZES.SCREEN_HEIGHT * 0.21,
    width: 250,
    height: 90,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
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
  nameText: {
    ...FONTS.h2,
  },
  iconTypesContainer: {
    flexDirection: "row",
    flex: 0.4,
    width: "100%",
    marginTop: 10,
  },
  statsContainer: {
    flex: 0.45,
  },
  iconContainer: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  pokemonImage: {
    width: "80%",
    aspectRatio: 1,
  },
  typesContainer: {
    width: "50%",
    height: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  typeText: {
    ...FONTS.h3,
  },
  statsHeaderContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 30,
  },
  statsText: {
    ...FONTS.h4,
  },
  flexDisplayRow: {
    flexDirection: "row",
    width: "100%",
  },
  statColumn: {
    width: "50%",
    height: 40,
    alignItems: "center",
    justifyContent: "space-around",
  },
  welcomeContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  welcomeText: {
    ...FONTS.h2,
  },
  welcomeTextSmaller: {
    ...FONTS.h3,
    marginTop: 15,
  },
  infoBar: {
    width: "100%",
    zIndex: 1,
  },
  infoTabText: {
    position: "absolute",
    zIndex: 2,
    ...FONTS.h3,
    marginHorizontal: 30,
    textAlign: "center",
  },
});
