import { createSlice } from "@reduxjs/toolkit";

export interface Pokemon {
  id: number | null;
  name: string;
  image: string;
  stats: [] | any;
  types: [] | any;
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
