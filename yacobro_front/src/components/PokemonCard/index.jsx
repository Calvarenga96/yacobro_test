import { useEffect, useState, useContext } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import { Card, Button } from "antd";
import { PropTypes } from "prop-types";
import pokemonCard from "./pokemonCard.module.css";
import axios from "../../axios";

const { Meta } = Card;

export function PokemonCard({ id, alt, src, name, types, abilities }) {
    const { searching, pokemonSearched } = useContext(PokemonContext);
    const [showGender, setShowGender] = useState(false);
    const [gender, setGender] = useState(null);

    useEffect(() => {
        if (showGender) {
            axios
                .get(`/gender/${id}`)
                .then((response) => {
                    setGender(response?.data?.name);
                })
                .catch(() => {
                    setGender("Sin datos");
                });
        }
    }, [showGender, id]);

    useEffect(() => {
        console.log(pokemonSearched);
    }, [pokemonSearched]);

    return (
        <>
            {!searching ? (
                <Card
                    hoverable={true}
                    cover={<img alt={alt} src={src} />}
                    className={pokemonCard.card}
                >
                    <div>
                        <Meta title="Nombre:" />
                        <p>{name}</p>
                    </div>
                    <hr />
                    <div>
                        <Meta title="Tipos:" />
                        <ul>
                            {types.map((type, index) => (
                                <li key={index}>{type?.type?.name}</li>
                            ))}
                        </ul>
                    </div>
                    <hr />
                    <div>
                        <Meta title="Habilidades" />
                        <ul>
                            {abilities.map((ability, index) => (
                                <li key={index}>{ability?.ability?.name}</li>
                            ))}
                        </ul>
                    </div>
                    <Button
                        type="dashed"
                        onClick={() => setShowGender(!showGender)}
                    >
                        {!showGender ? "Mostrar" : "Ocultar"} sexo
                    </Button>
                    {showGender && <p>{gender}</p>}
                </Card>
            ) : (
                <Card
                    hoverable={true}
                    cover={
                        <img
                            alt={pokemonSearched?.sprites?.front_default}
                            src={src}
                        />
                    }
                    className={pokemonCard.card}
                >
                    <div>
                        <Meta title="Nombre:" />
                        <p>{pokemonSearched?.name}</p>
                    </div>
                    <hr />
                    <div>
                        <Meta title="Tipos:" />
                        <ul>
                            {pokemonSearched?.types?.map((type, index) => (
                                <li key={index}>{type?.type?.name}</li>
                            ))}
                        </ul>
                    </div>
                    <hr />
                    <div>
                        <Meta title="Habilidades" />
                        <ul>
                            {pokemonSearched?.abilities?.map(
                                (ability, index) => (
                                    <li key={index}>
                                        {ability?.ability?.name}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                    <Button
                        type="dashed"
                        onClick={() => setShowGender(!showGender)}
                    >
                        {!showGender ? "Mostrar" : "Ocultar"} sexo
                    </Button>
                    {showGender && <p>{gender}</p>}
                </Card>
            )}
        </>
    );
}

PokemonCard.propTypes = {
    id: PropTypes.number,
    alt: PropTypes.string,
    src: PropTypes.string,
    name: PropTypes.string,
    types: PropTypes.array,
    abilities: PropTypes.array,
};
