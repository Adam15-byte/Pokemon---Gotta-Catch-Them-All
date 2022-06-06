import { configureStore } from "@reduxjs/toolkit";
import { setNewPokemonReducers } from "./CurrentPokemonSlice";

export const store = configureStore({
  reducer: { setNewPokemon: setNewPokemonReducers },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
