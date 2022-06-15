import React, { useEffect, useState } from "react";
import { allPokemon } from "../../../assets/data/allPokemon";
import { useDispatch, useSelector } from "react-redux";
import { setNewPokemon } from "../../features/CurrentPokemonSlice";
import { RootState } from "../../features/store";
import { setSearchingStatus } from "../../features/PokemonSearching";

export const PokedexLogic = () => {
  const dispatch = useDispatch();
  ////
  // Saved data about the "found" pokemon
  ////
  const pokemon = useSelector((state: RootState) => state.pokemon);

  ////
  // State to inform app if user has fully opened the backside (opened the flip)
  // Added to prevent firing of search on partial swipes.
  ////
  const [searchingRefreshed, setSearchingRefreshed] = useState<boolean>(true);
  const refreshedToTrue = () => {
    setSearchingRefreshed((prevState) => true);
  };
  const refreshedToFalse = () => {
    setSearchingRefreshed((prevState) => false);
  };
  ////
  // Searching status from redux, to keep tabs for the user about
  ////
  const searchingStatus = useSelector(
    (state: RootState) => state.pokemonSearching.status
  );

  ////
  // Function to get random number in a range
  ////
  const generateRandomInRange = (min: number, max: number) => {
    const difference = max - min;
    let random = Math.random();
    random = Math.floor(random * difference);
    random += min;
    return random;
  };
  ////
  // Using the function above get a link for random pokemon from allPokemon component
  ////
  const getRandomPokemonLink = (min: number, max: number) => {
    const randomNumber = generateRandomInRange(min, max);
    return allPokemon.results[randomNumber].url;
  };
  ////
  // Get data using the link from function above
  ////
  const getRandomPokemon = async () => {
    try {
      await fetch(getRandomPokemonLink(1, 151))
        .then((response) => response.json())
        .then((json) => {
          //On firing set state of searching to "searching"
          dispatch(setSearchingStatus("searching"));
          // To simulate random searching time, every second get random number from 1 to 10 and check if is smaller than 6
          let searching = setInterval(() => {
            let roll = generateRandomInRange(1, 10);
            console.log("roll: ", roll);
            //When roll is successful set searching state to "found" and save pokemon data in redux. Stop the timer.
            if (roll < 6) {
              dispatch(setSearchingStatus("found"));
              dispatch(setNewPokemon(json));
              clearInterval(searching);
            }
          }, 1000);
        });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    getRandomPokemonLink,
    getRandomPokemon,
    pokemon,
    searchingStatus,
    searchingRefreshed,
    refreshedToTrue,
    refreshedToFalse,
  };
};
