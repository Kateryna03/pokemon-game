import { useContext } from "react";
import { PokemonContext } from "../../../../context/PokemonContext";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard";

import s from "./Board.module.css";

const BoardPage = () => {
  const { pokemon } = useContext(PokemonContext);
  console.log("pokCONTEXT", pokemon);

  return (
    <div className={s.root}>
      <div className={s.playerOne}></div>
      {Object.values(pokemon).map(({ id, name, values, img, type }) => (
        <PokemonCard
          key={id}
          name={name}
          img={img}
          id={id}
          type={type}
          values={values}
          isActive
          minimize
          className={s.card}
        />
      ))}
      <div className={s.board}>
        <div className={s.boardPlate}>1</div>
        <div className={s.boardPlate}>2</div>
        <div className={s.boardPlate}>3</div>
        <div className={s.boardPlate}>4</div>
        <div className={s.boardPlate}>5</div>
        <div className={s.boardPlate}>6</div>
        <div className={s.boardPlate}>7</div>
        <div className={s.boardPlate}>8</div>
        <div className={s.boardPlate}>9</div>
      </div>
    </div>
  );
};

export default BoardPage;
