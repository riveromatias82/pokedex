import toast from "react-hot-toast";

export const toastAlert = (msg: string, alert: 'error' | 'success') =>
  toast[alert](msg, {
    position: "top-right",
});

export const toFirstCharUppercase = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

export const colorTypes = {
  normal: 'darkseagreen',
  fire: 'orange',
  fighting: 'darkred',
  water: 'blue',
  flying: 'bisque',
  grass: 'green',
  poison: 'purple',
  electric: 'yellow',
  ground: 'darkgoldenrod',
  psychic: 'pink',
  rock: 'darkbrown',
  ice: 'ghostwhite',
  bug: 'khaki',
  dragon: 'dodgerblue',
  ghost: 'indigo',
  dark: 'saddlebrown',
  steel: 'darkgray',
  faire: 'salmon'
};
