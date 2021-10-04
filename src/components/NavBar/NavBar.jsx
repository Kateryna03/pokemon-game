import { useHistory } from "react-router";
import s from "../NavBar/NavBar.module.css";
import cn from "classnames";
//import { ReactComponent as LogoSvg } from "../../assets/logo.svg";
import { ReactComponent as LoginSvg } from "../../assets/login.svg";

const NavBar = ({
  onHandleClick,
  bgActive = false,
  isActive,
  onClickLogin,
}) => {
  const history = useHistory();
  const handleClickButton = (page) => {
    onHandleClick && onHandleClick();
    history.push(page);
  };
  return (
    <nav id={s.navbar} className={cn(s.root, { [s.bgActive]: bgActive })}>
      {/* className={s.root}> */}
      <div className={s.navWrapper}>
        <div className={s.brand}>
          LOGO
          {/* <LogoSvg /> */}
        </div>
        <div className={s.loginAndMenu}>
          <div className={s.loginWrap} onClick={onClickLogin}>
            <LoginSvg />
          </div>

          <div
            onClick={handleClickButton}
            className={cn(s.menuButton, { [s.active]: isActive })}
          >
            <span />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
