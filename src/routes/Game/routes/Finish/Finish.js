import { useHistory } from "react-router";
import { useContext, useEffect } from "react";

import { PokemonContext } from "../../../../context/PokemonContext";
import { FirebaseContext } from "../../../../context/FirebaseContext";

import PokemonCard from "../../../../components/PokemonCard/PokemonCard";

import s from "./Finish.module.css";
import { useState } from "react/cjs/react.development";
import PlayerBoard from "../../routes/Board/component/PlayerBoard/PlayerBoard";

const FinishPage = () => {
  const { pokemon } = useContext(PokemonContext);
  const context = useContext(PokemonContext);
  const firebase = useContext(FirebaseContext);

  console.log("POKEMON", Object.keys(pokemon).length);

  const [choiseCard, setChoiseCard] = useState(null);

  console.log("pokCONTEXT", pokemon);
  const history = useHistory();

  const handleClickEndButton = () => {
    //PokemonContext.clearContext()
    context.onClearContext();
    history.push("/game");
  };

  return (
    <div>
      <h1>Finish...</h1>
      <div className={s.root}>
        <div className={s.playerOne}>
          {Object.values(pokemon).map((item) => (
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
              minimize
              isActive
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
          {context.player2Pokemons.map((item) => (
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
              minimize
              isActive
              isSelected={choiseCard && choiseCard.id === item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinishPage;
