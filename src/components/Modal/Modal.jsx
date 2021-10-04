import { useEffect } from "react";

// import PropTypes from 'prop-types';
//import { useRef } from "react";
import cn from "classnames";
import s from "./Modal.module.css";

const Modal = ({ title, children, onCloseModal, isOpen }) => {
  // const modalEl = useRef();//для реф-ции
  useEffect(() => {
    //Убираее скролл за модалкой
    document.querySelector("body").style.overflow = isOpen ? "hidden" : null;

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);
  //закрытие модалки по ескейпу
  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      handleModalClose();
    }
  };
  //закрытие модалки по клику в бэкдроп
  const handleBackDropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleModalClose();
    }

    // if (!modalEl.current.contains(e.target)) {
    //   handleModalClose();
    // }!!!!!!ВариантЗара
  };

  const handleModalClose = (e) => {
    onCloseModal && onCloseModal(false);
  };

  return (
    <div
      className={cn(s.root, { [s.open]: isOpen })}
      onClick={handleBackDropClick}
    >
      <div
        className={s.modal}
        // ref={modalEl}
      >
        <div className={s.head}>
          {title}
          <span className={s.btnClose} onClick={handleModalClose}></span>
        </div>
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
