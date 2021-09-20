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
  }, []);

  const handlePokemonChangeIsActive = (id, objID, active) => {
    setPokemons((prevState) => {
      return Object.entries(prevState).reduce((acc, item) => {
        const pokemon = { ...item[1] };
        if (pokemon.id === id) {
          if (pokemon.active === true) {
            pokemon.active = !pokemon.active;
          } else {
            pokemon.active = true;
          }
          setCardStatus(item[0], item[1]);
          // database.ref("pokemons/" + objID).update({
          //   ...pokemons[objID],
          //   active: active,
          // });
        }

        acc[item[0]] = pokemon;

        return acc;
      }, {});
    });
  };

  const setCardStatus = (objID, pokemon) => {
    database.ref(`pokemons/${objID}`).set(pokemon);
  };

  const handleAddPokemons = () => {
    const randomPokemon = Math.floor(Math.random() * POKEMONS.length);
    const newKey = database.ref().child("pokemons").push().key;
    database
      .ref("pokemons/" + newKey)
      .set(POKEMONS[randomPokemon])
      .then(() => {
        database.ref("pokemons").once("value", (snapshot) => {
          setPokemons(snapshot.val());
        });
      });
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
            ([key, { name, img, id, type, values, active }]) => (
              <PokemonCard
                key={key}
                name={name}
                img={img}
                id={id}
                type={type}
                values={values}
                onChangeisActive={handlePokemonChangeIsActive}
                isActive={active}
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
