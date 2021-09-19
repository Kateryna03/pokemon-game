import { useHistory } from "react-router";
import { useState, useEffect } from "react";

import database from "../../components/servise/firebase";
import Layout from "../../components/Layout/Layout";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import POKEMONS from "../../components/PokemonCard/cards.json";

const GamePage = () => {
  const history = useHistory();
  const [pokemons, setPokemons] = useState({});
  //console.log(pokemons);

  useEffect(() => {
    database.ref("pokemons").once("value", (snapshot) => {
      //console.log("snapshot", snapshot.val());
      setPokemons(snapshot.val());
    });
  }, [pokemons]);

  const handlePokemonChangeIsActive = (id, isActive, objID) => {
    setPokemons((prevState) => {
      return Object.entries(prevState).reduce((acc, item) => {
        const pokemon = { ...item[1] };
        if (pokemon.id === id) {
          pokemon.isActive = true;
          database
            .ref(`pokemons/${objID}`)
            .update({ ...pokemons[objID], isActive: !isActive });
        }

        acc[item[0]] = pokemon;

        return acc;
      }, {});
    });
    //console.log("OBJ ID", pokemons[objID]);

    //console.log("CLICK ON POKEMON");
  };

  const handleAddPokemons = () => {
    const randomPokemon = Math.floor(Math.random() * POKEMONS.length);
    const newKey = database.ref().child("pokemons").push().key;
    database.ref("pokemons/" + newKey).set(POKEMONS[randomPokemon]);
  };
  const handleClick = () => {
    history.push("/");
  };

  return (
    <>
      {/* <h1>THIS IS GAME PAGE!!!</h1> */}

      <Layout title="Game Page" colorBg="teal">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button onClick={handleAddPokemons}>Add POKEMONS</button>
        </div>

        <div className="flex">
          {Object.entries(pokemons).map(
            ([key, { name, img, id, type, values, isActive }]) => (
              <PokemonCard
                key={key}
                name={name}
                img={img}
                id={id}
                type={type}
                values={values}
                onChangeisActive={handlePokemonChangeIsActive}
                isActive={true}
                objID={key}
              />
            )
          )}
        </div>
      </Layout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={handleClick}>Go Home</button>
      </div>
    </>
  );
};
export default GamePage;
