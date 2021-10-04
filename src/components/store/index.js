import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter";
import pokemonsReducer from "./pokemons";
import userReducer from "./user";

export default configureStore({
  reducer: {
    counter: counterReducer,
    pokemons: pokemonsReducer,
    user: userReducer,
  },
});
