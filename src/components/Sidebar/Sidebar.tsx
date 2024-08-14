import React, { useState, useEffect, useContext } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import ListIcon from "@mui/icons-material/ListAlt";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { toastAlert } from "../../helpers";
import { AppContext } from "../../AppContext";

export const Sidebar = () => {
  const context = useContext(AppContext);

  const [isOpen, setIsOpen] = useState({right: false,});

  useEffect(() => {
    if (localStorage.getItem("pokemonCollection")) {
      const pokemonCollectionLocal = JSON.parse(localStorage.getItem("pokemonCollection") || '[]')
      if (pokemonCollectionLocal)
        context.setPokemonCollection(pokemonCollectionLocal)
    }
  }, []);
  
  const toggleDrawer = (anchor: string, open: boolean) => () => {
    setIsOpen({ ...isOpen, [anchor]: open });
  };
  
  const handleUncatch = (idx: number) => {
    const newPokemonCollection = context.pokemonCollection.filter((pokemon) => pokemon.id !== idx);
    context.setPokemonCollection(newPokemonCollection);
    localStorage.setItem("pokemonCollection", JSON.stringify(newPokemonCollection));
    toastAlert("Released!", "error");
  };

  return (
    <Box>
      <Button
        onClick={toggleDrawer("right", true)}
        sx={{
          position: "fixed",
          right: "0",
          top: "50%",
          transform: "translate(6%, -50%)",
        }}
      >
        <Paper
          elevation={1}
          color="primary"
          sx={{
            padding: ".25rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ListIcon
            sx={{
              width: "2rem",
              height: "2rem",
            }}
          />
        </Paper>
      </Button>
      <Drawer
        anchor={"right"}
        open={isOpen["right"]}
        onClose={toggleDrawer("right", false)}
      >
        <Box
          sx={{
            width: 250,
          }}
        >
          <Box
            sx={{
              marginY: "1rem",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              sx={{
                textAlign: "center",
              }}
            >
              Collection
            </Typography>
          </Box>
          <Divider />
          <Box>
            <List>
              {context.pokemonCollection?.map((pokemon, index) => {
                return (
                  <ListItem key={index}>
                    <ListItemAvatar>
                      <Avatar
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                        alt={pokemon.name}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={pokemon.name} />

                    <Button onClick={() => handleUncatch(pokemon.id)}>
                      <DeleteIcon />
                    </Button>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};