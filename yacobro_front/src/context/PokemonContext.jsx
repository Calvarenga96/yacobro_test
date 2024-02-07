import { createContext, useState } from "react";

export const PokemonContext = createContext(null);

export const PokemonProvider = ({ children }) => {
    const [searching, setSearching] = useState(false);
    const [pokemons, setPokemons] = useState([]);
    const [pokemonSearched, setPokemonSearched] = useState({});

    const value = {
        searching,
        setSearching,
        pokemons,
        setPokemons,
        pokemonSearched,
        setPokemonSearched,
    };
    return (
        <PokemonContext.Provider value={value}>
            {children}
        </PokemonContext.Provider>
    );
};
