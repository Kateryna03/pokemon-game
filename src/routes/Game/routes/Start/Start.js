import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
//import database from "../../components/servise/firebase";
import Layout from "../../../../components/Layout/Layout";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard";
//import POKEMONS from "../../../../components/PokemonCard/cards.json";
//import { FirebaseContext } from "../../../../context/FirebaseContext";
import s from "./Game.module.css";
//import { PokemonContext } from "../../../../context/PokemonContext";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonsAsync,
  handleSelectedPokemons,
  selectedPokemons,
  selectPokemonsData,
  selectPokemonsIsLoading,
} from "../../../../components/store/pokemons";

const StartPage = () => {
  //const firebase = useContext(FirebaseContext);
  //console.log("Firebase", firebase);
  //const pokemonsContext = useContext(PokemonContext);
  const history = useHistory();
  const [pokemons, setPokemons] = useState({});
  const isLoading = useSelector(selectPokemonsIsLoading);
  console.log("###loading", isLoading);
  const pokemonsRedux = useSelector(selectPokemonsData);
  const selectedPokemonsRedux = useSelector(selectedPokemons);
  const dispatch = useDispatch();
  console.log("#####:pokemonsRedux", pokemonsRedux);

  useEffect(() => {
    //pokemonsContext.onSelectedPokemon(null);
    // pokemonsContext.pushPlayer2Pok([]);
    dispatch(getPokemonsAsync());
    // firebase.getPokemonSocket((pokemons) => {
    //   setPokemons(pokemons);
    // });

    // return () => {
    //   firebase.offPokemonSocket();
    // };
  }, []);

  useEffect(() => {
    setPokemons(pokemonsRedux);
  }, [pokemonsRedux]);

  const handleChangeSelected = (key, pokemon) => {
    //const pokemon = { ...pokemons[key] };
    dispatch(handleSelectedPokemons({ key, pokemon }));
    //pokemonsContext.onSelectedPokemon(key, pokemon);

    // setPokemons((prevState) => ({
    //   ...prevState,
    //   [key]: {
    //     ...prevState[key],
    //     selected: !prevState[key].selected,
    //   },
    // }));
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
            //disabled={Object.keys(pokemonsContext.pokemon).length < 5}
            disable={Object.keys(selectedPokemonsRedux).length < 5}
          >
            Start GAME
          </button>
        </div>

        <div className={s.flex}>
          {Object.entries(pokemonsRedux).map(
            ([
              key,
              pokemon,
              // minimize,
              // className,
            ]) => (
              <PokemonCard
                key={pokemon.key}
                name={pokemon.name}
                img={pokemon.img}
                id={pokemon.id}
                type={pokemon.type}
                values={pokemon.values}
                isSelected={pokemon.selected}
                onChangeisActive={() => {
                  if (
                    Object.keys(selectedPokemonsRedux).length < 5 ||
                    pokemon.selected
                  ) {
                    handleChangeSelected(key, pokemon);
                  }
                }}
                isActive={true}
                objID={pokemon.key}
                minimize={false}
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
