import axios from "../axios";

export const getPokemons = async (limit = 9, offset = 0) => {
    const pokemons = await axios.get(
        `/pokemon?limit=${limit}&offset=${offset}`
    );
    return pokemons;
};
