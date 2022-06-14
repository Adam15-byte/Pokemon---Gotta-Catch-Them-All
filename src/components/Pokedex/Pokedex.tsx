import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect } from "react";
import { COLORS, FONTS, SIZES } from "../../../assets/consts/consts";
import { PokedexLogic } from "./PokedexLogic";
import Animated, {
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  runOnUI,
} from "react-native-reanimated";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { styles } from "./PokedexStyle";
import PokedexReanimated from "./PokedexReanimated";
import { catchingVisibilityToTrue } from "../../features/CatchingVisibility";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";

const Pokedex = () => {
  const { pokemon, searchingStatus, searchingRefreshed } = PokedexLogic();
  const {
    translateX,
    onGestureEvent,
    animatedFlipStyle,
    pokedexVerticalAnimation,
    movePokedexDown,
    movePokedexUp,
  } = PokedexReanimated();
  const catchingVisibility = useSelector(
    (state: RootState) => state.CatchingVisibility.visible
  );
  const catchingInitiatedAtLeastOnce = useSelector(
    (state: RootState) => state.CatchingVisibility.catchingInitiatedOnce
  );
  const PokemonCollection = useSelector(
    (state: RootState) => state.PokemonCollection
  );
  useEffect(() => {
    if (catchingVisibility === false && catchingInitiatedAtLeastOnce === true)
      movePokedexUp();
  }, [catchingVisibility]);
  const dispatch = useDispatch();
  return (
    <Animated.View style={[styles.container, pokedexVerticalAnimation]}>
      <Text style={{ position: "absolute", top: 50 }}>
        Pokemons caught: {PokemonCollection.length}
      </Text>
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
      <TouchableWithoutFeedback
        onPress={() => {
          if (pokemon.id !== null) {
            dispatch(catchingVisibilityToTrue());
            movePokedexDown();
          }
          if (pokemon.id === null) null;
        }}
      >
        <View style={styles.greenButtonContainer}>
          {pokemon.id !== null && <Text style={styles.catchText}>CATCH</Text>}
        </View>
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
        {pokemon.name === "" && (
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

        {/* Display info after attempt to catch Pokemon */}
        {pokemon.name === "empty" && (
          <View style={styles.welcomeContainer}>
            <Text style={styles.resetText}>
              CLOSE TO SEARCH FOR ANOTHER POKEMON
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
    </Animated.View>
  );
};

export default Pokedex;