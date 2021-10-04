import { useHistory } from "react-router-dom";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  selectedPokemons,
  selectPokemons2,
  cleanPokemons,
  winner,
  handleSetWinner,
} from "../../../../components/store/pokemons";

import FirebaseClass from "../../../../components/servise/firebase";

import PokemonCard from "../../../../components/PokemonCard/PokemonCard";

import s from "./Finish.module.css";

const FinishPage = () => {
  //const [winner, setTheWinner] = useState({});
  //const [choiseCard, setChoiseCard] = useState({});

  const selectedPokemonsRedux = useSelector(selectedPokemons);
  const selectedPokemons2Redux = useSelector(selectPokemons2);
  const winnerRedux = useSelector(winner);
  const [wonPokemon, setWonPokemon] = useState({});

  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickEndButton = () => {
    // history.replace("/game");
    // FirebaseClass.addPokemon(winner);
    // //dispatch(handleSetWinner());
    // dispatch(cleanPokemons());

    if (Object.keys(wonPokemon).length !== 0) {
      FirebaseClass.addPokemon(wonPokemon);
      setWonPokemon({});
      dispatch(cleanPokemons());
      history.replace("/game");
    } else {
      alert("Choose a pokemon!");
    }
  };
  //};

  const addWonPokemon = (item) => {
    //item.isSelected = !item.isSelected;
    return setWonPokemon({ ...item });
  };

  return (
    <div>
      <h1>Finish...</h1>
      <div className={s.root}>
        <div className={s.playerOne}>
          {Object.values(selectedPokemonsRedux).map((item) => (
            <PokemonCard
              className={s.card}
              key={item.id}
              name={item.name}
              img={item.img}
              id={item.id}
              type={item.type}
              values={item.values}
              possession={item.possession}
              minimize
              isActive
              //isSelected={item.selected}
            />
          ))}
        </div>

        <div>
          <button
            className={s.button}
            type="button"
            onClick={handleClickEndButton}
          >
            END GAME
          </button>
        </div>

        <div className={s.playerTwo}>
          {Object.values(selectedPokemons2Redux).map((item) => (
            <PokemonCard
              className={s.card}
              key={item.id}
              name={item.name}
              img={item.img}
              id={item.id}
              type={item.type}
              values={item.values}
              minimize
              isActive
              isSelected={item.selected}
              possession={item.possession}
              onClickCard={() => {
                if (winnerRedux === "player1") {
                  addWonPokemon(item);

                  //console.log(item.isSelected);
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinishPage;
