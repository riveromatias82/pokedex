import React, { useContext } from "react";
import {
  AppBar,
  InputBase,
  makeStyles,
  fade,
} from "@material-ui/core";
import {
  Stack,
  Toolbar,
} from '@mui/material';
import { Search as SearchIcon } from "@mui/icons-material";
import { AppContext } from "../../AppContext";
import PokemonLogo from "./../../pokemon_logo.png";

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: "2rem",
    width: "70vw",
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    transform: "translateY(8px);",
    '@media (max-width: 600px)': {
      transform: "translateY(2px);",
    }, 
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    "&:disabled": {
      color: "white",
    }
  },
}));

interface Type {
  name: string
}

export const Navbar = () => {
  const context = useContext(AppContext);
  const classes = useStyles();  

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    context.setFilter(event.target.value);
    if (event.target.value.length > 0) {
      try {
        const { types, id, name }: { types: [{ slot: number, type: Type }], id: number, name: string } = await (await fetch(`https://pokeapi.co/api/v2/pokemon/${event.target.value}`)).json()
        const mappedTypes = types.map(type => ({name: type.type.name})) as unknown as Type[]
        const tempPokemonData = {
          id: id,
          name: name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          types: mappedTypes
        };
        context.setPokemonData([tempPokemonData]);
      } catch (error) {
        console.log('Error fetching data:', error)
      }
    }
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-around" }}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={{ xs: 1, sm: 2 }} justifyContent="space-between" ml={2} mr={2} p={2}>
          <img src={PokemonLogo} style={{ height: 48, width: 'auto', maxWidth: '100%', objectFit: 'contain' }} />
          <div className={classes.searchContainer}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder={"Search for a Pokemon..."}
              onChange={handleSearchChange}
              value={context.filter}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
        </Stack>
      </Toolbar>
    </AppBar>
  )
};
