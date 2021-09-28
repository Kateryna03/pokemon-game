import { Switch, Route, useRouteMatch, Redirect } from "react-router-dom";
import StartPage from "./routes/Start/Start";
import BoardPage from "./routes/Board/Board";
import FinishPage from "./routes/Finish/Finish";
import { PokemonContext } from "../../context/PokemonContext";
import { useState } from "react";

const GamePage = () => {
  const match = useRouteMatch();
  const [selectedPokemon, setSelectedPokemon] = useState({});
  const [player2Pok, setPlayer2Pok] = useState([]);
  const [winner, setWinner] = useState([]);
  //console.log("SElectedPokemon", selectedPokemon);

  const handlePlayer2Pok = (pokemon) => {
    setPlayer2Pok((prevState) => {
      return [...prevState, ...pokemon];
    });
  };
  //console.log("Player2pok", player2Pok);

  const handleClearContext = () => {
    setSelectedPokemon({});
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

  const gameOver = () => {
    if (
      Object.keys(selectedPokemon).length === 5 &&
      Object.keys(player2Pok).length === 5
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemon: selectedPokemon,
        player2Pokemons: player2Pok,

        onSelectedPokemon: handleSelectedPokemons,
        pushPlayer2Pok: handlePlayer2Pok,

        onClearContext: handleClearContext,

        winner,
        setWinner,
        gameOver,
      }}
    >
      <Switch>
        <Route path={`${match.path}/`} exact component={StartPage} />
        <Route path={`${match.path}/board`} component={BoardPage} />
        {/* <Route path={`${match.path}/finish`} component={FinishPage} /> */}
        <Route
          path={`${match.path}/finish`}
          render={() =>
            gameOver() ? <FinishPage /> : <Redirect to={`${match.path}/`} />
          }
        />
      </Switch>
    </PokemonContext.Provider>
  );
};
export default GamePage;
