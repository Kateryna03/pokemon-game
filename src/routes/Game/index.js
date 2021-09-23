import { Switch, Route, useRouteMatch } from "react-router-dom";
import StartPage from "./routes/Start/Start";
import BoardPage from "./routes/Board/Board";
import FinishPage from "./routes/Finish/Finish";
import { PokemonContext } from "../../context/PokemonContext";
import { useState } from "react";

const GamePage = () => {
  const match = useRouteMatch();
  const [selectedPokemon, setSelectedPokemon] = useState({});

  const [player2Pok, setPlayer2Pok] = useState([]);
  console.log("SElectedPokemon", selectedPokemon);

  const handlePlayer2Pok = (pokemon) => {
    setPlayer2Pok((prevState) => {
      return [...prevState, ...pokemon];
    });
  };
  console.log("Player2pok", player2Pok);
  const handleClearContext = () => {
    setPlayer2Pok([]);
  };
  const handleSelectedPokemons = (key, pokemon) => {
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
        player2Pokemons: player2Pok,
        pushPlayer2Pok: handlePlayer2Pok,
        onClearContext: handleClearContext,
      }}
    >
      <Switch>
        <Route path={`${match.path}/`} exact component={StartPage} />
        <Route path={`${match.path}/board`} component={BoardPage} />
        <Route path={`${match.path}/finish`} component={FinishPage} />
      </Switch>
    </PokemonContext.Provider>
  );
};
export default GamePage;
