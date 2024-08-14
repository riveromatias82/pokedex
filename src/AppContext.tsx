import React from "react";

import { Pokemon } from "./types";

interface IContextProps {
  filter: string,
  setFilter: React.Dispatch<string>,
  pokemonData: Pokemon[],
  setPokemonData: React.Dispatch<Pokemon[]>,
  pokemonCollection: Pokemon[],
  setPokemonCollection: React.Dispatch<Pokemon[]>,
}

export const AppContext = React.createContext({} as IContextProps);
