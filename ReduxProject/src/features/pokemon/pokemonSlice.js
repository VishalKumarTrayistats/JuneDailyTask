import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPokemon = createAsyncThunk(
  "pokemon/fetchPokemon",

  async (pokemonName) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    );

    const data = await response.json();

    return data;
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",

  initialState: {
    pokemon: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchPokemon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.loading = false;
        state.pokemon = action.payload;
      })

      .addCase(fetchPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default pokemonSlice.reducer;