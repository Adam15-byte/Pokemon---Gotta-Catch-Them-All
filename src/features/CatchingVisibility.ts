import { createSlice } from "@reduxjs/toolkit";
import PokedexReanimated from "../components/Pokedex/PokedexReanimated";

export interface state {
  visible: boolean;
  catchingInitiatedOnce: boolean;
}

const initialState: state = {
  visible: false,
  catchingInitiatedOnce: false,
};

export const catchingVisibility = createSlice({
  name: "catchingVisibility",
  initialState,
  reducers: {
    catchingVisibilityToTrue: (state, action) => {
      console.log("Catching visibility to true");
      state.visible = true;
    },
    catchingVisibilityToFalse: (state, action) => {
      console.log("Catching visibility to false");
      state.visible = false;
    },
    catchingInitiatedToTrue: (state, action) => {
      state.catchingInitiatedOnce = true;
    },
  },
});

export const {
  catchingVisibilityToTrue,
  catchingVisibilityToFalse,
  catchingInitiatedToTrue,
} = catchingVisibility.actions;

export default catchingVisibility.reducer;
