import { useHistory } from "react-router";
import s from "./Header.module.css";

function Header({ title, descr, onClickButton }) {
  //используется для перехода между страницами по событию
  // const history = useHistory();
  // const HandleClick = () => {
  //   history.push("/game");
  //};
  return (
    <header className={s.root}>
      <div className={s.forest}></div>
      <div className={s.silhouette}></div>
      <div className={s.moon}></div>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>{descr}</p>
        <button onClick={onClickButton}>Start Game</button>
      </div>
    </header>
  );
}
export default Header;
