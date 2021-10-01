import { useState } from "react";
import Menu from "../Menu/Menu";
import NavBar from "../NavBar/NavBar";

const MenuHeader = ({ bgActive }) => {
  const [isActive, setActive] = useState(false);
  //устанавливаю null vs false чтобы не было моргания при изменении стилей

  const handleClickButton = () => {
    // setActive(!isActive);hw-4
    setActive((prevState) => !prevState);
  };
  return (
    <>
      <Menu isActive={isActive} onHandleClick={handleClickButton}></Menu>
      <NavBar
        isActive={isActive}
        bgActive={bgActive}
        onHandleClick={handleClickButton}
      ></NavBar>
    </>
  );
};

export default MenuHeader;
