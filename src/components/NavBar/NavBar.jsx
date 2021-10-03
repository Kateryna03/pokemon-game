import { useHistory } from "react-router";
import s from "../NavBar/NavBar.module.css";
import cn from "classnames";

const NavBar = ({ onHandleClick, bgActive = false, isActive }) => {
  const history = useHistory();
  const handleClickButton = (page) => {
    onHandleClick && onHandleClick();
    history.push(page);
  };
  return (
    <nav id={s.navbar} className={cn(s.root, { [s.bgActive]: bgActive })}>
      {/* className={s.root}> */}
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
