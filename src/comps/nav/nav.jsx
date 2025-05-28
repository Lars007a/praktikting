import styles from "./nav.module.css";
import { NavLink } from "react-router";

export default function nav({ name }) {
  return (
    <>
      <nav className={styles.nav}>
        <div className="container">
          <div className={styles.content}>
            <NavLink to="/">
              <h1 className="title">{name} blog</h1>
            </NavLink>
            <ul>
              <NavLink to={"#"}>
                <li>Ting</li>
              </NavLink>
              <NavLink to={"#"}>
                <li>Ting</li>
              </NavLink>
              <NavLink to={"#"}>
                <li>Ting</li>
              </NavLink>
              <NavLink to={"#"}>
                <li>Ting</li>
              </NavLink>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
