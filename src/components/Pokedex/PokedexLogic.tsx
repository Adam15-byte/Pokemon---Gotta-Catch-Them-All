import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { allPokemon } from "../../../assets/data/allPokemon";

export const PokedexLogic = () => {
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
          console.log(json.sprites.front_default);
        });
    } catch (e) {
      console.log(e);
    }
  };
  return {
    getRandomPokemonLink,
    getRandomPokemon,
  };
};
