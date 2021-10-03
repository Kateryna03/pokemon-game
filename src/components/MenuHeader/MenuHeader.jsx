import { useState } from "react";
import Menu from "../Menu/Menu";
import NavBar from "../NavBar/NavBar";
import Modal from "../Modal/Modal";
import LoginForm from "../LoginForm/LoginForm";
import { NotificationManager } from "react-notifications";

const loginSignupUser = async ({ email, password, type }) => {
  console.log(email, password);
  const requestOptions = {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  };

  switch (type) {
    case "signup":
      return await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAn6AxHzZETX-VNHw_xIsnPY268d-RD4N8",
        requestOptions
      ).then((res) => res.json());
    case "login":
      return await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAn6AxHzZETX-VNHw_xIsnPY268d-RD4N8",
        requestOptions
      ).then((res) => res.json());
    default:
      return "I can't login user";
  }
};

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

  const handleSubmitLoginForm = async (props) => {
    const response = await loginSignupUser(props);
    console.log("Response", response);
    if (response.hasOwnProperty("error")) {
      NotificationManager.error(response.error.message, "Wrong");
    } else {
      localStorage.setItem("idToken", response.idToken);
      NotificationManager.success("Success message");
      handleClickLogin();
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
        <LoginForm
          isResetField={!isOpenModal}
          onSubmit={handleSubmitLoginForm}
        ></LoginForm>
      </Modal>
    </>
  );
};

export default MenuHeader;
