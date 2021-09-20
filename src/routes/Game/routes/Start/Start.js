import { useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
//import database from "../../components/servise/firebase";
import Layout from "../../../../components/Layout/Layout";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard";
//import POKEMONS from "../../../../components/PokemonCard/cards.json";
import { FirebaseContext } from "../../../../context/FirebaseContext";
import s from "./Game.module.css";
import { PokemonContext } from "../../../../context/PokemonContext";

const StartPage = () => {
  const firebase = useContext(FirebaseContext);
  //console.log("Firebase", firebase);
  const pokemonsContext = useContext(PokemonContext);
  const history = useHistory();
  const [pokemons, setPokemons] = useState({});

  useEffect(() => {
    firebase.getPokemonSocket((pokemons) => {
      setPokemons(pokemons);
    });

    return () => {
      firebase.offPokemonSocket();
    };
  }, []);

  const handleChangeSelected = (key) => {
    const pokemon = { ...pokemons[key] };
    pokemonsContext.onSelectedPokemon(key, pokemon);

    setPokemons((prevState) => ({
      ...prevState,
      [key]: {
        ...prevState[key],
        selected: !prevState[key].selected,
      },
    }));
  };

  const handleClick = () => {
    history.push("/");
  };

  const handleStartGameClick = () => {
    history.push("/game/board");
    //console.log("Go to START");
  };

  return (
    <>
      {/* <h1>THIS IS GAME PAGE!!!</h1> */}

      <Layout title="Game Page" colorBg="teal">
        <div
          //   className={s.buttonWrap}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <button
            onClick={handleStartGameClick}
            disabled={Object.keys(pokemonsContext.pokemon).length < 5}
          >
            Start GAME
          </button>
        </div>

        <div className={s.flex}>
          {Object.entries(pokemons).map(
            ([
              key,
              { name, img, id, type, values, selected },
              // minimize,
              // className,
            ]) => (
              <PokemonCard
                key={key}
                name={name}
                img={img}
                id={id}
                type={type}
                values={values}
                onChangeisActive={() => {
                  if (
                    Object.keys(pokemonsContext.pokemon).length < 5 ||
                    selected
                  ) {
                    handleChangeSelected(key);
                  }
                }}
                isActive={true}
                objID={key}
                minimize={false}
                isSelected={selected}
                className={s.card}
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
export default StartPage;
