import { useContext, useEffect } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import { Input } from "antd";
import PropTypes from "prop-types";

export function Search() {
    const { pokemons, setSearching, setPokemonSearched, pokemonSearched } =
        useContext(PokemonContext);

    const handleChange = (event) => {
        const search = event.target.value;

        if (search.length > 0) {
            setSearching(true);
        } else {
            setSearching(false);
        }

        const pokemon = pokemons.filter((pokemon) => pokemon?.name === search);
        setPokemonSearched(pokemon[0]);
    };

    return <Input placeholder="Buscar pokemon..." onChange={handleChange} />;
}

Search.propTypes = {
    word: PropTypes.array,
};
