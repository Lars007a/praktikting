import styles from "./footer.module.css";
import { IoMdMail } from "react-icons/io";
import { FaPhone } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { LuSunMoon } from "react-icons/lu";

export default function footer({ themeChanger }) {
  return (
    <>
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.content}>
            <div>
              <ul className={styles.linkSec}>
                <li>
                  <h3>Links</h3>
                </li>
                <li>
                  <a href="/">Blog</a>
                </li>
                <li>
                  <a href="/backoffice">Backoffice</a>
                </li>
                <li onClick={themeChanger}>
                  <LuSunMoon />
                </li>
              </ul>
              <ul className={styles.linkSec}>
                <li>
                  <h3>Sociale medier</h3>
                </li>
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">YouTube</a>
                </li>
              </ul>
              <ul className={styles.linkSec}>
                <li>
                  <h3>Kontakt</h3>
                </li>
                <li>
                  <span>
                    <IoMdMail />
                    <a href="mailto:mail@mail.dk">mail@mail.dk</a>
                  </span>
                </li>
                <li>
                  <span>
                    <FaPhone />
                    <p>+45 42 46 48 79</p>
                  </span>
                </li>
                <li>
                  <span>
                    <FaHome />
                    <p>Addresse 1, by, 7500 Holstebro</p>
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <ul className={styles.linkSec}></ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
