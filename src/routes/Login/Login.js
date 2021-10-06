import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { selectUser, removeUser } from "../../components/store/user.js";
import { selectPokemonsData } from "../../components/store/pokemons.js";
import { getPokemonsAsync } from "../../components/store/pokemons.js";

const UserPage = () => {
  const userInfo = useSelector(selectUser);
  const pokemonsRedux = useSelector(selectPokemonsData);
  const [pokemons, setPokemons] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();

  const date = new Date(+userInfo.createdAt).toLocaleDateString();
  // const toLocalTime = (data) =>
  //   new Date(parseInt(data, 10).toLocalString("uk-UA"));

  // useEffect(() => {
  //   dispatch(getPokemonsAsync());
  // }, []);

  // useEffect(() => {
  //   setPokemons(pokemonsRedux);
  // }, [pokemonsRedux]);

  const handleClick = () => {
    dispatch(removeUser());
    localStorage.removeItem("idToken");
    history.push("/");
  };
  return (
    <>
      <ul>
        <li>Email: {userInfo.email}</li>
        <li>CreatedAt: {date}</li>
      </ul>
      <button onClick={handleClick}>Logout</button>
    </>
  );
};

export default UserPage;
