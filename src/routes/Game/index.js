import { Switch, Route, useRouteMatch } from "react-router-dom";
import StartPage from "./routes/Start/Start";
import BoardPage from "./routes/Board/Board.js";
import FinishPage from "./routes/Finish/Finish";
import { PokemonContext } from "../../context/PokemonContext";
import { useState, useContext, useEffect } from "react";

const GamePage = () => {
  const match = useRouteMatch();
  const [selectedPokemon, setSelectedPokemon] = useState({});
  console.log("SElectedPokemon", selectedPokemon);

  const handleSelectedPokemons = (key, pokemon) => {
    // console.log("handleSelectedPokemons");
    // console.log("key", key);
    // console.log("pokemon", pokemon);

    setSelectedPokemon((prevState) => {
      if (prevState[key]) {
        const copyState = { ...prevState };
        delete copyState[key];
        return copyState;
      }
      return {
        ...prevState,
        [key]: pokemon,
      };
    });
  };
  return (
    <PokemonContext.Provider
      value={{
        pokemon: selectedPokemon,
        onSelectedPokemon: handleSelectedPokemons,
      }}
    >
      <Switch>
        <Route path={`${match.path}/`} exact component={StartPage} />
        <Route path={`${match.path}/board`} component={BoardPage} />
        <Route path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
    </PokemonContext.Provider>
  );

  // const firebase = useContext(FirebaseContext);
  // console.log("Firebase", firebase);
  // const history = useHistory();
  // const [pokemons, setPokemons] = useState({});

  // useEffect(() => {
  //   firebase.getPokemonSocket((pokemons) => {
  //     setPokemons(pokemons);
  //   });

  //   return () => {
  //     firebase.offPokemonSocket();
  //   };
  // }, []);

  // const handlePokemonChangeIsActive = (id) => {
  //   setPokemons((prevState) => {
  //     return Object.entries(prevState).reduce((acc, item) => {
  //       const pokemon = { ...item[1] };
  //       if (pokemon.id === id) {
  //         pokemon.active = !pokemon.active;
  //       }
  //       acc[item[0]] = pokemon;
  //       firebase.setPokemon(item[0], pokemon);

  //       return acc;
  //     }, {});
  //   });
  // };

  // const handleAddPokemons = () => {
  //   const randomPokemon = Math.floor(Math.random() * POKEMONS.length);
  //   firebase.addPokemon(
  //     POKEMONS[randomPokemon]

  //   );

  // };

  // const handleClick = () => {
  //   history.push("/");
  // };

  // return (
  //   <>

  //     <Layout title="Game Page" colorBg="teal">
  //       <div
  //         style={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //         }}
  //       >
  //         <button onClick={handleAddPokemons}>Add POKEMONS</button>
  //       </div>

  //       <div className="flex">
  //         {Object.entries(pokemons).map(
  //           ([
  //             key,
  //             { name, img, id, type, values, active, isSelected },

  //           ]) => (
  //             <PokemonCard
  //               key={key}
  //               name={name}
  //               img={img}
  //               id={id}
  //               type={type}
  //               values={values}
  //               onChangeisActive={handlePokemonChangeIsActive}
  //               isActive={active}
  //               objID={key}
  //               minimize={false}
  //               isSelected={isSelected}

  //             />
  //           )
  //         )}
  //       </div>
  //     </Layout>
  //     <div
  //       style={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       <button onClick={handleClick}>Go Home</button>
  //     </div>
  //   </>
  // );
};
export default GamePage;
