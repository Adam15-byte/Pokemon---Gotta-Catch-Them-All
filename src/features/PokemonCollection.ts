import { createSlice } from "@reduxjs/toolkit";
import { Type, Stat } from "./CurrentPokemonSlice";
interface Pokemon {
  id: number | null;
  name: string;
  image: string;
  stats: Stat[];
  types: Type[];
}
export interface PokemonCollection extends Array<Pokemon> {}

const initialState: PokemonCollection = [];

export const pokemonCollection = createSlice({
  name: "pokemonCollection",
  initialState,
  reducers: {
    addNewPokemonToCollection: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addNewPokemonToCollection } = pokemonCollection.actions;

export default pokemonCollection.reducer;
