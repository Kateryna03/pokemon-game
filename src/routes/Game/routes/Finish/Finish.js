import { useHistory } from "react-router-dom";
import { useState } from "react";
//import { useSelector } from "react-redux";
import { selectLocalId } from "../../../../components/store/user";

import { useDispatch, useSelector } from "react-redux";
import {
  selectedPokemons,
  selectedPokemons2,
  cleanPokemons,
  winner as storeWinner,
  //handleSetWinner,
} from "../../../../components/store/pokemons";

import FirebaseClass from "../../../../components/servise/firebase";

import PokemonCard from "../../../../components/PokemonCard/PokemonCard";

import s from "./Finish.module.css";

const FinishPage = () => {
  //const [winner, setTheWinner] = useState({});
  //const [choiseCard, setChoiseCard] = useState({});

  const selectedPokemonsRedux = useSelector(selectedPokemons);
  const selectedPokemons2Redux = useSelector(selectedPokemons2);

  const localId = useSelector(selectLocalId);
  console.log("#######LOCALID", localId);
  const winnerRedux = useSelector(storeWinner);
  const [wonPokemon, setWonPokemon] = useState({});

  const history = useHistory();
  const dispatch = useDispatch();

  const handleClickEndButton = () => {
    // history.replace("/game");
    // FirebaseClass.addPokemon(winner);
    // //dispatch(handleSetWinner());
    // dispatch(cleanPokemons());

    if (winnerRedux === "player1") {
      if (Object.keys(wonPokemon).length !== 0) {
        //   //const localId = selectLocalId(getState());
        FirebaseClass.addPokemon(wonPokemon, localId);
        setWonPokemon({ wonPokemon });
        dispatch(cleanPokemons());
        history.replace("/game");
      } else {
        alert("Choose a pokemon!");
      }
      //}
    } else {
      dispatch(cleanPokemons());
      history.replace("/game");
    }
  };

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
              isSelected={item.selected}
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

                  //if (Object.keys(wonPokemon).length !== 0) {
                  //const localId = selectLocalId(getState());
                  //FirebaseClass.addPokemon(wonPokemon, localId);
                  //setWonPokemon({ wonPokemon });
                  //dispatch(cleanPokemons());
                  //history.replace("/game");
                  //}
                  //else {
                  // alert("Choose a pokemon!");
                }

                //console.log(item.isSelected);
                //}
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinishPage;
