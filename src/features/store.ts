import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import newPokemonReducer from "./CurrentPokemonSlice";
import pokemonSearching from "./PokemonSearching";

export const store = configureStore({
  reducer: {
    pokemon: newPokemonReducer,
    pokemonSearching: pokemonSearching,
  },
  ////
  // Turn off alerts about SerializableStateInvariantMiddleware threshold of 32ms.
  ////
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
