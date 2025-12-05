import styles from "./nav.module.css";
import { NavLink, useNavigate } from "react-router";
import { LuSunMoon } from "react-icons/lu";
import { useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import { toast } from "react-toastify";

export default function nav({ }) {
  const [login, setLogin] = useLocalStorage("login", null);
  const nav = useNavigate();

  const logout = () => {
    //Bare sætter login token tilbage til default værdi.
    setLogin(null);
    toast.success("Logget ud");
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className="container">
          <div className={styles.content}>
            <NavLink to="/">
              <h1 className="title">Rejseblog</h1>
            </NavLink>
            <ul>
              <NavLink to={"/"}>
                <li>Blog</li>
              </NavLink>
              <NavLink to={"/backoffice"}>
                <li>Adminpanel</li>
              </NavLink>
              {login != null || login != undefined ? (
                <li onClick={logout}>Logout</li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
