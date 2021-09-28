import { useHistory } from "react-router";
import { useContext, useEffect } from "react";
import { PokemonContext } from "../../../../context/PokemonContext";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard";

import s from "./Board.module.css";
import { useState } from "react";
import PlayerBoard from "./component/PlayerBoard/PlayerBoard";

const counterWin = (board, player1, player2) => {
  let player1Count = player1.length;
  let player2Count = player2.length;

  board.forEach((item) => {
    if (item.possession === "red") {
      player2Count++;
    }

    if (item.possession === "blue") {
      player1Count++;
    }
  });
  return [player1Count, player2Count];
};

const BoardPage = () => {
  //const { pokemon } = useContext(PokemonContext);
  const context = useContext(PokemonContext);
  //console.log("POKEMON", Object.keys(pokemon).length);
  const [board, setBoard] = useState([]);
  const [player2, setPlayer2] = useState([]);
  const [player1, setPlayer1] = useState(() => {
    return Object.values(context.pokemon).map((item) => ({
      ...item,
      possession: "blue",
    }));
  });
  const [choiseCard, setChoiseCard] = useState(null);
  //console.log(board);
  //console.log(player2);
  const [steps, setSteps] = useState(0);

  //console.log("pokCONTEXT", pokemon);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const boardResponse = await fetch(
        "https://reactmarathon-api.netlify.app/api/board"
      );
      const boardRequest = await boardResponse.json();

      const player2Response = await fetch(
        "https://reactmarathon-api.netlify.app/api/create-player"
      );
      const player2Request = await player2Response.json();

      setPlayer2(() => {
        return player2Request.data.map((item) => ({
          ...item,
          possession: "red",
        }));
      });

      await context.pushPlayer2Pok(player2Request.data);
      setBoard(boardRequest.data);
    };
    fetchData();
  }, []);

  if (Object.keys(context.pokemon).length === 0) {
    history.replace("/game");
  }

  const handleClickBoardPlate = async (position) => {
    console.log("position", position);
    console.log("choiseCard", choiseCard);
    if (choiseCard) {
      const params = {
        position,
        card: choiseCard,
        board,
      };
      const response = await fetch(
        "https://reactmarathon-api.netlify.app/api/players-turn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );
      const request = await response.json();
      console.log("Request", request);

      if (choiseCard.player === 1) {
        setPlayer1((prevState) =>
          prevState.filter((item) => item.id !== choiseCard.id)
        );
      }
      if (choiseCard.player === 2) {
        setPlayer2((prevState) =>
          prevState.filter((item) => item.id !== choiseCard.id)
        );
      }
      setBoard(request.data);
      setSteps((prevState) => {
        const count = prevState + 1;
        return count;
      });
    }
  };

  useEffect(() => {
    if (steps === 9) {
      const [count1, count2] = counterWin(board, player1, player2);

      if (count1 > count2) {
        alert("WIN");
        history.replace("/game/finish");
      } else if (count2 > count1) {
        alert("LOSE");
        history.replace("/game/finish");
      } else {
        alert("DRAW");
        history.replace("/game/finish");
      }
    }
  }, [steps]);

  return (
    <div className={s.root}>
      <div className={s.playerOne}>
        <PlayerBoard
          player={1}
          cards={player1}
          onClickCard={(card) => setChoiseCard(card)}
        ></PlayerBoard>
      </div>
      <div className={s.board}>
        {board.map((item) => (
          <div
            key={item.position}
            className={s.boardPlate}
            onClick={() => !item.card && handleClickBoardPlate(item.position)}
          >
            {item.card && (
              <PokemonCard {...item.card} isActive minimize></PokemonCard>
            )}
          </div>
        ))}
      </div>
      <div className={s.playerTwo}>
        <PlayerBoard
          player={2}
          cards={player2}
          onClickCard={(card) => setChoiseCard(card)}
        ></PlayerBoard>
      </div>
    </div>
  );
};

export default BoardPage;
