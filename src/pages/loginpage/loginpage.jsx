import styles from "./loginpage.module.css";
import { useLocalStorage } from "@uidotdev/usehooks";
import Title from "../../comps/titleWithLine/titleWithLine";
import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { useSendData } from "../../hooks/usePosts.jsx";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

export default function loginpage() {
  const [login, setLogin] = useLocalStorage("login", null);
  const nav = useNavigate();
  const useSend = useSendData();

  //Tjek om allerede logget ind.
  useEffect(() => {
    if (login != null || login != undefined) {
      nav("/backoffice");
    }
  }, [login]);

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //Når form er submittet.
  const submit = (event) => {
    event.preventDefault(); //Så vi styrer hvad der sker.

    //Få værdier fra inputs.
    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    //Tjek om felterne er fyldt ud.
    if (!emailValue || !passwordValue) {
      toast.error("Felterne skal fyldes ud!");
      return;
    }

    //For at se om det er en email, tjekker vi bare efter om der er et "@".
    if (!emailValue.includes("@")) {
      toast.error("Skal inkludere email!");
      return;
    }

    //Send request til api/backend med email og password.
    useSend
      .login(emailValue, passwordValue)
      .then((val) => {
        //Hvis success.
        if (val.status == "ok") {
          toast.success("Logget ind!");

          const user = jwtDecode(val.data);

          setLogin({ token: val.data, decoded: user }); //Sæt login localstorage til token vi har fået tilbage.
          nav("/backoffice"); //navigere til backoffice side.
          return;
        } else {
          throw new Error(val.message); //Hvis fejl throw en fejl.
        }
      })
      .catch((error) => {
        //Hvis fejl, hvis fejlbeskeden.
        console.log(error.message);
        toast.error("Kunne ikke logge ind: " + error.message);
      });
  };

  return (
    <section className={styles.loginPage}>
      <div className="container">
        <div className={styles.content}>
          <Title title={"Login"} />
          <form onSubmit={submit} noValidate>
            <div className={styles.group}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                ref={emailRef}
                className="stdInput"
                placeholder="Email..."
                id="email"
                name="email"
              />
            </div>
            <div className={styles.group}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="stdInput"
                ref={passwordRef}
                placeholder="Password..."
                id="password"
                name="password"
              />
            </div>

            <input type="submit" value={"Login"} className="stdInputBtn" />
          </form>
        </div>
      </div>
    </section>
  );
}
