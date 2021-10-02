import { useState } from "react";
import Menu from "../Menu/Menu";
import NavBar from "../NavBar/NavBar";
import Modal from "../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import { NatificationManager, NotificationManager } from "react-notifications";
const MenuHeader = ({ bgActive }) => {
  const [isActive, setActive] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  //устанавливаю null vs false чтобы не было моргания при изменении стилей

  const handleClickButtonHamburg = () => {
    setActive((prevState) => !prevState);
  };
  const handleClickLogin = () => {
    setIsOpenModal((prevState) => !prevState);
  };

  const handleSubmitLoginForm = async ({ email, password }) => {
    console.log(email, password);
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    };
    const apiKey = process.env.REACT_APP_API_KEY;
    console.log("KEY", apiKey);
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
      requestOptions
    ).then((res) => res.json());
    console.log("Response", response);
    if (response.hasOwnProperty("error")) {
      NotificationManager.error(response.error.message, "Wrong");
    } else {
      localStorage.setItem("idToken", response.idToken);
      NotificationManager.success("Success message");
    }
  };

  return (
    <>
      <Menu isActive={isActive} onHandleClick={handleClickButtonHamburg}></Menu>
      <NavBar
        isActive={isActive}
        bgActive={bgActive}
        onHandleClick={handleClickButtonHamburg}
        onClickLogin={handleClickLogin}
      ></NavBar>

      <Modal
        isOpen={isOpenModal}
        onCloseModal={handleClickLogin}
        title="Log in..."
      >
        <LoginForm onSubmit={handleSubmitLoginForm}></LoginForm>
      </Modal>
    </>
  );
};

export default MenuHeader;
