import { useHistory } from "react-router";
import { useContext, useEffect } from "react";
import { PokemonContext } from "../../../../context/PokemonContext";
import PokemonCard from "../../../../components/PokemonCard/PokemonCard";
import {
  handleSetPlayer2,
  handleSetWinner,
  selectedPokemons,
  selectPokemonsData,
} from "../../../../components/store/pokemons";
import s from "./Board.module.css";
import { useState } from "react";
import PlayerBoard from "./component/PlayerBoard/PlayerBoard";
import { useDispatch, useSelector } from "react-redux";
import request from "../../../../components/servise/request";
//import { selectPokemonsIsLoading } from "../../../../components/store/pokemons";

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

const returnBoard = (board) => {
  return board.map((item, index) => {
    let card = null;
    if (typeof item === "object") {
      card = {
        ...item.poke,
        possesion: item.holder === "p1" ? "blue" : "red",
      };
    }
    return {
      position: index + 1,
      card,
    };
  });
};

const BoardPage = () => {
  const selectedPokemonsRedux = useSelector(selectedPokemons);
  const dispatch = useDispatch();
  const pokemonsSelector = useSelector(selectPokemonsData);
  //const pokemonsRedux = useSelector(selectPokemonsIsLoading);
  //console.log("POKEMON", Object.keys(pokemon).length);
  const [board, setBoard] = useState([]);
  const [player2, setPlayer2] = useState([]);
  const [player1, setPlayer1] = useState(() => {
    return Object.values(selectedPokemonsRedux).map((item) => ({
      ...item,
      possession: "blue",
    }));
  });
  const [choiseCard, setChoiseCard] = useState(null);
  const [steps, setSteps] = useState(0);
  const [startSide, setStartSide] = useState(0);
  const [serverBoard, setServerBoard] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [typeResult, setTypeResult] = useState(null);
  //console.log("pokCONTEXT", pokemon);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const boardRequest = await request.getBoard();
      setBoard(boardRequest.data);

      const player2Request = await request.gameStart({
        pokemons: Object.values(pokemonsSelector),
      });

      setTimeout(() => {
        const side = Math.floor(Math.random() * 2) + 1;
        setStartSide(side);
      }, 2000);

      dispatch(handleSetPlayer2(player2Request.data));

      setPlayer2(() =>
        player2Request.data.map((item) => ({
          ...item,
          possession: "red",
        }))
      );

      // const boardResponse = await fetch(
      //   "https://reactmarathon-api.netlify.app/api/board"
      // );
      // const boardRequest = await boardResponse.json();
      // setBoard(boardRequest.data);
      // const player2Response = await fetch(
      //   "https://reactmarathon-api.netlify.app/api/create-player"
      // );
      // const player2Request = await player2Response.json();
      // setPlayer2(() => {
      //   const result = player2Request.data.map((item) => ({
      //     ...item,
      //     possession: "red",
      //   }));
      //   dispatch(handleSetPlayer2(result));
      //   return result;
      // });
    };
    fetchData();
  }, []);

  if (Object.keys(selectedPokemonsRedux).length === 0) {
    history.replace("/game");
  }

  // const handleClickBoardPlate = async (position) => {
  //   console.log("position", position);
  //   console.log("choiseCard", choiseCard);
  //   if (choiseCard) {
  //     const params = {
  //       position,
  //       card: choiseCard,
  //       board,
  //     };

  const handleClickBoardPlate = async (position) => {
    console.log("position", position);
    console.log("choiseCard", choiseCard);
    if (typeof choiseCard === "object") {
      const params = {
        currentPlayer: "p1",
        hands: {
          p1: player1,
          p2: player2,
        },
        move: {
          poke: {
            ...choiseCard,
          },
          position,
        },
        board: serverBoard,
      };

      // const response = await fetch(
      //   "https://reactmarathon-api.netlify.app/api/players-turn",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(params),
      //   }
      // );
      // const request = await response.json();
      // console.log("Request", request);

      if (choiseCard.player === 1) {
        setPlayer1((prevState) =>
          prevState.filter((item) => item.id !== choiseCard.id)
        );
      }
      setBoard((prevState) =>
        prevState.map((item) => {
          if (item.position === position) {
            return {
              ...item,
              card: choiseCard,
            };
          }
          return item;
        })
      );

      const game = await request.game(params);
      console.log("game on BoardPage", game);

      setBoard(returnBoard(game.oldBoard));
      // if (choiseCard.player === 2) {
      //   setPlayer2((prevState) =>
      //     prevState.filter((item) => item.id !== choiseCard.id)
      //   );
      // }

      setSteps((prevState) => {
        const count = prevState + 1;
        return count;
      });

      if (game.move !== null) {
        const idAi = game.move.poke.id;

        setTimeout(() => {
          setPlayer2((prevState) =>
            prevState.map((item) => {
              if (item.id === idAi) {
                return {
                  ...item,
                  active: true,
                };
              }
              return item;
            })
          );
        }, 1000);

        setTimeout(() => {
          setPlayer2(() => game.hands.p2.pokes.map((item) => item.poke));
          setServerBoard(game.board);
          setBoard(returnBoard(game.board));

          setSteps((prevState) => {
            const count = prevState + 1;
            return count;
          });
        }, 1500);
      }
    }
  };

  useEffect(() => {
    if (steps === 9) {
      const [count1, count2] = counterWin(board, player1, player2);

      if (count1 > count2) {
        alert("WIN");
        //setTypeResult("WIN");
        //dispatch(handleSetWinner("player1"));
        dispatch(handleSetWinner("WIN"));
        // context.setWinner("player1");

        history.replace("/game/finish");
      } else if (count1 < count2) {
        alert("LOSE");
        //setTypeResult("LOSE");
        dispatch(handleSetWinner("LOSE"));
        //dispatch(handleSetWinner("player2"));

        history.replace("/game/finish");
      } else {
        alert("DRAW");
        //setTypeResult("DRAW");
        dispatch(handleSetWinner("DRAW"));
        // context.setWinner();
        history.replace("/game/finish");
      }
    }
  }, [steps, board, player2, player1]);

  return (
    <div className={s.root}>
      {/* {typeResult && <Result type={typeResult} />} */}
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
