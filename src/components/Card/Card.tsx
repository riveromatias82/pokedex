import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
} from "@material-ui/core";
import {
  Typography,
} from '@mui/material';
import { AppContext } from "../../AppContext";
import { toFirstCharUppercase } from "./../../helpers";
import { Pokemon } from "./../../types";

const useStyles = makeStyles(() => ({
  cardMedia: {
    margin: "auto"
  },
  cardContent: {
    textAlign: "center",
    padding: "10px"
  },
  hover: {
    "&:hover": {
      background: "#fdd",
      cursor: "pointer"
    }
  }
}));

interface Props {
  pokemonId: number
  handleOpenModal: (idx: number) => void
}

export const PokemonCard = ({ pokemonId, handleOpenModal }: Props) => {
  const context = useContext(AppContext);
  const classes = useStyles();

  const { name, sprite } = context.pokemonData.find(pokemon => pokemon.id === pokemonId) as Pokemon;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={pokemonId}>
      <Card
        className={classes.hover}
      >
        <CardMedia
          className={classes.cardMedia}
          image={sprite}
          style={{ width: "96px", height: "96px" }}
          onClick={() => handleOpenModal(pokemonId)}
        />
        <CardContent className={classes.cardContent}>
          <Typography>{`${toFirstCharUppercase(name)}`}</Typography>
        </CardContent>{" "}
      </Card>
    </Grid>
  );
};
