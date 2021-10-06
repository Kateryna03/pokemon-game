import { createSlice } from "@reduxjs/toolkit";
//import FirebaseClass from "../servise/firebase";
import { selectLocalId } from "./user";

export const slice = createSlice({
  name: "pokemons",
  initialState: {
    isLoading: false,
    data: {},
    error: null,
    selectedPokemons: {},
    selectedPokemons2: {},
    winner: null,
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
      const newPokemons = { ...state.selectedPokemons };
      if (newPokemons[key]) {
        delete newPokemons[key];
        return { ...state, selectedPokemons: newPokemons[key] };
      }

      newPokemons[key] = pokemon;
      console.log("!!!!!STATE", state);
      console.log("!!!!!!NEWPOK", newPokemons);
      console.log("!!!!!!SELECTEDpok", selectedPokemons);
      return { ...state, selectedPokemons: newPokemons };
      //   }
      //}
    },
    handleSetPlayer2: (state, action) => {
      console.log(state);
      return {
        ...state,
        selectedPokemons2: {
          ...action.payload,
        },
      };
    },
    cleanPokemons: (state) => {
      return {
        ...state,
        selectedPokemons: {},
        selectedPokemons2: {},
      };
    },

    handleSetWinner: (state, action) => {
      return {
        ...state,
        winner: action.payload,
      };
    },
  },
});

export const { handleSelectedPokemons } = slice.actions;

export const {
  fetchPokemons,
  fetchPokemonsResolve,
  fetchPokemonsReject,
  handleSetPlayer2,
  handleSetWinner,
  cleanPokemons,
} = slice.actions;

export const selectPokemonsIsLoading = (state) => state.pokemons.isLoading;

export const selectPokemonsData = (state) => state.pokemons.data;
export const selectPokemons2 = (state) => state.pokemons.selectedPokemons2;

export const selectedPokemons = (state) => state.pokemons.selectedPokemons;

export const winner = (state) => state.pokemons.winner;

export const getPokemonsAsync = () => async (dispatch, getState) => {
  const localId = selectLocalId(getState());
  dispatch(fetchPokemons());
  const data = await fetch(
    `https://pokemon-game-e6401-default-rtdb.firebaseio.com/${localId}/pokemons.json`
  ).then((res) => res.json());
  console.log("data", data);
  dispatch(fetchPokemonsResolve(data));
};

// export const get2PokemonsAsync = () => async (dispatch) => {
//   dispatch(fetchPokemons());
//   const player2Response = await fetch(
//     "https://reactmarathon-api.netlify.app/api/create-player"
//   );
//   const player2Request = await player2Response.json();
//   dispatch(
//     fetchPokemonsResolve({
//       data: player2Request,
//       pokemons: player2Request.data,
//     })
//   );
//   //dispatch(fetchPokemonsReject("Error"));
// };

export default slice.reducer;
