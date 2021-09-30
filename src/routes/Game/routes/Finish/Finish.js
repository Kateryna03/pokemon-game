import { useHistory } from "react-router-dom";
import { useContext, useState } from "react";

import { PokemonContext } from "../../../../context/PokemonContext";
import { FirebaseContext } from "../../../../context/FirebaseContext";

import PokemonCard from "../../../../components/PokemonCard/PokemonCard";

import s from "./Finish.module.css";
//import PlayerBoard from "../../routes/Board/component/PlayerBoard/PlayerBoard";

const FinishPage = () => {
  //const { pokemon } = useContext(PokemonContext);
  // const { player1Pokemons, player2Pokemons, setPlayer2Pok, onClearContext } =
  //useContext(PokemonContext);
  const context = useContext(PokemonContext);
  const firebase = useContext(FirebaseContext);
  const [winner, setTheWinner] = useState({});

  //console.log("pokCONTEXT", pokemon);
  const history = useHistory();

  //const isPlayer1Lost = player1Pokemons.length < context.player2Pokemons.length;

  // const handleCardClick = (id) => {
  //if (isPlayer1Lost) return;

  //   const newState = [...context.player2Pokemons].map((item) => {
  //     delete item.selected;
  //     delete item.possession;
  //     if (item.id === id) {
  //       setChoiseCard(item);
  //       return { ...item, selected: true };
  //     }
  //     return item;
  //   });

  //   setPlayer2Pok(newState);
  // };

  const handleClickEndButton = () => {
    history.replace("/game");
    firebase.addPokemon(winner);
    setTheWinner({});
    context.onClearContext();
  };

  const addWonPokemon = (item) => {
    item.isSelected = !item.isSelected;
    return setTheWinner({ ...item });
  };

  return (
    <div>
      <h1>Finish...</h1>
      <div className={s.root}>
        <div className={s.playerOne}>
          {Object.values(context.pokemon).map((item) => (
            // <div
            //   className={cn(s.cardBoard, { [s.selected]: isSelected === item.id })}
            //   onClick={() => {
            //     setSelected(item.id);
            //     onClickCard && onClickCard({ player, ...item });
            //   }}
            // >
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
          {Object.values(context.player2Pokemons).map((item) => (
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
                if (context.winner === "player1") {
                  addWonPokemon(item);
                  console.log(item.isSelected);
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
