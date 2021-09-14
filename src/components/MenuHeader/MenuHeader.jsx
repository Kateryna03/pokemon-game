import { useState } from "react";
import Menu from "../Menu/Menu";
import NavBar from "../NavBar/NavBar";

const MenuHeader = () => {
  const [isActive, setActive] = useState(false);

  const handleClickButton = () => {
    setActive(!isActive);
  };
  return (
    <>
      <Menu isActive={isActive}></Menu>
      <NavBar isActive={isActive} onHandleClick={handleClickButton}></NavBar>
    </>
  );
};

export default MenuHeader;
