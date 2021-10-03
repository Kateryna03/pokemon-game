import { useEffect } from "react";
import { createPortal } from "react-dom";
// import PropTypes from 'prop-types';
import { useRef } from "react";
import cn from "classnames";
import s from "./Modal.module.css";

//const modalRoot = document.querySelector("#modal-root");
const Modal = ({
  onClose,
  alt,
  src,
  title,
  children,
  onCloseModal,
  isOpen,
}) => {
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
    // <div className={styles.overlay} onClick={handleBackDropClick}>
    //   <div className={styles.modal}>
    //     {/* {children} */}
    //     <img src={src} alt={alt} />
    //   </div>
    // </div>,
    // modalRoot,
    <div class={cn(s.root, { [s.open]: isOpen })} onClick={handleBackDropClick}>
      <div
        class={s.modal}
        // ref={modalEl}
      >
        <div class={s.head}>
          {title}
          <span class={s.btnClose} onClick={handleModalClose}></span>
        </div>
        <div className={s.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;

///////////////////////////////////////////////////CLASS///////////////////////////////////////

// import React, { Component } from 'react';
// import { createPortal } from 'react-dom';
// // import PropTypes from 'prop-types';

// import styles from './Modal.module.css';

// const modalRoot = document.querySelector('#modal-root');
// class Modal extends Component {
//   componentDidMount() {
//     // console.log("didMount");
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     // console.log('Unmount');
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }
//   //закрытие модалки по ескейпу
//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };
//   //закрытие модалки по клику в бэкдроп
//   handleBackDropClick = e => {
//     if (e.target === e.currentTarget) {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return createPortal(
//       <div className={styles.overlay} onClick={this.handleBackDropClick}>
//         <div className={styles.modal}>
//           {/* {this.props.children} */}
//           <img src={this.props.src} alt={this.props.alt} />
//         </div>
//       </div>,
//       modalRoot,
//     );
//   }
// }

// export default Modal;
