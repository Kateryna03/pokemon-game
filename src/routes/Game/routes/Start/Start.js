import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Layout from "../../../../components/Layout/Layout";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard";
import s from "./Game.module.css";
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

  const history = useHistory();
  const [pokemons, setPokemons] = useState({});
  const isLoading = useSelector(selectPokemonsIsLoading);
  console.log("###loading", isLoading);
  const pokemonsRedux = useSelector(selectPokemonsData);
  const selectedPokemonsRedux = useSelector(selectedPokemons);
  const dispatch = useDispatch();
  console.log("#####:pokemonsRedux", pokemonsRedux);

  useEffect(() => {
    // pokemonsContext.pushPlayer2Pok([]);
    dispatch(getPokemonsAsync());
  }, []);

  useEffect(() => {
    setPokemons(pokemonsRedux);
  }, [pokemonsRedux]);

  const handleChangeSelected = (key, pokemon) => {
    dispatch(handleSelectedPokemons({ key, pokemon }));
  };

  const handleClick = () => {
    history.push("/");
  };

  const handleStartGameClick = () => {
    history.push("/game/board");
  };
  console.log("Button", Object.keys(selectedPokemonsRedux).length < 5);
  console.log("!!!selectedPokemonsRedux", selectedPokemonsRedux);
  return (
    <>
      <Layout title="Game Page" colorBg="teal">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <button
            onClick={handleStartGameClick}
            disabled={Object.keys(selectedPokemonsRedux).length < 5}
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
