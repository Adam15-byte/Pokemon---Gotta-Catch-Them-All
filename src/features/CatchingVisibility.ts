import { createSlice } from "@reduxjs/toolkit";

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
    ////
    // State to determine if catching screen should be displayed
    ////
    catchingVisibilityToTrue: (state) => {
      console.log("Catching visibility to true");
      state.visible = true;
    },
    catchingVisibilityToFalse: (state) => {
      console.log("Catching visibility to false");
      state.visible = false;
    },
    ////
    // Initiated after catching. Used inside useEffect to move the pokedexUp, used to differentiate between first app opening and state after catching
    ////
    catchingInitiatedToTrue: (state) => {
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
