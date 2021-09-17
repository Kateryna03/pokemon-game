import { NavLink } from "react-router-dom";
import s from "../Menu/Menu.module.css";
import cn from "classnames";
const MENU = [
  {
    title: "HOME",
    to: "home",
  },
  {
    title: "GAME",
    to: "game",
  },
  {
    title: "ABOUT",
    to: "about",
  },
  {
    title: "CONTACT",
    to: "contact",
  },
];
const Menu = ({ isActive, onHandleClick }) => {
  return (
    <div
      className={cn(s.menuContainer, {
        [s.active]: isActive === true,
        [s.deactive]: !isActive === false,
      })}
    >
      <div className={s.overlay} />
      <div className={s.menuItems}>
        <ul>
          {MENU.map(({ title, to }, index) => (
            <li key={index}>
              <NavLink to={to} onClick={onHandleClick}>
                {title}
              </NavLink>
            </li>
          ))}
          {/* <li>
            <a href="#welcome">HOME</a>
          </li>
          <li>
            <a href="#game">GAME</a>
          </li>
          <li>
            <a href="#about">ABOUT</a>
          </li>
          <li>
            <a href="#contact">CONTACT</a>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
