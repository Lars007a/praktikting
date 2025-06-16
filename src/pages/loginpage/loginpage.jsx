import styles from "./loginpage.module.css";
import { useLocalStorage } from "@uidotdev/usehooks";
import Title from "../../comps/titleWithLine/titleWithLine";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useSendData } from "../../hooks/usePosts.jsx";
import { useNavigate } from "react-router";

export default function loginpage() {
  const [login, setLogin] = useLocalStorage("login", null);
  const nav = useNavigate();

  const useSend = useSendData();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const formRef = useRef(null);

  const submit = (event) => {
    event.preventDefault();

    const emailValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    if (!emailValue || !passwordValue) {
      toast.error("Felterne skal fyldes ud!");
      return;
    }

    if (!emailValue.includes("@")) {
      toast.error("Skal inkludere email!");
      return;
    }

    useSend
      .login(emailValue, passwordValue)
      .then((val) => {
        if (val.status == "ok") {
          toast.success("Logget ind!");
          setLogin(val.data);
          nav("/backoffice");
          return;
        } else {
          throw new Error("Kunne ikke logge ind: " + val.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
        toast.error("Kunne ikke logge ind! " + error.message);
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
