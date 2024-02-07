import axios from "../axios";

export const getPokemon = async (url) => {
    const pokemon = await axios.get(`${url}`);
    return pokemon;
};
