import { useHistory } from "react-router";
import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import POKEMONS from "../../components/PokemonCard/cards.json";

const GamePage = () => {
  const history = useHistory();
  const [pokemons, setPokemons] = useState(POKEMONS);
  //setPokemons(POKEMONS);

  //console.log(pokemons);

  const handlePokemonChangeIsActive = (id) => {
    setPokemons((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
    //console.log("CLICK ON POKEMON");
  };

  const handleClick = () => {
    history.push("/");
  };
  return (
    <>
      {/* <h1>THIS IS GAME PAGE!!!</h1> */}
      <button onClick={handleClick}>Go Home</button>
      <Layout title="Game Page" colorBg="teal">
        <div className="flex">
          {pokemons.map(({ name, img, id, type, values, isActive }) => (
            <PokemonCard
              key={id}
              name={name}
              img={img}
              id={id}
              type={type}
              values={values}
              onChangeisActive={handlePokemonChangeIsActive}
              isActive={isActive}
            />
          ))}
        </div>
      </Layout>
    </>
  );
};
export default GamePage;
