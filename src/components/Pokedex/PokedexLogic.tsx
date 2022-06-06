import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { allPokemon } from "../../../assets/data/allPokemon";
import { useSelector, useDispatch } from "react-redux";
import { setNewPokemon } from "../../features/CurrentPokemonSlice";
import { RootState } from "../../features/store";

export const PokedexLogic = () => {
  const pokemon = useSelector((state: RootState) => state.setNewPokemon);
  const dispatch = useDispatch();
  const generateRandomInRange = (min: number, max: number) => {
    const difference = max - min;
    let random = Math.random();
    random = Math.floor(random * difference);
    random += min;
    return random;
  };
  const getRandomPokemonLink = (min: number, max: number) => {
    const randomNumber = generateRandomInRange(min, max);
    return allPokemon.results[randomNumber].url;
  };
  const getRandomPokemon = async () => {
    try {
      await fetch(getRandomPokemonLink(1, 151))
        .then((response) => response.json())
        .then((json) => {
          dispatch(setNewPokemon(json));
        });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log("New rolled pokemon: ", pokemon);
  }, [pokemon]);
  const saveRandomPokemon = () => {};
  return {
    getRandomPokemonLink,
    getRandomPokemon,
    pokemon,
    saveRandomPokemon,
  };
};
