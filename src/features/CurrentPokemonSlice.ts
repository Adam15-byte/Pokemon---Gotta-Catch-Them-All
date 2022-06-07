import { createSlice } from "@reduxjs/toolkit";

export interface Pokemon {
  id: number | null;
  name: string;
  image: string;
  stats: [] | any;
  types: [] | any;
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
    setNewPokemon: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.image = action.payload.sprites.front_default;
      state.stats = action.payload.stats;
      state.types = action.payload.types;
    },
  },
});

export const { setNewPokemon } = newPokemon.actions;
export default newPokemon.reducer;
