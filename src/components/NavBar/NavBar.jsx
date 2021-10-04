import { useHistory } from "react-router";
import s from "../NavBar/NavBar.module.css";
import cn from "classnames";
//import { ReactComponent as LogoSvg } from "../../assets/logo.svg";
import { ReactComponent as LoginSvg } from "../../assets/login.svg";
import { ReactComponent as UserSvg } from "../../assets/user.svg";
import { useSelector } from "react-redux";
import { selectLocalId, selectUserLoading } from "../store/user";
import { Link } from "react-router-dom";

const NavBar = ({
  onHandleClick,
  bgActive = false,
  isActive,
  onClickLogin,
}) => {
  const isLoadingUser = useSelector(selectUserLoading);
  const localId = useSelector(selectLocalId);
  console.log("localID", localId);
  console.log("selectUserLoading", isLoadingUser);

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
          {!isLoadingUser && !localId && (
            <div className={s.loginWrap} onClick={onClickLogin}>
              <LoginSvg />
            </div>
          )}
          {!isLoadingUser && localId && (
            <Link className={s.loginWrap} to="/login">
              <UserSvg />
            </Link>
          )}

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
