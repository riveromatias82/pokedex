import React, { useEffect, useState, useContext } from "react";
import {
  Chip,
  CircularProgress,
  Grid,
  Modal,
  makeStyles,
} from "@material-ui/core";
import {
  Typography,
  Button,
  Box,
} from '@mui/material';
import { toFirstCharUppercase, colorTypes } from "./../../helpers";
import { Pokemon } from "./../../types";
import { AppContext } from "./../../AppContext";
import { PokemonCard } from "../../components/Card/Card";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: "40px",
    margin: 0,
    width: "100%",
  },
  chip: {
    marginRight: "10px",
    textTransform: "uppercase",
    color: "white",
  },
  paper: {
    position: "absolute",
    width: 500,
    '@media (max-width: 600px)': {
      width: "70vw", 
    }, 
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
}));

interface Type {
  name: string
}

const PokemonList = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalStyle] = useState(getModalStyle);

  const context = useContext(AppContext);

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    if (context.filter === '')
      fetchData();
  }, [context.filter]);

  const handleLoadMore = () => {
    if (isLoading) return;
    setPage(prevPage => prevPage + 1);
  };

  const fetchData = async () => {
    if (!isLoading) setIsLoading(true);
    const limit = 10;
    const offset = page * limit - limit;
    try {
      const { results } = await (await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)).json()
      setHasMore(results.length > 0);
      const newPokemonData: Pokemon[] = await Promise.all(results.map(async (pokemon: {"name": string, "url": string}, index: number) => {
        const { types }: {types: [{ slot: number, type: Type }]} = await (await fetch(pokemon.url)).json()
        const mappedTypes = types.map(type => ({name: type.type.name})) as unknown as Type[]
        return {
          id: index + 1,
          name: pokemon.name,
          sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
          types: mappedTypes
        };
      }));
      const tempPokemonData = [...context.pokemonData, ...newPokemonData]
      context.setPokemonData(tempPokemonData);
    } catch (error) {
      console.log('Error fetching data:', error)
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (idx: number) => {
    setCurrentIdx(idx);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setCurrentIdx(0);
    setOpenModal(false);
  };

  interface Props {
    types: Type[]
  }

  function Types({ types }: Props) {
    const classes = useStyles();

    return (
      <>
        {types ? types.map((type, index) => {
            return (
              <Chip
                key={index}
                size="small"
                className={classes.chip}
                label={type.name}
                style={{backgroundColor: `${colorTypes[type.name as keyof typeof colorTypes]}` }}
              />
            )})
          : ''
        }
      </>
    )
  };

  const currentPoquemon = context.pokemonData.find(pokemon => pokemon.id === currentIdx);

  return (
    <>
    {context.pokemonData ? (
      <>
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {context.pokemonData.map((pokemon, index) => (
            <PokemonCard
              key={index}
              pokemonId={pokemon.id}
              handleOpenModal={handleOpenModal}
            />
          ))}
        </Grid>
        {hasMore && (
          <Box m={2} pb={3} textAlign="center">
            <Button color="primary" variant="outlined" onClick={handleLoadMore}>
              {isLoading ? "Loading..." : "Load More"}
            </Button>
          </Box>
        )}
        <Modal open={openModal} onClose={handleCloseModal}>
          <>
            <div style={modalStyle} className={classes.paper}>
              {currentPoquemon && (
                <>
                <img src={currentPoquemon.image} alt={currentPoquemon.image} style={{ width: '100%', 'objectFit': 'contain' }}/>
                <Typography>{`${toFirstCharUppercase(currentPoquemon.name)}`}</Typography>
                <Types types={currentPoquemon.types} />
                </>
              )}
            </div>
          </>
        </Modal>
      </>
    ) : (
      <CircularProgress />
    )}
    </>
  );
};

export default PokemonList;