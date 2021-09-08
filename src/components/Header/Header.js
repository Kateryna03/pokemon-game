import s from "./Header.module.css";

function Header() {
  return (
    <header className={s.root}>
      <div className={s.forest}></div>
      <div className={s.container}>
        <h1>This is title</h1>
        <p>This is Description!</p>
      </div>
    </header>
  );
}
export default Header;
