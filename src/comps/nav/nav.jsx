import styles from "./nav.module.css";
import { NavLink } from "react-router";
import { LuSunMoon } from "react-icons/lu";
import { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

export default function nav({ name, themeChanger }) {
  const [login, setLogin] = useLocalStorage("login", null);

  const logout = () => {
    setLogin(null);
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className="container">
          <div className={styles.content}>
            <NavLink to="/">
              <h1 className="title">{name} blog</h1>
            </NavLink>
            <ul>
              <NavLink to={"/"}>
                <li>Blog</li>
              </NavLink>
              <NavLink to={"/backoffice"}>
                <li>Backoffice</li>
              </NavLink>
              {login != null || login != undefined ? (
                <li onClick={logout}>Logout</li>
              ) : (
                ""
              )}
              <li onClick={themeChanger}>
                <LuSunMoon />
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
