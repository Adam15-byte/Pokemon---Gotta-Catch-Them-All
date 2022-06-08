import { createSlice } from "@reduxjs/toolkit";

export interface state {
  visible: boolean;
}

const initialState: state = {
  visible: false,
};

export const catchingVisibility = createSlice({
  name: "catchingVisibility",
  initialState,
  reducers: {
    catchingVisibilityToTrue: (state, action) => {
      console.log("visibility to true");
      state.visible = true;
    },
    catchingVisibilityToFalse: (state, action) => {
      console.log("visibility to false");
      state.visible = false;
    },
  },
});

export const { catchingVisibilityToTrue, catchingVisibilityToFalse } =
  catchingVisibility.actions;

export default catchingVisibility.reducer;
