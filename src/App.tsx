import React, { useState } from 'react';
import { Toaster } from "react-hot-toast";
import { Sidebar } from "./components/Sidebar/Sidebar"
import { Navbar } from "./components/Navbar/Navbar"
import { AppContext } from "./AppContext";
import PokemonList from "./components/List/List";
import { Pokemon } from "./types";

function App() {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [pokemonCollection, setPokemonCollection] = useState<Pokemon[]>([]);
  const [filter, setFilter] = useState<string>('');

  return (
    <div className="App">
      <AppContext.Provider value={{
        filter,
        setFilter,
        pokemonData,
        setPokemonData,
        pokemonCollection,
        setPokemonCollection,
      }}>
        <React.StrictMode>
          <Navbar />
          <Sidebar />
          <Toaster />
          <PokemonList />
        </React.StrictMode>
      </AppContext.Provider>
    </div>
  );
}

export default App;
