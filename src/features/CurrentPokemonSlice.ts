import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Pokemon {
  id: number | null;
  name: string;
  image: string;
  stats: [];
  types: [];
}

const initialState: Pokemon = {
  id: null,
  name: "",
  image: "",
  stats: [],
  types: [],
};

export const currentPokemonSlice = createSlice({
  name: "currentPokemonSlice",
  initialState,
  reducers: {
    setNewPokemon: (state, action: PayloadAction<Pokemon>) => {
      state.name = action.payload.name;
    },
  },
});
