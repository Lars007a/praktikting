import styles from "./backofficePopup.module.css";
import React, { useEffect, useRef } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { IoMdClose } from "react-icons/io";

export default function backofficePopup({ closeFunc, maincontent, title }) {
  //popup for backoffice.
  //main content er det der skal vises, titel er titlen der bliver vist i toppen, og close funktion er
  //den funktion der lukker popupen.

  return (
    <div className={styles.popup}>
      <div className={styles.modal}>
        <div className={`${styles.top}`}>
          <p>{title}</p>
          <IoMdClose onClick={closeFunc} />
        </div>

        <div className={styles.mCon}>{maincontent}</div>
      </div>
    </div>
  );
}
