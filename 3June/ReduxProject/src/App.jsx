import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchPokemon } from "./features/pokemon/pokemonSlice";

function App() {
  const [pokemonName, setPokemonName] =
    useState("");

  const dispatch = useDispatch();

  const { pokemon, loading, error } =
    useSelector((state) => state.pokemon);
console.log(pokemon);
  const handleSearch = () => {
    dispatch(fetchPokemon(pokemonName));
  };

  return (
    <div>
      <h1>Pokemon Search</h1>

      <input
        type="text"
        placeholder="Enter pokemon name"
        value={pokemonName}
        onChange={(e) =>
          setPokemonName(e.target.value)
        }
      />

      <button onClick={handleSearch}>
        Search
      </button>

      {loading && <h2>Loading...</h2>}

      {error && <h2>{error}</h2>}

      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>

          <p>ID: {pokemon.id}</p>

          <p>Height: {pokemon.height}</p>

          <p>Weight: {pokemon.weight}</p>

          <img
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
        </div>
      )}
    </div>
  );
}

export default App;