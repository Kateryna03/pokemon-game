//import logo from './logo.svg';
import { useHistory } from "react-router";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import "../../App.css";
// import MenuHeader from "../../components/MenuHeader/MenuHeader";
import Header from "../../components/Header/Header";
import Layout from "../../components/Layout/Layout";
//import Footer from "../../components/Footer/Footer";
import bg1 from "../../assets/bg1.jpeg";
import bg3 from "../../assets/bg3.jpeg";
import POKEMONS from "../../components/PokemonCard/cards.json";

export default function HomePage({ onChangePage }) {
  const history = useHistory();
  const handleClickButton = (page) => {
    history.push(page);
    // console.log("HOME PAGE");
    // onChangePage && onChangePage(page);
  };
  return (
    <>
      {/* <MenuHeader /> */}
      <Header
        title="Pokemon Game"
        descr="This is simple triple triad card game"
        onClickButton={handleClickButton}
      />
      <Layout id="about" title="About" urlBg={bg1}>
        <p>
          In the game two players face off against one another, one side playing
          as "blue", the other as "red" on a 3x3 grid. Each player has five
          cards in a hand and the aim is to capture the opponent's cards by
          turning them into the player's own color of red or blue.
        </p>
      </Layout>
      <Layout id="cards" title="Cards" colorBg="yellow">
        <div className="flex">
          {POKEMONS.map(({ name, img, id, type, values }) => (
            <PokemonCard
              key={id}
              name={name}
              img={img}
              id={id}
              type={type}
              values={values}
            />
          ))}
        </div>
      </Layout>
      <Layout id="rules" title="Rules" urlBg={bg3}>
        <p>
          To win, a majority of the total ten cards played (including the one
          card that is not placed on the board) must be of the player's card
          color. To do this, the player must capture cards by placing a card
          adjacent to an opponent's card whereupon the 'ranks' of the sides
          where the two cards touch will be compared. If the rank of the
          opponent's card is higher than the player's card, the player's card
          will be captured and turned into the opponent's color. If the player's
          rank is higher, the opponent's card will be captured and changed into
          the player's color instead.{" "}
        </p>
      </Layout>
    </>
  );
}
