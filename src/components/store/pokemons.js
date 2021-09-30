import { createSlice } from "@reduxjs/toolkit";
import FirebaseClass from "../servise/firebase";

export const slice = createSlice({
  name: "pokemons",
  initialState: {
    isLoading: false,
    data: {},
    error: null,
    selectedPokemons: {},
  },
  reducers: {
    fetchPokemons: (state) => ({
      ...state,
      isLoading: true,
    }),

    fetchPokemonsResolve: (state, action) => ({
      ...state,
      isLoading: false,
      data: action.payload,
    }),

    fetchPokemonsReject: (state, action) => ({
      ...state,
      isLoading: false,
      data: {},
      error: action.payload,
    }),

    handleSelectedPokemons: (state, { payload: { key, pokemon } }) => {
      if (state.selectedPokemons[key]) {
        const newPokemons = { ...state.selectedPokemons };
        if (newPokemons[key]) {
          delete newPokemons[key];
          return { ...state, selectedPokemons: newPokemons };
        }

        if (Object.entries(state.selectedPokemons).length < 5) {
          newPokemons[key] = pokemon;
          return { ...state, selectedPokemons: newPokemons };
        }
      }
    },
  },
});

export const { handleSelectedPokemons } = slice.actions;

export const setSelectedPokemons = () => handleSelectedPokemons();

export const { fetchPokemons, fetchPokemonsResolve, fetchPokemonsReject } =
  slice.actions;

export const selectPokemonsIsLoading = (state) => state.pokemons.isLoading;

export const selectPokemonsData = (state) => state.pokemons.data;

export const selectedPokemons = (state) => state.pokemons.selectedPokemons;

export const getPokemonsAsync = () => async (dispatch) => {
  dispatch(fetchPokemons());
  const data = await FirebaseClass.getPokemonsOnce();
  dispatch(fetchPokemonsResolve(data));
};

export default slice.reducer;
