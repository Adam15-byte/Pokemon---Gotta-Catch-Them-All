import { createSlice } from "@reduxjs/toolkit";

export interface searching {
  status: string;
}

const initialState: searching = {
  status: "",
};

export const pokemonSearching = createSlice({
  name: "pokemonSearching",
  initialState,
  reducers: {
    setSearchingStatus: (state, action) => {
      console.log(action.payload);
      state.status = action.payload;
    },
  },
});

export const { setSearchingStatus } = pokemonSearching.actions;
export default pokemonSearching.reducer;
