import { useState } from "react/cjs/react.development";
import PokemonCard from "../../../../../../components/PokemonCard/PokemonCard";
import s from "./PlayerBoard.module.css";
import cn from "classnames";

const PlayerBoard = ({ player, cards, onClickCard }) => {
  const [isSelected, setSelected] = useState(null);
  return (
    <>
      {cards.map((item) => (
        <div
          key={item.id}
          className={cn(s.cardBoard, { [s.selected]: isSelected === item.id })}
          onClick={() => {
            setSelected(item.id);
            onClickCard && onClickCard({ player, ...item });
          }}
        >
          <PokemonCard
            key={item.id}
            name={item.name}
            img={item.img}
            id={item.id}
            type={item.type}
            values={item.values}
            minimize
            isActive
          />
        </div>
      ))}
    </>
  );
};

export default PlayerBoard;
