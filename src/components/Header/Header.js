import s from "./Header.module.css";

function Header({ title, descr, onClickButton }) {
  const HandleClick = () => {
    onClickButton && onClickButton("game");
  };
  return (
    <header className={s.root}>
      <div className={s.forest}></div>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>{descr}</p>
        <button onClick={HandleClick}>Start Game</button>
      </div>
    </header>
  );
}
export default Header;
