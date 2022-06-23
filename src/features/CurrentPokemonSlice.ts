import { createSlice } from "@reduxjs/toolkit";

interface TypeDescription {
  name: string;
  url: string;
}

export interface Type {
  slot: number;
  type: TypeDescription;
}

interface StatNameUrl {
  name: string;
  url: string;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stats: StatNameUrl;
}

export interface Pokemon {
  id: number | null;
  name: string;
  image: string;
  stats: Stat[];
  types: Type[];
}

const initialState: Pokemon = {
  id: null,
  name: "",
  image: "",
  stats: [],
  types: [],
};

export const newPokemon = createSlice({
  name: "newPokemon",
  initialState,
  reducers: {
    ////
    // Pokemon to display after searching
    ////
    setNewPokemon: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.image = action.payload.sprites.front_default;
      state.stats = action.payload.stats;
      state.types = action.payload.types;
    },
    ////
    // Reset displayed pokemon after catching attempt
    ////
    setPokemonToEmpty: (state) => {
      state.id = null;
      state.name = "empty";
    },
  },
});

export const { setNewPokemon, setPokemonToEmpty } = newPokemon.actions;
export default newPokemon.reducer;
