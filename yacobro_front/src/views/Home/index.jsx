import { useEffect, useContext } from "react";
import { PokemonCard } from "../../components/PokemonCard";
import { getPokemon, getPokemons } from "../../services";
import { Col, Row } from "antd";
import { Search } from "../../components/Search";
import { PokemonContext } from "../../context/PokemonContext";

export function Home() {
    const { pokemons, setPokemons, searching, pokemonSearched } =
        useContext(PokemonContext);

    const fetchData = async () => {
        try {
            const response = await getPokemons();
            const pokemonsList = response?.data?.results;
            const pokemonsData = await Promise.all(
                pokemonsList.map(async (pokemon) => {
                    const pokemonResponse = await getPokemon(pokemon?.url);
                    return pokemonResponse?.data;
                })
            );
            setPokemons(pokemonsData);
        } catch (error) {
            console.error("Error al obtener los datos:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <Row>
                <Search />
            </Row>
            <br />
            <br />
            {!searching ? (
                <Row>
                    {pokemons?.map((pokemon) => (
                        <Col key={pokemon?.id} span={8}>
                            <PokemonCard
                                id={pokemon?.id}
                                alt={pokemon?.name}
                                src={pokemon?.sprites?.front_shiny}
                                name={pokemon?.name}
                                types={pokemon?.types}
                                abilities={pokemon?.abilities}
                            />
                        </Col>
                    ))}
                </Row>
            ) : (
                <Row>
                    <Col>
                        <PokemonCard
                            id={pokemonSearched?.id}
                            alt={pokemonSearched?.name}
                            src={pokemonSearched?.sprites?.front_shiny}
                            name={pokemonSearched?.name}
                            types={pokemonSearched?.types}
                            abilities={pokemonSearched?.abilities}
                        />
                    </Col>
                </Row>
            )}
        </div>
    );
}
