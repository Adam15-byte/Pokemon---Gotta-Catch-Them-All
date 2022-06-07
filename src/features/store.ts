import { configureStore } from "@reduxjs/toolkit";
import newPokemonReducer from "./CurrentPokemonSlice";

export const store = configureStore({
  reducer: {
    pokemon: newPokemonReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
