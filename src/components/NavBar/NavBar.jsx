import s from "../NavBar/NavBar.module.css";
import cn from "classnames";
const NavBar = ({ onHandleClick, isActive }) => {
  const handleClickButton = () => {
    onHandleClick && onHandleClick();
  };
  return (
    <nav className={s.root}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <div
          onClick={handleClickButton}
          className={cn(s.menuButton, { [s.active]: isActive })}
        >
          <span />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
