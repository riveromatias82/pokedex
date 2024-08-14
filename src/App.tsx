import React, { useState } from 'react';
import { Navbar } from "./components/Navbar/Navbar"
import PokemonList from "./components/List/List";
import { AppContext } from "./AppContext";
import { Pokemon } from "./types";

function App() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [filter, setFilter] = useState<string>('');

  return (
    <div className="App">
      <AppContext.Provider value={{
        filter,
        setFilter,
        pokemonData,
        setPokemonData,
      }}>
        <React.StrictMode>
          <Navbar />
          <PokemonList />
        </React.StrictMode>
      </AppContext.Provider>
    </div>
  );
}

export default App;
