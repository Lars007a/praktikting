import styles from "./backoffice.module.css";
import Title from "../../comps/titleWithLine/titleWithLine";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import BackofficePosts from "../../comps/backofficePosts/backofficePosts.jsx";
import { useGetData } from "../../hooks/usePosts.jsx";
import { useLocalStorage } from "@uidotdev/usehooks";
import { jwtDecode } from "jwt-decode";
import Usersbackoffice from "../../comps/usersbackoffice/usersbackoffice.jsx";

export default function backoffice() {
  const [pageToShow, setPageToShow] = useState();
  const [login, setLogin] = useLocalStorage("login", null);
  const [decodedUser, setDecodedUser] = useState({});

  useEffect(() => {
    setPageToShow(<BackofficePosts />);
  }, []);


  useEffect(() => {
    
    if(!login?.token) return;
    
    const user = jwtDecode(login.token);
  
    setDecodedUser(user);

  }, [login?.token])

  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.userInfo}>
          <div className={styles.group}>
            <strong>Name</strong>
            <p>{decodedUser?.name}</p>
          </div>
          <div className={styles.group}>
            <strong>Email</strong>
            <p>{decodedUser?.email}</p>
          </div>
          <div className={styles.group}>
            <strong>user ID</strong>
            <p>{decodedUser?._id}</p>
          </div>
        </div>
        <div className={styles.btns}>
          <button
            className="stdInputBtn"
            onClick={() => {
              setPageToShow(<BackofficePosts />);
            }}
          >
            Indlæg
          </button>
          <button
            className="stdInputBtn"
            onClick={() => {
              setPageToShow(<Usersbackoffice />);
            }}
          >
            Accounts
          </button>
        </div>
        <div className={styles.content}>{pageToShow}</div>
      </div>
    </section>
  );
}
